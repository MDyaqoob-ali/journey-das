import { getGithubQueue, updateGithubJob, saveProblemProgress, getProblemProgress } from '../db/database';
import { getSettings } from '../db/settings-storage';
import { getProblemById } from '../curriculum/curriculum';
import { commitFile, generateProblemPath, generateReadmeContent } from './api';
import type { GithubSyncJob } from '../types/db';

let isProcessing = false;

export async function processSyncQueue(): Promise<{ processed: number; failed: number }> {
  if (isProcessing) {
    return { processed: 0, failed: 0 };
  }
  isProcessing = true;

  let processedCount = 0;
  let failedCount = 0;

  try {
    const settings = await getSettings();
    if (!settings.github.connected || !settings.github.accessToken || !settings.github.repo) {
      console.log('GitHub not configured or disconnected; deferring sync queue.');
      return { processed: 0, failed: 0 };
    }

    const [owner, repo] = settings.github.repo.split('/');
    if (!owner || !repo) {
      console.error('Invalid repository setting format. Expected "owner/repo".');
      return { processed: 0, failed: 0 };
    }

    const allJobs = await getGithubQueue();
    // Filter jobs that need processing (PENDING, RETRYING)
    const queue = allJobs.filter((j) => j.status === 'PENDING' || j.status === 'RETRYING');

    for (const job of queue) {
      // Check maximum retry attempts
      if (job.attempts >= 5) {
        job.status = 'FAILED';
        job.lastError = 'Maximum retry attempts exceeded (5/5)';
        await updateGithubJob(job);
        failedCount++;
        continue;
      }

      const problem = getProblemById(job.problemId);
      if (!problem) {
        job.status = 'FAILED';
        job.lastError = `Curriculum problem ${job.problemId} not found in catalog`;
        await updateGithubJob(job);
        failedCount++;
        continue;
      }

      job.status = 'UPLOADING';
      job.attempts += 1;
      await updateGithubJob(job);

      const paths = generateProblemPath(problem, settings.github.rootDir);
      const commitMessage = settings.github.commitMsgTemplate
        .replace('{number}', String(problem.leetcodeNumber))
        .replace('{title}', problem.title);

      // Commit solution code
      const codeResult = await commitFile({
        owner,
        repo,
        branch: settings.github.branch || 'main',
        path: paths.codePath,
        content: job.solutionCode,
        message: commitMessage,
        token: settings.github.accessToken,
      });

      if (!codeResult.success) {
        job.status = 'RETRYING';
        job.lastError = codeResult.error || 'Failed to commit solution code';
        await updateGithubJob(job);
        failedCount++;
        continue;
      }

      // Optionally commit README.md if enabled
      if (settings.github.generateReadme) {
        const readmeContent = generateReadmeContent({
          problem,
          runtimeMs: job.runtimeMs,
          memoryMb: job.memoryMb,
        });

        await commitFile({
          owner,
          repo,
          branch: settings.github.branch || 'main',
          path: paths.readmePath,
          content: readmeContent,
          message: `docs(leetcode): add README for #${problem.leetcodeNumber} ${problem.title}`,
          token: settings.github.accessToken,
        });
      }

      // Mark Job as SYNCED
      job.status = 'SYNCED';
      job.syncedAt = Date.now();
      job.commitSha = codeResult.sha;
      job.commitUrl = codeResult.htmlUrl;
      job.lastError = undefined;
      await updateGithubJob(job);
      processedCount++;

      // Update problem record github sync status
      const currentProg = await getProblemProgress(problem.id);
      if (currentProg) {
        currentProg.githubSyncStatus = 'SYNCED';
        await saveProblemProgress(currentProg);
      }
    }
  } catch (err: any) {
    console.error('Exception running sync queue:', err);
  } finally {
    isProcessing = false;
  }

  return { processed: processedCount, failed: failedCount };
}

export async function retryFailedJobs(): Promise<void> {
  const allJobs = await getGithubQueue();
  for (const job of allJobs) {
    if (job.status === 'FAILED' || job.status === 'RETRYING') {
      job.status = 'PENDING';
      job.attempts = 0;
      job.lastError = undefined;
      await updateGithubJob(job);
    }
  }
  await processSyncQueue();
}

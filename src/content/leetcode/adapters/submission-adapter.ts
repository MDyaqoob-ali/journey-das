import type { AttemptResult } from '../../../types/db';

export interface SubmissionVerdict {
  result: AttemptResult;
  runtimeMs?: number;
  memoryMb?: number;
  submissionId?: string;
  timestamp: number;
}

export class SubmissionObserver {
  private observer: MutationObserver | null = null;
  private lastTriggeredTime = 0;
  private onVerdictCallback: (verdict: SubmissionVerdict) => void;

  constructor(onVerdict: (verdict: SubmissionVerdict) => void) {
    this.onVerdictCallback = onVerdict;
  }

  public start(): void {
    if (this.observer) return;

    this.observer = new MutationObserver((mutations) => {
      this.checkMutations(mutations);
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  public stop(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  private checkMutations(_mutations: MutationRecord[]): void {
    // Debounce checks within 2 seconds
    const now = Date.now();
    if (now - this.lastTriggeredTime < 2000) {
      return;
    }

    // Look for submission outcome elements in modern and classic LeetCode DOM
    // Selectors for result container
    const resultElem = document.querySelector(
      '[data-e2e-locator="submission-result"], [data-cypress="SubmissionResult"], .text-green-s, div[class*="status__"]'
    );

    if (!resultElem || !resultElem.textContent) {
      return;
    }

    const text = resultElem.textContent.trim();
    let result: AttemptResult | null = null;

    if (text.includes('Accepted')) {
      result = 'ACCEPTED';
    } else if (text.includes('Wrong Answer')) {
      result = 'WRONG_ANSWER';
    } else if (text.includes('Time Limit Exceeded')) {
      result = 'TIME_LIMIT_EXCEEDED';
    } else if (text.includes('Memory Limit Exceeded')) {
      result = 'MEMORY_LIMIT_EXCEEDED';
    } else if (text.includes('Runtime Error')) {
      result = 'RUNTIME_ERROR';
    } else if (text.includes('Compile Error')) {
      result = 'COMPILE_ERROR';
    }

    if (!result) {
      return;
    }

    this.lastTriggeredTime = now;

    // Extract runtime and memory from surrounding cards/tables
    const { runtimeMs, memoryMb } = this.extractPerformanceMetrics();

    // Extract submission ID if present in URL or link attributes
    let submissionId: string | undefined;
    const subLink = document.querySelector('a[href*="/submissions/detail/"]');
    if (subLink) {
      const match = subLink.getAttribute('href')?.match(/\/detail\/(\d+)/);
      if (match) submissionId = match[1];
    }

    this.onVerdictCallback({
      result,
      runtimeMs,
      memoryMb,
      submissionId,
      timestamp: now,
    });
  }

  private extractPerformanceMetrics(): { runtimeMs?: number; memoryMb?: number } {
    let runtimeMs: number | undefined;
    let memoryMb: number | undefined;

    const allText = document.body.innerText || '';

    // Match "Runtime: 3 ms" or "Runtime 3 ms"
    const runtimeMatch = allText.match(/Runtime[:\s]+(\d+)\s*ms/i);
    if (runtimeMatch) {
      runtimeMs = parseInt(runtimeMatch[1], 10);
    }

    // Match "Memory: 11.2 MB" or "Memory 11.2 MB"
    const memoryMatch = allText.match(/Memory[:\s]+([\d.]+)\s*MB/i);
    if (memoryMatch) {
      memoryMb = parseFloat(memoryMatch[1]);
    }

    return { runtimeMs, memoryMb };
  }
}

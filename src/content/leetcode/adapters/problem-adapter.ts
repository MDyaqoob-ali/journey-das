import { getProblemBySlug } from '../../../curriculum/curriculum';
import type { CurriculumProblem } from '../../../types/curriculum';

export interface ExtractedProblemInfo {
  slug: string;
  number?: number;
  title: string;
  canonicalUrl: string;
  curriculumProblem?: CurriculumProblem;
}

export function extractProblemInfo(): ExtractedProblemInfo | null {
  const pathname = window.location.pathname;
  const match = pathname.match(/\/problems\/([^/]+)/);
  if (!match) {
    return null;
  }

  const slug = match[1].toLowerCase().trim();
  const canonicalUrl = `https://leetcode.com/problems/${slug}/`;

  // First check if slug matches our curriculum catalog
  const curriculumProblem = getProblemBySlug(slug);
  if (curriculumProblem) {
    return {
      slug,
      number: curriculumProblem.leetcodeNumber,
      title: curriculumProblem.title,
      canonicalUrl,
      curriculumProblem,
    };
  }

  // Fallback 1: Extract from document.title (e.g., "1. Two Sum - LeetCode" or "Two Sum - LeetCode")
  let title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  let number: number | undefined;

  const docTitle = document.title;
  const titleMatch = docTitle.match(/^(\d+)\.\s*([^-|]+)/);
  if (titleMatch) {
    number = parseInt(titleMatch[1], 10);
    title = titleMatch[2].trim();
  } else {
    const plainTitleMatch = docTitle.match(/^([^-|]+)/);
    if (plainTitleMatch && !plainTitleMatch[1].toLowerCase().includes('leetcode')) {
      title = plainTitleMatch[1].trim();
    }
  }

  // Fallback 2: Check DOM element headers
  const headingElem = document.querySelector('div[data-cy="question-title"], .text-title-large, h4');
  if (headingElem && headingElem.textContent) {
    const headingText = headingElem.textContent.trim();
    const hMatch = headingText.match(/^(\d+)\.\s*(.+)/);
    if (hMatch) {
      number = parseInt(hMatch[1], 10);
      title = hMatch[2].trim();
    }
  }

  return {
    slug,
    number,
    title,
    canonicalUrl,
  };
}

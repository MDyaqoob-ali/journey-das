export interface ExtractedSolution {
  code: string;
  language: string;
  source: 'MONACO_LINES' | 'SUBMISSION_DETAILS' | 'TEXTAREA' | 'FALLBACK';
  isCpp: boolean;
}

export function extractSubmittedSolution(): ExtractedSolution | null {
  let code = '';
  let source: ExtractedSolution['source'] = 'FALLBACK';

  // Strategy 1: Extract from Monaco Editor lines in the page DOM
  const monacoLines = document.querySelectorAll('.monaco-editor .view-line');
  if (monacoLines && monacoLines.length > 0) {
    const lines: string[] = [];
    monacoLines.forEach((lineElem) => {
      lines.push(lineElem.textContent || '');
    });
    code = lines.join('\n');
    source = 'MONACO_LINES';
  }

  // Strategy 2: Extract from Submission Details pre/code block if open
  if (!code || code.trim().length === 0) {
    const preCode = document.querySelector('pre code, div[class*="submission"] pre');
    if (preCode && preCode.textContent) {
      code = preCode.textContent;
      source = 'SUBMISSION_DETAILS';
    }
  }

  // Strategy 3: Check textarea elements
  if (!code || code.trim().length === 0) {
    const textarea = document.querySelector('textarea.inputarea');
    if (textarea && (textarea as HTMLTextAreaElement).value) {
      code = (textarea as HTMLTextAreaElement).value;
      source = 'TEXTAREA';
    }
  }

  if (!code || code.trim().length === 0) {
    return null;
  }

  // Detect language
  const language = detectLanguage(code);
  const isCpp = language.toLowerCase().includes('c++') || language.toLowerCase() === 'cpp';

  return {
    code: code.trim(),
    language,
    source,
    isCpp,
  };
}

function detectLanguage(code: string): string {
  // Strategy 1: Check language button text in editor toolbar
  const langBtn = document.querySelector('button[id*="headlessui-listbox-button"], [data-cy="lang-select"]');
  if (langBtn && langBtn.textContent) {
    const txt = langBtn.textContent.trim();
    if (txt.includes('C++')) return 'C++';
    if (txt.includes('Java')) return 'Java';
    if (txt.includes('Python')) return 'Python';
    if (txt.includes('JavaScript')) return 'JavaScript';
    if (txt.includes('TypeScript')) return 'TypeScript';
    if (txt.includes('Rust')) return 'Rust';
    if (txt.includes('Go')) return 'Go';
  }

  // Strategy 2: Heuristic inspection of code content
  if (code.includes('#include') || code.includes('std::') || code.includes('vector<') || code.includes('cout <<') || code.includes('class Solution {')) {
    if (code.includes('public:') || code.includes('private:') || code.includes('#include')) {
      return 'C++';
    }
  }
  if (code.includes('def ') && code.includes('self,')) {
    return 'Python3';
  }
  if (code.includes('public class Solution') || code.includes('System.out.println')) {
    return 'Java';
  }

  return 'C++'; // Default to curriculum target language
}

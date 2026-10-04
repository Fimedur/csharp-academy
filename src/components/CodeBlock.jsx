import { useState } from 'react';

const KEYWORDS = new Set([
  'abstract', 'as', 'async', 'await', 'base', 'bool', 'break', 'case', 'catch', 'char', 'class', 'const',
  'continue', 'decimal', 'default', 'do', 'double', 'else', 'enum', 'false', 'finally', 'float', 'for',
  'foreach', 'get', 'if', 'in', 'init', 'int', 'interface', 'internal', 'is', 'long', 'namespace', 'new',
  'null', 'object', 'or', 'and', 'not', 'out', 'override', 'params', 'private', 'protected', 'public', 'readonly',
  'record', 'ref', 'return', 'sealed', 'set', 'static', 'string', 'struct', 'switch', 'this', 'throw',
  'true', 'try', 'using', 'var', 'virtual', 'void', 'when', 'where', 'while', 'with',
]);

// Tiny tokenizer: comments, strings, chars, numbers, words, everything else.
const TOKEN_RE = /(\/\/.*$|\/\*[\s\S]*?\*\/)|(\$?@?"(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)')|(\b\d+(?:\.\d+)?[mMfFdDlL]?\b)|([A-Za-z_]\w*)|(\s+|.)/gm;

function highlight(line) {
  const out = [];
  let m;
  let i = 0;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(line)) !== null) {
    const [text, comment, str, chr, num, word] = m;
    let cls = null;
    if (comment) cls = 'tk-comment';
    else if (str || chr) cls = 'tk-string';
    else if (num) cls = 'tk-number';
    else if (word) {
      if (KEYWORDS.has(word)) cls = 'tk-keyword';
      else if (/^[A-Z]/.test(word)) cls = 'tk-type';
    }
    out.push(cls ? <span key={i++} className={cls}>{text}</span> : text);
    if (text === '') TOKEN_RE.lastIndex++;
  }
  return out;
}

export default function CodeBlock({ code, activeLine, compact = false, showLines = true }) {
  const [copied, setCopied] = useState(false);
  const lines = code.split('\n');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard may be unavailable */
    }
  };

  return (
    <div className={`code-block ${compact ? 'compact' : ''}`}>
      {!compact && (
        <button className="copy-btn" onClick={copy} aria-label="Copy code">
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      )}
      <pre>
        <code>
          {lines.map((ln, idx) => (
            <div key={idx} className={`code-line ${activeLine === idx + 1 ? 'active' : ''}`}>
              {showLines && <span className="ln">{idx + 1}</span>}
              <span className="lc">{highlight(ln)}{ln === '' ? ' ' : ''}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

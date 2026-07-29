import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Simple token-based syntax highlighting
const highlightCode = (code: string, language: string): React.ReactNode[] => {
  const lines = code.split('\n');

  return lines.map((line, lineIdx) => {
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let key = 0;

    // Language-specific patterns
    const patterns: { regex: RegExp; className: string }[] = [];

    if (language === 'typescript' || language === 'javascript') {
      patterns.push(
        { regex: /^(import|export|from|const|let|var|function|async|await|return|new|if|else|for|while|class|extends|implements|interface|type)\b/, className: 'hz-fg-muted' },
        { regex: /^(true|false|null|undefined)\b/, className: 'hz-fg-muted' },
        { regex: /^"[^"]*"|^'[^']*'|^`[^`]*`/, className: 'hz-fg-muted' },
        { regex: /^\d+\.?\d*/, className: 'hz-fg-muted' },
        { regex: /^\/\/.*$/, className: 'hz-fg-muted hz-italic' },
        { regex: /^(process|console|window|document)\b/, className: 'hz-fg-muted' },
        { regex: /^\.[a-zA-Z_]\w*/, className: 'hz-fg-muted' },
        { regex: /^[A-Z][a-zA-Z0-9]*/, className: 'hz-fg-muted' },
        { regex: /^(env|HANZO_API_KEY)\b/, className: 'hz-fg-muted' },
      );
    } else if (language === 'python') {
      patterns.push(
        { regex: /^(import|from|as|def|class|return|if|elif|else|for|while|with|async|await|try|except|finally|raise|pass|break|continue|and|or|not|in|is)\b/, className: 'hz-fg-muted' },
        { regex: /^(True|False|None)\b/, className: 'hz-fg-muted' },
        { regex: /^"[^"]*"|^'[^']*'|^"""[\s\S]*?"""|^'''[\s\S]*?'''/, className: 'hz-fg-muted' },
        { regex: /^f"[^"]*"|^f'[^']*'/, className: 'hz-fg-muted' },
        { regex: /^\d+\.?\d*/, className: 'hz-fg-muted' },
        { regex: /^#.*$/, className: 'hz-fg-muted hz-italic' },
        { regex: /^(os|sys|print|open|len|range|str|int|float|list|dict|set)\b/, className: 'hz-fg-muted' },
        { regex: /^[A-Z][a-zA-Z0-9]*/, className: 'hz-fg-muted' },
      );
    } else if (language === 'go') {
      patterns.push(
        { regex: /^(package|import|func|return|if|else|for|range|switch|case|default|type|struct|interface|var|const|map|chan|go|defer|select)\b/, className: 'hz-fg-muted' },
        { regex: /^(true|false|nil)\b/, className: 'hz-fg-muted' },
        { regex: /^"[^"]*"|^`[^`]*`/, className: 'hz-fg-muted' },
        { regex: /^\d+\.?\d*/, className: 'hz-fg-muted' },
        { regex: /^\/\/.*$/, className: 'hz-fg-muted hz-italic' },
        { regex: /^(fmt|os|context|http|json|string|int|error|bool)\b/, className: 'hz-fg-muted' },
        { regex: /^[A-Z][a-zA-Z0-9]*/, className: 'hz-fg-muted' },
      );
    } else if (language === 'bash' || language === 'shell') {
      patterns.push(
        { regex: /^\$\s*/, className: 'hz-fg-muted' },
        { regex: /^(curl|sh|npm|npx|pip|go|cargo|hanzo|dev)\b/, className: 'hz-fg-muted' },
        { regex: /^"[^"]*"|^'[^']*'/, className: 'hz-fg-muted' },
        { regex: /^#.*$/, className: 'hz-fg-muted hz-italic' },
        { regex: /^-[a-zA-Z]+/, className: 'hz-fg-muted' },
        { regex: /^https?:\/\/[^\s]+/, className: 'hz-fg-muted' },
      );
    } else if (language === 'rust') {
      patterns.push(
        { regex: /^(use|mod|fn|let|mut|const|pub|impl|struct|enum|trait|where|async|await|return|if|else|for|while|loop|match|self|Self|crate|super)\b/, className: 'hz-fg-muted' },
        { regex: /^(true|false|None|Some|Ok|Err)\b/, className: 'hz-fg-muted' },
        { regex: /^"[^"]*"/, className: 'hz-fg-muted' },
        { regex: /^\d+\.?\d*/, className: 'hz-fg-muted' },
        { regex: /^\/\/.*$/, className: 'hz-fg-muted hz-italic' },
        { regex: /^(String|Vec|Option|Result|Box|Rc|Arc|i32|i64|u32|u64|f32|f64|bool|str)\b/, className: 'hz-fg-muted' },
        { regex: /^[A-Z][a-zA-Z0-9]*/, className: 'hz-fg-muted' },
      );
    }

    while (remaining.length > 0) {
      let matched = false;

      // Try each pattern
      for (const { regex, className } of patterns) {
        const match = remaining.match(regex);
        if (match && match.index === 0) {
          tokens.push(
            <span key={key++} className={className}>
              {match[0]}
            </span>
          );
          remaining = remaining.slice(match[0].length);
          matched = true;
          break;
        }
      }

      // If no pattern matched, take one character as plain text
      if (!matched) {
        // Group consecutive plain characters
        let plainEnd = 1;
        while (plainEnd < remaining.length) {
          let wouldMatch = false;
          for (const { regex } of patterns) {
            if (remaining.slice(plainEnd).match(regex)?.index === 0) {
              wouldMatch = true;
              break;
            }
          }
          if (wouldMatch) break;
          plainEnd++;
        }
        tokens.push(
          <span key={key++} className="hz-fg-soft">
            {remaining.slice(0, plainEnd)}
          </span>
        );
        remaining = remaining.slice(plainEnd);
      }
    }

    return (
      <div key={lineIdx} className="hz-leading-relaxed">
        {tokens.length > 0 ? tokens : <span>&nbsp;</span>}
      </div>
    );
  });
};

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock = ({ code, language, showLineNumbers = false, className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedCode = highlightCode(code.trim(), language);

  return (
    <div className={cn("hz-rel hz-r-lg hz-bordered hz-bg-surface hz-clip", className)}>
      {/* Header */}
      <div className="hz-row hz-ai-center hz-jc-between hz-px-4 hz-py-2 hz-border-b hz-bg-surface">
        <span className="hz-t-xs hz-fg-muted hz-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="hz-p-2 hz-r-md hz-transition hz-hoverable"
          title="Copy code"
        >
          {copied ? (
            <Check className="hz-sq-2 hz-fg-muted" />
          ) : (
            <Copy className="hz-sq-2 hz-fg-muted" />
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="hz-p-4 hz-scroll-x">
        <pre className="hz-mono hz-t-sm">
          {showLineNumbers ? (
            <div className="hz-row">
              <div className="hz-px-4 hz-fg-faint hz-align-right">
                {highlightedCode.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div>{highlightedCode}</div>
            </div>
          ) : (
            highlightedCode
          )}
        </pre>
      </div>
    </div>
  );
};

// Language tab selector component
interface LanguageTab {
  language: string;
  label: string;
  code: string;
}

interface CodeTabsProps {
  tabs: LanguageTab[];
  className?: string;
}

export const CodeTabs = ({ tabs, className }: CodeTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={cn("hz-r-lg hz-bordered hz-bg-surface hz-clip", className)}>
      {/* Tab headers */}
      <div className="hz-row hz-ai-center hz-border-b hz-bg-surface hz-scroll-x">
        {tabs.map((tab, idx) => (
          <button
            key={tab.language}
            onClick={() => setActiveTab(idx)}
            className={cn(
              "hz-px-4 hz-py-2 hz-t-xs hz-w-medium hz-transition hz-whitespace-nowrap",
              activeTab === idx
                ? "hz-fg hz-bg-raised"
                : "hz-fg-muted hz-link"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code content */}
      <div className="hz-p-4 hz-scroll-x">
        <pre className="hz-mono hz-t-sm">
          {highlightCode(tabs[activeTab].code.trim(), tabs[activeTab].language)}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;

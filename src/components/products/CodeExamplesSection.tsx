import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Terminal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeExample {
  language: string;
  label: string;
  code: string;
  description?: string;
}

interface CodeExamplesSectionProps {
  title?: string;
  subtitle?: string;
  examples: CodeExample[];
}

export function CodeExamplesSection({
  title = "Quick Start",
  subtitle = "Get started in minutes with your language of choice",
  examples
}: CodeExamplesSectionProps) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyToClipboard = async (code: string, index: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const languageIcons: Record<string, string> = {
    python: "🐍",
    javascript: "📜",
    typescript: "📘",
    go: "🐹",
    rust: "🦀",
    curl: "🔗",
    cli: "💻",
    bash: "💻",
    docker: "🐳",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="hz-py-7 hz-px-4"
    >
      <div className="hz-container-narrow">
        <div className="hz-row hz-ai-center hz-gap-2 hz-mb-2">
          <Terminal className="hz-sq-3 hz-fg" />
          <span className="hz-t-sm hz-w-medium hz-fg hz-upper hz-tracking-wide">
            Code Examples
          </span>
        </div>

        <h2 className="hz-t-2xl hz-w-bold hz-fg hz-mb-2">
          {title}
        </h2>
        <p className="hz-fg-muted hz-mb-6">
          {subtitle}
        </p>

        <Tabs defaultValue={examples[0]?.language} className="hz-w-full">
          <TabsList className="hz-row hz-wrap hz-gap-2 hz-bg-none hz-border-b hz-pb-4 hz-mb-5">
            {examples.map((example) => (
              <TabsTrigger
                key={example.language}
                value={example.language}
                className="hz-btn hz-btn-ghost hz-gap-2 hz-fg-muted hz-transition"
              >
                <span>{languageIcons[example.language.toLowerCase()] || "📄"}</span>
                {example.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {examples.map((example) => (
            <TabsContent key={example.language} value={example.language}>
              {example.description && (
                <p className="hz-fg-muted hz-t-sm hz-mb-4">
                  {example.description}
                </p>
              )}

              <div className="hz-rel">
                <div className="hz-abs hz-z-raised">
                  <button
                    onClick={() => copyToClipboard(example.code, example.language)}
                    className="hz-btn hz-gap-2 hz-t-xs hz-fg-soft hz-transition"
                  >
                    {copiedIndex === example.language ? (
                      <>
                        <Check className="hz-sq-1 hz-fg-muted" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="hz-sq-1" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <pre className="hz-card hz-px-6 hz-scroll-x">
                  <code className="hz-t-sm hz-fg-soft hz-mono">
                    {example.code}
                  </code>
                </pre>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </motion.section>
  );
}

export default CodeExamplesSection;

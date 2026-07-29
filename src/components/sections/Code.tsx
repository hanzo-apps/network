
import { motion } from "framer-motion";
import { Code as CodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Code = () => {
  return (
    <section className="hz-py-7 hz-bg">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <div className="hz-inline hz-ai-center hz-inline-2 hz-bg-surface hz-px-4 hz-py-1 hz-r-full hz-mb-5">
            <CodeIcon className="hz-sq-2 hz-fg" />
            <span className="hz-t-sm hz-fg">Modern Development Stack</span>
          </div>
          <h2 className="hz-t-4xl hz-display hz-fg hz-mb-4">Code with Confidence</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            A modern development stack with real-time AI, beautiful UI components, and a powerful database.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="hz-container-wide hz-rel"
        >
          <div className="hz-r-lg hz-clip hz-bordered">
            <div className="hz-bg-surface hz-px-4 hz-py-2 hz-row hz-ai-center hz-inline-2">
              <div className="hz-row hz-inline-1">
                <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
              </div>
              <div className="hz-t-sm hz-fg-muted">app.tsx</div>
            </div>
            <div className="hz-bg hz-p-5">
              <pre className="hz-t-sm">
                <code className="hz-fg-soft">
                  <span className="hz-fg-muted">import</span>{" "}
                  <span className="hz-fg-soft">{"{"}</span>{" "}
                  <span className="hz-fg-muted">createAI</span>{" "}
                  <span className="hz-fg-soft">{"}"}</span>{" "}
                  <span className="hz-fg-muted">from</span>{" "}
                  <span className="hz-fg-muted">'@hanzo/ai'</span>
                  {"\n"}
                  <span className="hz-fg-muted">import</span>{" "}
                  <span className="hz-fg-soft">{"{"}</span>{" "}
                  <span className="hz-fg-muted">Button</span>{" "}
                  <span className="hz-fg-soft">{"}"}</span>{" "}
                  <span className="hz-fg-muted">from</span>{" "}
                  <span className="hz-fg-muted">'@hanzo/ui'</span>
                  {"\n"}
                  <span className="hz-fg-muted">import</span>{" "}
                  <span className="hz-fg-soft">{"{"}</span>{" "}
                  <span className="hz-fg-muted">createClient</span>{" "}
                  <span className="hz-fg-soft">{"}"}</span>{" "}
                  <span className="hz-fg-muted">from</span>{" "}
                  <span className="hz-fg-muted">'@hanzo/base'</span>
                  {"\n\n"}
                  <span className="hz-fg-muted">const</span>{" "}
                  <span className="hz-fg-muted">ai</span>{" "}
                  <span className="hz-fg-soft">=</span>{" "}
                  <span className="hz-fg-muted">createAI</span>
                  <span className="hz-fg-soft">()</span>
                  {"\n"}
                  <span className="hz-fg-muted">const</span>{" "}
                  <span className="hz-fg-muted">db</span>{" "}
                  <span className="hz-fg-soft">=</span>{" "}
                  <span className="hz-fg-muted">createClient</span>
                  <span className="hz-fg-soft">()</span>
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Code;

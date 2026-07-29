
import React from "react";
import { motion } from "framer-motion";
import { GitPullRequest, MessageSquare, Shield, Clock } from "lucide-react";

const PRAgent = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="hz-bg-raised hz-bordered hz-border-strong hz-r-full hz-px-4 hz-py-1 hz-inline hz-ai-center hz-mb-5">
              <GitPullRequest className="hz-sq-2 hz-mr-2 hz-fg-muted" />
              <span className="hz-t-sm hz-w-medium hz-fg-soft">PR Agent</span>
            </div>
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
              Resolve Pull Requests 10x Faster.
            </h2>
            <p className="hz-t-xl hz-fg-soft hz-mb-6">
              Bring-in @hanzo-dev into any conversation on GitHub to automatically resolve feedback in the speed.
            </p>

            <div className="hz-stack-5">
              <div className="hz-row hz-gap-4">
                <div className="hz-bg-raised hz-p-3 hz-r-lg">
                  <MessageSquare className="hz-sq-4 hz-fg-muted" />
                </div>
                <div>
                  <h3 className="hz-t-lg hz-w-semibold hz-mb-1">Fast revisions.</h3>
                  <p className="hz-fg-soft">
                    Skip the back-and-forth. Mention @hanzo-dev in a review comment to automatically resolve feedback in the speed.
                  </p>
                </div>
              </div>

              <div className="hz-row hz-gap-4">
                <div className="hz-bg-raised hz-p-3 hz-r-lg">
                  <Clock className="hz-sq-4 hz-fg-muted" />
                </div>
                <div>
                  <h3 className="hz-t-lg hz-w-semibold hz-mb-1">Acclerate not just your product development, but your code quality.</h3>
                  <p className="hz-fg-soft">
                    Automatically solve conflicts, add tests, docs, and more. Everything you need to ship better code, faster.
                  </p>
                </div>
              </div>

              <div className="hz-row hz-gap-4">
                <div className="hz-bg-raised hz-p-3 hz-r-lg">
                  <Shield className="hz-sq-4 hz-fg-muted" />
                </div>
                <div>
                  <h3 className="hz-t-lg hz-w-semibold hz-mb-1">AI Agents You Can Trust.</h3>
                  <p className="hz-fg-soft">
                    With complete oversight of every thought and step you are always in full control. Provide feedback and and roll-back in one click if you need to.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hz-rel"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="hz-bg-raised hz-bordered hz-r-lg hz-clip">
              <div className="hz-p-4 hz-bg-surface hz-border-b">
                <div className="hz-row hz-inline-2">
                  <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                  <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                  <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                </div>
              </div>
              <div className="hz-p-5">
                <div className="hz-bg-surface hz-r-lg hz-p-4 hz-mb-4">
                  <div className="hz-row hz-ai-start hz-gap-3 hz-mb-4">
                    <div className="hz-sq-5 hz-r-full hz-bg-raised"></div>
                    <div>
                      <div className="hz-w-medium">Senior Developer</div>
                      <div className="hz-fg-muted hz-t-sm">2 hours ago</div>
                      <div className="hz-mt-2 hz-p-3 hz-bg-raised hz-r-lg">
                        <p>Could you add error handling to this component and improve the accessibility?</p>
                      </div>
                    </div>
                  </div>

                  <div className="hz-row hz-ai-start hz-gap-3">
                    <div className="hz-sq-5 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-t-xs hz-w-bold">H</div>
                    <div>
                      <div className="hz-w-medium">Hanzo Dev</div>
                      <div className="hz-fg-muted hz-t-sm">1 hour ago</div>
                      <div className="hz-mt-2 hz-p-3 hz-bg-raised hz-r-lg">
                        <p>I've added comprehensive error handling with try/catch blocks and implemented proper ARIA attributes to improve accessibility. The changes have been committed to the PR.</p>
                      </div>
                      <div className="hz-bg-raised hz-r-md hz-mt-3 hz-p-2 hz-t-sm hz-bordered">
                        <div className="hz-fg-muted">+ 15 lines added</div>
                        <div className="hz-fg-muted">- 3 lines removed</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hz-row hz-jc-between hz-ai-center hz-t-sm">
                  <div className="hz-row hz-ai-center hz-gap-2">
                    <div className="hz-sq-4 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-fg-inverse">✓</div>
                    <span className="hz-fg-muted">Changes approved</span>
                  </div>
                  <div className="hz-fg-muted">Ready to merge</div>
                </div>
              </div>
            </div>

            <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
            <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PRAgent;

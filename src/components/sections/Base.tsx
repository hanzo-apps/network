
import { motion } from "framer-motion";
import { Database, Lock, Zap, Cloud, Settings, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Base = () => {
  return (
    <section className="hz-py-7">
      <div className="hz-container hz-bg-surface">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="hz-align-center hz-mb-7"
        >
          <div className="hz-inline hz-ai-center hz-inline-2 hz-bg-surface hz-px-4 hz-py-1 hz-r-full hz-mb-5">
            <Database className="hz-sq-2 hz-fg-muted" />
            <span className="hz-t-sm hz-fg-muted">The Modern Backend Platform</span>
          </div>
          <h2 className="hz-t-4xl hz-display hz-fg hz-mb-4">Everything You Need to Build at Scale</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            A complete backend platform with authentication, database, file storage, and serverless functions—all in one place.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-2 hz-gap-6 hz-mb-7">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="hz-p-6 hz-r-lg hz-ring"
          >
            <h3 className="hz-t-2xl hz-w-semibold hz-fg hz-mb-5">One-Line Backend</h3>
            <div className="hz-bg-overlay hz-p-5 hz-r-lg hz-mb-5">
              <pre className="hz-t-sm hz-fg-soft">
                <code>{`import { createClient } from '@hanzo/base';

// Complete backend in one line
const client = createClient();`}</code>
              </pre>
            </div>
            <p className="hz-fg-soft">Get a complete backend with just one line of code. Includes database, auth, storage, and more.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="hz-grid hz-grid-2 hz-gap-4"
          >
            <div className="hz-p-5 hz-r-lg hz-ring">
              <Lock className="hz-sq-5 hz-fg-muted hz-mb-4" />
              <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Authentication</h4>
              <p className="hz-fg-soft">Multi-provider auth with social logins and enterprise SSO</p>
            </div>
            <div className="hz-p-5 hz-r-lg hz-ring">
              <Database className="hz-sq-5 hz-fg-muted hz-mb-4" />
              <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Database</h4>
              <p className="hz-fg-soft">Real-time database with powerful querying and indexing</p>
            </div>
            <div className="hz-p-5 hz-r-lg hz-ring">
              <Cloud className="hz-sq-5 hz-fg-muted hz-mb-4" />
              <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Storage</h4>
              <p className="hz-fg-soft">Secure file storage with CDN and image transformations</p>
            </div>
            <div className="hz-p-5 hz-r-lg hz-ring">
              <Settings className="hz-sq-5 hz-fg-muted hz-mb-4" />
              <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Functions</h4>
              <p className="hz-fg-soft">Serverless functions with automatic scaling</p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="hz-r-lg hz-p-6 hz-mb-7"
        >
          <div className="hz-grid hz-grid-2 hz-gap-6 hz-ai-center">
            <div>
              <h3 className="hz-t-2xl hz-w-semibold hz-fg hz-mb-4">Built for Scale</h3>
              <ul className="hz-stack-4">
                <li className="hz-row hz-ai-start hz-inline-3">
                  <Globe className="hz-sq-4 hz-fg-muted hz-mt-1" />
                  <div>
                    <h4 className="hz-fg hz-w-semibold">Global by Default</h4>
                    <p className="hz-fg-soft">Multi-region deployments with automatic failover</p>
                  </div>
                </li>
                <li className="hz-row hz-ai-start hz-inline-3">
                  <Zap className="hz-sq-4 hz-fg-muted hz-mt-1" />
                  <div>
                    <h4 className="hz-fg hz-w-semibold">Enterprise Ready</h4>
                    <p className="hz-fg-soft">SOC2, GDPR, and HIPAA compliant infrastructure</p>
                  </div>
                </li>
                <li className="hz-row hz-ai-start hz-inline-3">
                  <Settings className="hz-sq-4 hz-fg-muted hz-mt-1" />
                  <div>
                    <h4 className="hz-fg hz-w-semibold">Full Control</h4>
                    <p className="hz-fg-soft">Custom domains, edge functions, and more</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="hz-stack-4">
              <div className="hz-align-center">
                <p className="hz-fg-soft hz-mb-2">Starting at</p>
                <div className="hz-t-4xl hz-w-bold hz-fg hz-mb-2">$49</div>
                <p className="hz-fg-muted hz-mb-4">per month</p>
                <p className="hz-t-sm hz-fg-muted">Unlimited users & storage</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="hz-align-center">
          <Button className="hz-bg-raised hz-fg hz-px-6 hz-py-5 hz-t-lg hz-r-lg hz-hoverable">
            Start Building with Base
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Base;

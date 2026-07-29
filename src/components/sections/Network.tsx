
import { motion } from "framer-motion";
import { Globe, Server, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Network = () => {
  return (
    <section className="hz-py-7">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <div className="hz-inline hz-ai-center hz-inline-2 hz-bg-surface hz-px-4 hz-py-1 hz-r-full hz-mb-5">
            <Globe className="hz-sq-2 hz-fg" />
            <span className="hz-t-sm hz-fg">Decentralized Network</span>
          </div>
          <h2 className="hz-t-4xl hz-display hz-fg hz-mb-4">The Hanzo Network</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Join the decentralized AI network powering the next generation of autonomous applications.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-2 hz-gap-6 hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hz-p-6 hz-r-lg hz-ring"
          >
            <h3 className="hz-t-2xl hz-w-semibold hz-fg hz-mb-5">Connect to Network</h3>
            <div className="hz-bg-overlay hz-p-5 hz-r-lg hz-mb-5">
              <pre className="hz-t-sm hz-fg-soft">
                <code>{`import { connectNode } from '@hanzo/network';

// Join the network with one line
const node = connectNode();`}</code>
              </pre>
            </div>
            <p className="hz-fg-soft">Join the network with just one line of code. Access distributed computing and storage.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hz-grid hz-grid-2 hz-gap-4"
          >
            <div className="hz-p-5 hz-r-lg hz-ring">
              <Globe className="hz-sq-5 hz-fg hz-mb-4" />
              <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Global</h4>
              <p className="hz-fg-soft">Distributed across 100+ countries</p>
            </div>
            <div className="hz-p-5 hz-r-lg hz-ring">
              <Server className="hz-sq-5 hz-fg hz-mb-4" />
              <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Reliable</h4>
              <p className="hz-fg-soft">99.99% uptime guarantee</p>
            </div>
            <div className="hz-p-5 hz-r-lg hz-ring">
              <Shield className="hz-sq-5 hz-fg hz-mb-4" />
              <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Secure</h4>
              <p className="hz-fg-soft">End-to-end encryption</p>
            </div>
            <div className="hz-p-5 hz-r-lg hz-ring">
              <Zap className="hz-sq-5 hz-fg hz-mb-4" />
              <h4 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">Fast</h4>
              <p className="hz-fg-soft">Sub-second response times</p>
            </div>
          </motion.div>
        </div>

        <div className="hz-align-center">
          <Button 
            className="hz-bg-surface hz-fg hz-px-6 hz-py-5 hz-t-lg hz-r-lg hz-bordered hz-hoverable"
          >
            Join the Network
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Network;

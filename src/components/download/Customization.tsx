
import React from "react";
import { motion } from "framer-motion";
import { Settings, User, Laptop } from "lucide-react";

const Customization = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-wide">
        <motion.div 
          className="hz-grid hz-grid-3 hz-gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="hz-card">
            <User className="hz-sq-6 hz-fg-muted hz-mb-4" />
            <h3 className="hz-t-2xl hz-w-bold hz-mb-3 hz-fg">Customized to you</h3>
            <p className="hz-fg-soft">
              Use About Me to tell Hanzo things you want it to consider when it responds
            </p>
          </div>
          
          <div className="hz-card">
            <Laptop className="hz-sq-6 hz-fg-muted hz-mb-4" />
            <h3 className="hz-t-2xl hz-w-bold hz-mb-3 hz-fg">Sees files & context</h3>
            <p className="hz-fg-soft">
              Set up key shortcuts to quickly access your most-used interactions
            </p>
          </div>
          
          <div className="hz-card">
            <Settings className="hz-sq-6 hz-fg-muted hz-mb-4" />
            <h3 className="hz-t-2xl hz-w-bold hz-mb-3 hz-fg">Grounded using screen data</h3>
            <p className="hz-fg-soft">
              We ground your requests in the context of your screen
            </p>
          </div>
        </motion.div>
        
        <div className="hz-grid hz-grid-2 hz-gap-6 hz-mt-7">
          <motion.div 
            className="hz-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="hz-t-2xl hz-w-bold hz-mb-3 hz-fg">Mix Modalities</h3>
            <p className="hz-fg-soft">
              Apply feedback from your last meeting to your code
            </p>
          </motion.div>
          
          <motion.div 
            className="hz-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="hz-t-2xl hz-w-bold hz-mb-3 hz-fg">Generate in-context code anywhere</h3>
            <p className="hz-fg-soft">
              Create code snippets in any application with the power of Hanzo
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Customization;

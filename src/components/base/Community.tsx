
import React from "react";
import { motion } from "framer-motion";
import { Github, Twitter, MessagesSquare, Facebook, Linkedin, Instagram } from "lucide-react";

const Community = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-wide hz-align-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="hz-t-2xl hz-w-semibold hz-fg hz-mb-5">
            Join our Developer Community
          </h2>
          
          <div className="hz-row hz-wrap hz-jc-center hz-gap-4">
            <a 
              href="https://github.com/hanzoai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hz-btn hz-transition"
            >
              <Github className="hz-sq-3 hz-mr-2 hz-fg" />
              <span className="hz-fg">GitHub</span>
            </a>
            <a 
              href="https://discord.gg/XthHQQj" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hz-btn hz-transition"
            >
              <MessagesSquare className="hz-sq-3 hz-mr-2 hz-fg" />
              <span className="hz-fg">Discord</span>
            </a>
            <a 
              href="https://twitter.com/hanzoai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hz-btn hz-transition"
            >
              <Twitter className="hz-sq-3 hz-mr-2 hz-fg" />
              <span className="hz-fg">Twitter</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Community;

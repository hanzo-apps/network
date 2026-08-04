
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, BookOpen, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
      {/* Background elements */}
      <div className="hz-abs hz-top-0 hz-left-0 hz-w-full hz-h-full hz-clip hz-no-pointer">
        <div className="hz-abs hz-top-0 hz-left-0 hz-bg-raised hz-r-full hz-blur-bg"></div>
        <div className="hz-abs hz-bottom-0 hz-right-0 hz-w-full hz-bg-raised hz-r-full hz-blur-bg"></div>
      </div>

      <div className="hz-container hz-rel hz-z-raised">
        <div className="hz-container-narrow hz-col hz-ai-center hz-align-center hz-mb-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
              Start Building the Future of AI
            </h2>
            <p className="hz-t-xl hz-fg-soft hz-mb-6">
              Join thousands of developers and companies who are building intelligent, 
              scalable applications with Hanzo's AI Engineering Platform
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hz-col-row hz-gap-4"
          >
            <Button size="lg" className="hz-bg-raised hz-hoverable">
              Get Started Free
              <ArrowRight className="hz-sq-2 hz-ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="hz-fg">
              Schedule a Demo
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hz-grid hz-grid-3 hz-gap-6"
        >
          <div className="hz-card hz-transition hz-card-interactive">
            <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-5">
              <BookOpen className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-3">Documentation</h3>
            <p className="hz-fg-muted hz-mb-5">
              Comprehensive guides, tutorials, and API references to help you build with Hanzo AI.
            </p>
            <a href="#" className="hz-row hz-ai-center hz-fg-muted hz-link">
              Explore Docs
              <ArrowRight className="hz-sq-2 hz-ml-2 hz-transition" />
            </a>
          </div>

          <div className="hz-card hz-transition hz-card-interactive">
            <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-5">
              <Code className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-3">Quickstart</h3>
            <p className="hz-fg-muted hz-mb-5">
              Get up and running quickly with our step-by-step quickstart guides and example projects.
            </p>
            <a href="#" className="hz-row hz-ai-center hz-fg-muted hz-link">
              Try Quickstart
              <ArrowRight className="hz-sq-2 hz-ml-2 hz-transition" />
            </a>
          </div>

          <div className="hz-card hz-transition hz-card-interactive">
            <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-5">
              <MessageCircle className="hz-sq-4 hz-fg-muted" />
            </div>
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-3">Community</h3>
            <p className="hz-fg-muted hz-mb-5">
              Join our growing community of AI engineers, get support, and share your experiences.
            </p>
            <a href="#" className="hz-row hz-ai-center hz-fg-muted hz-link">
              Join Community
              <ArrowRight className="hz-sq-2 hz-ml-2 hz-transition" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hz-card hz-mt-7"
        >
          <div className="hz-col-row hz-ai-center hz-jc-between">
            <div className="hz-mb-5">
              <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-2">Ready to get started?</h3>
              <p className="hz-fg-soft">Sign up for free and start building with Hanzo AI today.</p>
            </div>
            <div className="hz-col-row hz-gap-4">
              <Button size="lg" className="hz-bg-raised hz-hoverable">
                Create Free Account
              </Button>
              <Button size="lg" variant="outline" className="hz-fg">
                Contact Sales
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;

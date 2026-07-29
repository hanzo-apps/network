
import { motion } from "framer-motion";
import { Users, MessageSquare, BarChart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const CRM = () => {
  return (
    <section className="hz-py-7 hz-bg hz-rel hz-clip">
      <div className="hz-abs hz-inset" />
      
      <div className="hz-container hz-rel hz-z-raised">
        <div className="hz-align-center hz-mb-7">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-t-3xl hz-w-bold hz-fg hz-mb-4"
          >
            Hanzo CRM
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted"
          >
            Streamline your customer relationships with AI-powered insights and automation
          </motion.p>
        </div>

        <div className="hz-grid hz-grid-4 hz-gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hz-bg-surface hz-glass hz-p-5 hz-r-lg hz-ring hz-transition"
          >
            <Users className="hz-sq-7 hz-fg-muted hz-mb-4" />
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">Contact Management</h3>
            <p className="hz-fg-muted">Organize and track customer interactions with AI-enhanced contact profiles</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hz-bg-surface hz-glass hz-p-5 hz-r-lg hz-ring hz-transition"
          >
            <MessageSquare className="hz-sq-7 hz-fg-muted hz-mb-4" />
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">Smart Communication</h3>
            <p className="hz-fg-muted">Automated messaging and follow-ups powered by contextual AI understanding</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hz-bg-surface hz-glass hz-p-5 hz-r-lg hz-ring hz-transition"
          >
            <BarChart className="hz-sq-7 hz-fg-muted hz-mb-4" />
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">Analytics Dashboard</h3>
            <p className="hz-fg-muted">Real-time insights and predictive analytics to optimize customer relationships</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hz-bg-surface hz-glass hz-p-5 hz-r-lg hz-ring hz-transition"
          >
            <Calendar className="hz-sq-7 hz-fg-muted hz-mb-4" />
            <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">Smart Scheduling</h3>
            <p className="hz-fg-muted">AI-powered meeting scheduling and follow-up management</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="hz-mt-7 hz-align-center"
        >
          <Button
            size="lg"
            className="hz-bg-inverse hz-fg-inverse hz-hoverable"
          >
            <a href="https://console.hanzo.ai/crm">Try Hanzo CRM</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CRM;

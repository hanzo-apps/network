import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";


const faqs = [
  {
    question: "Can I try Hanzo AI Enterprise before committing?",
    answer: "We offer generous credits for teams at large enterprises to experiment with the Hanzo Agent before committing. Contact our sales team to get started with a trial.",
  },
  {
    question: "Can Hanzo AI be deployed on-premise?",
    answer: "Yes, Hanzo AI supports self-hosted and air-gapped deployment options. Our enterprise plan includes on-premise deployment support with full security compliance.",
  },
  {
    question: "What integrations are available?",
    answer: "Hanzo Dev integrates with 500+ tools including GitHub, GitLab, Slack, VS Code, JetBrains IDEs, and all major cloud providers. Check our automations page for the full list.",
  },
  {
    question: "Do you offer volume discounts for large teams?",
    answer: "Yes, we offer competitive volume discounts for teams of 50+ members. Contact our sales team for custom enterprise pricing.",
  },
  {
    question: "What support response times can we expect?",
    answer: "Enterprise customers receive priority support with response times under 4 hours. Pro and Max plan customers receive support within 24 hours.",
  },
  {
    question: "How does Hanzo AI ensure code privacy?",
    answer: "Your code never leaves your environment. Hanzo Dev runs locally with end-to-end encryption. For enterprise deployments, we offer complete data isolation and SOC 2 compliance.",
  },
];

const FAQItem = ({ faq, isOpen, onClick }: { faq: typeof faqs[0]; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="hz-border-b">
      <button
        onClick={onClick}
        className="hz-w-full hz-py-5 hz-row hz-ai-center hz-jc-between hz-align-left"
      >
        <span className="hz-t-lg hz-fg hz-transition hz-px-4 hz-hoverable">
          {faq.question}
        </span>
        <ChevronDown
          className={`hz-sq-3 hz-fg-muted hz-transition hz-none ${
            isOpen ? "" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="hz-clip"
          >
            <p className="hz-pb-6 hz-fg-muted hz-leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Frequently Asked{" "}
            <span className="hz-fg" >Questions</span>
          </h2>
          <p className="hz-fg-muted">
            Looking for something in particular?{" "}
            <Link to="/contact" className="hz-fg" >
              Don't hesitate to reach out.
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-border-t"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

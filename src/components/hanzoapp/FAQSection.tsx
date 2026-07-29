import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";


const faqs = [
  {
    question: "What's the difference between web and desktop?",
    answer: "The web app runs in your browser with cloud sync, perfect for quick access from any device. The desktop app is a native application with offline support, faster performance, and deeper system integrations like file watchers and terminal access.",
  },
  {
    question: "How does Local AI mode work?",
    answer: "Local AI mode runs models entirely on your machine using your GPU. We support Qwen3, Llama, and other open models. Your code and prompts never leave your computer - perfect for sensitive projects or air-gapped environments.",
  },
  {
    question: "What is Hanzo Node?",
    answer: "Hanzo Node lets you contribute compute to the decentralized network and earn LUX tokens. Your node validates AI inferences and participates in Proof of AI consensus. It's optional - you can use Hanzo without running a node.",
  },
  {
    question: "Can I switch between modes?",
    answer: "Yes! Your workspace syncs across all modes when connected. Start on web, continue on desktop, run sensitive tasks locally, and your history follows you. Node mode runs in the background regardless of which interface you use.",
  },
  {
    question: "What models are supported?",
    answer: "Cloud mode supports 100+ models including GPT-4o, Claude, Gemini, and more. Local mode supports Qwen3 (8B-72B), Llama 3, Mistral, and other open models that run on consumer hardware.",
  },
  {
    question: "Is my code private?",
    answer: "In Local AI mode, absolutely - nothing leaves your machine. In cloud mode, we never train on your code and offer SOC 2 compliance, E2E encryption, and enterprise data isolation options.",
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
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Frequently asked questions
          </h2>
          <p className="hz-fg-muted">
            Have another question?{" "}
            <Link to="/contact" className="hz-fg" >
              Contact us
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

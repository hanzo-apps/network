
import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What platforms does the Hanzo desktop app support?",
      answer: "Currently, the Hanzo desktop app supports macOS (both Apple Silicon and Intel) and Windows. Mobile support for iOS and Android is coming soon. We also offer browser extensions for Chrome, Firefox, and Edge, as well as a VS Code extension."
    },
    {
      question: "How do the browser extensions differ from the desktop app?",
      answer: "The browser extensions provide core Hanzo functionality within your browser, while the desktop app offers system-wide capabilities including screen capture, voice commands, and integration with all applications on your computer. For the most complete experience, we recommend using the desktop app."
    },
    {
      question: "Is my data kept private?",
      answer: "Yes, your data privacy is our priority. Audio transcription and screen captures are processed locally on your device whenever possible, and we maintain strict data protection policies for any cloud processing."
    },
    {
      question: "How do I get started with the desktop app?",
      answer: "Simply download the appropriate version for your operating system, run the installer, and follow the on-screen instructions. The app will guide you through the initial setup process."
    },
    {
      question: "Can I use the desktop app offline?",
      answer: "Some features are available offline, but full functionality requires an internet connection for AI processing and integration with cloud services."
    },
    {
      question: "Do I need a subscription to use the desktop app?",
      answer: "The basic features of the desktop app are free to use. Premium features require a Hanzo subscription, which you can manage through your account settings."
    },
    {
      question: "How does the VS Code extension work with Hanzo?",
      answer: "The Hanzo VS Code extension brings AI-powered code assistance directly into your development environment. It works alongside the desktop app to provide contextual code generation, refactoring, and documentation based on your project context."
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-narrow">
        <motion.div
          className="hz-align-center hz-mb-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4 hz-fg">
            Common Questions
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="hz-stack-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="hz-bordered hz-r-lg hz-clip hz-bg-surface"
              >
                <AccordionTrigger className="hz-px-5 hz-py-4 hz-align-left hz-t-lg hz-w-medium hz-fg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="hz-px-5 hz-pb-4 hz-fg-soft">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;

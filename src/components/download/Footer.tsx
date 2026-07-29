
import React from "react";
import { motion } from "framer-motion";

const FooterSection = ({ title, links }: { title: string; links: string[] }) => (
  <div>
    <h3 className="hz-fg hz-w-semibold hz-mb-3">{title}</h3>
    <ul className="hz-stack-2">
      {links.map((link, index) => (
        <li key={index}>
          <a href={link === "Discord Server" ? "https://discord.gg/XthHQQj" : "#"} className="hz-fg-muted hz-t-sm hz-link">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const DownloadFooter = () => {
  const usefulLinks = ["Discord Server"];
  const resources = ["Support"];
  const contact = ["Developer Docs"];
  const legal = ["Terms & Service", "Privacy Policy"];
  const promptLibrary = [
    "Discover Prompts for Hanzo AI",
    "Writing prompts",
    "Essay prompts",
    "Business prompts"
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg-overlay hz-border-t">
      <div className="hz-container-wide">
        <motion.div 
          className="hz-grid hz-grid-5 hz-gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <FooterSection title="Useful Links" links={usefulLinks} />
          <FooterSection title="Resources" links={resources} />
          <FooterSection title="Contact" links={contact} />
          <FooterSection title="Legal Information" links={legal} />
          <FooterSection title="Prompt Library" links={promptLibrary} />
        </motion.div>
        
        <div className="hz-mt-7 hz-pt-6 hz-border-t hz-align-center hz-fg-muted hz-t-sm">
          © 2025 Hanzo AI. All rights reserved. Not associated with or endorsed by ChatGPT, Perplexity, or Claude.
        </div>
      </div>
    </section>
  );
};

export default DownloadFooter;

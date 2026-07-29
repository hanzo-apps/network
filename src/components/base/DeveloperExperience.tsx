
import React from "react";
import { motion } from "framer-motion";
import { Code, Command, BookOpen, Users } from "lucide-react";

const DeveloperExperience = () => {
  const features = [
    {
      icon: Command,
      title: "Comprehensive CLI Tools",
      description: "Powerful CLI for scaffolding, deploying, and managing applications with simple commands."
    },
    {
      icon: Code,
      title: "Rich SDKs & Libraries",
      description: "SDKs supporting JavaScript, React, Ruby, Node, Flutter, and more for seamless integration."
    },
    {
      icon: Users,
      title: "Project Management Dashboard",
      description: "Full project lifecycle management directly from the Hanzo Base dashboard."
    },
    {
      icon: BookOpen,
      title: "Extensive Documentation",
      description: "Detailed documentation, community-driven examples, and best practices to accelerate development."
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container">
        <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hz-stack-6"
          >
            <h2 className="hz-t-3xl hz-w-bold hz-fg">Developer Experience</h2>
            <p className="hz-t-xl hz-fg-soft">
              Designed for developers who value simplicity, flexibility, and power.
              Our tools make database and backend development a breeze.
            </p>
            
            <div className="hz-stack-5">
              {features.map((feature, index) => (
                <div key={index} className="hz-row">
                  <div className="hz-none hz-mt-1">
                    <div className="hz-sq-6 hz-row hz-ai-center hz-jc-center hz-r-md hz-bg-raised hz-fg-muted">
                      <feature.icon className="hz-sq-4" />
                    </div>
                  </div>
                  <div className="hz-ml-4">
                    <h3 className="hz-t-lg hz-w-medium hz-fg">{feature.title}</h3>
                    <p className="hz-mt-1 hz-fg-soft">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className=""
          >
            <div className="hz-bg-surface hz-r-lg hz-bordered hz-p-1 hz-shadow-lg hz-clip">
              <div className="hz-btn">
                <div className="hz-row hz-inline-2">
                  <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                  <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                  <div className="hz-sq-1 hz-r-full hz-bg-raised"></div>
                </div>
                <div className="hz-mx-auto hz-fg-muted hz-t-sm">Terminal</div>
              </div>
              <div className="hz-bg-surface hz-p-4 hz-clip">
                <div className="hz-mono hz-t-sm">
                  <p className="hz-fg-muted hz-mb-2">$ npx create-hanzo-app my-project</p>
                  <p className="hz-fg-muted hz-mb-2">Initializing Hanzo Base project...</p>
                  <p className="hz-fg-muted hz-mb-2">$ cd my-project && npm run dev</p>
                  <p className="hz-fg-muted hz-mb-2">✓ Hanzo Base server started on http://localhost:3000</p>
                  <p className="hz-fg-muted hz-mb-2">✓ Admin UI available at http://localhost:3000/admin</p>
                  <p className="hz-fg-muted hz-mb-2">$ hanzo deploy</p>
                  <p className="hz-fg-muted">✓ Project deployed to https://my-project.hanzo.app</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperExperience;

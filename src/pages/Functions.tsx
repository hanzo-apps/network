
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Code, Terminal, Database, Server, Cpu, Network, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ChromeText from "@/components/ui/chrome-text";

const Functions = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hz-py-7 hz-rel">
        <div className="hz-abs hz-inset"></div>
        <div className="hz-container hz-rel hz-z-raised">
          <div className="hz-container-narrow hz-align-center hz-mb-7">
            <div className="hz-bg-raised hz-bordered hz-border-strong hz-r-full hz-px-4 hz-py-1 hz-mb-4">
              <span className="hz-fg-muted hz-t-sm hz-w-medium">Serverless Computing</span>
            </div>
            <h1 className="hz-t-4xl hz-w-bold hz-mb-5 hz-chrome">
              Hanzo Functions
            </h1>
            <p className="hz-t-xl hz-fg-soft hz-mb-6">
              Serverless function execution for any workload. Deploy code in seconds without managing infrastructure.
            </p>
            <div className="hz-col-row hz-gap-4 hz-jc-center">
              <Button className="hz-bg-raised hz-fg hz-px-6 hz-py-5 hz-t-lg hz-hoverable">
                Get Started
              </Button>
              <Button variant="outline" className="hz-border-strong hz-fg hz-px-6 hz-py-5 hz-t-lg hz-hoverable">
                View Documentation
              </Button>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="hz-card hz-rel hz-clip">
            <div className="hz-abs hz-inset hz-bg-surface"></div>
            <pre className="hz-card hz-t-sm hz-scroll-x">
              <code className="hz-fg-soft">
                <span className="hz-fg-muted">export</span> <span className="hz-fg-muted">async function</span> <span className="hz-fg-muted">handler</span><span className="hz-fg">(req, res) {'{'}</span>
                <br/>
                <span className="hz-ml-4">// Process incoming data</span>
                <br/>
                <span className="hz-ml-4 hz-fg-muted">const</span> <span className="hz-fg">{'{'} data {'}'} = </span><span className="hz-fg-muted">await</span> <span className="hz-fg">req.json();</span>
                <br/>
                <span className="hz-ml-4 hz-fg-muted">const</span> <span className="hz-fg">result = </span><span className="hz-fg-muted">await</span> <span className="hz-fg-muted">processData</span><span className="hz-fg">(data);</span>
                <br/>
                <br/>
                <span className="hz-ml-4">// Return JSON response</span>
                <br/>
                <span className="hz-ml-4 hz-fg-muted">return</span> <span className="hz-fg">Response.json({'{'}</span>
                <br/>
                <span className="hz-ml-4">success: <span className="hz-fg-muted">true</span>,</span>
                <br/>
                <span className="hz-ml-4">data: result</span>
                <br/>
                <span className="hz-ml-4 hz-fg">{'}'})</span>
                <br/>
                <span className="hz-fg">{'}'}</span>
              </code>
            </pre>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="hz-py-7 hz-rel">
        <div className="hz-container">
          <div className="hz-align-center hz-mb-7">
            <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-4">
              Key Features & Capabilities
            </ChromeText>
            <p className="hz-container-narrow hz-t-xl hz-fg-soft">
              Deploy serverless functions that scale automatically and only run when needed
            </p>
          </div>
          
          <div className="hz-grid hz-grid-3 hz-gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="hz-card"
            >
              <Code className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Multi-Language Support</h3>
              <p className="hz-fg-soft">
                Write functions in JavaScript, TypeScript, Python, Go, or Rust with native runtime support.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="hz-card"
            >
              <Terminal className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Zero Cold Starts</h3>
              <p className="hz-fg-soft">
                Our intelligent prediction system keeps functions warm for instant execution.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="hz-card"
            >
              <Database className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Native Database Access</h3>
              <p className="hz-fg-soft">
                Seamless integration with Hanzo Datastore and Vector for persistent storage.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="hz-card"
            >
              <Server className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Edge Deployment</h3>
              <p className="hz-fg-soft">
                Deploy to 200+ global edge locations for ultra-low latency responses.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="hz-card"
            >
              <Network className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Event-Driven Architecture</h3>
              <p className="hz-fg-soft">
                Trigger functions from HTTP requests, webhooks, schedules, or database changes.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="hz-card"
            >
              <Shield className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Security & Isolation</h3>
              <p className="hz-fg-soft">
                Each function runs in an isolated environment with configurable permissions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Use Cases */}
      <section className="hz-py-7">
        <div className="hz-container">
          <div className="hz-align-center hz-mb-7">
            <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-4">
              Common Use Cases
            </ChromeText>
            <p className="hz-container-narrow hz-t-xl hz-fg-soft">
              Hanzo Functions powers a wide range of serverless applications
            </p>
          </div>
          
          <div className="hz-grid hz-grid-2 hz-gap-6">
            <div className="hz-card">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">API Backends</h3>
              <p className="hz-fg-soft hz-mb-4">
                Build complete REST or GraphQL APIs with automatic scaling and no server management.
              </p>
              <ul className="hz-stack-2 hz-fg-soft">
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Custom middleware for authentication and validation</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>API versioning and documentation generation</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Automatic OpenAPI schema generation</span>
                </li>
              </ul>
            </div>
            
            <div className="hz-card">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Real-time Processing</h3>
              <p className="hz-fg-soft hz-mb-4">
                Process events in real-time with automatic scaling for traffic spikes.
              </p>
              <ul className="hz-stack-2 hz-fg-soft">
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Webhook handlers for third-party services</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Event-driven data transformation and enrichment</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Real-time analytics processing</span>
                </li>
              </ul>
            </div>
            
            <div className="hz-card">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">AI/ML Inference</h3>
              <p className="hz-fg-soft hz-mb-4">
                Deploy machine learning models for inference with built-in GPU acceleration.
              </p>
              <ul className="hz-stack-2 hz-fg-soft">
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Image and text classification</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>AI chatbots and virtual assistants</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Real-time recommendations</span>
                </li>
              </ul>
            </div>
            
            <div className="hz-card">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Scheduled Tasks</h3>
              <p className="hz-fg-soft hz-mb-4">
                Run tasks on a schedule without maintaining a dedicated server.
              </p>
              <ul className="hz-stack-2 hz-fg-soft">
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Periodic data cleanup and maintenance</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Scheduled reports and notifications</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Recurring data integration and ETL processes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="hz-py-7">
        <div className="hz-container-wide">
          <div className="hz-card">
            <div className="hz-align-center">
              <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Ready to Build?</h2>
              <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
                Get started with Hanzo Functions today and deploy your first serverless function in minutes.
              </p>
              <div className="hz-col-row hz-gap-4 hz-jc-center">
                <Button className="hz-bg-raised hz-fg hz-px-6 hz-py-5 hz-t-lg hz-hoverable">
                  Sign Up Free
                </Button>
                <Button variant="outline" className="hz-border-strong hz-fg hz-px-6 hz-py-5 hz-t-lg hz-hoverable">
                  Read Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Functions;

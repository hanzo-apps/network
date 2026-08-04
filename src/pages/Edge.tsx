
import React from 'react';
import { motion } from "framer-motion";
import { Zap, Globe, Network, Server, Cloud, Code, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ChromeText from "@/components/ui/chrome-text";

const Edge = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hz-py-7 hz-rel">
        <div className="hz-abs hz-inset"></div>
        <div className="hz-container hz-rel hz-z-raised">
          <div className="hz-container-narrow hz-align-center hz-mb-7">
            <div className="hz-bg-raised hz-bordered hz-border-strong hz-r-full hz-px-4 hz-py-1 hz-mb-4">
              <span className="hz-fg-muted hz-t-sm hz-w-medium">Ultra-Low Latency</span>
            </div>
            <h1 className="hz-t-4xl hz-w-bold hz-mb-5 hz-chrome">
              Hanzo Edge
            </h1>
            <p className="hz-t-xl hz-fg-soft hz-mb-6">
              Deploy globally in milliseconds with ultra-low latency edge computing infrastructure.
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
            <div className="hz-grid hz-grid-3 hz-gap-5">
              <div className="hz-card hz-col hz-ai-center">
                <Globe className="hz-sq-6 hz-fg-muted hz-mb-4" />
                <h3 className="hz-t-lg hz-w-semibold hz-mb-2">Global Network</h3>
                <p className="hz-align-center hz-fg-soft">Deploy to 200+ locations worldwide in seconds</p>
              </div>
              
              <div className="hz-card hz-col hz-ai-center">
                <Zap className="hz-sq-6 hz-fg-muted hz-mb-4" />
                <h3 className="hz-t-lg hz-w-semibold hz-mb-2">Ultra-Low Latency</h3>
                <p className="hz-align-center hz-fg-soft">Sub-50ms response times for 99% of global users</p>
              </div>
              
              <div className="hz-card hz-col hz-ai-center">
                <Network className="hz-sq-6 hz-fg-muted hz-mb-4" />
                <h3 className="hz-t-lg hz-w-semibold hz-mb-2">Built-in CDN</h3>
                <p className="hz-align-center hz-fg-soft">Integrated caching and content delivery</p>
              </div>
            </div>
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
              Powerful edge computing infrastructure for modern applications
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
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Edge Functions</h3>
              <p className="hz-fg-soft">
                Run serverless functions at the edge with zero cold starts and automatic scaling.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="hz-card"
            >
              <Cloud className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Edge Caching</h3>
              <p className="hz-fg-soft">
                Intelligent caching strategies with automatic invalidation and stale-while-revalidate.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="hz-card"
            >
              <Server className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">AI at the Edge</h3>
              <p className="hz-fg-soft">
                Run AI inference at the edge with optimized runtimes for major ML frameworks.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="hz-card"
            >
              <Globe className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Global Network</h3>
              <p className="hz-fg-soft">
                Deploy to 200+ locations worldwide with automatic regional failover and load balancing.
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
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Real-time WebSockets</h3>
              <p className="hz-fg-soft">
                Build real-time applications with globally distributed WebSocket infrastructure.
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
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Security & DDoS Protection</h3>
              <p className="hz-fg-soft">
                Built-in security with firewall rules, DDoS protection, and bot mitigation.
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
              Hanzo Edge powers a wide range of modern applications
            </p>
          </div>
          
          <div className="hz-grid hz-grid-2 hz-gap-6">
            <div className="hz-card">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Dynamic Web Applications</h3>
              <p className="hz-fg-soft hz-mb-4">
                Build and deploy web applications that respond dynamically to user input and data changes.
              </p>
              <ul className="hz-stack-2 hz-fg-soft">
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>E-commerce platforms with personalized recommendations</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Content sites with dynamic rendering based on user location</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>SaaS applications with global user bases</span>
                </li>
              </ul>
            </div>
            
            <div className="hz-card">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">API Gateways & Backends</h3>
              <p className="hz-fg-soft hz-mb-4">
                Create scalable API gateways and backends that handle authentication, routing, and transformation.
              </p>
              <ul className="hz-stack-2 hz-fg-soft">
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>API proxies with rate limiting and caching</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Microservices orchestration and routing</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Webhook receivers and event processors</span>
                </li>
              </ul>
            </div>
            
            <div className="hz-card">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Real-time Applications</h3>
              <p className="hz-fg-soft hz-mb-4">
                Build collaborative and real-time applications with WebSockets and server-sent events.
              </p>
              <ul className="hz-stack-2 hz-fg-soft">
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Collaborative document editing</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Live chat and messaging applications</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Real-time dashboards and analytics</span>
                </li>
              </ul>
            </div>
            
            <div className="hz-card">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">AI-powered Applications</h3>
              <p className="hz-fg-soft hz-mb-4">
                Deploy AI models at the edge for fast inference and personalized experiences.
              </p>
              <ul className="hz-stack-2 hz-fg-soft">
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Content moderation and filtering</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Recommendation engines with low latency</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Image and video processing at the edge</span>
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
              <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Deploy Globally in Seconds</h2>
              <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
                Get started with Hanzo Edge today and experience ultra-low latency computing at the edge.
              </p>
              <div className="hz-col-row hz-gap-4 hz-jc-center">
                <Button className="hz-bg-raised hz-fg hz-px-6 hz-py-5 hz-t-lg hz-hoverable">
                  Sign Up Free
                </Button>
                <Button variant="outline" className="hz-border-strong hz-fg hz-px-6 hz-py-5 hz-t-lg hz-hoverable">
                  Contact Sales
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

export default Edge;

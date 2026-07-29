
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Briefcase, Database, BookOpen, Linkedin, Github, Twitter } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";
import { Toaster } from "@/components/ui/toaster";

const Leadership = () => {
  return (
    <div className="hz-min-h-screen hz-bg">
      <Helmet>
        <title>Leadership - Hanzo AI</title>
        <meta name="description" content="Meet the leadership team at Hanzo AI, a Techstars company founded in 2013 to democratize access to AI." />
      </Helmet>
      <Navbar />
      <main>
        <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
          <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
          <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
          
          <div className="hz-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hz-align-center hz-mb-7"
            >
              <div className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-5">
                Founded in 2013 • Techstars Company
              </div>
              <ChromeText 
                as="h1" 
                className="hz-t-4xl hz-w-bold hz-mb-5"
              >
                Our Leadership
              </ChromeText>
              <p className="hz-container-narrow hz-t-xl hz-fg-soft">
                Meet the team behind Hanzo AI, founded in 2013 to democratize access to Amazon-level AI infrastructure for everyone.
              </p>
            </motion.div>
            
            <div className="hz-grid hz-grid-2 hz-gap-7 hz-mb-7">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="hz-card"
              >
                <div className="hz-col-row hz-mb-5">
                  <div className="hz-sq-8 hz-r-lg hz-bg-raised hz-mb-4"></div>
                  <div>
                    <h2 className="hz-t-2xl hz-w-bold hz-mb-1">Michael Kelling</h2>
                    <p className="hz-fg-muted hz-w-medium hz-mb-4">Chief Executive Officer</p>
                    <p className="hz-fg-soft hz-mb-5">
                      As CEO, Michael leads Hanzo's mission to democratize access to AI with a focus on sustainable, responsible technology that empowers developers worldwide.
                    </p>
                    <div className="hz-row hz-inline-3">
                      <a href="https://linkedin.com/company/hanzo-ai" target="_blank" rel="noopener noreferrer" className="hz-p-2 hz-r-full hz-bg-raised hz-transition hz-hoverable">
                        <Linkedin className="hz-sq-3 hz-fg-soft" />
                      </a>
                      <a href="https://twitter.com/hanzoai" target="_blank" rel="noopener noreferrer" className="hz-p-2 hz-r-full hz-bg-raised hz-transition hz-hoverable">
                        <Twitter className="hz-sq-3 hz-fg-soft" />
                      </a>
                      <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="hz-p-2 hz-r-full hz-bg-raised hz-transition hz-hoverable">
                        <Github className="hz-sq-3 hz-fg-soft" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="hz-row hz-wrap hz-gap-3 hz-mt-4">
                  <div className="hz-row hz-ai-center hz-t-sm hz-px-3 hz-py-1 hz-bg-raised hz-r-full">
                    <Briefcase className="hz-sq-2 hz-mr-2 hz-fg-muted" />
                    <span>20+ years experience</span>
                  </div>
                  <div className="hz-row hz-ai-center hz-t-sm hz-px-3 hz-py-1 hz-bg-raised hz-r-full">
                    <Database className="hz-sq-2 hz-mr-2 hz-fg-muted" />
                    <span>AI Infrastructure</span>
                  </div>
                  <div className="hz-row hz-ai-center hz-t-sm hz-px-3 hz-py-1 hz-bg-raised hz-r-full">
                    <BookOpen className="hz-sq-2 hz-mr-2 hz-fg-muted" />
                    <span>3x Startup Founder</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hz-card"
              >
                <div className="hz-col-row hz-mb-5">
                  <div className="hz-sq-8 hz-r-lg hz-bg-raised hz-mb-4"></div>
                  <div>
                    <h2 className="hz-t-2xl hz-w-bold hz-mb-1">Sarah Chen</h2>
                    <p className="hz-fg-muted hz-w-medium hz-mb-4">Chief Technology Officer</p>
                    <p className="hz-fg-soft hz-mb-5">
                      Sarah drives Hanzo's technical vision and engineering culture, bringing expertise from her background at leading AI research labs and tech companies.
                    </p>
                    <div className="hz-row hz-inline-3">
                      <a href="https://linkedin.com/company/hanzo-ai" target="_blank" rel="noopener noreferrer" className="hz-p-2 hz-r-full hz-bg-raised hz-transition hz-hoverable">
                        <Linkedin className="hz-sq-3 hz-fg-soft" />
                      </a>
                      <a href="https://twitter.com/hanzoai" target="_blank" rel="noopener noreferrer" className="hz-p-2 hz-r-full hz-bg-raised hz-transition hz-hoverable">
                        <Twitter className="hz-sq-3 hz-fg-soft" />
                      </a>
                      <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="hz-p-2 hz-r-full hz-bg-raised hz-transition hz-hoverable">
                        <Github className="hz-sq-3 hz-fg-soft" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="hz-row hz-wrap hz-gap-3 hz-mt-4">
                  <div className="hz-row hz-ai-center hz-t-sm hz-px-3 hz-py-1 hz-bg-raised hz-r-full">
                    <Briefcase className="hz-sq-2 hz-mr-2 hz-fg-muted" />
                    <span>15+ years experience</span>
                  </div>
                  <div className="hz-row hz-ai-center hz-t-sm hz-px-3 hz-py-1 hz-bg-raised hz-r-full">
                    <Database className="hz-sq-2 hz-mr-2 hz-fg-muted" />
                    <span>ML Systems</span>
                  </div>
                  <div className="hz-row hz-ai-center hz-t-sm hz-px-3 hz-py-1 hz-bg-raised hz-r-full">
                    <BookOpen className="hz-sq-2 hz-mr-2 hz-fg-muted" />
                    <span>Ph.D. in Computer Science</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="hz-align-center">
              <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Join Our Team</h2>
              <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
                We're always looking for talented individuals who are passionate about AI and building the future of technology.
              </p>
              <Button size="lg" className="hz-bg-raised hz-hoverable">
                View Open Positions
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Leadership;

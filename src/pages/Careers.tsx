
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Briefcase, Globe, Clock, MapPin, Users, Sparkles } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";
import { Toaster } from "@/components/ui/toaster";

const jobOpenings = [
  {
    title: "AI/ML Research Engineer",
    location: "Remote / SF",
    type: "Full-time",
    department: "AI Research",
    description: "Work on foundational models, fine-tuning, and novel architectures. Experience with transformers, RLHF, and distributed training required."
  },
  {
    title: "Compiler Engineer",
    location: "Remote",
    type: "Full-time",
    department: "Engineering",
    description: "Build high-performance inference engines and model compilers. Experience with LLVM, MLIR, or similar frameworks preferred."
  },
  {
    title: "MCP Protocol Engineer",
    location: "Remote",
    type: "Full-time",
    department: "Infrastructure",
    description: "Design and implement Model Context Protocol servers and tooling. Shape the future of AI agent infrastructure."
  },
  {
    title: "Cryptography Engineer (ZKP)",
    location: "Remote",
    type: "Full-time",
    department: "Blockchain",
    description: "Implement zero-knowledge proofs for AI verification and on-chain compute. Experience with SNARKs/STARKs required."
  },
  {
    title: "Quantum Computing Researcher",
    location: "Remote / Research",
    type: "Full-time",
    department: "Research",
    description: "Explore quantum ML algorithms and post-quantum cryptography. PhD or equivalent research experience preferred."
  },
  {
    title: "Robotics Systems Engineer",
    location: "SF Bay Area",
    type: "Full-time",
    department: "Robotics",
    description: "Build AI systems for real-time robotic control. Experience with ROS, computer vision, and embedded systems required."
  },
  {
    title: "Senior Backend Engineer (Go/Rust)",
    location: "Remote",
    type: "Full-time",
    department: "Platform",
    description: "Build scalable, high-performance backend services for our AI platform. Experience with distributed systems required."
  },
  {
    title: "Product Designer",
    location: "Remote / SF",
    type: "Full-time",
    department: "Design",
    description: "Design beautiful, intuitive interfaces for AI products. Experience with developer tools and data visualization a plus."
  }
];

const benefits = [
  {
    icon: <Globe className="hz-sq-4 hz-fg-muted" />,
    title: "Remote-First Culture",
    description: "Work from anywhere in the world with our distributed team."
  },
  {
    icon: <Clock className="hz-sq-4 hz-fg-muted" />,
    title: "Flexible Hours",
    description: "Set your own schedule and work when you're most productive."
  },
  {
    icon: <Users className="hz-sq-4 hz-fg-muted" />,
    title: "Collaborative Environment",
    description: "Work with talented individuals from diverse backgrounds."
  },
  {
    icon: <Sparkles className="hz-sq-4 hz-fg-muted" />,
    title: "Cutting-Edge Tech",
    description: "Access to the latest AI technologies and resources."
  }
];

const Careers = () => {
  return (
    <div className="hz-min-h-screen hz-bg">
      <Helmet>
        <title>Careers - Hanzo AI</title>
        <meta name="description" content="Join the Hanzo AI team and help build the future of AI. Explore current job openings and benefits." />
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
                Join Our Team
              </div>
              <ChromeText 
                as="h1" 
                className="hz-t-4xl hz-w-bold hz-mb-5"
              >
                Build the Future of AI
              </ChromeText>
              <p className="hz-container-narrow hz-t-xl hz-fg-soft">
                Join a team passionate about democratizing access to AI and creating technology that empowers developers worldwide.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hz-mb-7"
            >
              <h2 className="hz-t-3xl hz-w-bold hz-mb-6 hz-align-center">Open Positions</h2>
              <div className="hz-grid hz-grid-2 hz-gap-5">
                {jobOpenings.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="hz-card hz-transition hz-card-interactive"
                  >
                    <div className="hz-row hz-ai-start hz-gap-4">
                      <div className="hz-p-3 hz-r-lg hz-bg-raised">
                        <Briefcase className="hz-sq-4 hz-fg-muted" />
                      </div>
                      <div>
                        <h3 className="hz-t-xl hz-w-bold hz-mb-1">{job.title}</h3>
                        <div className="hz-row hz-wrap hz-gap-3 hz-mb-3">
                          <span className="hz-inline hz-ai-center hz-t-sm hz-fg-muted">
                            <MapPin className="hz-sq-2 hz-mr-1" /> {job.location}
                          </span>
                          <span className="hz-inline hz-ai-center hz-t-sm hz-fg-muted">
                            <Clock className="hz-sq-2 hz-mr-1" /> {job.type}
                          </span>
                          <span className="hz-inline hz-ai-center hz-t-sm hz-fg-muted">
                            <Users className="hz-sq-2 hz-mr-1" /> {job.department}
                          </span>
                        </div>
                        <p className="hz-fg-soft hz-mb-4">{job.description}</p>
                        <Button variant="outline" className="hz-fg hz-bg-surface hz-hoverable">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="hz-mt-6 hz-align-center">
                <p className="hz-fg-muted hz-mb-4">Don't see a position that fits your skills?</p>
                <Button 
                  variant="outline" 
                  className="hz-fg hz-bg-surface hz-hoverable"
                >
                  Submit Open Application
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hz-mb-7"
            >
              <h2 className="hz-t-3xl hz-w-bold hz-mb-6 hz-align-center">Benefits & Perks</h2>
              <div className="hz-grid hz-grid-4 hz-gap-5">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="hz-card hz-align-center"
                  >
                    <div className="hz-sq-7 hz-mx-auto hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="hz-t-lg hz-w-bold hz-mb-2">{benefit.title}</h3>
                    <p className="hz-fg-muted">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hz-card hz-align-center"
            >
              <h2 className="hz-t-2xl hz-w-bold hz-mb-4">Our Hiring Process</h2>
              <p className="hz-container-narrow hz-fg-soft hz-mb-5">
                We've designed our hiring process to be straightforward, respectful of your time, and focused on finding the right match for both you and Hanzo.
              </p>
              <div className="hz-grid hz-grid-4 hz-gap-4 hz-mb-6">
                <div className="hz-p-4">
                  <div className="hz-sq-6 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-3 hz-mx-auto">
                    <span className="hz-fg hz-w-medium">1</span>
                  </div>
                  <h3 className="hz-w-medium hz-mb-1">Application Review</h3>
                  <p className="hz-t-sm hz-fg-muted">We review your resume and application materials</p>
                </div>
                <div className="hz-p-4">
                  <div className="hz-sq-6 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-3 hz-mx-auto">
                    <span className="hz-fg hz-w-medium">2</span>
                  </div>
                  <h3 className="hz-w-medium hz-mb-1">Initial Interview</h3>
                  <p className="hz-t-sm hz-fg-muted">Get to know you and your experience</p>
                </div>
                <div className="hz-p-4">
                  <div className="hz-sq-6 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-3 hz-mx-auto">
                    <span className="hz-fg hz-w-medium">3</span>
                  </div>
                  <h3 className="hz-w-medium hz-mb-1">Technical Assessment</h3>
                  <p className="hz-t-sm hz-fg-muted">Showcase your skills (no whiteboarding)</p>
                </div>
                <div className="hz-p-4">
                  <div className="hz-sq-6 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-3 hz-mx-auto">
                    <span className="hz-fg hz-w-medium">4</span>
                  </div>
                  <h3 className="hz-w-medium hz-mb-1">Final Interview</h3>
                  <p className="hz-t-sm hz-fg-muted">Meet the team and discuss next steps</p>
                </div>
              </div>
              <Button 
                className=""
              >
                <a href="#open-positions">Browse Open Positions</a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Careers;

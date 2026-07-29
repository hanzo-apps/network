import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, MessageSquare, Send, Github, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Helmet>
        <title>Contact Us - Hanzo Industries</title>
        <meta 
          name="description" 
          content="Get in touch with the Hanzo Industries team for inquiries, support, or partnership opportunities." 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="hz-pt-6 hz-pb-6 hz-px-4">
        <div className="hz-container">
          <div className="hz-align-center hz-mb-7">
            <h1 className="hz-t-4xl hz-w-bold hz-mb-5">Contact Us</h1>
            <p className="hz-container-narrow hz-t-xl hz-fg-soft">
              Ready to transform your business with AI? Our enterprise team is here to help you build 
              custom solutions with our flagship models and cloud infrastructure.
            </p>
          </div>
          
          <div className="hz-grid hz-grid-2 hz-gap-7 hz-mb-7">
            {/* Contact Form */}
            <div className="hz-card">
              <h2 className="hz-t-2xl hz-w-semibold hz-mb-5">Send Us a Message</h2>
              <form className="hz-stack-5">
                <div className="hz-grid hz-grid-2 hz-gap-5">
                  <div>
                    <label htmlFor="name" className="hz-t-sm hz-w-medium hz-fg-soft hz-mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="hz-w-full hz-px-4 hz-py-2 hz-bg-overlay hz-bordered hz-r-md"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="hz-t-sm hz-w-medium hz-fg-soft hz-mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="hz-w-full hz-px-4 hz-py-2 hz-bg-overlay hz-bordered hz-r-md"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="hz-t-sm hz-w-medium hz-fg-soft hz-mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="hz-w-full hz-px-4 hz-py-2 hz-bg-overlay hz-bordered hz-r-md"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="hz-t-sm hz-w-medium hz-fg-soft hz-mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="hz-w-full hz-px-4 hz-py-2 hz-bg-overlay hz-bordered hz-r-md"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                
                <Button type="submit" className="hz-w-full hz-row hz-ai-center hz-jc-center hz-bg-inverse hz-fg-inverse hz-bordered hz-transition hz-hoverable" size="sm">
                  <Send className="hz-sq-2 hz-mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="hz-col">
              <div className="hz-card hz-mb-6">
                <h2 className="hz-t-2xl hz-w-semibold hz-mb-5">Contact Information</h2>
                <div className="hz-stack-5">
                  <div className="hz-row hz-ai-start">
                    <Mail className="hz-sq-4 hz-fg-muted hz-mr-4 hz-mt-1" />
                    <div>
                      <h3 className="hz-w-medium">Email</h3>
                      <p className="hz-fg-soft">
                        <a href="mailto:enterprise@hanzo.ai" className="hz-transition hz-hoverable">
                          enterprise@hanzo.ai
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="hz-row hz-ai-start">
                    <Phone className="hz-sq-4 hz-fg-muted hz-mr-4 hz-mt-1" />
                    <div>
                      <h3 className="hz-w-medium">Phone</h3>
                      <p className="hz-fg-soft">
                        <a href="tel:+18005551234" className="hz-transition hz-hoverable">
                          +1 (800) 555-1234
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="hz-row hz-ai-start">
                    <MapPin className="hz-sq-4 hz-fg-muted hz-mr-4 hz-mt-1" />
                    <div>
                      <h3 className="hz-w-medium">Location</h3>
                      <p className="hz-fg-soft">
                        Kansas City, MO<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="hz-card hz-grow">
                <h2 className="hz-t-2xl hz-w-semibold hz-mb-5">Connect With Us</h2>
                <p className="hz-fg-soft hz-mb-5">
                  Follow us on social media or join our community platforms to stay updated
                  on the latest news and engage with other Hanzo users.
                </p>
                
                <div className="hz-stack-4">
                  <a href="https://discord.gg/XthHQQj" className="hz-btn hz-transition">
                    <MessageSquare className="hz-sq-3 hz-fg-muted hz-mr-3" />
                    <span>Join our Discord Community</span>
                  </a>
                  
                  <a href="https://github.com/hanzoai" className="hz-btn hz-transition">
                    <Github className="hz-sq-3 hz-fg-muted hz-mr-3" />
                    <span>Follow us on GitHub</span>
                  </a>
                  
                  <a href="https://twitter.com/hanzoai" className="hz-btn hz-transition">
                    <Twitter className="hz-sq-3 hz-fg-muted hz-mr-3" />
                    <span>Follow us on Twitter</span>
                  </a>

                  <a href="https://linkedin.com/company/hanzo-ai" className="hz-btn hz-transition">
                    <Linkedin className="hz-sq-3 hz-fg-muted hz-mr-3" />
                    <span>Connect on LinkedIn</span>
                  </a>

                  <a href="https://facebook.com/hanzo-inc" className="hz-btn hz-transition">
                    <Facebook className="hz-sq-3 hz-fg-muted hz-mr-3" />
                    <span>Like us on Facebook</span>
                  </a>

                  <a href="https://instagram.com/hanzoai" className="hz-btn hz-transition">
                    <Instagram className="hz-sq-3 hz-fg-muted hz-mr-3" />
                    <span>Follow us on Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enterprise Solutions Section */}
          <div className="hz-card hz-mb-7">
            <div className="hz-align-center hz-mb-6">
              <h2 className="hz-t-3xl hz-w-semibold hz-mb-4">Enterprise Solutions</h2>
              <p className="hz-container-narrow hz-t-xl hz-fg-soft">
                Transform your business with our enterprise AI platform featuring Zen (1T+ parameter MoDE LLM), 
                Sho (next-gen diffusion model), and comprehensive cloud infrastructure.
              </p>
            </div>
            
            <div className="hz-grid hz-grid-3 hz-gap-5">
              <div className="hz-align-center">
                <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Custom AI Models</h3>
                <p className="hz-fg-soft">
                  Deploy our flagship Zen LLM and Sho diffusion models, or work with our team to create custom models for your specific use case.
                </p>
              </div>
              <div className="hz-align-center">
                <h3 className="hz-t-xl hz-w-semibold hz-mb-3">Dedicated Infrastructure</h3>
                <p className="hz-fg-soft">
                  Private cloud deployments with dedicated compute, storage, and networking designed for enterprise-scale AI workloads.
                </p>
              </div>
              <div className="hz-align-center">
                <h3 className="hz-t-xl hz-w-semibold hz-mb-3">24/7 Support</h3>
                <p className="hz-fg-soft">
                  Enterprise-grade support with dedicated account managers, priority response times, and direct access to our engineering team.
                </p>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="hz-align-center">
            <h2 className="hz-t-2xl hz-w-semibold hz-mb-5">Frequently Asked Questions</h2>
            <p className="hz-fg-soft hz-mb-4">
              Can't find what you're looking for? Check our comprehensive FAQ section.
            </p>
            <Button variant="outline" className="hz-fg hz-hoverable" size="sm">
              <a href="/pricing#faq">View FAQ</a>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;

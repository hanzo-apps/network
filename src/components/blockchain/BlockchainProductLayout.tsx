import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Clock,
  Mail,
  Bell,
  Check,
  ArrowRight,
  Lock,
  Building2,
  User,
  Briefcase,
  MessageSquare,
  LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export interface BlockchainProductProps {
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  accentColor: string;
  features: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
  }>;
  useCases: Array<{
    title: string;
    description: string;
  }>;
  chains?: string[];
  codeExample?: {
    filename: string;
    code: string;
  };
}

const BlockchainProductLayout: React.FC<BlockchainProductProps> = ({
  name,
  tagline,
  description,
  icon: ProductIcon,
  accentColor,
  features,
  useCases,
  chains,
  codeExample,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    useCase: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [formExpanded, setFormExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Beta signup:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", company: "", role: "", useCase: "" });
      setFormExpanded(false);
    }, 3000);
  };

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />

      {/* Hero Section */}
      <section className="hz-pt-6 hz-pb-6 hz-px-4 hz-rel hz-clip">
        <div className="hz-abs hz-inset hz-clip hz-z-base hz-no-pointer">
          <div
            className="hz-center-xy hz-abs hz-r-full hz-dim-more"
            style={{
              background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
              filter: "blur(100px)",
            }}
          />
        </div>

        <div className="hz-container-wide hz-rel hz-z-raised">
          <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-start">
            {/* Left: Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Coming Soon Badge */}
              <div
                className="hz-btn hz-btn-ghost hz-gap-2 hz-mb-5"
                style={{ borderColor: `${accentColor}4d`, backgroundColor: `${accentColor}1a` }}
              >
                <Clock className="hz-sq-2" style={{ color: accentColor }} />
                <span className="hz-t-sm hz-w-medium" style={{ color: accentColor }}>
                  Private Beta
                </span>
              </div>

              <h1 className="hz-t-4xl hz-w-medium hz-tracking-tight hz-mb-4">
                <span className="hz-fg">{name}</span>
              </h1>
              <p className="hz-t-xl hz-fg-muted hz-mb-5">{tagline}</p>
              <p className="hz-t-lg hz-fg-muted hz-mb-6">{description}</p>

              {/* Quick Features */}
              <div className="hz-grid hz-grid-2 hz-gap-4 hz-mb-6">
                {features.slice(0, 4).map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="hz-row hz-ai-start hz-gap-3">
                      <div
                        className="hz-sq-5 hz-r-lg hz-row hz-ai-center hz-jc-center hz-none"
                        style={{ backgroundColor: `${accentColor}1a` }}
                      >
                        <Icon className="hz-sq-2" style={{ color: accentColor }} />
                      </div>
                      <div>
                        <h3 className="hz-w-medium hz-fg hz-t-sm">{feature.title}</h3>
                        <p className="hz-t-xs hz-fg-muted">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                to="/blockchain"
                className="hz-inline hz-ai-center hz-gap-2 hz-t-sm hz-fg-muted hz-transition hz-link"
              >
                <ArrowRight className="hz-sq-2" />
                Back to Web3 Overview
              </Link>
            </motion.div>

            {/* Right: Signup Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hz-card"
            >
              <div className="hz-row hz-ai-center hz-gap-3 hz-mb-5">
                <div
                  className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center"
                  style={{ backgroundColor: `${accentColor}1a` }}
                >
                  <ProductIcon className="hz-sq-4" style={{ color: accentColor }} />
                </div>
                <div>
                  <h2 className="hz-t-lg hz-w-semibold hz-fg">Request Beta Access</h2>
                  <p className="hz-t-sm hz-fg-muted">Limited spots available</p>
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="hz-align-center hz-py-6"
                >
                  <div
                    className="hz-sq-8 hz-r-full hz-row hz-ai-center hz-jc-center hz-mx-auto hz-mb-4"
                    style={{ backgroundColor: `${accentColor}1a` }}
                  >
                    <Check className="hz-sq-5" style={{ color: accentColor }} />
                  </div>
                  <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-2">Application Received!</h3>
                  <p className="hz-fg-muted">
                    We'll review your request and reach out soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="hz-stack-4">
                  <div className="hz-grid hz-grid-2 hz-gap-4">
                    <div>
                      <label className="hz-t-xs hz-fg-muted hz-mb-2">Full Name</label>
                      <div className="hz-btn hz-gap-2">
                        <User className="hz-sq-2 hz-fg-faint" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="hz-grow hz-bg-none hz-fg hz-t-sm"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="hz-t-xs hz-fg-muted hz-mb-2">Work Email</label>
                      <div className="hz-btn hz-gap-2">
                        <Mail className="hz-sq-2 hz-fg-faint" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                          className="hz-grow hz-bg-none hz-fg hz-t-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="hz-grid hz-grid-2 hz-gap-4">
                    <div>
                      <label className="hz-t-xs hz-fg-muted hz-mb-2">Company</label>
                      <div className="hz-btn hz-gap-2">
                        <Building2 className="hz-sq-2 hz-fg-faint" />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Acme Inc"
                          className="hz-grow hz-bg-none hz-fg hz-t-sm"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="hz-t-xs hz-fg-muted hz-mb-2">Role</label>
                      <div className="hz-btn hz-gap-2">
                        <Briefcase className="hz-sq-2 hz-fg-faint" />
                        <input
                          type="text"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          placeholder="Backend Engineer"
                          className="hz-grow hz-bg-none hz-fg hz-t-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="hz-t-xs hz-fg-muted hz-mb-2">
                      What are you building? (Use case)
                    </label>
                    <div className="hz-row hz-ai-start hz-gap-2 hz-px-3 hz-py-2 hz-r-lg hz-bg-surface hz-bordered">
                      <MessageSquare className="hz-sq-2 hz-fg-faint hz-mt-1" />
                      <textarea
                        value={formData.useCase}
                        onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                        placeholder="Tell us about your project and how you plan to use this service..."
                        className="hz-grow hz-bg-none hz-fg hz-t-sm"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="hz-w-full hz-py-3 hz-r-lg hz-w-medium"
                    style={{ backgroundColor: accentColor }}
                  >
                    <span className="hz-row hz-ai-center hz-jc-center hz-gap-2">
                      Apply for Beta Access
                      <Bell className="hz-sq-2" />
                    </span>
                  </Button>

                  <p className="hz-t-xs hz-fg-muted hz-align-center">
                    We'll review your application and email you within 48 hours.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="hz-py-7 hz-px-4 hz-bg-surface">
        <div className="hz-container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hz-align-center hz-mb-7"
          >
            <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
              Key Capabilities
            </h2>
            <p className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted">
              Everything you need, nothing you don't.
            </p>
          </motion.div>

          <div className="hz-grid hz-grid-3 hz-gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="hz-card"
                >
                  <div
                    className="hz-sq-6 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4"
                    style={{ backgroundColor: `${accentColor}1a` }}
                  >
                    <Icon className="hz-sq-3" style={{ color: accentColor }} />
                  </div>
                  <h3 className="hz-w-semibold hz-fg hz-mb-2">{feature.title}</h3>
                  <p className="hz-t-sm hz-fg-muted">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Code Example */}
      {codeExample && (
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-align-center hz-mb-7"
            >
              <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
                Simple to Integrate
              </h2>
              <p className="hz-t-lg hz-fg-muted">
                Get started with just a few lines of code.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-r-lg hz-bordered hz-bg-surface hz-clip"
            >
              <div className="hz-row hz-ai-center hz-gap-2 hz-px-4 hz-py-3 hz-border-b hz-bg-surface">
                <div className="hz-row hz-gap-2">
                  <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                  <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                  <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                </div>
                <span className="hz-ml-2 hz-t-xs hz-fg-muted hz-mono">{codeExample.filename}</span>
              </div>
              <div className="hz-p-4 hz-mono hz-t-sm hz-bg-surface hz-scroll-x">
                <pre className="hz-fg-soft">{codeExample.code}</pre>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      <section className="hz-py-7 hz-px-4 hz-bg-surface">
        <div className="hz-container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hz-align-center hz-mb-7"
          >
            <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
              Built For
            </h2>
          </motion.div>

          <div className="hz-grid hz-grid-2 hz-gap-5">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="hz-card"
              >
                <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">{useCase.title}</h3>
                <p className="hz-fg-muted">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Chains */}
      {chains && chains.length > 0 && (
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-align-center hz-mb-7"
            >
              <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
                Supported Chains
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-row hz-wrap hz-jc-center hz-gap-3"
            >
              {chains.map((chain) => (
                <div
                  key={chain}
                  className="hz-px-4 hz-py-2 hz-r-full hz-bordered hz-bg-surface hz-t-sm hz-fg-soft"
                >
                  {chain}
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="hz-py-7 hz-px-4 hz-border-t">
        <div className="hz-container-narrow hz-align-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="hz-t-3xl hz-w-medium hz-fg hz-mb-4">
              Ready to Get Started?
            </h2>
            <p className="hz-t-lg hz-fg-muted hz-mb-6">
              Join the private beta and be among the first to build with {name}.
            </p>
            <div className="hz-col-row hz-ai-center hz-jc-center hz-gap-4">
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hz-px-5 hz-py-3 hz-r-lg hz-w-medium"
                style={{ backgroundColor: accentColor }}
              >
                Apply for Beta Access
              </Button>
              <Link
                to="/blockchain"
                className="hz-px-5 hz-py-3 hz-r-lg hz-w-medium hz-bordered hz-fg hz-transition hz-hoverable"
              >
                Explore All Web3 Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlockchainProductLayout;

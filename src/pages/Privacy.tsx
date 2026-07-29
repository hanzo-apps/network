import { BRAND } from '@/lib/brand';
import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, FileText, ArrowRight, ExternalLink, CheckCircle } from "lucide-react";


const PRIVACY_HIGHLIGHTS = [
  {
    icon: Shield,
    title: "Data Protection",
    description: "Your data is encrypted at rest and in transit with industry-standard encryption.",
  },
  {
    icon: Lock,
    title: "Access Control",
    description: "Strict access controls ensure only authorized personnel can access your information.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We're transparent about what data we collect and how we use it.",
  },
  {
    icon: FileText,
    title: "Your Rights",
    description: "You have full control over your data with the right to access, modify, or delete it.",
  },
];

const Privacy = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Helmet>
        <title>Privacy Policy - Hanzo AI</title>
        <meta
          name="description"
          content="Hanzo AI privacy policy - how we protect your data and respect your privacy. GDPR and CCPA compliant."
        />
      </Helmet>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hz-rel hz-pt-6 hz-pb-6 hz-px-4 hz-clip">
          <div className="hz-abs hz-inset hz-clip hz-z-base hz-no-pointer">
            <div
              className="hz-center-xy hz-abs hz-r-full hz-dim-more"
              style={{
                background: `radial-gradient(circle, ${BRAND.fg} 0%, transparent 70%)`,
                filter: "blur(100px)",
              }}
            />
          </div>

          <div className="hz-container-wide hz-rel hz-z-raised">
            <div className="hz-align-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-mb-5 hz-bg-quiet hz-fg"
                >
                <Shield className="hz-sq-2" />
                GDPR & CCPA Compliant
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="hz-t-3xl hz-w-medium hz-tracking-tight hz-mb-5"
              >
                <span className="hz-fg">Your privacy</span>
                <br />
                <span className="hz-fg-muted">is our priority.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="hz-container-narrow hz-t-base hz-fg-muted hz-leading-relaxed hz-mb-6"
              >
                We believe in transparency and giving you control over your data.
                This policy explains how we collect, use, and protect your information.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="hz-row hz-wrap hz-jc-center hz-gap-3 hz-mb-6"
              >
                {["GDPR", "CCPA", "SOC 2", "HIPAA"].map((badge) => (
                  <div
                    key={badge}
                    className="hz-btn hz-gap-2"
                  >
                    <CheckCircle className="hz-sq-2 hz-fg-muted" />
                    <span className="hz-t-sm hz-w-medium hz-fg">{badge}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Privacy Highlights */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide">
            <div className="hz-grid hz-grid-4 hz-gap-5">
              {PRIVACY_HIGHLIGHTS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="hz-card"
                  >
                    <div
                      className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4 hz-bg-quiet"
                      >
                      <Icon className="hz-sq-4 hz-fg" />
                    </div>
                    <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">{item.title}</h3>
                    <p className="hz-t-sm hz-fg-muted">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-narrow">
            <div className="hz-prose">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="hz-t-2xl hz-w-semibold hz-mt-6 hz-mb-4 hz-fg">Information We Collect</h2>
                <p className="hz-fg-soft hz-mb-5">
                  We collect information that you provide directly to us when you use our services,
                  including personal information such as your name, email address, and payment information.
                  We also collect usage data and analytics to improve our services.
                </p>

                <h2 className="hz-t-2xl hz-w-semibold hz-mt-6 hz-mb-4 hz-fg">How We Use Your Information</h2>
                <p className="hz-fg-soft hz-mb-5">
                  We use the information we collect to provide, maintain, and improve our services,
                  process transactions, send communications, and develop new products and services.
                </p>

                <h2 className="hz-t-2xl hz-w-semibold hz-mt-6 hz-mb-4 hz-fg">Sharing Your Information</h2>
                <p className="hz-fg-soft hz-mb-5">
                  We may share your information with third-party service providers to help us operate our business
                  and provide our services. We may also share information if required by law or to protect our rights.
                </p>

                <h2 className="hz-t-2xl hz-w-semibold hz-mt-6 hz-mb-4 hz-fg">Data Security</h2>
                <p className="hz-fg-soft hz-mb-5">
                  We implement appropriate security measures to protect your personal information.
                  All data is encrypted at rest with AES-256 and in transit with TLS 1.3.
                </p>

                <h2 className="hz-t-2xl hz-w-semibold hz-mt-6 hz-mb-4 hz-fg">Your Rights</h2>
                <p className="hz-fg-soft hz-mb-5">
                  You can access, update, or delete your account information at any time by
                  logging into your account or contacting us directly. Under GDPR and CCPA,
                  you have additional rights including data portability and the right to opt-out.
                </p>

                <h2 className="hz-t-2xl hz-w-semibold hz-mt-6 hz-mb-4 hz-fg">Contact Us</h2>
                <p className="hz-fg-soft hz-mb-5">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:privacy@hanzo.ai" className="hz-fg">
                    privacy@hanzo.ai
                  </a>
                </p>

                <p className="hz-mt-6 hz-fg-muted hz-t-sm">
                  Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
          <div className="hz-sq-8 hz-abs hz-bg-quiet hz-r-full hz-blur-bg hz-no-pointer" />
          <div className="hz-sq-8 hz-abs hz-bg-quiet hz-r-full hz-blur-bg hz-no-pointer" />

          <div className="hz-container-narrow hz-align-center hz-rel hz-z-raised">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-t-3xl hz-w-bold hz-fg hz-mb-4"
            >
              Questions about privacy?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted hz-mb-6"
            >
              Our team is here to help. Contact us for any questions about how we handle your data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="hz-row hz-wrap hz-ai-center hz-jc-center hz-gap-4"
            >
              <Link
                to="/contact"
                className="hz-btn hz-btn-ghost hz-btn-lg hz-transition hz-bg-inverse"
                >
                Contact Us
                <ArrowRight className="hz-sq-3 hz-ml-2" />
              </Link>
              <Link
                to="/security"
                className="hz-btn hz-btn-ghost hz-btn-lg hz-transition hz-fg"
              >
                View Security Page
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;

import { BRAND } from '@/lib/brand';
import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Scale, Shield, Clock, ArrowRight, CheckCircle } from "lucide-react";


const TERMS_HIGHLIGHTS = [
  {
    icon: FileText,
    title: "Clear Terms",
    description: "Plain language terms that are easy to understand, no legal jargon.",
  },
  {
    icon: Scale,
    title: "Fair Use",
    description: "Reasonable usage policies designed for developers and businesses.",
  },
  {
    icon: Shield,
    title: "Data Rights",
    description: "Your content remains yours. We only use it to provide our services.",
  },
  {
    icon: Clock,
    title: "Notice of Changes",
    description: "We'll notify you of any material changes to these terms.",
  },
];

const Terms = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Helmet>
        <title>Terms of Service - Hanzo AI</title>
        <meta
          name="description"
          content="Hanzo AI terms of service - the conditions for using our platform and services."
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
                <FileText className="hz-sq-2" />
                Legal Agreement
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="hz-t-3xl hz-w-medium hz-tracking-tight hz-mb-5"
              >
                <span className="hz-fg">Terms of</span>
                <br />
                <span className="hz-fg-muted">Service.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="hz-container-narrow hz-t-base hz-fg-muted hz-leading-relaxed hz-mb-6"
              >
                These terms govern your use of Hanzo AI platform and services.
                We've written them in plain language to be as clear as possible.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="hz-row hz-wrap hz-ai-center hz-jc-center hz-gap-4"
              >
                <a
                  href="#terms-content"
                  className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                  >
                  Read Full Terms
                  <ArrowRight className="hz-sq-2 hz-ml-2" />
                </a>
                <Link
                  to="/privacy"
                  className="hz-btn hz-btn-ghost hz-transition hz-fg"
                >
                  Privacy Policy
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Terms Highlights */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide">
            <div className="hz-grid hz-grid-4 hz-gap-5">
              {TERMS_HIGHLIGHTS.map((item, index) => {
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

        {/* Terms Content */}
        <section id="terms-content" className="hz-py-7 hz-px-4">
          <div className="hz-container-narrow">
            <div className="hz-prose">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="hz-t-2xl hz-w-semibold hz-mt-6 hz-mb-4 hz-fg">Use of Services</h2>
                <p className="hz-fg-soft hz-mb-5">
                  Our services are provided for business and development purposes. You may use our services
                  only as permitted by these terms and any applicable laws and regulations.
                </p>

                <h2 className="hz-t-2xl hz-w-semibold hz-mt-6 hz-mb-4 hz-fg">User Accounts</h2>
                <p className="hz-fg-soft hz-mb-5">
                  You may need to create an account to use some of our services. You are responsible for
                  maintaining the security of your account and password. Hanzo AI cannot and will not
                  be liable for any loss or damage from your failure to comply with this security obligation.
                </p>

                <h2 className="hz-t-2xl hz-w-semibold hz-mt-6 hz-mb-4 hz-fg">Content and Intellectual Property</h2>
                <p className="hz-fg-soft hz-mb-5">
                  Content you create using our services remains yours. However, by using our services,
                  you grant us a license to use, host, store, reproduce, and modify such content as needed
                  to provide the services.
                </p>

                <h2 className="hz-t-2xl hz-w-semibold hz-mt-6 hz-mb-4 hz-fg">API Usage and Rate Limits</h2>
                <p className="hz-fg-soft hz-mb-5">
                  Our APIs are subject to rate limits and usage restrictions. Excessive use that negatively
                  impacts our services or other users may result in temporary or permanent restriction of your access.
                </p>

                <h2 className="hz-t-2xl hz-w-semibold hz-mt-6 hz-mb-4 hz-fg">Termination</h2>
                <p className="hz-fg-soft hz-mb-5">
                  We may terminate or suspend your access to our services immediately, without prior notice
                  or liability, for any reason, including breach of these Terms.
                </p>

                <h2 className="hz-t-2xl hz-w-semibold hz-mt-6 hz-mb-4 hz-fg">Disclaimer of Warranties</h2>
                <p className="hz-fg-soft hz-mb-5">
                  Our services are provided "as is" and "as available" without any warranties of any kind,
                  either express or implied.
                </p>

                <h2 className="hz-t-2xl hz-w-semibold hz-mt-6 hz-mb-4 hz-fg">Limitation of Liability</h2>
                <p className="hz-fg-soft hz-mb-5">
                  In no event shall Hanzo AI be liable for any indirect, incidental, special,
                  consequential or punitive damages, or any loss of profits or revenues.
                </p>

                <h2 className="hz-t-2xl hz-w-semibold hz-mt-6 hz-mb-4 hz-fg">Changes to Terms</h2>
                <p className="hz-fg-soft hz-mb-5">
                  We reserve the right to modify these terms at any time. We will provide notice of
                  significant changes by posting an announcement on our website and sending you an email.
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
              Have questions?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted hz-mb-6"
            >
              Our team is available to answer any questions about our terms of service.
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
              <a
                href="mailto:legal@hanzo.ai"
                className="hz-btn hz-btn-ghost hz-btn-lg hz-transition hz-fg"
              >
                legal@hanzo.ai
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;

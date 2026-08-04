import { BRAND } from '@/lib/brand';
import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Shield,
  Lock,
  CheckCircle,
  Server,
  Eye,
  Key,
  FileCheck,
  Globe,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Fingerprint,
  Database,
  Network,
  Clock,
  Users,
  FileText,
  Bug,
} from "lucide-react";


const COMPLIANCE_BADGES = [
  { name: "SOC 2 Type II", description: "Annual audit completed" },
  { name: "GDPR", description: "EU data protection" },
  { name: "CCPA", description: "California privacy" },
  { name: "HIPAA", description: "Healthcare ready" },
  { name: "ISO 27001", description: "Information security" },
  { name: "PCI DSS", description: "Payment security" },
];

const SECURITY_FEATURES = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "All data is encrypted at rest with AES-256 and in transit with TLS 1.3. Your data remains protected throughout its lifecycle.",
  },
  {
    icon: Fingerprint,
    title: "Multi-Factor Authentication",
    description:
      "Enforce MFA across your organization with support for TOTP, hardware keys, and biometric authentication.",
  },
  {
    icon: Key,
    title: "API Key Management",
    description:
      "Fine-grained API key permissions with automatic rotation, usage tracking, and instant revocation capabilities.",
  },
  {
    icon: Users,
    title: "Role-Based Access Control",
    description:
      "Granular permissions with predefined roles and custom access policies. Audit trails for all access events.",
  },
  {
    icon: Network,
    title: "Private Networking",
    description:
      "VPC peering, private endpoints, and IP allowlisting. Keep your infrastructure isolated and secure.",
  },
  {
    icon: Database,
    title: "Data Residency",
    description:
      "Choose where your data lives. Deploy to specific regions to meet compliance and sovereignty requirements.",
  },
];

const ENTERPRISE_FEATURES = [
  "Single Sign-On (SAML, OIDC)",
  "Custom security policies",
  "Dedicated security engineer",
  "Priority incident response",
  "Custom data retention",
  "Advanced audit logging",
  "Penetration testing reports",
  "Security questionnaire support",
];

const REGIONS = [
  { name: "United States", code: "MCI - Kansas City", region: "us-central-1" },
  { name: "Canada", code: "YVR - Vancouver", region: "ca-west-1" },
  { name: "European Union", code: "BCN - Barcelona", region: "eu-west-1" },
];

const Security = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Helmet>
        <title>Security - Enterprise-Grade Protection | Hanzo AI</title>
        <meta
          name="description"
          content="SOC 2, HIPAA, GDPR compliant. Enterprise-grade security with end-to-end encryption, MFA, and comprehensive access controls. Your data is protected."
        />
      </Helmet>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hz-rel hz-pt-6 hz-pb-6 hz-px-4 hz-clip">
          {/* Background gradient */}
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
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-mb-5 hz-bg-quiet hz-fg"
                >
                <Shield className="hz-sq-2" />
                SOC 2 Type II Certified
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="hz-t-3xl hz-w-medium hz-tracking-tight hz-mb-5"
              >
                <span className="hz-fg">Security without</span>
                <br />
                <span className="hz-fg-muted">compromise.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="hz-container-narrow hz-t-base hz-fg-muted hz-leading-relaxed hz-mb-6"
              >
                Enterprise-grade security built into every layer. Your data is encrypted,
                access is controlled, and compliance is maintained by default.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="hz-row hz-wrap hz-ai-center hz-jc-center hz-gap-4 hz-mb-7"
              >
                <Link
                  to="/contact"
                  className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                  >
                  Talk to Security Team
                  <ArrowRight className="hz-sq-2 hz-ml-2" />
                </Link>
                <a
                  href="https://docs.hanzo.ai/security"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hz-btn hz-btn-ghost hz-transition hz-fg"
                >
                  Security Documentation
                  <ExternalLink className="hz-sq-2 hz-ml-2" />
                </a>
              </motion.div>

              {/* Compliance Badges */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="hz-row hz-wrap hz-jc-center hz-gap-3"
              >
                {COMPLIANCE_BADGES.map((badge) => (
                  <div
                    key={badge.name}
                    className="hz-btn hz-gap-2"
                  >
                    <CheckCircle className="hz-sq-2 hz-fg-muted" />
                    <span className="hz-t-sm hz-w-medium hz-fg">{badge.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Security Features Grid */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-align-center hz-mb-7"
            >
              <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
                Defense in Depth
              </h2>
              <p className="hz-container-narrow hz-mw-md hz-fg-muted">
                Multiple layers of security controls protect your applications and data
              </p>
            </motion.div>

            <div className="hz-grid hz-grid-3 hz-gap-5">
              {SECURITY_FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="hz-card hz-transition hz-card-interactive"
                  >
                    <div
                      className="hz-sq-7 hz-r-lg hz-row hz-ai-center hz-jc-center hz-mb-4 hz-bg-quiet"
                      >
                      <Icon className="hz-sq-4 hz-fg" />
                    </div>
                    <h3 className="hz-t-lg hz-w-semibold hz-fg hz-mb-2">
                      {feature.title}
                    </h3>
                    <p className="hz-t-sm hz-fg-muted">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Infrastructure Security */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide">
            <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-mb-5 hz-bg-quiet hz-fg"
                  >
                  Infrastructure
                </div>
                <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
                  Built on secure foundations
                </h2>
                <p className="hz-fg-muted hz-mb-6">
                  Our infrastructure runs on SOC 2 compliant data centers with 24/7 physical
                  security, redundant power, and isolated network architecture. Every component
                  is designed with security as the primary requirement.
                </p>

                <div className="hz-stack-4">
                  {[
                    { icon: Server, text: "KVM hardware-isolated virtual machines" },
                    { icon: Eye, text: "24/7 security monitoring and alerting" },
                    { icon: Clock, text: "99.99% uptime SLA with automatic failover" },
                    { icon: FileCheck, text: "Automated security patching and updates" },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="hz-row hz-ai-center hz-gap-3">
                        <Icon className="hz-sq-3 hz-fg-muted" />
                        <span className="hz-fg-soft">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hz-card"
              >
                <Globe className="hz-sq-6 hz-fg-muted hz-mb-5" />
                <h3 className="hz-t-xl hz-w-bold hz-fg hz-mb-4">Global Data Regions</h3>
                <p className="hz-fg-muted hz-mb-5">
                  Deploy to specific geographic regions to meet data residency requirements
                  and minimize latency.
                </p>

                <div className="hz-stack-4">
                  {REGIONS.map((region) => (
                    <div
                      key={region.region}
                      className="hz-card"
                    >
                      <div className="hz-row hz-ai-center hz-jc-between hz-mb-1">
                        <span className="hz-w-medium hz-fg">{region.name}</span>
                        <span className="hz-t-xs hz-fg-muted hz-mono">
                          {region.region}
                        </span>
                      </div>
                      <span className="hz-t-sm hz-fg-muted">{region.code}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enterprise Security */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide">
            <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className=""
              >
                <div className="hz-card">
                  <Shield className="hz-sq-6 hz-mb-5 hz-fg" />
                  <h3 className="hz-t-xl hz-w-bold hz-fg hz-mb-4">
                    Enterprise Security Program
                  </h3>
                  <p className="hz-fg-muted hz-mb-5">
                    For organizations with advanced security requirements, our Enterprise plan
                    includes dedicated security support and custom configurations.
                  </p>

                  <div className="hz-grid hz-grid-2 hz-gap-3">
                    {ENTERPRISE_FEATURES.map((feature) => (
                      <div key={feature} className="hz-row hz-ai-start hz-gap-2">
                        <CheckCircle className="hz-sq-2 hz-fg-muted hz-mt-1 hz-none" />
                        <span className="hz-t-sm hz-fg-soft">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="hz-inline hz-ai-center hz-mt-6 hz-t-sm hz-w-medium hz-transition hz-fg"
                    >
                    Contact Sales
                    <ArrowRight className="hz-sq-2 hz-ml-2" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="hz-order-first"
              >
                <div
                  className="hz-inline hz-ai-center hz-gap-2 hz-px-3 hz-py-1 hz-r-full hz-t-xs hz-w-medium hz-mb-5 hz-bg-quiet hz-fg"
                  >
                  Enterprise
                </div>
                <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
                  Security for the most demanding organizations
                </h2>
                <p className="hz-fg-muted hz-mb-5">
                  Whether you're in healthcare, finance, or government, Hanzo meets the
                  security and compliance requirements of regulated industries.
                </p>
                <p className="hz-fg-muted">
                  Our security team works directly with enterprise customers to understand
                  their unique requirements and implement appropriate controls.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vulnerability Disclosure */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="hz-card"
            >
              <div className="hz-row hz-ai-start hz-gap-4">
                <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-none">
                  <Bug className="hz-sq-4 hz-fg-muted" />
                </div>
                <div>
                  <h3 className="hz-t-xl hz-w-bold hz-fg hz-mb-2">
                    Responsible Disclosure
                  </h3>
                  <p className="hz-fg-muted hz-mb-4">
                    We take security vulnerabilities seriously and appreciate the work of
                    security researchers. If you discover a vulnerability, please report it
                    responsibly.
                  </p>
                  <a
                    href="mailto:security@hanzo.ai"
                    className="hz-inline hz-ai-center hz-t-sm hz-w-medium hz-fg-muted hz-transition hz-link"
                  >
                    security@hanzo.ai
                    <ExternalLink className="hz-sq-2 hz-ml-2" />
                  </a>
                </div>
              </div>
            </motion.div>
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
              Ready to secure your AI infrastructure?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted hz-mb-6"
            >
              Start building with enterprise-grade security today. Our team is ready to help
              you meet your compliance requirements.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="hz-row hz-wrap hz-ai-center hz-jc-center hz-gap-4"
            >
              <Link
                to="/signup"
                className="hz-btn hz-btn-ghost hz-btn-lg hz-transition hz-bg-inverse"
                >
                Get Started Free
                <ArrowRight className="hz-sq-3 hz-ml-2" />
              </Link>
              <Link
                to="/contact"
                className="hz-btn hz-btn-ghost hz-btn-lg hz-transition hz-fg"
              >
                Schedule Security Review
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="hz-mt-6"
            >
              <a
                href="https://docs.hanzo.ai/security"
                target="_blank"
                rel="noreferrer noopener"
                className="hz-t-sm hz-fg-muted hz-transition hz-link"
              >
                Read the security documentation
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Security;

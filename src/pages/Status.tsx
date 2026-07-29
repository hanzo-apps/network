import { BRAND } from '@/lib/brand';
import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Server,
  Activity,
  ArrowRight,
  Clock,
  ExternalLink,
  Bell,
  Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const services = [
  { name: "API Gateway", status: "operational", uptime: "99.99%", latency: "45ms" },
  { name: "Authentication", status: "operational", uptime: "99.98%", latency: "23ms" },
  { name: "LLM Inference", status: "operational", uptime: "99.95%", latency: "120ms" },
  { name: "Vector Database", status: "operational", uptime: "99.99%", latency: "12ms" },
  { name: "Storage", status: "operational", uptime: "99.99%", latency: "8ms" },
  { name: "Edge CDN", status: "operational", uptime: "100%", latency: "15ms" },
  { name: "Monitoring", status: "operational", uptime: "99.99%", latency: "5ms" },
];

const regions = [
  { name: "US Central", code: "us-central-1", status: "operational" },
  { name: "US East", code: "us-east-1", status: "operational" },
  { name: "EU West", code: "eu-west-1", status: "operational" },
  { name: "Asia Pacific", code: "ap-southeast-1", status: "operational" },
];

const StatusPage = () => {
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Helmet>
        <title>System Status - Hanzo AI</title>
        <meta
          name="description"
          content="Check the current status of Hanzo AI services. Real-time uptime monitoring and incident reports."
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
                className={`hz-btn hz-btn-ghost hz-gap-2 hz-mb-5 ${
                  allOperational
                    ? "hz-bg-raised hz-fg-muted"
                    : "hz-bg-raised hz-fg-muted"
                }`}
              >
                <CheckCircle className="hz-sq-2" />
                {allOperational ? "All Systems Operational" : "Partial Outage"}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="hz-t-3xl hz-w-medium hz-tracking-tight hz-mb-5"
              >
                <span className="hz-fg">System</span>
                <br />
                <span className="hz-fg-muted">Status.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="hz-container-narrow hz-t-base hz-fg-muted hz-leading-relaxed hz-mb-6"
              >
                Real-time status of Hanzo AI infrastructure and services.
                Subscribe to updates or check our incident history.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="hz-row hz-wrap hz-ai-center hz-jc-center hz-gap-4"
              >
                <button className="hz-btn hz-transition hz-fg-muted">
                  <Bell className="hz-sq-2 hz-mr-2" />
                  Subscribe to Updates
                </button>
                <a
                  href="https://docs.hanzo.ai/status"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hz-btn hz-btn-ghost hz-transition hz-fg"
                >
                  API Status Endpoint
                  <ExternalLink className="hz-sq-2 hz-ml-2" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Status */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-mb-6"
            >
              <h2 className="hz-t-2xl hz-w-bold hz-fg hz-mb-2">Services</h2>
              <p className="hz-fg-muted">Current status of all Hanzo AI services</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-bg-surface hz-bordered hz-r-lg hz-clip"
            >
              <div className="">
                {services.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="hz-px-5 hz-py-4 hz-row hz-ai-center hz-jc-between hz-transition hz-hoverable"
                  >
                    <div className="hz-row hz-ai-center hz-gap-4">
                      <Server className="hz-sq-3 hz-fg-muted" />
                      <span className="hz-w-medium hz-fg">{service.name}</span>
                    </div>
                    <div className="hz-row hz-ai-center hz-gap-5">
                      <span className="hz-desktop-only hz-t-sm hz-fg-muted">
                        {service.latency} avg
                      </span>
                      <span className="hz-desktop-only hz-t-sm hz-fg-muted">
                        {service.uptime} uptime
                      </span>
                      <div className="hz-row hz-ai-center hz-gap-2">
                        <CheckCircle className="hz-sq-2 hz-fg-muted" />
                        <span className="hz-t-sm hz-fg-muted">Operational</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Regions Status */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-mb-6"
            >
              <h2 className="hz-t-2xl hz-w-bold hz-fg hz-mb-2">Global Regions</h2>
              <p className="hz-fg-muted">Status across all deployment regions</p>
            </motion.div>

            <div className="hz-grid hz-grid-4 hz-gap-4">
              {regions.map((region, index) => (
                <motion.div
                  key={region.code}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="hz-card"
                >
                  <div className="hz-row hz-ai-center hz-gap-3 hz-mb-4">
                    <Globe className="hz-sq-3 hz-fg-muted" />
                    <span className="hz-w-medium hz-fg">{region.name}</span>
                  </div>
                  <div className="hz-row hz-ai-center hz-jc-between">
                    <span className="hz-t-sm hz-fg-muted hz-mono">{region.code}</span>
                    <div className="hz-row hz-ai-center hz-gap-2">
                      <div className="hz-sq-1 hz-r-full hz-bg-raised" />
                      <span className="hz-t-xs hz-fg-muted">Active</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Incidents */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-mb-6"
            >
              <h2 className="hz-t-2xl hz-w-bold hz-fg hz-mb-2">Recent Incidents</h2>
              <p className="hz-fg-muted">Incident history for the past 90 days</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-card hz-align-center"
            >
              <Activity className="hz-sq-7 hz-fg-muted hz-mx-auto hz-mb-4" />
              <h3 className="hz-t-lg hz-w-medium hz-fg hz-mb-2">No Recent Incidents</h3>
              <p className="hz-fg-muted">
                All systems have been operating normally for the past 90 days.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
          <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg hz-no-pointer" />
          <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg hz-no-pointer" />

          <div className="hz-container-narrow hz-align-center hz-rel hz-z-raised">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hz-t-3xl hz-w-bold hz-fg hz-mb-4"
            >
              Need help with an issue?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="hz-container-narrow hz-mw-md hz-t-lg hz-fg-muted hz-mb-6"
            >
              Our support team is available 24/7 to help you resolve any issues.
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
                className="hz-btn hz-btn-lg hz-transition hz-fg"
              >
                Contact Support
                <ArrowRight className="hz-sq-3 hz-ml-2" />
              </Link>
              <a
                href="https://docs.hanzo.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hz-btn hz-btn-ghost hz-btn-lg hz-transition hz-fg"
              >
                View Documentation
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StatusPage;

import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";
import {
  Download,
  Mail,
  ExternalLink,
  FileText,
  Image,
  Palette,
  Building2,
  Calendar,
  MapPin,
  Users,
  Globe,
  Phone,
} from "lucide-react";


// Company facts
const companyFacts = [
  { label: "Founded", value: "2016" },
  { label: "Headquarters", value: "Los Angeles, CA" },
  { label: "Employees", value: "50+" },
  { label: "Customers", value: "10,000+" },
];

// Press releases / news
const pressReleases = [
  {
    date: "January 2025",
    title: "Hanzo Launches Next-Generation AI Platform",
    description: "Hanzo Industries Inc announces the launch of its comprehensive AI platform for enterprises.",
    link: "/blog",
  },
  {
    date: "December 2024",
    title: "Hanzo Reaches 10,000 Customer Milestone",
    description: "The company celebrates serving over 10,000 customers worldwide with its AI solutions.",
    link: "/blog",
  },
  {
    date: "November 2024",
    title: "Hanzo Dev 2.0 Released",
    description: "Major update to Hanzo Dev brings advanced AI coding capabilities and improved developer experience.",
    link: "/blog",
  },
];

// Logo assets
const logoAssets = [
  {
    name: "Logo - Dark Background",
    description: "White logo for use on dark backgrounds",
    format: "SVG, PNG",
    preview: "hz-bg-surface",
    logoColor: "white",
  },
  {
    name: "Logo - Light Background",
    description: "Black logo for use on light backgrounds",
    format: "SVG, PNG",
    preview: "hz-bg-surface",
    logoColor: "black",
  },
  {
    name: "Icon Only",
    description: "Standalone icon without wordmark",
    format: "SVG, PNG, ICO",
    preview: "hz-bg-surface",
    logoColor: "white",
  },
];

// Social links
const socialLinks = [
  { name: "X (Twitter)", handle: "@hanzoai", href: "https://x.com/hanzoai" },
  { name: "LinkedIn", handle: "hanzoai", href: "https://linkedin.com/company/hanzoai" },
  { name: "GitHub", handle: "hanzoai", href: "https://github.com/hanzoai" },
  { name: "YouTube", handle: "@hanzoai", href: "https://youtube.com/@hanzoai" },
  { name: "Instagram", handle: "@hanzoai", href: "https://instagram.com/hanzoai" },
];

const LogoPreview = ({ isDark }: { isDark: boolean }) => (
  <svg viewBox="0 0 67 67" className="hz-sq-5">
    <path d="M22.21 67V44.6369H0V67H22.21Z" fill={isDark ? "#ffffff" : "#000000"} />
    <path d="M0 44.6369L22.21 46.8285V44.6369H0Z" fill="#DDDDDD" />
    <path d="M66.7038 22.3184H22.2534L0.0878906 44.6367H44.4634L66.7038 22.3184Z" fill={isDark ? "#ffffff" : "#000000"} />
    <path d="M22.21 0H0V22.3184H22.21V0Z" fill={isDark ? "#ffffff" : "#000000"} />
    <path d="M66.7198 0H44.5098V22.3184H66.7198V0Z" fill={isDark ? "#ffffff" : "#000000"} />
    <path d="M66.6753 22.3185L44.5098 20.0822V22.3185H66.6753Z" fill="#DDDDDD" />
    <path d="M66.7198 67V44.6369H44.5098V67H66.7198Z" fill={isDark ? "#ffffff" : "#000000"} />
  </svg>
);

const Press = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`hz-min-h-screen ${isDarkMode ? "hz-bg hz-fg" : "hz-bg-inverse hz-fg-inverse"}`}>
      <Helmet>
        <title>Press - Hanzo Industries Inc</title>
        <meta name="description" content="Press resources, media kit, and contact information for Hanzo Industries Inc. Download logos, brand assets, and find press contacts." />
      </Helmet>

      <Navbar />

      <main className="hz-pt-6 hz-pb-6 hz-px-4">
        <div className="hz-container-wide">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hz-align-center hz-mb-7"
          >
            <div className={`hz-px-4 hz-py-1 hz-r-full hz-t-sm hz-w-medium hz-mb-4 ${
              isDarkMode ? "hz-bg-surface hz-fg-soft" : "hz-bg-inverse hz-fg-faint"
            }`}>
              Press & Media
            </div>
            <h1 className={`hz-t-4xl hz-w-bold hz-mb-5 ${
              isDarkMode
                ? "hz-chrome"
                : "hz-fg-inverse"
            }`}>
              Press Resources
            </h1>
            <p className={`hz-container-narrow hz-t-xl ${isDarkMode ? "hz-fg-muted" : "hz-fg-faint"}`}>
              Everything you need to write about Hanzo Industries Inc. Download our press kit, access brand assets, and find media contacts.
            </p>
          </motion.div>

          {/* Company Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hz-mb-7"
          >
            <div className={`hz-p-6 hz-r-xl hz-bordered ${
              isDarkMode
                ? ""
                : "hz-border-strong"
            }`}>
              <div className="hz-row hz-ai-center hz-gap-3 hz-mb-5">
                <Building2 className={`hz-sq-4 ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`} />
                <h2 className="hz-t-2xl hz-w-bold">About Hanzo Industries Inc</h2>
              </div>
              <p className={`hz-t-lg hz-mb-6 hz-leading-relaxed ${isDarkMode ? "hz-fg-soft" : "hz-fg-faint"}`}>
                Hanzo Industries Inc is an AI technology company building the infrastructure for the next generation of intelligent applications. Founded in 2016 and headquartered in Los Angeles, Hanzo provides enterprise-grade AI platforms, developer tools, and cloud services to companies worldwide. Our mission is to make AI accessible, safe, and beneficial for everyone.
              </p>
              <div className="hz-grid hz-grid-4 hz-gap-5">
                {companyFacts.map((fact) => (
                  <div key={fact.label} className="hz-align-center">
                    <div className="hz-t-3xl hz-w-bold hz-mb-1 hz-fg" >
                      {fact.value}
                    </div>
                    <div className={`hz-t-sm ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`}>
                      {fact.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Press Contact */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hz-mb-7"
          >
            <h2 className="hz-t-2xl hz-w-bold hz-mb-6 hz-row hz-ai-center hz-gap-3">
              <Mail className={`hz-sq-4 ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`} />
              Press Contact
            </h2>
            <div className={`hz-p-6 hz-r-xl hz-bordered ${
              isDarkMode
                ? "hz-bg-surface"
                : "hz-bg-inverse hz-border-strong"
            }`}>
              <div className="hz-grid hz-grid-2 hz-gap-6">
                <div>
                  <h3 className="hz-w-semibold hz-mb-4">Media Inquiries</h3>
                  <div className="hz-stack-3">
                    <a
                      href="mailto:press@hanzo.ai"
                      className={`hz-row hz-ai-center hz-gap-2 hz-transition ${
                        isDarkMode ? "hz-fg-soft hz-hoverable" : "hz-fg-faint hz-link"
                      }`}
                    >
                      <Mail className="hz-sq-2" />
                      press@hanzo.ai
                    </a>
                    <div className={`hz-row hz-ai-center hz-gap-2 ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`}>
                      <Phone className="hz-sq-2" />
                      +1 (424) 335-0550
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="hz-w-semibold hz-mb-4">Headquarters</h3>
                  <div className={`hz-stack-1 ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`}>
                    <p className="hz-w-medium">Hanzo Industries Inc</p>
                    <p>Los Angeles, California</p>
                    <p>United States</p>
                  </div>
                </div>
              </div>
              <div className="hz-mt-6 hz-pt-6 hz-border-t">
                <p className={`hz-t-sm ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`}>
                  For urgent press inquiries, please include "URGENT" in your email subject line. We typically respond within 24 hours.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Brand Assets */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hz-mb-7"
          >
            <div className="hz-row hz-ai-center hz-jc-between hz-mb-6">
              <h2 className="hz-t-2xl hz-w-bold hz-row hz-ai-center hz-gap-3">
                <Palette className={`hz-sq-4 ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`} />
                Brand Assets
              </h2>
              <Link to="/brand">
                <Button variant="outline" size="sm" className="hz-gap-2">
                  <FileText className="hz-sq-2" />
                  Brand Guidelines
                </Button>
              </Link>
            </div>

            <div className="hz-grid hz-grid-3 hz-gap-5 hz-mb-6">
              {logoAssets.map((asset, index) => (
                <div
                  key={asset.name}
                  className={`hz-r-lg hz-bordered hz-clip ${
                    isDarkMode ? "" : "hz-border-strong"
                  }`}
                >
                  <div className={`hz-bh-8 hz-row hz-ai-center hz-jc-center ${asset.preview}`}>
                    <LogoPreview isDark={asset.logoColor === "white"} />
                  </div>
                  <div className={`hz-p-4 ${isDarkMode ? "hz-bg-surface" : "hz-bg-inverse"}`}>
                    <h3 className="hz-w-semibold hz-mb-1">{asset.name}</h3>
                    <p className={`hz-t-sm hz-mb-2 ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`}>
                      {asset.description}
                    </p>
                    <p className={`hz-t-xs ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`}>
                      {asset.format}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hz-row hz-wrap hz-gap-4">
              <Button className="hz-gap-2 hz-bg-inverse" >
                <Download className="hz-sq-2" />
                Download Press Kit (ZIP)
              </Button>
              <Link to="/brand">
                <Button variant="outline" className="hz-gap-2">
                  <Palette className="hz-sq-2" />
                  View Brand Guidelines
                </Button>
              </Link>
            </div>
          </motion.section>

          {/* Recent News */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hz-mb-7"
          >
            <h2 className="hz-t-2xl hz-w-bold hz-mb-6 hz-row hz-ai-center hz-gap-3">
              <Calendar className={`hz-sq-4 ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`} />
              Recent News
            </h2>
            <div className="hz-stack-4">
              {pressReleases.map((release) => (
                <Link
                  key={release.title}
                  to={release.link}
                  className={`hz-p-5 hz-r-lg hz-bordered hz-transition ${
                    isDarkMode
                      ? "hz-bg-surface hz-hoverable"
                      : "hz-bg-inverse hz-border-strong hz-hoverable"
                  }`}
                >
                  <div className="hz-row hz-ai-start hz-jc-between hz-gap-4">
                    <div>
                      <div className={`hz-t-sm hz-mb-2 ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`}>
                        {release.date}
                      </div>
                      <h3 className="hz-w-semibold hz-mb-2">{release.title}</h3>
                      <p className={`hz-t-sm ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`}>
                        {release.description}
                      </p>
                    </div>
                    <ExternalLink className={`hz-sq-3 hz-none hz-invisible hz-transition ${
                      isDarkMode ? "hz-fg-muted" : "hz-fg-muted"
                    }`} />
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Social Media */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hz-mb-7"
          >
            <h2 className="hz-t-2xl hz-w-bold hz-mb-6 hz-row hz-ai-center hz-gap-3">
              <Globe className={`hz-sq-4 ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`} />
              Connect With Us
            </h2>
            <div className="hz-grid hz-grid-5 hz-gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hz-p-4 hz-r-lg hz-bordered hz-align-center hz-transition ${
                    isDarkMode
                      ? "hz-bg-surface hz-hoverable"
                      : "hz-bg-inverse hz-border-strong hz-hoverable"
                  }`}
                >
                  <div className="hz-w-semibold hz-mb-1">{social.name}</div>
                  <div className={`hz-t-sm ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`}>
                    {social.handle}
                  </div>
                </a>
              ))}
            </div>
          </motion.section>

          {/* Executive Team */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="hz-t-2xl hz-w-bold hz-mb-6 hz-row hz-ai-center hz-gap-3">
              <Users className={`hz-sq-4 ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`} />
              Leadership
            </h2>
            <div className={`hz-p-6 hz-r-xl hz-bordered hz-align-center ${
              isDarkMode
                ? "hz-bg-surface"
                : "hz-bg-inverse hz-border-strong"
            }`}>
              <p className={`hz-mb-5 ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`}>
                For executive bios and headshots, please visit our team page or contact our press team.
              </p>
              <div className="hz-row hz-wrap hz-gap-4 hz-jc-center">
                <Link to="/team">
                  <Button variant="outline" className="hz-gap-2">
                    <Users className="hz-sq-2" />
                    View Team
                  </Button>
                </Link>
                <a href="mailto:press@hanzo.ai">
                  <Button className="hz-gap-2 hz-bg-inverse" >
                    <Mail className="hz-sq-2" />
                    Request Executive Bios
                  </Button>
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Press;

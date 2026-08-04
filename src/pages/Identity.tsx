
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { User, UserCheck, Shield, Lock, UserCog, Key, Fingerprint, History } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ChromeText from "@/components/ui/chrome-text";

const Identity = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hz-py-7 hz-rel">
        <div className="hz-abs hz-inset"></div>
        <div className="hz-container hz-rel hz-z-raised">
          <div className="hz-container-narrow hz-align-center hz-mb-7">
            <div className="hz-bg-raised hz-bordered hz-border-strong hz-r-full hz-px-4 hz-py-1 hz-mb-4">
              <span className="hz-fg-muted hz-t-sm hz-w-medium">Identity Management</span>
            </div>
            <h1 className="hz-t-4xl hz-w-bold hz-mb-5 hz-chrome">
              Hanzo Identity
            </h1>
            <p className="hz-t-xl hz-fg-soft hz-mb-6">
              Secure, scalable identity and access management for your applications.
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
          <div className="hz-grid hz-grid-3 hz-gap-5">
            <div className="hz-card hz-col hz-ai-center">
              <div className="hz-sq-8 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-4">
                <User className="hz-sq-6 hz-fg-soft" />
              </div>
              <h3 className="hz-t-lg hz-w-bold hz-mb-2">User Authentication</h3>
              <p className="hz-fg-soft hz-align-center">
                Multi-factor authentication, social logins, and passwordless options
              </p>
            </div>
            
            <div className="hz-card hz-col hz-ai-center">
              <div className="hz-sq-8 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-4">
                <Shield className="hz-sq-6 hz-fg-soft" />
              </div>
              <h3 className="hz-t-lg hz-w-bold hz-mb-2">Access Control</h3>
              <p className="hz-fg-soft hz-align-center">
                Role-based access control, custom claims, and fine-grained permissions
              </p>
            </div>
            
            <div className="hz-card hz-col hz-ai-center">
              <div className="hz-sq-8 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-4">
                <Lock className="hz-sq-6 hz-fg-soft" />
              </div>
              <h3 className="hz-t-lg hz-w-bold hz-mb-2">Enterprise SSO</h3>
              <p className="hz-fg-soft hz-align-center">
                SAML, OIDC, and enterprise identity provider integrations
              </p>
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
              Complete identity management solutions for every authentication and authorization need
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
              <UserCheck className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Multi-factor Authentication</h3>
              <p className="hz-fg-soft">
                Secure access with SMS, email, authenticator apps, and biometric verification.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="hz-card"
            >
              <UserCog className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">User Management</h3>
              <p className="hz-fg-soft">
                Comprehensive tools for user creation, profile management, and account recovery.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="hz-card"
            >
              <Key className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Single Sign-On (SSO)</h3>
              <p className="hz-fg-soft">
                Seamless authentication across multiple applications with SAML and OIDC support.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="hz-card"
            >
              <Shield className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Role-Based Access Control</h3>
              <p className="hz-fg-soft">
                Define and manage permissions with customizable roles and user groups.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="hz-card"
            >
              <Fingerprint className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Passwordless Authentication</h3>
              <p className="hz-fg-soft">
                Secure login options without passwords using magic links, WebAuthn, and biometrics.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="hz-card"
            >
              <History className="hz-sq-6 hz-fg-muted hz-mb-4" />
              <h3 className="hz-t-xl hz-w-bold hz-mb-2">Audit & Compliance</h3>
              <p className="hz-fg-soft">
                Comprehensive logging and reporting for user activities and access attempts.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Enterprise Section */}
      <section className="hz-py-7">
        <div className="hz-container">
          <div className="hz-align-center hz-mb-7">
            <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-4">
              Enterprise-Ready Solutions
            </ChromeText>
            <p className="hz-container-narrow hz-t-xl hz-fg-soft">
              Secure identity management that meets the highest compliance standards
            </p>
          </div>
          
          <div className="hz-grid hz-grid-2 hz-gap-6">
            <div className="hz-card">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Compliance & Security</h3>
              <p className="hz-fg-soft hz-mb-4">
                Meet regulatory requirements with built-in compliance features.
              </p>
              <ul className="hz-stack-2 hz-fg-soft">
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>SOC 2, GDPR, HIPAA, and PCI DSS compliance</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Data residency controls and regional isolation</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Automated security assessments</span>
                </li>
              </ul>
            </div>
            
            <div className="hz-card">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Enterprise Identity</h3>
              <p className="hz-fg-soft hz-mb-4">
                Seamlessly integrate with your existing identity infrastructure.
              </p>
              <ul className="hz-stack-2 hz-fg-soft">
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Active Directory and LDAP integration</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Enterprise SSO with major identity providers</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Custom branding and white-labeling</span>
                </li>
              </ul>
            </div>
            
            <div className="hz-card">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Customer Identity</h3>
              <p className="hz-fg-soft hz-mb-4">
                Create seamless authentication experiences for your customers.
              </p>
              <ul className="hz-stack-2 hz-fg-soft">
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Social login integrations (Google, Facebook, Apple, etc.)</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Progressive profiling and user segmentation</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Consent management for privacy compliance</span>
                </li>
              </ul>
            </div>
            
            <div className="hz-card">
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Developer Experience</h3>
              <p className="hz-fg-soft hz-mb-4">
                Extensive SDKs and tools for seamless integration.
              </p>
              <ul className="hz-stack-2 hz-fg-soft">
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>SDKs for all major languages and frameworks</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Comprehensive API documentation</span>
                </li>
                <li className="hz-row hz-ai-start">
                  <span className="hz-fg-muted hz-mr-2">•</span>
                  <span>Pre-built UI components for auth flows</span>
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
              <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Secure Your Applications</h2>
              <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
                Get started with Hanzo Identity today and implement secure authentication in minutes.
              </p>
              <div className="hz-col-row hz-gap-4 hz-jc-center">
                <Button className="hz-bg-raised hz-fg hz-px-6 hz-py-5 hz-t-lg hz-hoverable">
                  Sign Up Free
                </Button>
                <Button variant="outline" className="hz-border-strong hz-fg hz-px-6 hz-py-5 hz-t-lg hz-hoverable">
                  Read Documentation
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

export default Identity;

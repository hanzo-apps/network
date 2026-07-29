import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, Shield, Users, Zap, Globe, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Enterprise = () => {
  const features = [
    {
      icon: <Shield className="hz-sq-5 hz-fg-muted" />,
      title: "Enterprise Security",
      description: "SOC 2, GDPR, CCPA compliance with advanced encryption and audit logging"
    },
    {
      icon: <Users className="hz-sq-5 hz-fg-muted" />,
      title: "User Management",
      description: "SCIM provisioning, SSO integration, and role-based access control"
    },
    {
      icon: <Globe className="hz-sq-5 hz-fg-muted" />,
      title: "Global Infrastructure",
      description: "Multi-region deployment with 99.99% uptime SLA and dedicated support"
    },
    {
      icon: <Zap className="hz-sq-5 hz-fg-muted" />,
      title: "Custom AI Resources",
      description: "Tailored AI credits, custom models, and dedicated compute infrastructure"
    }
  ];

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Helmet>
        <title>Enterprise Solutions - Hanzo AI Platform</title>
        <meta name="description" content="Scale your business with enterprise-grade AI solutions. Dedicated support, custom integrations, and advanced security features for large organizations." />
      </Helmet>
      
      <Navbar />
      
      <main className="hz-pt-6 hz-pb-6">
        {/* Hero Section */}
        <section className="hz-px-4 hz-mb-7">
          <div className="hz-container-narrow hz-align-center">
            <div className="hz-row hz-jc-center hz-mb-6">
              <Building2 className="hz-sq-8 hz-fg-muted" />
            </div>
            
            <h1 className="hz-t-4xl hz-w-bold hz-mb-5 hz-chrome">
              Enterprise AI Solutions
            </h1>
            
            <p className="hz-container-narrow hz-t-xl hz-fg-muted hz-mb-6 hz-leading-relaxed">
              Scale your business with enterprise-grade AI solutions. Get dedicated support, 
              custom integrations, and advanced security features designed for large organizations.
            </p>
            
            <div className="hz-col-row hz-gap-4 hz-jc-center">
              <Button size="lg" className="hz-bg-inverse hz-fg-inverse hz-px-6 hz-py-3 hz-hoverable">
                <a href="/contact" className="hz-row hz-ai-center">
                  <Phone className="hz-sq-3 hz-mr-2" />
                  Contact Sales
                </a>
              </Button>
              <Button size="lg" variant="outline" className="hz-fg hz-px-6 hz-py-3 hz-hoverable">
                <a href="/pricing">View Pricing</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="hz-px-4 hz-mb-7">
          <div className="hz-container">
            <h2 className="hz-t-3xl hz-w-bold hz-align-center hz-mb-7">Enterprise Features</h2>
            
            <div className="hz-grid hz-grid-4 hz-gap-6">
              {features.map((feature, index) => (
                <div key={index} className="hz-card">
                  <div className="hz-mb-4">{feature.icon}</div>
                  <h3 className="hz-t-xl hz-w-semibold hz-mb-3">{feature.title}</h3>
                  <p className="hz-fg-muted">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Enterprise Section */}
        <section className="hz-px-4 hz-mb-7">
          <div className="hz-container-narrow">
            <h2 className="hz-t-3xl hz-w-bold hz-align-center hz-mb-7">Why Choose Hanzo Enterprise?</h2>
            
            <div className="hz-stack-6">
              <div className="hz-card">
                <h3 className="hz-t-2xl hz-w-semibold hz-mb-4">Dedicated Support</h3>
                <p className="hz-fg-soft hz-t-lg">
                  Get priority support with dedicated account managers, guaranteed response times, 
                  and direct access to our engineering team for critical issues.
                </p>
              </div>
              
              <div className="hz-card">
                <h3 className="hz-t-2xl hz-w-semibold hz-mb-4">Custom Integrations</h3>
                <p className="hz-fg-soft hz-t-lg">
                  Seamlessly integrate with your existing infrastructure, identity providers, 
                  and business systems with our custom integration services.
                </p>
              </div>
              
              <div className="hz-card">
                <h3 className="hz-t-2xl hz-w-semibold hz-mb-4">Flexible Deployment</h3>
                <p className="hz-fg-soft hz-t-lg">
                  Deploy on our cloud, your cloud, or on-premises. We support hybrid deployments 
                  to meet your security and compliance requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="hz-px-4">
          <div className="hz-container-narrow hz-align-center">
            <div className="hz-card">
              <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Ready to Get Started?</h2>
              <p className="hz-fg-muted hz-mb-5 hz-t-lg">
                Contact our enterprise sales team for a personalized demo and custom pricing 
                that meets your organization's unique needs.
              </p>
              <div className="hz-col-row hz-gap-4 hz-jc-center">
                <Button size="lg" className="hz-bg-inverse hz-fg-inverse hz-px-6 hz-py-3 hz-hoverable">
                  <a href="mailto:enterprise@hanzo.ai" className="hz-row hz-ai-center">
                    Schedule Demo
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="hz-fg hz-px-6 hz-py-3 hz-hoverable">
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Enterprise;
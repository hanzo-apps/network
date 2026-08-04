
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { solutions } from "@/constants/navigation";
import { 
  ChevronRight, 
  FileText, 
  ExternalLink, 
  Mail, 
  Phone, 
  Users, 
  BookOpen, 
  Link as LinkIcon,
  Shield,
  CheckCircle,
  ArrowRight,
  Award
} from "lucide-react";
import { getIcon } from "@/constants/iconMappings";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/zen/SectionHeader";
import ChromeText from "@/components/ui/chrome-text";
import { cloudServiceData } from "@/components/index3/cloud-services/cloudServiceData";

const SolutionCapabilities: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, number>>({});
  
  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: (prev[title] || 8) + 8 // Show 8 more items each time
    }));
  };
  
  // Get capabilities and industries from the solutions array
  const capabilities = solutions.find(s => s.title === "Capabilities")?.items || [];

  const renderCapabilityGrid = () => {
    const displayCount = expandedSections["Capabilities"] || 8;
    const displayItems = capabilities.slice(0, displayCount);
    const hasMore = capabilities.length > displayCount;

    return (
      <div className="hz-mb-7">
        <div className="hz-grid hz-grid-3 hz-gap-5">
          <AnimatePresence initial={false}>
            {displayItems.map((item, index) => {
              const Icon = getIcon(item.name);
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="hz-card hz-rel hz-glass hz-clip"
                >
                  <div className="hz-abs hz-inset hz-invisible hz-transition" />
                  <div className="hz-rel">
                    <div className="hz-row hz-ai-center hz-jc-between hz-mb-4">
                      <Icon className="hz-sq-4 hz-fg-muted" strokeWidth={1.5} />
                      <ChevronRight className="hz-sq-3 hz-fg-muted hz-transition hz-link" />
                    </div>
                    <h3 className="hz-t-xl hz-w-semibold hz-mb-2 hz-transition hz-hoverable">
                      {item.name}
                    </h3>
                    <p className="hz-fg-muted hz-t-sm hz-mb-4">
                      {item.description}
                    </p>

                    <div className="hz-row hz-wrap hz-gap-2 hz-mt-4">
                      <Link to={item.href} className="hz-t-xs hz-row hz-ai-center hz-fg-muted hz-link">
                        <LinkIcon className="hz-sq-1 hz-mr-1" /> Learn more
                      </Link>
                      <a href="#" className="hz-t-xs hz-row hz-ai-center hz-fg-muted hz-link">
                        <FileText className="hz-sq-1 hz-mr-1" /> Case study
                      </a>
                      <a href="#" className="hz-t-xs hz-row hz-ai-center hz-fg-muted hz-link">
                        <BookOpen className="hz-sq-1 hz-mr-1" /> White paper
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        {hasMore && (
          <motion.div 
            className="hz-align-center hz-mt-6"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => toggleSection("Capabilities")}
              className="hz-btn hz-btn-ghost hz-fg-muted hz-transition"
            >
              View More Capabilities
              <ChevronRight className="hz-sq-3 hz-ml-2" />
            </button>
          </motion.div>
        )}
      </div>
    );
  };

  const renderCaseStudy = (title: string, industry: string, description: string, image: string = "") => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="hz-r-lg hz-bordered hz-clip"
    >
      <div className="hz-grid hz-grid-5">
        <div className="hz-span-full hz-p-6">
          <div className="hz-row hz-ai-center hz-gap-2 hz-mb-4">
            <span className="hz-t-xs hz-fg-muted">Case Study</span>
            <span className="hz-sq-1 hz-r-full hz-bg-raised"></span>
            <span className="hz-t-xs hz-px-2 hz-py-1 hz-bg-raised hz-r-full hz-fg-soft hz-bordered hz-border-strong">
              {industry}
            </span>
          </div>
          <h3 className="hz-t-2xl hz-w-bold hz-mb-4 hz-fg">{title}</h3>
          <p className="hz-fg-soft hz-mb-5">{description}</p>
          
          <div className="hz-stack-4 hz-mb-5">
            <div className="hz-row hz-ai-start hz-gap-2">
              <CheckCircle className="hz-sq-3 hz-fg-muted hz-none hz-mt-1" />
              <p className="hz-fg-muted">Reduced development time by 40% through AI-powered automation</p>
            </div>
            <div className="hz-row hz-ai-start hz-gap-2">
              <CheckCircle className="hz-sq-3 hz-fg-muted hz-none hz-mt-1" />
              <p className="hz-fg-muted">Improved customer satisfaction scores by 35% with new digital experiences</p>
            </div>
            <div className="hz-row hz-ai-start hz-gap-2">
              <CheckCircle className="hz-sq-3 hz-fg-muted hz-none hz-mt-1" />
              <p className="hz-fg-muted">Achieved 99.99% uptime with Hanzo's enterprise-grade infrastructure</p>
            </div>
          </div>
          
          <Button className="hz-row hz-ai-center hz-gap-2 hz-bg-inverse hz-fg-inverse hz-hoverable">
            Read Full Case Study <ArrowRight size={16} />
          </Button>
        </div>
        <div className="hz-span-2 hz-row hz-ai-center hz-jc-center hz-p-6">
          <div className="hz-col hz-ai-center hz-align-center">
            <Award className="hz-sq-8 hz-fg-soft hz-mb-4" />
            <div className="hz-t-4xl hz-w-bold hz-fg hz-mb-2">200%</div>
            <div className="hz-fg-soft">Return on Investment</div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Generate a featured capability section using cloudServiceData
  const renderFeaturedCapability = () => {
    // Use AI as a featured capability
    const featuredService = cloudServiceData.find(s => s.id === "ai") || cloudServiceData[0];
    const Icon = featuredService.icon;
    
    return (
      <div className="hz-mb-7">
        <SectionHeader 
          title="AI & Machine Learning" 
          description="Transform your business with our enterprise-grade AI solutions"
        />
        
        <div className="hz-grid hz-grid-2 hz-gap-6">
          <div className="hz-card">
            <div className="hz-mb-5">
              <div className="hz-sq-8 hz-r-lg hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-4">
                <Icon className="hz-sq-6 hz-fg-soft" />
              </div>
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Enterprise AI Solutions</h3>
              <p className="hz-fg-soft">
                Deploy, manage, and scale AI models with unmatched performance and security. Our AI platform
                provides seamless access to frontier models, private model customization, and robust security for
                enterprise deployments.
              </p>
            </div>
            
            <div className="hz-stack-4 hz-mb-6">
              {featuredService.features.map((feature, idx) => (
                <div key={idx} className="hz-row hz-ai-start hz-gap-3">
                  <CheckCircle className="hz-sq-3 hz-fg-muted hz-none hz-mt-1" />
                  <p className="hz-fg-soft">{feature}</p>
                </div>
              ))}
            </div>
            
            <div className="hz-row hz-wrap hz-gap-4">
              <Button asChild className="hz-bg-raised hz-hoverable">
                <Link to="/ai">Explore AI Solutions</Link>
              </Button>
              <Button asChild variant="outline" className="hz-border-strong hz-fg-muted hz-link">
                <a href="#">Request Demo</a>
              </Button>
            </div>
          </div>
          
          <div className="hz-stack-5">
            <div className="hz-card">
              <h4 className="hz-t-lg hz-w-semibold hz-mb-3">Case Study: Financial Services</h4>
              <p className="hz-fg-muted hz-mb-4">
                How a leading investment firm used Hanzo's AI platform to analyze market trends and automate 
                investment decisions, resulting in a 32% increase in portfolio performance.
              </p>
              <a href="#" className="hz-fg-muted hz-row hz-ai-center hz-gap-2 hz-link">
                Read case study <ArrowRight size={16} />
              </a>
            </div>
            
            <div className="hz-card">
              <h4 className="hz-t-lg hz-w-semibold hz-mb-3">White Paper: Enterprise AI Adoption</h4>
              <p className="hz-fg-muted hz-mb-4">
                Download our comprehensive guide to implementing AI across large organizations, addressing 
                challenges around security, compliance, and organizational change.
              </p>
              <a href="#" className="hz-fg-muted hz-row hz-ai-center hz-gap-2 hz-link">
                Download white paper <ArrowRight size={16} />
              </a>
            </div>
            
            <div className="hz-card">
              <h4 className="hz-t-lg hz-w-semibold hz-mb-3">Webinar: The Future of GenAI in Enterprise</h4>
              <p className="hz-fg-muted hz-mb-4">
                Join our expert panel discussing how generative AI is transforming enterprise operations and 
                creating new business opportunities across industries.
              </p>
              <a href="#" className="hz-fg-muted hz-row hz-ai-center hz-gap-2 hz-link">
                Register now <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderExpertiseSection = () => (
    <div className="hz-mb-7">
      <SectionHeader 
        title="Technical Expertise"
        description="Our team brings deep expertise across multiple technical domains, helping you implement solutions that drive real business results."
      />
      
      <div className="hz-grid hz-grid-2 hz-gap-6 hz-mb-6">
        <div className="hz-card">
          <h3 className="hz-t-2xl hz-w-bold hz-mb-4 hz-fg">Case Studies</h3>
          <p className="hz-fg-soft hz-mb-5">
            See how we've helped organizations like yours achieve their goals through innovative solutions.
          </p>
          <div className="hz-stack-4">
            <a href="#" className="hz-row hz-ai-center hz-jc-between hz-p-3 hz-r-lg hz-bg-overlay hz-transition hz-hoverable">
              <div className="hz-row hz-ai-center">
                <FileText className="hz-sq-3 hz-fg-muted hz-mr-3" />
                <span className="hz-fg">Financial Services Digital Transformation</span>
              </div>
              <ExternalLink className="hz-sq-2 hz-fg-muted" />
            </a>
            <a href="#" className="hz-row hz-ai-center hz-jc-between hz-p-3 hz-r-lg hz-bg-overlay hz-transition hz-hoverable">
              <div className="hz-row hz-ai-center">
                <FileText className="hz-sq-3 hz-fg-muted hz-mr-3" />
                <span className="hz-fg">Healthcare AI Implementation</span>
              </div>
              <ExternalLink className="hz-sq-2 hz-fg-muted" />
            </a>
            <a href="#" className="hz-row hz-ai-center hz-jc-between hz-p-3 hz-r-lg hz-bg-overlay hz-transition hz-hoverable">
              <div className="hz-row hz-ai-center">
                <FileText className="hz-sq-3 hz-fg-muted hz-mr-3" />
                <span className="hz-fg">Retail Analytics Platform</span>
              </div>
              <ExternalLink className="hz-sq-2 hz-fg-muted" />
            </a>
          </div>
          <div className="hz-mt-5 hz-align-center">
            <Button variant="outline" className="hz-border-strong hz-fg-muted hz-link">
              View all case studies <ChevronRight className="hz-sq-2 hz-ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="hz-card">
          <h3 className="hz-t-2xl hz-w-bold hz-mb-4 hz-fg">White Papers</h3>
          <p className="hz-fg-soft hz-mb-5">
            Access our thought leadership and research on the latest industry trends and technologies.
          </p>
          <div className="hz-stack-4">
            <a href="#" className="hz-row hz-ai-center hz-jc-between hz-p-3 hz-r-lg hz-bg-overlay hz-transition hz-hoverable">
              <div className="hz-row hz-ai-center">
                <BookOpen className="hz-sq-3 hz-fg-muted hz-mr-3" />
                <span className="hz-fg">The Future of AI in Enterprise</span>
              </div>
              <ExternalLink className="hz-sq-2 hz-fg-muted" />
            </a>
            <a href="#" className="hz-row hz-ai-center hz-jc-between hz-p-3 hz-r-lg hz-bg-overlay hz-transition hz-hoverable">
              <div className="hz-row hz-ai-center">
                <BookOpen className="hz-sq-3 hz-fg-muted hz-mr-3" />
                <span className="hz-fg">Cloud Security Best Practices</span>
              </div>
              <ExternalLink className="hz-sq-2 hz-fg-muted" />
            </a>
            <a href="#" className="hz-row hz-ai-center hz-jc-between hz-p-3 hz-r-lg hz-bg-overlay hz-transition hz-hoverable">
              <div className="hz-row hz-ai-center">
                <BookOpen className="hz-sq-3 hz-fg-muted hz-mr-3" />
                <span className="hz-fg">Digital Transformation Playbook</span>
              </div>
              <ExternalLink className="hz-sq-2 hz-fg-muted" />
            </a>
          </div>
          <div className="hz-mt-5 hz-align-center">
            <Button variant="outline" className="hz-border-strong hz-fg-muted hz-link">
              View all white papers <ChevronRight className="hz-sq-2 hz-ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderPartnerSection = () => (
    <div className="hz-card hz-mb-7">
      <SectionHeader 
        title="Expert Partners" 
        description="Access our specialized agencies and expert talent to accelerate your success"
      />
      
      <div className="hz-grid hz-grid-2 hz-gap-6">
        <div className="hz-card hz-transition hz-card-interactive">
          <div className="hz-p-3 hz-r-lg hz-bg-raised hz-self-start hz-mb-4">
            <Users className="hz-sq-4 hz-fg-muted" strokeWidth={1.5} />
          </div>
          <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-3">Hanzo Agency</h3>
          <p className="hz-fg-soft hz-mb-4">
            Our AI-powered creative agency helps brands transform their digital presence with cutting-edge design, 
            content, and marketing strategies powered by artificial intelligence.
          </p>
          <div className="hz-row hz-wrap hz-gap-4">
            <a 
              href="https://hanzo.agency" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hz-btn hz-gap-2 hz-fg hz-transition"
            >
              <span>Visit Hanzo Agency</span>
              <ExternalLink size={14} />
            </a>
            <a 
              href="/contact" 
              className="hz-btn hz-btn-ghost hz-gap-2 hz-fg-muted hz-transition"
            >
              <span>Contact us</span>
              <Mail size={14} />
            </a>
          </div>
        </div>
        <div className="hz-card hz-transition hz-card-interactive">
          <div className="hz-p-3 hz-r-lg hz-bg-raised hz-self-start hz-mb-4">
            <Shield className="hz-sq-4 hz-fg-muted" strokeWidth={1.5} />
          </div>
          <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-3">Sensei Group</h3>
          <p className="hz-fg-soft hz-mb-4">
            Our collective of fractional CXOs and industry experts help enterprises implement transformative 
            technology solutions and drive strategic growth initiatives.
          </p>
          <div className="hz-row hz-wrap hz-gap-4">
            <a 
              href="https://sensei.group" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hz-btn hz-gap-2 hz-fg hz-transition"
            >
              <span>Visit Sensei Group</span>
              <ExternalLink size={14} />
            </a>
            <a 
              href="tel:+1234567890" 
              className="hz-btn hz-btn-ghost hz-gap-2 hz-fg-muted hz-transition"
            >
              <span>Schedule a call</span>
              <Phone size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      
      <main className="hz-pt-6 hz-pb-6 hz-px-4">
        <div className="hz-container">
          <div className="hz-container-narrow hz-align-center hz-mb-7">
            <div className="hz-mb-4">
              <Link to="/solutions" className="hz-t-sm hz-fg-muted hz-row hz-ai-center hz-gap-1 hz-link">
                <ChevronRight className="hz-sq-2" /> Back to Solutions
              </Link>
            </div>
            <ChromeText as="h1" className="hz-t-4xl hz-w-bold hz-mb-5">
              Technical Capabilities
            </ChromeText>
            <p className="hz-fg-muted hz-t-lg">
              Our comprehensive technical capabilities span across a wide range of disciplines, empowering your 
              organization to stay at the forefront of innovation.
            </p>
          </div>

          {/* Featured Capability Section (AI) */}
          {renderFeaturedCapability()}
          
          {/* Case Study */}
          <div className="hz-mb-7">
            <SectionHeader 
              title="Success Stories" 
              description="Real-world results from our enterprise clients"
            />
            
            <div className="hz-stack-6">
              {renderCaseStudy(
                "Digital Transformation for Global Financial Institution", 
                "Financial Services",
                "We helped a Fortune 500 financial services company modernize their legacy systems and implement AI-powered customer experiences, resulting in 45% faster transaction processing and 68% improved customer satisfaction."
              )}
              
              {renderCaseStudy(
                "Cloud Migration & Modernization for Healthcare Provider", 
                "Healthcare",
                "Our team migrated a healthcare provider's critical patient systems to a secure, compliant cloud infrastructure while implementing real-time analytics for improved patient outcomes and operational efficiency."
              )}
            </div>
          </div>
          
          {/* All Capabilities Grid */}
          <div className="hz-mb-7">
            <SectionHeader 
              title="Explore Our Capabilities" 
              description="Comprehensive technical expertise to transform your business"
            />
            {renderCapabilityGrid()}
          </div>
          
          {/* Resources Section */}
          {renderExpertiseSection()}
          
          {/* Partner Section */}
          {renderPartnerSection()}
          
          {/* CTA Section */}
          <div className="hz-mt-7 hz-align-center">
            <div className="hz-container-narrow">
              <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Ready to Transform Your Business?</h2>
              <p className="hz-fg-muted hz-mb-6">
                Connect with our team to learn how our capabilities can help you achieve your goals.
              </p>
              <div className="hz-row hz-wrap hz-jc-center hz-gap-4">
                <a
                  href="/contact"
                  className="hz-btn hz-fg hz-transition"
                >
                  Get Started
                  <ChevronRight className="hz-sq-3 hz-ml-2" />
                </a>
                <a
                  href="tel:+1234567890"
                  className="hz-btn hz-btn-ghost hz-fg-muted hz-transition"
                >
                  Schedule a Call
                  <Phone className="hz-sq-3 hz-ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SolutionCapabilities;

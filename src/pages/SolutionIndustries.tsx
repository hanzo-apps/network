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
  Building,
  Briefcase,
  Heart,
  ShoppingBag,
  ServerCrash,
  CheckCircle,
  ArrowRight,
  ArrowUpRight
} from "lucide-react";
import { getIcon } from "@/constants/iconMappings";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/zen/SectionHeader";
import ChromeText from "@/components/ui/chrome-text";

const SolutionIndustries: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, number>>({});
  const [activeIndustry, setActiveIndustry] = useState<string>("Financial Services");
  
  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: (prev[title] || 8) + 8 // Show 8 more items each time
    }));
  };
  
  // Get industries from the solutions array
  const industries = solutions.find(s => s.title === "Industries")?.items || [];

  const renderIndustryGrid = () => {
    const displayCount = expandedSections["Industries"] || 8;
    const displayItems = industries.slice(0, displayCount);
    const hasMore = industries.length > displayCount;

    return (
      <div className="hz-mb-7">
        <div className="hz-grid hz-grid-3 hz-gap-5">
          <AnimatePresence initial={false}>
            {displayItems.map((item, index) => {
              const Icon = getIcon(item);
              return (
                <motion.div
                  key={item}
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
                      {item}
                    </h3>
                    <p className="hz-fg-muted hz-t-sm hz-mb-4">
                      Explore our specialized solutions for the {item.toLowerCase()} industry, designed to address 
                      your sector's unique challenges.
                    </p>
                    
                    <div className="hz-row hz-wrap hz-gap-2 hz-mt-4">
                      <button 
                        onClick={() => setActiveIndustry(item)}
                        className="hz-t-xs hz-row hz-ai-center hz-fg-muted hz-link"
                      >
                        <LinkIcon className="hz-sq-1 hz-mr-1" /> Learn more
                      </button>
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
              onClick={() => toggleSection("Industries")}
              className="hz-btn hz-btn-ghost hz-fg-muted hz-transition"
            >
              View More Industries
              <ChevronRight className="hz-sq-3 hz-ml-2" />
            </button>
          </motion.div>
        )}
      </div>
    );
  };

  const renderIndustryContent = () => {
    const industryData: Record<string, {
      icon: React.ReactNode,
      color: string,
      description: string,
      challenges: string[],
      solutions: string[],
      caseStudy: {
        title: string,
        description: string,
        results: string[]
      }
    }> = {
      "Financial Services": {
        icon: <Building className="hz-sq-6 hz-fg-muted" />,
        color: "blue",
        description: "We help banks, insurance companies, and investment firms transform their digital infrastructure, improve security, and deliver innovative customer experiences.",
        challenges: [
          "Legacy system modernization",
          "Regulatory compliance",
          "Digital customer experience",
          "Fraud detection and prevention",
          "Data security and privacy"
        ],
        solutions: [
          "Core banking system modernization",
          "AI-powered fraud detection",
          "Open banking API platforms",
          "Customer data platforms",
          "Regulatory reporting automation"
        ],
        caseStudy: {
          title: "Digital Transformation for Global Bank",
          description: "We helped a Fortune 500 bank modernize their legacy systems and implement AI-powered customer experiences, resulting in 45% faster transaction processing and improved satisfaction.",
          results: [
            "45% faster transaction processing",
            "68% improvement in customer satisfaction",
            "30% reduction in operational costs",
            "99.99% system uptime"
          ]
        }
      },
      "Healthcare": {
        icon: <Heart className="hz-sq-6 hz-fg-muted" />,
        color: "pink",
        description: "Our healthcare solutions help providers, payers, and life sciences companies improve patient outcomes, optimize operations, and ensure security and compliance.",
        challenges: [
          "Interoperability of health data",
          "Patient data security and HIPAA compliance",
          "Clinical workflow optimization",
          "Remote patient monitoring",
          "Population health management"
        ],
        solutions: [
          "Healthcare data platforms",
          "Telemedicine solutions",
          "Clinical decision support systems",
          "Medical device integration",
          "Healthcare analytics and reporting"
        ],
        caseStudy: {
          title: "AI-Powered Patient Care Platform",
          description: "We developed a secure, HIPAA-compliant platform that uses AI to analyze patient data and provide real-time clinical decision support, improving outcomes and reducing costs.",
          results: [
            "22% improvement in clinical outcomes",
            "35% reduction in readmission rates",
            "40% time savings for clinical staff",
            "100% HIPAA compliance maintained"
          ]
        }
      },
      "Retail": {
        icon: <ShoppingBag className="hz-sq-6 hz-fg-muted" />,
        color: "green",
        description: "We help retailers create seamless omnichannel experiences, optimize supply chains, and leverage data for personalized customer engagement.",
        challenges: [
          "Omnichannel customer experience",
          "Supply chain optimization",
          "Inventory management",
          "Customer analytics and personalization",
          "E-commerce platform performance"
        ],
        solutions: [
          "Unified commerce platforms",
          "AI-driven demand forecasting",
          "Customer data and analytics solutions",
          "In-store digital experiences",
          "Intelligent inventory management"
        ],
        caseStudy: {
          title: "Omnichannel Transformation for Global Retailer",
          description: "We helped a global retailer unify their online and offline shopping experiences while implementing AI-powered customer analytics, resulting in significant sales growth.",
          results: [
            "28% increase in online sales",
            "15% increase in in-store conversions",
            "42% improvement in inventory accuracy",
            "3x faster website performance"
          ]
        }
      },
      "Technology": {
        icon: <ServerCrash className="hz-sq-6 hz-fg-muted" />,
        color: "indigo",
        description: "We help technology companies innovate faster, scale efficiently, and deliver secure, high-performance products and services.",
        challenges: [
          "Accelerating innovation cycles",
          "Scaling infrastructure efficiently",
          "Security and compliance",
          "Developer productivity",
          "Product analytics and telemetry"
        ],
        solutions: [
          "DevOps automation platforms",
          "Scalable cloud architectures",
          "AI-powered development tools",
          "Product analytics frameworks",
          "Security and compliance automation"
        ],
        caseStudy: {
          title: "AI-Powered Development Platform for SaaS Provider",
          description: "We created a development acceleration platform that helped a leading SaaS provider reduce development cycles and improve product quality while maintaining security.",
          results: [
            "60% faster development cycles",
            "40% reduction in bugs and issues",
            "85% improvement in developer productivity",
            "30% reduction in infrastructure costs"
          ]
        }
      }
    };

    const industry = industryData[activeIndustry] || industryData["Financial Services"];
    const colorClasses = {
      blue: "from-neutral-800/30 to-neutral-800/10 border-neutral-500/20",
      pink: "from-neutral-900/30 to-neutral-900/10 border-neutral-500/20",
      green: "from-neutral-800/30 to-neutral-800/10 border-neutral-500/20",
      indigo: "from-neutral-900/30 to-neutral-900/10 border-neutral-500/20"
    };
    
    return (
      <motion.div
        key={activeIndustry}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hz-mb-7"
      >
        <div className={` ${colorClasses[industry.color as keyof typeof colorClasses]} hz-r-lg hz-p-6 hz-mb-6`}>
          <div className="hz-col-row hz-gap-6">
            <div className="hz-bg-surface hz-r-full hz-p-5 hz-inline">
              {industry.icon}
            </div>
            <div>
              <h3 className="hz-t-2xl hz-w-bold hz-mb-4">{activeIndustry} Solutions</h3>
              <p className="hz-fg-soft">{industry.description}</p>
            </div>
          </div>
        </div>

        <div className="hz-grid hz-grid-2 hz-gap-6 hz-mb-6">
          <div>
            <h4 className="hz-t-xl hz-w-semibold hz-mb-5 hz-row hz-ai-center">
              <span className="hz-sq-5 hz-bg-raised hz-r-full hz-inline hz-ai-center hz-jc-center hz-mr-3 hz-t-sm">1</span>
              Industry Challenges
            </h4>
            <ul className="hz-stack-4">
              {industry.challenges.map((challenge, idx) => (
                <li key={idx} className="hz-card hz-row hz-ai-start hz-gap-3">
                  <CheckCircle className="hz-sq-3 hz-fg-muted hz-none hz-mt-1" />
                  <span className="hz-fg-soft">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="hz-t-xl hz-w-semibold hz-mb-5 hz-row hz-ai-center">
              <span className="hz-sq-5 hz-bg-raised hz-r-full hz-inline hz-ai-center hz-jc-center hz-mr-3 hz-t-sm">2</span>
              Our Solutions
            </h4>
            <ul className="hz-stack-4">
              {industry.solutions.map((solution, idx) => (
                <li key={idx} className="hz-card hz-row hz-ai-start hz-gap-3">
                  <ArrowRight className="hz-sq-3 hz-fg-muted hz-none hz-mt-1" />
                  <span className="hz-fg-soft">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="hz-card hz-mb-6">
          <div className="hz-grid hz-grid-5 hz-gap-6">
            <div className="">
              <h4 className="hz-t-xl hz-w-semibold hz-mb-4">Case Study: {industry.caseStudy.title}</h4>
              <p className="hz-fg-soft hz-mb-5">{industry.caseStudy.description}</p>
              <Button className="hz-mb-6">Read Full Case Study <ArrowUpRight className="hz-sq-2 hz-ml-2" /></Button>
              
              <div className="hz-grid hz-grid-2 hz-gap-5">
                {industry.caseStudy.results.map((result, idx) => (
                  <div key={idx} className="hz-card">
                    <CheckCircle className="hz-sq-3 hz-fg-muted hz-mb-2" />
                    <p className="hz-fg-soft">{result}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hz-row hz-ai-center hz-jc-center">
              <div className="hz-card hz-col hz-ai-center">
                <Briefcase className="hz-sq-8 hz-fg-muted hz-mb-4" />
                <span className="hz-t-3xl hz-w-bold hz-fg hz-mb-2">25+</span>
                <span className="hz-fg-soft">{activeIndustry} Clients</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hz-grid hz-grid-2 hz-gap-5">
          <a 
            href="#" 
            className="hz-card hz-transition hz-card-interactive"
          >
            <div className="hz-row hz-ai-center hz-gap-3 hz-mb-3">
              <FileText className="hz-sq-3 hz-fg-muted" />
              <h4 className="hz-w-medium">White Paper</h4>
            </div>
            <p className="hz-fg-muted">
              Download our industry trends report: The Future of {activeIndustry} Technology
            </p>
            <div className="hz-mt-4 hz-fg-muted hz-row hz-ai-center hz-gap-2">
              Download Now <ArrowRight size={16} />
            </div>
          </a>
          
          <a 
            href="#" 
            className="hz-card hz-transition hz-card-interactive"
          >
            <div className="hz-row hz-ai-center hz-gap-3 hz-mb-3">
              <BookOpen className="hz-sq-3 hz-fg-muted" />
              <h4 className="hz-w-medium">Webinar</h4>
            </div>
            <p className="hz-fg-muted">
              Register for our upcoming webinar: Digital Transformation in {activeIndustry}
            </p>
            <div className="hz-mt-4 hz-fg-muted hz-row hz-ai-center hz-gap-2">
              Register Now <ArrowRight size={16} />
            </div>
          </a>
        </div>
      </motion.div>
    );
  };

  const renderExpertiseSection = () => (
    <div className="hz-mb-7">
      <SectionHeader 
        title="Industry Insights"
        description="Gain a competitive edge with our industry-specific expertise and proven methodologies tailored to your sector's unique challenges."
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
                <span className="hz-fg">The Future of AI in Financial Services</span>
              </div>
              <ExternalLink className="hz-sq-2 hz-fg-muted" />
            </a>
            <a href="#" className="hz-row hz-ai-center hz-jc-between hz-p-3 hz-r-lg hz-bg-overlay hz-transition hz-hoverable">
              <div className="hz-row hz-ai-center">
                <BookOpen className="hz-sq-3 hz-fg-muted hz-mr-3" />
                <span className="hz-fg">Healthcare Interoperability Challenges</span>
              </div>
              <ExternalLink className="hz-sq-2 hz-fg-muted" />
            </a>
            <a href="#" className="hz-row hz-ai-center hz-jc-between hz-p-3 hz-r-lg hz-bg-overlay hz-transition hz-hoverable">
              <div className="hz-row hz-ai-center">
                <BookOpen className="hz-sq-3 hz-fg-muted hz-mr-3" />
                <span className="hz-fg">Digital Transformation in Retail</span>
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
              Industry Solutions
            </ChromeText>
            <p className="hz-fg-muted hz-t-lg">
              We deliver specialized solutions across a wide range of industries, tailored to address your unique 
              challenges and opportunities.
            </p>
          </div>

          <div className="hz-mb-7">
            <div className="hz-row hz-scroll-x hz-pb-4 hz-gap-2 hz-jc-center">
              {["Financial Services", "Healthcare", "Retail", "Technology"].map((industry) => (
                <button
                  key={industry}
                  onClick={() => setActiveIndustry(industry)}
                  className={`hz-px-4 hz-py-2 hz-r-full hz-whitespace-nowrap hz-transition ${
                    activeIndustry === industry
                      ? "hz-bg-raised hz-fg"
                      : "hz-bg-surface hz-fg-soft hz-hoverable"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          {/* Active Industry Section */}
          {renderIndustryContent()}
          
          {/* All Industries Grid */}
          <div className="hz-mb-7">
            <SectionHeader 
              title="Explore All Industries" 
              description="Comprehensive solutions for every sector"
            />
            {renderIndustryGrid()}
          </div>
          
          {/* Resources Section */}
          {renderExpertiseSection()}
          
          {/* Partner Section */}
          {renderPartnerSection()}
          
          {/* CTA Section */}
          <div className="hz-mt-7 hz-align-center">
            <div className="hz-container-narrow">
              <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Industry-Specific Solutions</h2>
              <p className="hz-fg-muted hz-mb-6">
                Discover how our tailored industry solutions can address your specific challenges and opportunities.
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
                  href="mailto:solutions@hanzo.ai"
                  className="hz-btn hz-btn-ghost hz-fg-muted hz-transition"
                >
                  Email Us
                  <Mail className="hz-sq-3 hz-ml-2" />
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

export default SolutionIndustries;

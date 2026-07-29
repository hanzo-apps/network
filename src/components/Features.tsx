import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, BarChart3, CreditCard, Wand2, Bot, Network, Cpu, Leaf, Brain, Target, Blocks, Cloud, HardDrive, Code, Shield, KeyRound, Bot as BotIcon, Monitor, ChevronLeft, ChevronRight, Globe, LineChart, Building2, GraduationCap, Newspaper, ShoppingCart, Users, DollarSign, Wrench } from "lucide-react";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useEffect, useRef, useState } from "react";
import { getIcon } from "@/constants/iconMappings";

const allFeatures = [{
  icon: <Wand2 className="hz-sq-4" />,
  title: "Hanzo App",
  description: "Design, build, and launch full-featured applications with our generative App Builder. Native analytics and platform API integration."
}, {
  icon: <Bot className="hz-sq-4" />,
  title: "Hanzo Bot",
  description: "Launch agentic frameworks effortlessly using our drag-and-drop GUI to build and iterate on scalable agentic workflows."
}, {
  icon: <Code2 className="hz-sq-4" />,
  title: "Hanzo Code",
  description: "Open Source IDE that embeds AI agents directly into your coding workflow, accelerating development and deployment."
}, {
  icon: <Cpu className="hz-sq-4" />,
  title: "Hanzo Dev",
  description: "24/7 AI engineers that ingest your data and code to build, refine, test, and engineer alongside you autonomously."
}, {
  icon: <Network className="hz-sq-4" />,
  title: "Hanzo Router",
  description: "Access hosted and private models with dynamic routing, fallback systems, and advanced caching through our scalable AI platform."
}, {
  icon: <BarChart3 className="hz-sq-4" />,
  title: "Deep Learning Cloud",
  description: "Cloud orchestration with rapid deployment, auto-scaling, and NVIDIA hardware access through NVIDIA Inception Program."
}, {
  icon: <Leaf className="hz-sq-4" />,
  title: "Green Infrastructure",
  description: "1 Gigawatt of green energy secured at industry-leading prices, powering sustainable AI development and deployment."
}, {
  icon: <CreditCard className="hz-sq-4" />,
  title: "Hanzo Network",
  description: "Decentralized compute fabric allocating half its capacity to building next-gen frontier models in the open."
}];

const industriesData = [{
  name: "Cloud",
  icon: <Globe className="hz-sq-3 hz-fg-muted hz-mb-2" />,
  image: "/img/a6b76d5c-59a9-4ba8-897e-69558005b6ed.png",
  description: "Cloud orchestration with rapid deployment"
}, {
  name: "Cybersecurity",
  icon: <Shield className="hz-sq-3 hz-fg-muted hz-mb-2" />,
  image: "/img/97902904-f9ea-475e-9c65-5664eab422e5.png",
  description: "Advanced security solutions for business"
}, {
  name: "Data and Artificial Intelligence",
  icon: <Brain className="hz-sq-3 hz-fg-muted hz-mb-2" />,
  image: "/img/a31568fe-aa1f-4933-add1-b981564f25b9.png",
  description: "Cutting-edge AI solutions for business transformation"
}, {
  name: "Digital Engineering and Manufacturing",
  icon: <Code className="hz-sq-3 hz-fg-muted hz-mb-2" />,
  image: "/img/a1e0f18b-41a7-4f58-ac3b-7272aa8e7a77.png",
  description: "Engineering solutions for manufacturing"
}, {
  name: "Emerging Technology",
  icon: <Cpu className="hz-sq-3 hz-fg-muted hz-mb-2" />,
  image: "/img/41fa31ba-8c5b-4553-afeb-ba51591f7024.png",
  description: "Frontier technology solutions"
}, {
  name: "Ecosystem Partners",
  icon: <Network className="hz-sq-3 hz-fg-muted hz-mb-2" />,
  image: "/img/96a9379c-acc3-4170-a96f-964fb8773dd3.png",
  description: "Collaborative partnership networks"
}, {
  name: "Finance and Risk Management",
  icon: <DollarSign className="hz-sq-3 hz-fg-muted hz-mb-2" />,
  image: "/img/22f3cbb5-8cd9-48e2-92bc-8b084da1f4ff.png",
  description: "Financial solutions and risk assessment"
}, {
  name: "Infrastructure and Capital Projects",
  icon: <Building2 className="hz-sq-3 hz-fg-muted hz-mb-2" />,
  image: "/img/f1241c85-7df8-45b5-a92a-263554ff10cd.png",
  description: "Infrastructure development and capital management"
}, {
  name: "Learning",
  icon: <GraduationCap className="hz-sq-3 hz-fg-muted hz-mb-2" />,
  image: "/img/37d6bc13-a83a-4de2-a8d4-a67f2339598e.png",
  description: "Educational technology and learning solutions"
}, {
  name: "Marketing and Experience",
  icon: <Newspaper className="hz-sq-3 hz-fg-muted hz-mb-2" />,
  image: "/img/96d1e3da-614a-4809-98e4-30d8a868dc11.png",
  description: "Marketing solutions and experience design"
}, {
  name: "Metaverse",
  icon: <LineChart className="hz-sq-3 hz-fg-muted hz-mb-2" />,
  image: "/img/65ace6da-40cf-401a-9f0a-e3e757f00633.png",
  description: "Metaverse development and integration"
}, {
  name: "Sales and Commerce",
  icon: <ShoppingCart className="hz-sq-3 hz-fg-muted hz-mb-2" />,
  image: "/placeholder.svg",
  description: "Sales enablement and commerce solutions"
}];

const industriesSectors = [{
  name: "Artificial Intelligence",
  image: "/img/a31568fe-aa1f-4933-add1-b981564f25b9.png",
  description: "Cutting-edge AI solutions for business transformation"
}, {
  name: "Financial Services",
  image: "/placeholder.svg",
  description: "Innovative solutions for banking and finance sectors"
}, {
  name: "Manufacturing & Mobility",
  image: "/placeholder.svg",
  description: "Optimizing operations and driving innovation in manufacturing"
}, {
  name: "Healthcare",
  image: "/placeholder.svg",
  description: "Digital transformation for healthcare providers"
}, {
  name: "Retail & Consumer",
  image: "/placeholder.svg",
  description: "Creating exceptional customer experiences"
}, {
  name: "Technology",
  image: "/placeholder.svg",
  description: "Empowering the tech industry with advanced solutions"
}, {
  name: "Energy & Utilities",
  image: "/placeholder.svg",
  description: "Smart solutions for sustainable energy management"
}, {
  name: "Telecommunications",
  image: "/placeholder.svg",
  description: "Next-generation communication infrastructure"
}, {
  name: "Education",
  image: "/placeholder.svg",
  description: "Digital learning platforms and educational technology"
}, {
  name: "Government",
  image: "/placeholder.svg",
  description: "Digital transformation for public services"
}];

const Features = () => {
  const displayedFeatures = allFeatures.slice(0, 16);
  const hasMoreFeatures = allFeatures.length > 16;
  const industryIcons = {
    "Artificial Intelligence": <Brain className="hz-sq-3 hz-fg-muted hz-mb-2" />,
    "Adtech": <Target className="hz-sq-3 hz-fg-muted hz-mb-2" />,
    "Blockchain": <Blocks className="hz-sq-3 hz-fg-muted hz-mb-2" />,
    "Cloud Computing": <Cloud className="hz-sq-3 hz-fg-muted hz-mb-2" />,
    "GPU": <Cpu className="hz-sq-3 hz-fg-muted hz-mb-2" />,
    "Hardware": <HardDrive className="hz-sq-3 hz-fg-muted hz-mb-2" />,
    "Machine Learning": <Brain className="hz-sq-3 hz-fg-muted hz-mb-2" />,
    "Software": <Code className="hz-sq-3 hz-fg-muted hz-mb-2" />,
    "Cyber Security": <Shield className="hz-sq-3 hz-fg-muted hz-mb-2" />,
    "Confidential Computing": <KeyRound className="hz-sq-3 hz-fg-muted hz-mb-2" />
  };
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };
  const testimonialText = "We've helped businesses and individuals harness the power of AI to drive growth, efficiency, and innovation.";
  const testimonialCharacters = testimonialText.split("");
  const textContainerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1
      }
    }
  };
  const characterVariants = {
    hidden: {
      opacity: 0,
      y: 5
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15
      }
    }
  };
  const industriesSectionRef = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: industriesSectionRef,
    offset: ["start end", "end start"]
  });
  const industriesTitleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const industriesDescriptionY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const industriesCarouselY = useTransform(scrollYProgress, [0, 1], [50, -20]);
  const [api, setApi] = useState<any>(null);
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);
  return (
    <>
      <div className="hz-w-full hz-bg hz-py-6 hz-px-4">
        <div className="hz-container">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="hz-w-full hz-clip hz-r-lg"
          >
            <img 
              src="/img/684632bf-21ce-4823-b54d-aad69037446f.png" 
              alt="AI Human Interface Visualization" 
              className="hz-w-full hz-object-cover"
            />
          </motion.div>
        </div>
      </div>
      
      <section id="features" className="hz-py-7 hz-bg">
        <div className="hz-container hz-py-7">
          <div className="hz-align-center">
            <motion.h2 initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5
            }} className="hz-t-3xl hz-display hz-fg">
              Leading the Fourth Industrial Revolution
            </motion.h2>
            <motion.p initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.1
            }} className="hz-container-narrow hz-mt-4 hz-t-lg hz-fg-soft">
              Hanzo is a developer-first AI platform bringing frontier research directly into your workflow with open, private, and decentralized solutions.
            </motion.p>
          </div>

          <div className="hz-grid hz-grid-4 hz-mt-7 hz-gap-6">
            {displayedFeatures.map((feature, index) => <motion.div key={feature.title} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} className="hz-rel hz-p-5 hz-glass hz-r-lg hz-shadow-lg hz-ring hz-transition hz-col hz-ai-center hz-align-center hz-mt-0 hz-mb-0">
                <div className="hz-p-2 hz-bg-surface hz-w-fit hz-r-lg hz-fg">
                  {feature.icon}
                </div>
                <h3 className="hz-mt-4 hz-t-xl hz-w-semibold hz-fg">
                  {feature.title}
                </h3>
                <p className="hz-mt-2 hz-fg-soft">{feature.description}</p>
              </motion.div>)}
          </div>

          {hasMoreFeatures && <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="hz-mt-7 hz-align-center">
            <Button variant="ghost" onClick={() => window.location.href = '/solutions'} className="hz-fg hz-transition hz-hoverable">
              View All Solutions
            </Button>
          </motion.div>}
        </div>

        <div className="hz-container hz-py-7 hz-border-t">
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="hz-align-center hz-mb-7">
            <h2 className="hz-display hz-fg hz-chrome hz-t-4xl">
              Hanzo has an impressive track record...
            </h2>
          </motion.div>
          
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="hz-grid hz-grid-3 hz-gap-6">
            <div className="hz-p-5 hz-glass hz-r-lg hz-ring">
              <div className="hz-mw-sm hz-clip">
                <motion.div variants={textContainerVariants} initial="hidden" whileInView="visible" viewport={{
              once: true,
              amount: 0.8
            }} className="hz-t-lg hz-fg-soft hz-clip">
                  <span>We've helped businesses and individuals harness the </span> 
                  <span className="hz-fg hz-w-bold">power of AI</span>
                  <span> to drive growth, efficiency, and innovation.</span>
                </motion.div>
                <Button variant="outline" className="hz-mt-5 hz-bg-inverse hz-fg-inverse hz-hoverable">
                  Our Testimonial
                </Button>
              </div>
            </div>
            
            <div className="hz-grid hz-grid-2 hz-gap-6">
              <div className="hz-p-5 hz-glass hz-r-lg hz-ring hz-col hz-ai-center hz-align-center">
                <h3 className="hz-t-4xl hz-w-medium hz-fg">1M<sup>+</sup></h3>
                <p className="hz-mt-2 hz-fg-soft">Users benefiting from our AI-powered solutions</p>
              </div>
              
              <div className="hz-p-5 hz-glass hz-r-lg hz-ring hz-col hz-ai-center hz-align-center">
                <h3 className="hz-t-4xl hz-w-medium hz-fg">4.9<span className="hz-t-2xl">/5</span></h3>
                <p className="hz-mt-2 hz-fg-soft">Average rating across all AI-driven applications</p>
              </div>
              
              <div className="hz-p-5 hz-glass hz-r-lg hz-ring hz-col hz-ai-center hz-align-center">
                <h3 className="hz-t-4xl hz-w-medium hz-fg">80<sup>%</sup></h3>
                <p className="hz-mt-2 hz-fg-soft">Faster decision-making with AI recommendations</p>
              </div>
              
              <div className="hz-p-5 hz-glass hz-r-lg hz-ring hz-col hz-ai-center hz-align-center">
                <h3 className="hz-t-4xl hz-w-medium hz-fg">99<sup>%</sup></h3>
                <p className="hz-mt-2 hz-fg-soft">Uptime guarantee for seamless AI experience</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div ref={industriesSectionRef} className="hz-container hz-py-7 hz-border-t hz-rel">
          <div className="hz-align-center hz-mb-5">
            <motion.h3 style={{
              y: industriesTitleY
            }} className="hz-fg-soft hz-w-medium hz-t-lg hz-mb-2">
              Industries we serve
            </motion.h3>
            <motion.h2 style={{
              y: industriesTitleY
            }} className="hz-t-4xl hz-display hz-fg hz-mb-3">
              We deliver impact in various industries
            </motion.h2>
            <motion.p style={{
              y: industriesDescriptionY
            }} className="hz-container-narrow hz-fg-soft hz-mb-6">
              We have a proven track record of delivering impactful solutions tailored to various industries, 
              driving success and innovation across diverse business sectors.
            </motion.p>
          </div>
          
          <motion.div style={{
            y: industriesCarouselY
          }} className="hz-rel hz-z-raised hz-py-0">
            <Carousel opts={{
              align: "start",
              loop: true
            }} className="hz-w-full" setApi={setApi}>
              <CarouselContent className="hz-ml-2">
                {industriesData.map((industry, index) => <CarouselItem key={index} className="hz-px-2">
                    <div className="hz-rel hz-clip hz-r-lg">
                      <div className="hz-abs hz-inset hz-z-raised" />
                      <img src={industry.image} alt={industry.name} className="hz-h-full hz-w-full hz-object-cover hz-transition" />
                      <div className="hz-abs hz-bottom-0 hz-left-0 hz-right-0 hz-p-5 hz-z-raised">
                        <div className="hz-row hz-ai-center hz-mb-2">
                          {industry.icon}
                          <h3 className="hz-t-xl hz-w-medium hz-fg hz-ml-2">{industry.name}</h3>
                        </div>
                        <p className="hz-fg-soft">{industry.description}</p>
                      </div>
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
              <CarouselPrevious className="hz-bg-surface hz-border-none hz-fg hz-hoverable" />
              <CarouselNext className="hz-bg-surface hz-border-none hz-fg hz-hoverable" />
            </Carousel>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Features;

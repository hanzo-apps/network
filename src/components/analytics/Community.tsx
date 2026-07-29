
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Github, ExternalLink, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const statsItems = [
  { 
    icon: <Github className="hz-sq-4" />,
    value: 17,
    suffix: "M+",
    label: "Downloads",
    countUpDuration: 2
  },
  { 
    icon: <Github className="hz-sq-4" />,
    value: 25,
    suffix: "K+",
    label: "GitHub Stars",
    countUpDuration: 2.2
  },
  { 
    icon: <Users className="hz-sq-4" />,
    value: 280,
    suffix: "+",
    label: "Contributors",
    countUpDuration: 1.8
  }
];

const Community = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          controls.start("visible");
        }
      },
      { threshold: 0.2 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
      <div className="hz-abs hz-inset hz-bg-surface"></div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">Powered by Community, Improved by Collaboration</h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Join thousands of developers building the future of analytics together.
          </p>
        </motion.div>
        
        <div ref={ref}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="hz-grid hz-grid-3 hz-gap-6 hz-mb-7"
          >
            {statsItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="hz-card hz-align-center"
              >
                <div className="hz-row hz-jc-center hz-mb-4">
                  <div className="hz-card hz-card-tight hz-fg-muted">
                    {item.icon}
                  </div>
                </div>
                
                <div className="hz-t-4xl hz-w-bold hz-mb-2">
                  {isInView ? (
                    <CountUp end={item.value} duration={item.countUpDuration} />
                  ) : (
                    0
                  )}
                  <span>{item.suffix}</span>
                </div>
                
                <div className="hz-fg-muted">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="hz-grid hz-grid-2 hz-gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="hz-card"
            >
              <div className="hz-row hz-ai-center hz-mb-5">
                <Github className="hz-sq-4 hz-fg-muted hz-mr-3" />
                <h3 className="hz-t-2xl hz-w-bold">Open Source</h3>
              </div>
              
              <p className="hz-fg-muted hz-mb-5">
                Hanzo Analytics is fully open source, with a vibrant community of developers contributing from around the world. Join us on GitHub to collaborate on the future of analytics.
              </p>
              
              <div className="hz-stack-4 hz-mb-6">
                <div className="hz-row hz-ai-center">
                  <div className="hz-sq-5 hz-r-full hz-bg-raised hz-mr-3"></div>
                  <div className="hz-grow">
                    <div className="hz-bh-1 hz-bg-raised hz-r-md"></div>
                    <div className="hz-bh-1 hz-bg-raised hz-r-md hz-mt-2"></div>
                  </div>
                </div>
                <div className="hz-row hz-ai-center">
                  <div className="hz-sq-5 hz-r-full hz-bg-raised hz-mr-3"></div>
                  <div className="hz-grow">
                    <div className="hz-bh-1 hz-bg-raised hz-r-md"></div>
                    <div className="hz-bh-1 hz-bg-raised hz-r-md hz-mt-2"></div>
                  </div>
                </div>
                <div className="hz-row hz-ai-center">
                  <div className="hz-sq-5 hz-r-full hz-bg-raised hz-mr-3"></div>
                  <div className="hz-grow">
                    <div className="hz-bh-1 hz-bg-raised hz-r-md"></div>
                    <div className="hz-bh-1 hz-bg-raised hz-r-md hz-mt-2"></div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="hz-row hz-ai-center hz-gap-2">
                <Github className="hz-sq-2" />
                GitHub Repo
                <ExternalLink className="hz-sq-1 hz-ml-1" />
              </Button>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="hz-card"
            >
              <div className="hz-row hz-ai-center hz-mb-5">
                <BookOpen className="hz-sq-4 hz-fg-muted hz-mr-3" />
                <h3 className="hz-t-2xl hz-w-bold">Resources</h3>
              </div>
              
              <p className="hz-fg-muted hz-mb-5">
                Access comprehensive documentation, tutorials, and examples to help you make the most of Hanzo Analytics.
              </p>
              
              <div className="hz-grid hz-grid-2 hz-gap-4 hz-mb-6">
                {[
                  { 
                    title: "Documentation", 
                    description: "Comprehensive guides and API references",
                    link: "#documentation" 
                  },
                  { 
                    title: "Community Forum", 
                    description: "Join discussions with developers and AI experts",
                    link: "#forum" 
                  },
                  { 
                    title: "Examples", 
                    description: "Sample projects showcasing Hanzo Analytics",
                    link: "#examples" 
                  },
                  { 
                    title: "Support", 
                    description: "Get help from our team and community",
                    link: "#support" 
                  }
                ].map((resource, i) => (
                  <a 
                    key={i} 
                    href={resource.link} 
                    className="hz-card hz-transition hz-card-interactive"
                  >
                    <h4 className="hz-w-medium hz-fg hz-mb-1">{resource.title}</h4>
                    <p className="hz-t-sm hz-fg-muted">{resource.description}</p>
                  </a>
                ))}
              </div>
              
              <Button variant="outline" className="hz-row hz-ai-center hz-gap-2">
                Browse All Resources
                <ExternalLink className="hz-sq-1 hz-ml-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Simple CountUp component
const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);
  
  return <>{count}</>;
};

export default Community;

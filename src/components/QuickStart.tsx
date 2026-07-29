
import { motion, useScroll, useTransform } from "framer-motion";
import { AppWindow, Rocket, Bot, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const quickApps = [{
  icon: <Bot className="hz-sq-4 hz-fg" />,
  title: "AI Chat Assistant",
  description: "Launch your own ChatGPT-style AI assistant",
  glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(96,165,250,0.3)]",
  borderColor: "group-hover:border-neutral-400/30"
}, {
  icon: <ShoppingCart className="hz-sq-4 hz-fg" />,
  title: "E-commerce Store",
  description: "Start selling products online in minutes",
  glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(74,222,128,0.3)]",
  borderColor: "group-hover:border-neutral-400/30"
}, {
  icon: <AppWindow className="hz-sq-4 hz-fg" />,
  title: "Web3 dApp",
  description: "Build a decentralized application",
  glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(167,139,250,0.3)]",
  borderColor: "group-hover:border-neutral-400/30"
}, {
  icon: <Rocket className="hz-sq-4 hz-fg" />,
  title: "Custom App",
  description: "Start from scratch with our App Builder",
  glowColor: "group-hover:shadow-[0_0_30px_-5px_rgba(251,146,60,0.3)]",
  borderColor: "group-hover:border-neutral-400/30"
}];

const QuickStart = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Create parallax transforms with different speeds
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const descriptionY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [50, -20]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  return (
    <section 
      ref={sectionRef} 
      className="hz-py-7 hz-rel hz-clip hz-bg"
    >
      {/* Parallax background */}
      <motion.div 
        className="hz-abs hz-inset hz-bg-surface hz-z-base"
        style={{ y: backgroundY }}
      />
      
      <div className="hz-container hz-rel hz-z-raised">
        <motion.div 
          initial={{
            opacity: 0,
            y: 20
          }} 
          whileInView={{
            opacity: 1,
            y: 0
          }} 
          viewport={{
            once: true
          }} 
          className="hz-align-center hz-mb-7"
          style={{ y: titleY }}
        >
          <h2 className="hz-t-3xl hz-display hz-fg hz-mb-4">
            Quick Launch Apps
          </h2>
          <motion.p 
            className="hz-t-lg hz-fg-muted"
            style={{ y: descriptionY }}
          >
            Get started quickly with our pre-built templates
          </motion.p>
        </motion.div>

        <motion.div 
          className="hz-grid hz-grid-4 hz-gap-5"
          style={{ y: cardsY }}
        >
          {quickApps.map((app, index) => <motion.div 
            key={app.title} 
            initial={{
              opacity: 0,
              y: 20
            }} 
            whileInView={{
              opacity: 1,
              y: 0
            }} 
            viewport={{
              once: true
            }} 
            transition={{
              delay: index * 0.1
            }} 
            whileHover={{
              scale: 1.08,
              rotate: 2,
              transition: {
                type: "spring",
                stiffness: 2500,
                damping: 8,
                duration: 0.02
              }
            }} 
            whileTap={{
              scale: 0.95,
              rotate: -2,
              transition: {
                type: "spring",
                stiffness: 2500,
                damping: 8,
                duration: 0.02
              }
            }} 
            className={`hz-card hz-rel hz-glass hz-transition hz-card-interactive ${app.glowColor} ${app.borderColor}`}>
              <div className="hz-p-3 hz-r-lg hz-w-fit hz-bg-surface hz-fg hz-mx-auto">
                {app.icon}
              </div>
              
              <p className="hz-mt-2 hz-fg-muted hz-align-center">{app.description}</p>
              <Button className="hz-mt-4 hz-w-full hz-bg-surface hz-fg hz-bordered hz-transition hz-hoverable" variant="outline">
                Launch App
                <Rocket className="hz-sq-2 hz-ml-2" />
              </Button>
            </motion.div>)}
        </motion.div>
      </div>
    </section>
  );
};

export default QuickStart;

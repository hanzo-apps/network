import React from "react";
import { motion } from "framer-motion";
import { Leaf, Recycle, ThermometerSun } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";
import { Button } from "@/components/ui/button";
const Karma = () => {
  return <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container">
        <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
          <div>
            <motion.div initial={{
            opacity: 0,
            y: -20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="hz-mb-4">
              <span className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium">
                AI Engineering Platform
              </span>
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
            duration: 0.5,
            delay: 0.1
          }}>
              <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-5">
                Sustainable AI for the Future
              </ChromeText>
              <div className="hz-t-xl hz-fg-soft hz-mb-6 hz-stack-4">
                <p>
                  At Hanzo, we believe AI should empower humanity while respecting our planet. Our commitment to sustainable AI development is reflected in every product we build.
                </p>
                <p>
                  From energy-efficient infrastructure to carbon-neutral operations, we're creating AI that's as sustainable as it is powerful.
                </p>
              </div>
            </motion.div>
            
            <div className="hz-grid hz-grid-3 hz-gap-5 hz-mb-6">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: 0.1
            }} className="hz-card hz-col hz-ai-center hz-align-center">
                <div className="hz-sq-7 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-3">
                  <Leaf className="hz-sq-4 hz-fg-muted" />
                </div>
                <h3 className="hz-t-lg hz-w-semibold hz-mb-1">Carbon Neutral</h3>
                <p className="hz-fg-muted hz-t-sm">Offset all carbon emissions</p>
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
              duration: 0.4,
              delay: 0.2
            }} className="hz-card hz-col hz-ai-center hz-align-center">
                <div className="hz-sq-7 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-3">
                  <ThermometerSun className="hz-sq-4 hz-fg-muted" />
                </div>
                <h3 className="hz-t-lg hz-w-semibold hz-mb-1">Energy Efficient</h3>
                <p className="hz-fg-muted hz-t-sm">90% lower energy usage</p>
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
              duration: 0.4,
              delay: 0.3
            }} className="hz-card hz-col hz-ai-center hz-align-center">
                <div className="hz-sq-7 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-mb-3">
                  <Recycle className="hz-sq-4 hz-fg-muted" />
                </div>
                <h3 className="hz-t-lg hz-w-semibold hz-mb-1">Renewable Focus</h3>
                <p className="hz-fg-muted hz-t-sm">100% renewable data centers</p>
              </motion.div>
            </div>
            
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }} className="hz-row hz-gap-4">
              <Button variant="outline" className="hz-fg hz-bg-surface hz-hoverable">
                <a href="/leadership">Our Leadership</a>
              </Button>
              <Button variant="outline" className="hz-fg hz-bg-surface hz-hoverable">
                <a href="/careers">Join Our Team</a>
              </Button>
            </motion.div>
          </div>
          
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="hz-card">
            <div className="hz-row hz-ai-start hz-mb-5">
              <div className="hz-sq-8 hz-r-full hz-bg-raised hz-mr-4"></div>
              <div>
                <h3 className="hz-t-xl hz-w-bold hz-mb-1">Zach Kelling</h3>
                <p className="hz-fg-muted">CTO, Hanzo AI</p>
              </div>
            </div>
            
            <blockquote className="hz-t-xl hz-fg-soft hz-italic hz-mb-5">
              "Our mission at Hanzo is to democratize access to Amazon-level AI infrastructure while maintaining an unwavering commitment to sustainability. We've achieved incredible growth by providing powerful AI tools that don't compromise our environmental values."
            </blockquote>
            
            <blockquote className="hz-t-xl hz-fg-soft hz-italic">
              "By optimizing our infrastructure and operations, we're proving that cutting-edge AI and environmental responsibility can go hand in hand. This isn't just good karma—it's good business."
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Karma;
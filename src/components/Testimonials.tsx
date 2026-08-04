
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const testimonials = [{
  quote: "Hanzo has helped us to streamline our complex challenges and processes. Their suite of tools has made it easier for us to launch, scale, and innovate our business.",
  author: "Jennifer Smith",
  role: "Founder & CEO, Damon Motorcycles"
}, {
  quote: "Hanzo's digital solutions have empowered us to redefine success. Their platform has provided us with the tools we need to accelerate our growth and expand our reach.",
  author: "Marcus Chen",
  role: "Product Lead, Skully AR-1"
}, {
  quote: "We are impressed with Hanzo's pioneering approach to digital solutions. Their platform has helped us to transcend traditional boundaries and achieve new levels of success.",
  author: "Sarah Johnson",
  role: "CTO, Bellabeat"
}];

const brandLogos = [{
  name: "Sensei",
  logo: "https://sensei.partners/logo.png"
}, {
  name: "Damon Motorcycles",
  logo: "/placeholder.svg"
}, {
  name: "Skully AR-1",
  logo: "/placeholder.svg"
}, {
  name: "Triller",
  logo: "/placeholder.svg"
}, {
  name: "Bellabeat",
  logo: "/placeholder.svg"
}, {
  name: "Arca",
  logo: "/placeholder.svg"
}, {
  name: "ZOO",
  logo: "/placeholder.svg"
}, {
  name: "LUX",
  logo: "/placeholder.svg"
}];

const caseStudies = [{
  title: "Damon Motorcycles: Revolutionizing Electric Mobility",
  description: "How we helped Damon Motorcycles achieve unprecedented growth in their electric motorcycle platform through innovative digital solutions.",
  stats: {
    growth: "300%",
    timeframe: "6 months",
    roi: "450%"
  },
  videoUrl: "https://www.youtube.com/embed/your-video-id",
  learnMoreUrl: "https://sensei.group"
}, {
  title: "Skully AR-1: Transforming Motorcycle Safety",
  description: "A comprehensive digital transformation that revolutionized the AR helmet industry and had a record breaking crowdfunding campaign in first 24 hours.",
  stats: {
    efficiency: "200%",
    timeframe: "12 months",
    impact: "85%+"
  },
  videoUrl: "https://www.youtube.com/embed/your-video-id",
  learnMoreUrl: "https://sensei.group"
}];

const Testimonials = () => {
  return <section className="hz-py-7 hz-bg-overlay">
      <div className="hz-container">
        <div className="hz-align-center hz-mb-7">
          <h2 className="hz-t-3xl hz-display hz-fg">Our Impact</h2>
          <p className="hz-mt-4 hz-t-lg hz-fg-soft">Transforming businesses through innovation.</p>
        </div>

        {/* Brand Logos Scroll Area */}
        <div className="hz-mb-7">
          <h3 className="hz-t-xl hz-display hz-fg hz-mb-5">Trusted By Industry Leaders</h3>
          <ScrollArea className="hz-w-full hz-whitespace-nowrap hz-r-lg">
            <div className="hz-row hz-inline-4 hz-p-4">
              {brandLogos.map((brand, index) => <motion.div key={index} initial={{
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
            }} className="hz-none">
                  <img src={brand.logo} alt={brand.name} className="hz-bh-7 hz-w-auto hz-object-contain hz-dim hz-transition" />
                </motion.div>)}
            </div>
          </ScrollArea>
        </div>

        {/* Case Studies */}
        <div className="hz-mb-7">
          <div className="hz-row hz-jc-between hz-ai-center hz-mb-6">
            <h3 className="hz-t-xl hz-display hz-fg">Featured Case Studies</h3>
            <Button variant="ghost" className="hz-fg">
              View All Case Studies <ArrowRight className="hz-sq-2 hz-ml-2" />
            </Button>
          </div>
          
          {/* Number milestone section - modified to use numbers and responsive layout */}
          <div className="hz-col-row hz-jc-between hz-mb-6">
            <div className="hz-row hz-mb-5">
              <div className="hz-col-row">
                <div className="hz-row hz-ai-center hz-mb-4">
                  <div className="hz-sq-5 hz-r-full hz-bg-surface hz-row hz-ai-center hz-jc-center hz-fg hz-w-semibold hz-mr-3">1</div>
                  <h4 className="hz-t-lg hz-w-medium hz-fg">Analyze</h4>
                </div>
              </div>
            </div>
            
            <div className="hz-row hz-mb-5">
              <div className="hz-col-row">
                <div className="hz-row hz-ai-center hz-mb-4">
                  <div className="hz-sq-5 hz-r-full hz-bg-surface hz-row hz-ai-center hz-jc-center hz-fg hz-w-semibold hz-mr-3">2</div>
                  <h4 className="hz-t-lg hz-w-medium hz-fg">Optimize</h4>
                </div>
              </div>
            </div>
            
            <div className="hz-row">
              <div className="hz-col-row">
                <div className="hz-row hz-ai-center">
                  <div className="hz-sq-5 hz-r-full hz-bg-surface hz-row hz-ai-center hz-jc-center hz-fg hz-w-semibold hz-mr-3">3</div>
                  <h4 className="hz-t-lg hz-w-medium hz-fg">Scale</h4>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hz-grid hz-grid-2 hz-gap-6">
            {caseStudies.map((study, index) => <motion.div key={index} initial={{
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
          }} className="hz-bg-surface hz-glass hz-r-lg hz-clip">
                <div className="hz-w-full">
                  <iframe src={study.videoUrl} className="hz-w-full hz-h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <div className="hz-p-5">
                  <h4 className="hz-fg hz-mb-2 hz-t-3xl hz-w-normal">{study.title}</h4>
                  <p className="hz-fg-soft hz-mb-4">{study.description}</p>
                  <div className="hz-grid hz-grid-3 hz-gap-4 hz-mb-4">
                    {Object.entries(study.stats).map(([key, value], i) => <div key={i} className="hz-align-center">
                        <div className="hz-t-2xl hz-w-bold hz-fg">{value}</div>
                        <div className="hz-t-sm hz-fg-muted">{key}</div>
                      </div>)}
                  </div>
                  <Button variant="outline" className="hz-w-full" onClick={() => window.open(study.learnMoreUrl, '_blank')}>
                    Learn More <ArrowRight className="hz-sq-2 hz-ml-2" />
                  </Button>
                </div>
              </motion.div>)}
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="hz-grid hz-grid-3 hz-gap-6">
          {testimonials.map((testimonial, index) => <motion.div key={index} initial={{
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
        }} className="hz-p-5 hz-bg-surface hz-glass hz-r-lg hz-ring">
              <p className="hz-fg-soft hz-italic">{testimonial.quote}</p>
              <div className="hz-mt-4">
                <p className="hz-fg hz-w-semibold">{testimonial.author}</p>
                <p className="hz-fg-muted">{testimonial.role}</p>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};

export default Testimonials;

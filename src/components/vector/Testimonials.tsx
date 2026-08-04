
import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "After evaluating multiple vector databases, we chose Hanzo Vector for its impressive performance and scalability. It handles our billion-vector dataset with consistent sub-10ms query times.",
      author: "Sophia Chen",
      position: "VP of AI Engineering",
      company: "TechGlobal"
    },
    {
      quote: "Hanzo Vector's ability to handle hybrid search across both vectors and metadata has been a game-changer for our recommendation system. The integration was seamless and the performance boost was immediate.",
      author: "Michael Rodriguez",
      position: "Senior Data Scientist",
      company: "RecoAI"
    },
    {
      quote: "We migrated from a competitor to Hanzo Vector and saw a 7x performance improvement overnight. The migration tools made the process painless, and the support team was exceptional throughout.",
      author: "Aisha Johnson",
      position: "CTO",
      company: "SearchWave"
    }
  ];

  const companyLogos = [
    "IKEA", "NVIDIA", "SmartNews", "Walmart", "Shopee", 
    "Tokopedia", "Shutterstock", "AT&T", "ZipRecruiter", "IBM", 
    "Bosch", "eBay", "Inflection", "Intuit", "NewRelic"
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
            Loved by GenAI Developers
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Hear what our users say about building with Hanzo Vector
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6 hz-mb-7">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card hz-rel"
            >
              <div className="hz-abs hz-t-5xl hz-fg-muted">"</div>
              <p className="hz-fg-soft hz-mb-6 hz-rel hz-z-raised hz-pt-4">
                {testimonial.quote}
              </p>
              <div>
                <h4 className="hz-fg hz-w-semibold">{testimonial.author}</h4>
                <p className="hz-fg-muted hz-t-sm">{testimonial.position}, {testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center"
        >
          <h3 className="hz-t-2xl hz-w-semibold hz-fg hz-mb-6">
            Trusted for Production Workloads
          </h3>
          
          <div className="hz-row hz-wrap hz-jc-center hz-gap-6 hz-gap-5">
            {companyLogos.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hz-fg-muted hz-w-medium hz-t-lg"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

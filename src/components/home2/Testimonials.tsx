
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Hanzo AI has cut our development time in half. The platform is incredibly intuitive and powerful.",
    author: "Sarah Chen",
    title: "CTO, TechVision Inc."
  },
  {
    quote: "We've tried many AI platforms, but nothing compares to the reliability and performance of Hanzo.",
    author: "Michael Rodriguez",
    title: "Lead Engineer, DataStream"
  },
  {
    quote: "The support team is phenomenal. Any issues we've had were resolved quickly and efficiently.",
    author: "David Kim",
    title: "AI Director, FutureLabs"
  }
];

const Testimonials = () => {
  return (
    <section className="hz-py-7 hz-rel hz-clip">
      <div className="hz-container hz-mx-auto hz-px-4">
        <div className="hz-align-center hz-mb-7">
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">
            Trusted by Leading Teams
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            See what our customers are saying about our platform
          </p>
        </div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card"
            >
              <div className="hz-mb-5">
                <svg className="hz-sq-5 hz-fg-muted" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="hz-fg-soft hz-mb-5">{testimonial.quote}</p>
              <div>
                <p className="hz-w-bold">{testimonial.author}</p>
                <p className="hz-fg-muted hz-t-sm">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="hz-row hz-wrap hz-jc-center hz-gap-6 hz-mt-7">
          {['Acme Inc', 'GlobalTech', 'FutureCorp', 'DataStream', 'TechVision'].map((company, index) => (
            <div key={index} className="hz-fg-muted hz-t-xl hz-w-bold hz-dim">{company}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

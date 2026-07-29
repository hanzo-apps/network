
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Hanzo's AI Engineering Platform has completely transformed how we build and deploy AI applications. What used to take us weeks now takes days.",
      author: "Sarah Chen",
      title: "CTO, Quantum Innovations",
      image: "/placeholder.svg"
    },
    {
      quote: "The unified approach to model deployment, monitoring, and scaling has allowed our team to focus on building great AI experiences instead of wrestling with infrastructure.",
      author: "James Wilson",
      title: "Head of AI, GlobalTech",
      image: "/placeholder.svg"
    },
    {
      quote: "We evaluated several AI platforms, but Hanzo stood out for its developer experience and comprehensive observability features. It's made monitoring our AI in production so much easier.",
      author: "Maria Rodriguez",
      title: "Principal Engineer, TechFlow",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      {/* Background elements */}
      <div className="hz-abs hz-top-0 hz-left-0 hz-w-full hz-h-full hz-clip hz-no-pointer">
        <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      </div>

      <div className="hz-container hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
            Experiences from Our Community
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Hear from engineering teams who are building the next generation of AI-powered applications
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card hz-transition hz-rel hz-card-interactive"
            >
              <Quote className="hz-sq-4 hz-abs hz-fg-muted" />
              <p className="hz-fg-soft hz-mb-6 hz-mt-4">"{testimonial.quote}"</p>
              <div className="hz-row hz-ai-center">
                <div className="hz-sq-7 hz-r-full hz-bg-raised hz-clip">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="hz-h-full hz-w-full hz-object-cover hz-dim" 
                  />
                </div>
                <div className="hz-ml-4">
                  <div className="hz-fg hz-w-medium">{testimonial.author}</div>
                  <div className="hz-fg-muted hz-t-sm">{testimonial.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hz-card hz-mt-7"
        >
          <div className="hz-col-row hz-ai-center hz-jc-between">
            <div className="hz-mb-6">
              <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-4">
                The AI Engineering Community
              </h3>
              <p className="hz-fg-soft hz-mb-5">
                Join thousands of AI engineers and developers building the future of intelligent applications. 
                Share experiences, get support, and collaborate on best practices.
              </p>
              <div className="hz-row hz-wrap hz-gap-4">
                <div className="hz-btn">
                  <div className="hz-sq-1 hz-r-full hz-bg-raised hz-mr-2"></div>
                  <span className="hz-fg-soft hz-t-sm">4,500+ community members</span>
                </div>
                <div className="hz-btn">
                  <div className="hz-sq-1 hz-r-full hz-bg-raised hz-mr-2"></div>
                  <span className="hz-fg-soft hz-t-sm">Weekly office hours</span>
                </div>
                <div className="hz-btn">
                  <div className="hz-sq-1 hz-r-full hz-bg-raised hz-mr-2"></div>
                  <span className="hz-fg-soft hz-t-sm">Dedicated support team</span>
                </div>
              </div>
            </div>
            <div className="hz-row hz-jc-center">
              <div className="hz-row">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="hz-sq-7 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center hz-fg-soft hz-t-sm hz-w-medium"
                  >
                    {["JS", "MK", "AL", "TN", "RW"][i]}
                  </div>
                ))}
                <div className="hz-sq-7 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center hz-fg hz-t-sm hz-w-medium">
                  +2.5k
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

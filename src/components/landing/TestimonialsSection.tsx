
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  delay: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, title, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="hz-card hz-shadow-lg"
    >
      <Quote className="hz-sq-5 hz-fg-muted hz-mb-4" />
      <p className="hz-fg-soft hz-t-lg hz-mb-5">{quote}</p>
      <div>
        <p className="hz-w-bold hz-fg">{name}</p>
        <p className="hz-fg-muted hz-t-sm">{title}</p>
      </div>
    </motion.div>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "Hanzo has completely transformed how we build and deploy AI applications. The developer experience is unmatched.",
      name: "Sarah Chen",
      title: "CTO, TechVision AI"
    },
    {
      quote: "The open-source nature of Hanzo gives us the confidence to build our entire product on top of it. We control our destiny.",
      name: "Marcus Johnson",
      title: "Lead Engineer, DataFusion"
    },
    {
      quote: "We've cut our AI development time in half since switching to Hanzo. The integration between tools is seamless.",
      name: "Priya Sharma",
      title: "AI Product Lead, InnovateX"
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-rel hz-clip">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <div className="hz-px-4 hz-py-1 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-5">
            Testimonials
          </div>
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
            Trusted by Leading AI Teams
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Hear from developers and teams who are building the future with Hanzo.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

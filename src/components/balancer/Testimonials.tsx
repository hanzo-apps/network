
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Running with minimal maintenance and config for years",
    rating: 5,
    author: "John C",
    role: "Sr. Software Architect"
  },
  {
    quote: "Fast and powerful reverse proxy with everything you need for your containerized infrastructure",
    rating: 5,
    author: "Dennis M",
    role: "Software Engineer"
  },
  {
    quote: "First thing you install on a fresh Kubernetes cluster",
    rating: 5,
    author: "Steve T",
    role: "DevOps Engineer"
  },
  {
    quote: "The most flexible reverse proxy",
    rating: 4.5,
    author: "Esteban T",
    role: "Development Engineer"
  },
  {
    quote: "The middleware feature makes all the difference",
    rating: 5,
    author: "Werner D",
    role: "Software Architect"
  }
];

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`} className="hz-fg-muted">★</span>);
  }

  if (halfStar) {
    stars.push(<span key="half" className="hz-fg-muted">★</span>);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`} className="hz-fg-muted">★</span>);
  }

  return <div className="hz-row">{stars}</div>;
};

const Testimonials = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface hz-rel hz-clip">
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      <div className="hz-sq-8 hz-abs hz-bg-raised hz-r-full hz-blur-bg"></div>
      
      <div className="hz-container-wide hz-rel hz-z-raised">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">What Our Users Are Saying</h2>
          <p className="hz-t-xl hz-fg-soft">
            Join the growing number of users who trust Hanzo Balancer.
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
              className="hz-card"
            >
              <p className="hz-t-lg hz-mb-4">"{testimonial.quote}"</p>
              <StarRating rating={testimonial.rating} />
              <div className="hz-mt-4">
                <p className="hz-w-medium">{testimonial.author}</p>
                <p className="hz-fg-muted hz-t-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

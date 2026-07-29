import { BRAND } from '@/lib/brand';
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";


const testimonials = [
  {
    company: "Ramp",
    logo: "R",
    quote: "Hanzo Dev has dramatically accelerated our team's coding efficiency. I can now write EDA code in a notebook—pulling data, training a model, and evaluating it with basic metrics—and then ask Hanzo to convert that into a Metaflow pipeline. This process saves 1-2 days of routine (and often boring!) work per model.",
    author: "Anton Biryukov",
    title: "Staff Software Engineer",
    link: "/customers/ramp",
  },
  {
    company: "Intercom",
    logo: "I",
    quote: "With Hanzo, we're not just automating customer service—we're elevating it to truly human quality. This lets support teams think more strategically about customer experience and what makes interactions genuinely valuable.",
    author: "Fergal Reid",
    title: "VP of AI",
    link: "/customers/intercom",
  },
  {
    company: "Notion",
    logo: "N",
    quote: "Hanzo Dev is moving our team up a level: we decide what needs to happen, and smooth the process so it can build and verify end-to-end. A big part of my job now is to keep as many instances of Hanzo Dev busy as possible.",
    author: "Simon Last",
    title: "Co-founder",
    link: "/customers/notion",
  },
];

const companyLogos = [
  "Ramp", "Intercom", "Notion", "Square", "Shopify", "Vercel",
  "Linear", "Figma", "Pitch", "Loom", "Discord", "Slack",
];

const Testimonials = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hz-align-center hz-mb-7"
        >
          <p
            className="hz-inline hz-t-xs hz-w-medium hz-r-full hz-px-4 hz-py-2 hz-bordered hz-mb-5"
            style={{ color: BRAND.fg, borderColor: `${BRAND.washStrong}` }}
          >
            Testimonials
          </p>
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            What developers are saying
          </h2>
        </motion.div>

        {/* Company logos marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hz-row hz-jc-center hz-gap-6 hz-mb-7 hz-clip"
        >
          <div className="hz-row hz-gap-6">
            {[...companyLogos, ...companyLogos].map((logo, i) => (
              <div
                key={i}
                className="hz-fg-faint hz-t-lg hz-w-medium hz-whitespace-nowrap"
              >
                {logo}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial cards */}
        <div className="hz-grid hz-grid-3 hz-gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="hz-card hz-transition hz-card-interactive"
            >
              {/* Company logo */}
              <div className="hz-row hz-ai-center hz-gap-3 hz-mb-4">
                <div
                  className="hz-sq-6 hz-r-lg hz-row hz-ai-center hz-jc-center hz-fg hz-w-bold hz-bg-quiet"
                  >
                  {testimonial.logo}
                </div>
                <span className="hz-fg hz-w-semibold">{testimonial.company}</span>
              </div>

              {/* Quote */}
              <blockquote className="hz-fg-soft hz-t-sm hz-mb-5 hz-leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="hz-row hz-ai-center hz-jc-between">
                <div>
                  <div className="hz-fg hz-w-medium hz-t-sm">{testimonial.author}</div>
                  <div className="hz-fg-muted hz-t-xs">{testimonial.title}</div>
                </div>
                <a
                  href={testimonial.link}
                  className="hz-t-xs hz-row hz-ai-center hz-gap-1 hz-invisible hz-transition hz-fg"
                  >
                  Read story
                  <ArrowRight className="hz-sq-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;

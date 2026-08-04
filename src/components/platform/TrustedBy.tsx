
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    company: "Damon Motorcycles",
    quote: "Hanzo has revolutionized our approach to electric motorcycle development. Their platform gives us the tools to innovate at a pace that would be impossible with traditional infrastructure.",
    author: "Jay Giraud",
    role: "Founder & CEO at Damon Motorcycles",
    avatar: "/placeholder.svg"
  },
  {
    company: "SKULLY",
    quote: "Working with Hanzo has transformed our ability to create the highest successfully funded Indiegogo project in history. Their DX platform streamlines our development processes while maintaining the highest standards of quality and safety.",
    author: "Marcus Weller",
    role: "CEO at SKULLY",
    avatar: "/placeholder.svg"
  },
  {
    company: "Bellabeat",
    quote: "As a company focused on women's health technology, we need partners who understand both tech and human needs. Hanzo has been instrumental in helping us scale our infrastructure while maintaining the personal touch our customers expect.",
    author: "Sandro Mur",
    role: "Co-founder & CEO at Bellabeat",
    avatar: "/placeholder.svg"
  },
  {
    company: "Karma",
    quote: "Hanzo's platform revolutionized our growth strategy and catalyzed sales for our crowdfunding campaign. Their AI-driven insights helped us connect with our audience in ways we never thought possible, making our latest collection launch our most successful to date.",
    author: "Antje Worring",
    role: "CEO at Karma Fashion",
    avatar: "/placeholder.svg"
  },
  {
    company: "Triller",
    quote: "With Trillerfest reaching over 169M people, Hanzo's platform has been essential to our success. Their scalable solutions have allowed us to deliver exceptional user experiences at a global scale.",
    author: "Vincent Butta",
    role: "Board Member at Triller",
    avatar: "/placeholder.svg"
  },
  {
    company: "Lifemed AI",
    quote: "Hanzo's AI Cloud and DX Platform have been transformative for our healthcare AI initiatives. Their solution enables us to deploy sophisticated ML models with confidence while meeting strict compliance requirements.",
    author: "Matthew Joynes",
    role: "Co-founder at Lifemed AI",
    avatar: "/placeholder.svg"
  }
];

const TrustedBy = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="hz-py-7 hz-px-4 hz-bg"
    >
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 
            className="hz-t-3xl hz-w-medium hz-mb-5 chrome-text"
            style={{
              backgroundPosition: `${(mousePosition.x / (containerRef.current?.offsetWidth || 1)) * 100}% ${(mousePosition.y / (containerRef.current?.offsetHeight || 1)) * 100}%`,
            }}
          >
            Trusted by the best in business
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Industry leaders across various sectors rely on Hanzo for their technological needs. Here's what they have to say.
          </p>
        </motion.div>
        
        <div className="hz-grid hz-grid-3 hz-gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hz-card hz-glass"
            >
              <div className="hz-mb-4">
                <h3 
                  className="hz-t-xl hz-w-medium chrome-text"
                  style={{
                    backgroundPosition: `${(mousePosition.x / (containerRef.current?.offsetWidth || 1)) * 100}% ${(mousePosition.y / (containerRef.current?.offsetHeight || 1)) * 100}%`,
                  }}
                >
                  {testimonial.company}
                </h3>
              </div>
              
              <p className="hz-fg-soft hz-mb-5 hz-leading-relaxed">"{testimonial.quote}"</p>
              
              <div className="hz-row hz-ai-center">
                <div className="hz-mr-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="hz-sq-7 hz-r-full hz-object-cover hz-bg-surface"
                  />
                </div>
                <div>
                  <h4 className="hz-w-medium hz-fg">{testimonial.author}</h4>
                  <p className="hz-t-sm hz-fg-muted">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;

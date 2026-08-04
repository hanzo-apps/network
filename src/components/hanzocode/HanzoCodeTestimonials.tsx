
import React from "react";
import { motion } from "framer-motion";
import { Twitter } from "lucide-react";

const HanzoCodeTestimonials = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container">
        <motion.div 
          className="hz-align-center hz-mb-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">
            Loved by world-class devs
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Engineers all around the world reach for Hanzo Code by choice.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-5 hz-mb-7">
          {/* Just showing one testimonial for example, but you can replicate this */}
          <motion.div 
            className="hz-card hz-transition hz-card-interactive"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="hz-row hz-ai-start hz-gap-4 hz-mb-4">
              <div className="hz-sq-7 hz-r-full hz-bg-raised"></div>
              <div>
                <div className="hz-w-medium">Sarah Chen</div>
                <div className="hz-fg-muted hz-row hz-ai-center">
                  <Twitter className="hz-sq-2 hz-mr-1 hz-fg-muted" />
                  @sarahcodes
                </div>
              </div>
            </div>
            <p className="hz-fg-soft">Hanzo Code has completely changed how I approach coding. The AI suggestions are spot-on and save me hours every day.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HanzoCodeTestimonials;

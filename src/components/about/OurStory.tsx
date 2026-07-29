
import React from "react";
import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <section className="hz-py-7 hz-px-4">
      <div className="hz-container-wide">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-mb-4">Our Story</h2>
          <div className="hz-bh-1 hz-bw-8 hz-bg-raised hz-mx-auto"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-card hz-glass hz-mb-6"
        >
          <p className="hz-fg-soft hz-leading-relaxed hz-mb-5">
            Hanzo Industries, Inc. – originally known as Crowdstart under Verus Media – has undergone several transformations since its inception. 
            Founded by Zach Kelling (with David Tai as co-founder) in the mid-2010s, the company evolved from a crowd-powered marketing platform 
            into a Techstars-backed artificial intelligence venture, and ultimately into a multifaceted AI technology provider.
          </p>
          
          <p className="hz-fg-soft hz-leading-relaxed hz-mb-5">
            Along the way, Hanzo has achieved notable milestones in product development, fundraising, and partnerships, 
            while navigating pivots and challenges that shaped its guiding philosophy. Our journey demonstrates the power 
            of adaptability, resilience, and first-principles thinking in building technology that empowers others.
          </p>
          
          <p className="hz-fg-soft hz-leading-relaxed">
            Today, operating under the umbrella Hanzo Industries, Inc., we remain small but influential, 
            proving the mantra that a lean, mission-driven team can punch well above its weight. Our mission 
            is to accelerate human entrepreneurship through intelligent technology and timeless wisdom.
          </p>
          
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;


import React from 'react';
import { motion } from 'framer-motion';

const TrustedBy = () => {
  // Example logos - in a real implementation, these would be actual logo images
  const logoItems = [
    { name: 'Microsoft', class: 'hz-bh-5' },
    { name: 'Airbnb', class: 'hz-bh-4' },
    { name: 'Netflix', class: 'hz-bh-4' },
    { name: 'Square', class: 'hz-bh-5' },
    { name: 'Shopify', class: 'hz-bh-4' },
    { name: 'Spotify', class: 'hz-bh-5' },
    { name: 'Slack', class: 'hz-bh-5' },
    { name: 'Amazon', class: 'hz-bh-4' }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hz-align-center hz-mb-7"
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-5">
            Trusted by Industry Leaders
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Powering AI innovation at organizations of all sizes, from startups to Fortune 500 companies
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-4 hz-gap-6">
          {logoItems.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="hz-card hz-row hz-ai-center hz-jc-center hz-transition hz-card-interactive"
            >
              {/* In a real implementation, this would be an image */}
              <div className={`hz-fg-muted hz-w-semibold hz-t-xl ${logo.class}`}>
                {logo.name}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hz-grid hz-grid-3 hz-mt-7 hz-gap-6"
        >
          <div className="hz-card">
            <div className="hz-row hz-ai-center hz-mb-2">
              <div className="hz-row">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className="hz-sq-3 hz-fg-muted" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="hz-ml-2 hz-fg hz-w-medium">5.0</span>
            </div>
            <p className="hz-fg-soft hz-mb-4">
              "Hanzo's AI platform has transformed our ability to ship AI features quickly. What used to take months now takes days."
            </p>
            <div className="hz-row hz-ai-center">
              <div className="hz-sq-6 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-fg-soft hz-w-bold">JD</div>
              <div className="hz-ml-3">
                <div className="hz-fg hz-w-medium">Jane Doe</div>
                <div className="hz-fg-muted hz-t-sm">CTO, TechInnovate</div>
              </div>
            </div>
          </div>

          <div className="hz-card">
            <div className="hz-row hz-ai-center hz-mb-2">
              <div className="hz-row">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className="hz-sq-3 hz-fg-muted" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="hz-ml-2 hz-fg hz-w-medium">5.0</span>
            </div>
            <p className="hz-fg-soft hz-mb-4">
              "The observability features are game-changing. We finally have full visibility into our AI systems in production."
            </p>
            <div className="hz-row hz-ai-center">
              <div className="hz-sq-6 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-fg-soft hz-w-bold">MS</div>
              <div className="hz-ml-3">
                <div className="hz-fg hz-w-medium">Michael Smith</div>
                <div className="hz-fg-muted hz-t-sm">AI Lead, EnterpriseAI</div>
              </div>
            </div>
          </div>

          <div className="hz-card">
            <div className="hz-row hz-ai-center hz-mb-2">
              <div className="hz-row">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className="hz-sq-3 hz-fg-muted" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="hz-ml-2 hz-fg hz-w-medium">5.0</span>
            </div>
            <p className="hz-fg-soft hz-mb-4">
              "Our team went from prototype to production in just days. The SDK is intuitive and the documentation is excellent."
            </p>
            <div className="hz-row hz-ai-center">
              <div className="hz-sq-6 hz-r-full hz-bg-raised hz-row hz-ai-center hz-jc-center hz-fg-soft hz-w-bold">EJ</div>
              <div className="hz-ml-3">
                <div className="hz-fg hz-w-medium">Emma Johnson</div>
                <div className="hz-fg-muted hz-t-sm">VP Engineering, StartupX</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;

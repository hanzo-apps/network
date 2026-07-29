import { BRAND } from '@/lib/brand';
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";


const FooterCTA = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-bg hz-rel hz-clip">
      {/* Background gradient */}
      <div
        className="hz-center-xy hz-abs hz-r-full hz-dim-more"
        style={{
          background: `radial-gradient(circle, ${BRAND.fg} 0%, transparent 70%)`,
          filter: "blur(100px)",
        }}
      />

      <div className="hz-container-narrow hz-rel hz-z-raised hz-align-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="hz-t-3xl hz-w-bold hz-fg hz-mb-4">
            Start building today
          </h2>
          <p className="hz-container-narrow hz-mw-md hz-t-xl hz-fg-muted hz-mb-6">
            Web, desktop, local, or decentralized. Choose your way.
          </p>

          <div className="hz-col-row hz-jc-center hz-gap-4">
            <a
              href="https://hanzo.app"
              target="_blank"
              rel="noreferrer noopener"
              className="hz-btn hz-btn-ghost hz-btn-lg hz-fg hz-transition hz-bg-inverse"
              >
              Open hanzo.app
              <ArrowRight className="hz-sq-3 hz-ml-2" />
            </a>
            <Link
              to="/download"
              className="hz-btn hz-btn-ghost hz-btn-lg hz-fg hz-transition"
            >
              <Download className="hz-sq-3 hz-mr-2" />
              Download desktop
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;

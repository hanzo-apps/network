import { BRAND } from '@/lib/brand';
import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, ArrowLeft, Search, FileQuestion } from "lucide-react";


const NotFound = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg hz-col">
      <Helmet>
        <title>404 - Page Not Found | Hanzo AI</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>

      <Navbar />

      <main className="hz-grow hz-row hz-ai-center hz-jc-center hz-px-4 hz-py-7">
        <div className="hz-container-narrow hz-mw-md hz-align-center hz-rel">
          {/* Background glow */}
          <div className="hz-abs hz-inset hz-clip hz-z-base hz-no-pointer">
            <div
              className="hz-center-xy hz-abs hz-r-full hz-dim-more"
              style={{
                background: `radial-gradient(circle, ${BRAND.fg} 0%, transparent 70%)`,
                filter: "blur(100px)",
              }}
            />
          </div>

          <div className="hz-rel hz-z-raised">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="hz-mb-6"
            >
              <div
                className="hz-sq-8 hz-r-xl hz-mx-auto hz-row hz-ai-center hz-jc-center hz-mb-5 hz-bg-quiet"
                >
                <FileQuestion className="hz-sq-7 hz-fg" />
              </div>

              <h1 className="hz-t-7xl hz-w-bold hz-mb-4 hz-chrome">
                404
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="hz-t-2xl hz-w-semibold hz-fg hz-mb-4">
                Page not found
              </h2>
              <p className="hz-container-narrow hz-mw-sm hz-fg-muted hz-t-lg hz-mb-6">
                The page you're looking for doesn't exist or has been moved to a new location.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hz-col-row hz-ai-center hz-jc-center hz-gap-4"
            >
              <Link
                to="/"
                className="hz-btn hz-btn-ghost hz-transition hz-bg-inverse"
                >
                <Home className="hz-sq-2 hz-mr-2" />
                Go to Homepage
              </Link>
              <button
                onClick={() => window.history.back()}
                className="hz-btn hz-btn-ghost hz-transition hz-fg"
              >
                <ArrowLeft className="hz-sq-2 hz-mr-2" />
                Go Back
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hz-mt-7"
            >
              <p className="hz-fg-muted hz-t-sm hz-mb-4">Looking for something?</p>
              <div className="hz-row hz-wrap hz-jc-center hz-gap-3">
                <Link
                  to="/products"
                  className="hz-px-4 hz-py-2 hz-r-lg hz-bg-surface hz-bordered hz-t-sm hz-fg-soft hz-transition hz-hoverable"
                >
                  Products
                </Link>
                <Link
                  to="/docs"
                  className="hz-px-4 hz-py-2 hz-r-lg hz-bg-surface hz-bordered hz-t-sm hz-fg-soft hz-transition hz-hoverable"
                >
                  Documentation
                </Link>
                <Link
                  to="/contact"
                  className="hz-px-4 hz-py-2 hz-r-lg hz-bg-surface hz-bordered hz-t-sm hz-fg-soft hz-transition hz-hoverable"
                >
                  Contact
                </Link>
                <Link
                  to="/status"
                  className="hz-px-4 hz-py-2 hz-r-lg hz-bg-surface hz-bordered hz-t-sm hz-fg-soft hz-transition hz-hoverable"
                >
                  Status
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;

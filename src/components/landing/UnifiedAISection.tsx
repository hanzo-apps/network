import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Lock, Puzzle, Code } from "lucide-react";
import { Link } from "react-router-dom";

const UnifiedAISection = () => {
  return (
    <section className="hz-py-7 hz-px-4 hz-rel">
      <div className="hz-container-wide hz-rel hz-z-raised">
        <div className="hz-grid hz-grid-2 hz-gap-7 hz-ai-center">
          {/* 3D Visual - Would be replaced with actual 3D cube */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hz-container hz-rel"
          >
            <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center">
              <div className="hz-w-full hz-h-full hz-mw-full hz-r-xl hz-bordered hz-border-strong" />
              <div className="hz-abs hz-r-xl hz-bordered hz-border-strong" />
              <div className="hz-abs hz-r-xl hz-bordered hz-border-strong" />
              
              <div className="hz-abs hz-inset hz-row hz-ai-center hz-jc-center">
                <div className="hz-r-lg hz-blur-bg" />
              </div>
              
              <div className="hz-abs hz-inset hz-col hz-ai-center hz-jc-center hz-gap-5 hz-z-raised">
                <div className="hz-card hz-card-tight hz-glass hz-w-full hz-mw-full hz-row hz-ai-center">
                  <div className="hz-p-2 hz-r-lg hz-bg-raised hz-mr-3">
                    <Layers className="hz-sq-3 hz-fg-muted" />
                  </div>
                  <span className="hz-fg">AI Cloud</span>
                </div>
                <div className="hz-card hz-card-tight hz-glass hz-w-full hz-mw-full hz-row hz-ai-center">
                  <div className="hz-p-2 hz-r-lg hz-bg-raised hz-mr-3">
                    <Code className="hz-sq-3 hz-fg-muted" />
                  </div>
                  <span className="hz-fg">Developer Tools</span>
                </div>
                <div className="hz-card hz-card-tight hz-glass hz-w-full hz-mw-full hz-row hz-ai-center">
                  <div className="hz-p-2 hz-r-lg hz-bg-raised hz-mr-3">
                    <Puzzle className="hz-sq-3 hz-fg-muted" />
                  </div>
                  <span className="hz-fg">Human Ops & Workflow</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="hz-t-3xl hz-w-bold hz-mb-5 hz-chrome">
              The Unified AI Ecosystem
            </h2>
            
            <div className="hz-stack-6">
              <div>
                <h3 className="hz-t-xl hz-w-medium hz-fg hz-mb-2 hz-row hz-ai-center">
                  <div className="hz-p-1 hz-r-lg hz-bg-raised hz-mr-2 hz-row hz-ai-center hz-jc-center">
                    <Puzzle className="hz-sq-2 hz-fg-muted" />
                  </div>
                  Human + AI Collaboration
                </h3>
                <p className="hz-fg-muted">
                  Seamless synergy between automated intelligence and human creativity,
                  enabling teams to achieve more together than either could alone.
                </p>
              </div>
              
              <div>
                <h3 className="hz-t-xl hz-w-medium hz-fg hz-mb-2 hz-row hz-ai-center">
                  <div className="hz-p-1 hz-r-lg hz-bg-raised hz-mr-2 hz-row hz-ai-center hz-jc-center">
                    <Layers className="hz-sq-2 hz-fg-muted" />
                  </div>
                  Modular & Open
                </h3>
                <p className="hz-fg-muted">
                  Use only the layers you need; scale effortlessly as your requirements evolve.
                  Our platform grows with your ambitions.
                </p>
              </div>
              
              <div>
                <h3 className="hz-t-xl hz-w-medium hz-fg hz-mb-2 hz-row hz-ai-center">
                  <div className="hz-p-1 hz-r-lg hz-bg-raised hz-mr-2 hz-row hz-ai-center hz-jc-center">
                    <Lock className="hz-sq-2 hz-fg-muted" />
                  </div>
                  APIs for Everything
                </h3>
                <p className="hz-fg-muted">
                  Advertising, e-commerce, payments, messaging, authentication, and more—all
                  through consistent, developer-friendly interfaces.
                </p>
              </div>
            </div>
            
            <div className="hz-mt-6">
              <Link 
                to="/platform" 
                className="inline-flex items-center text-neutral-400 hover:text-purple
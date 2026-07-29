
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ColorSwatch = ({ name, hex, className }) => (
  <div className="hz-stack-2">
    <div className={`hz-w-full hz-r-lg ${className}`}></div>
    <div className="hz-t-sm hz-w-medium">{name}</div>
    <div className="hz-t-xs hz-fg-muted">{hex}</div>
  </div>
);

const TypographyExample = ({ name, className, description }) => (
  <div className="hz-stack-2 hz-mb-6">
    <div className={`${className}`}>{name}</div>
    <div className="hz-t-xs hz-fg-muted">{description}</div>
  </div>
);

const ComponentShowcase = ({ title, children }) => (
  <div className="hz-bordered hz-r-lg hz-clip">
    <div className="hz-p-4 hz-border-b hz-bg-overlay">
      <h3 className="hz-t-sm hz-w-medium hz-fg">{title}</h3>
    </div>
    <div className="hz-p-6 hz-row hz-wrap hz-gap-4 hz-ai-center hz-jc-center hz-bg-overlay">
      {children}
    </div>
  </div>
);

const Brand = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Helmet>
        <title>Hanzo Design System - Brand Guidelines</title>
        <meta name="description" content="The Hanzo design system, typography, colors, and components. A guide for consistent visual design across our platform." />
      </Helmet>
      
      <Navbar />
      
      <main className="hz-pt-6 hz-pb-6 hz-px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hz-container-wide"
        >
          <div className="hz-align-center hz-mb-7">
            <div className="hz-px-4 hz-py-1 hz-r-full hz-bg-surface hz-fg-soft hz-t-sm hz-w-medium hz-mb-4">
              Design System
            </div>
            <h1 className="hz-t-4xl hz-w-bold hz-mb-5 hz-chrome">
              Hanzo Brand
            </h1>
            <p className="hz-container-narrow hz-t-xl hz-fg-muted">
              A comprehensive guide for creating consistent, elegant, and minimal interfaces across our platform.
            </p>
          </div>
          
          {/* Design Principles */}
          <section className="hz-mb-7">
            <h2 className="hz-t-2xl hz-w-bold hz-mb-6 hz-align-center">Design Principles</h2>
            <div className="hz-grid hz-grid-3 hz-gap-6">
              <div className="hz-card">
                <h3 className="hz-t-xl hz-w-bold hz-mb-4">Minimal & Focused</h3>
                <p className="hz-fg-muted">
                  Reduce visual noise and focus on essential elements. Each design decision should have purpose and enhance the user experience.
                </p>
              </div>
              <div className="hz-card">
                <h3 className="hz-t-xl hz-w-bold hz-mb-4">Elegant & Refined</h3>
                <p className="hz-fg-muted">
                  Use subtle gradients, appropriate spacing, and thoughtful typography to create elegant and sophisticated interfaces.
                </p>
              </div>
              <div className="hz-card">
                <h3 className="hz-t-xl hz-w-bold hz-mb-4">Consistent & Cohesive</h3>
                <p className="hz-fg-muted">
                  Maintain consistency in design patterns, spacing, and visual hierarchy to create a unified experience across all touchpoints.
                </p>
              </div>
            </div>
          </section>
          
          {/* Color Palette */}
          <section className="hz-mb-7">
            <h2 className="hz-t-2xl hz-w-bold hz-mb-6 hz-align-center">Color Palette</h2>
            <div className="hz-stack-6">
              <div>
                <h3 className="hz-t-xl hz-w-medium hz-mb-5">Core Colors</h3>
                <div className="hz-grid hz-grid-4 hz-gap-5">
                  <ColorSwatch name="Pure Black" hex="#000000" className="hz-bg" />
                  <ColorSwatch name="Deep Black" hex="#101010" className="hz-bg-surface" />
                  <ColorSwatch name="Pure White" hex="#FFFFFF" className="hz-bg-inverse" />
                  <ColorSwatch name="Off White" hex="#F7F7F7" className="hz-bg-surface" />
                </div>
              </div>
              
              <div>
                <h3 className="hz-t-xl hz-w-medium hz-mb-5">Gray Scale</h3>
                <div className="hz-grid hz-grid-6 hz-gap-5">
                  <ColorSwatch name="Gray 900" hex="#171717" className="hz-bg-surface" />
                  <ColorSwatch name="Gray 800" hex="#262626" className="hz-bg-surface" />
                  <ColorSwatch name="Gray 700" hex="#404040" className="hz-bg-surface" />
                  <ColorSwatch name="Gray 600" hex="#525252" className="hz-bg-surface" />
                  <ColorSwatch name="Gray 500" hex="#737373" className="hz-bg-surface" />
                  <ColorSwatch name="Gray 400" hex="#A3A3A3" className="hz-bg-surface" />
                </div>
              </div>
              
              <div>
                <h3 className="hz-t-xl hz-w-medium hz-mb-5">Subtle Gradients</h3>
                <div className="hz-grid hz-grid-2 hz-gap-5">
                  <ColorSwatch 
                    name="White Fade" 
                    hex="Linear" 
                    className="" 
                  />
                  <ColorSwatch 
                    name="Gray Fade" 
                    hex="Linear" 
                    className="" 
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Typography */}
          <section className="hz-mb-7">
            <h2 className="hz-t-2xl hz-w-bold hz-mb-6 hz-align-center">Typography</h2>
            <div className="hz-container-narrow">
              <TypographyExample 
                name="Heading 1" 
                className="hz-t-4xl hz-w-bold hz-tracking-tight" 
                description="Large page titles, hero sections" 
              />
              <TypographyExample 
                name="Heading 2" 
                className="hz-t-3xl hz-w-bold hz-tracking-tight" 
                description="Section titles, major divisions" 
              />
              <TypographyExample 
                name="Heading 3" 
                className="hz-t-2xl hz-w-semibold" 
                description="Subsection headings, feature headings" 
              />
              <TypographyExample 
                name="Heading 4" 
                className="hz-t-xl hz-w-medium" 
                description="Card titles, minor section headings" 
              />
              <TypographyExample 
                name="Body Large" 
                className="hz-t-lg hz-leading-relaxed hz-fg-soft" 
                description="Featured paragraphs, pull quotes" 
              />
              <TypographyExample 
                name="Body" 
                className="hz-t-base hz-leading-relaxed hz-fg-muted" 
                description="Primary body text" 
              />
              <TypographyExample 
                name="Caption" 
                className="hz-t-sm hz-fg-muted" 
                description="Supporting text, metadata, labels" 
              />
            </div>
          </section>
          
          {/* Components */}
          <section className="hz-mb-7">
            <h2 className="hz-t-2xl hz-w-bold hz-mb-6 hz-align-center">Components</h2>
            <div className="hz-stack-6">
              <ComponentShowcase title="Buttons">
                <Button variant="default" size="lg">Primary Button</Button>
                <Button variant="outline" size="lg">Secondary Button</Button>
                <Button variant="ghost" size="lg">Ghost Button</Button>
                <Button variant="link" size="lg">Link Button</Button>
              </ComponentShowcase>
              
              <ComponentShowcase title="Cards">
                <div className="hz-card hz-w-full hz-mw-sm">
                  <h3 className="hz-t-xl hz-w-medium hz-mb-2">Card Title</h3>
                  <p className="hz-fg-muted hz-mb-4">This is a standard card component with a subtle gradient background.</p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </div>
              </ComponentShowcase>
              
              <ComponentShowcase title="Badges">
                <div className="hz-px-3 hz-py-1 hz-r-full hz-bg-surface hz-fg-soft hz-t-sm hz-w-medium">Default Badge</div>
                <div className="hz-px-3 hz-py-1 hz-r-full hz-bg-surface hz-glass hz-bordered hz-fg hz-t-sm hz-w-medium">Glass Badge</div>
              </ComponentShowcase>
            </div>
          </section>
          
          {/* Grid & Spacing */}
          <section className="hz-mb-7">
            <h2 className="hz-t-2xl hz-w-bold hz-mb-6 hz-align-center">Grid & Spacing</h2>
            <div className="hz-container-narrow">
              <div className="hz-bg-surface hz-p-4 hz-r-lg hz-mb-6">
                <div className="hz-grid hz-grid-4 hz-gap-4 hz-bh-8">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="hz-bg-raised hz-r-md hz-row hz-ai-center hz-jc-center">
                      <span className="hz-t-xs hz-fg-muted">{i+1}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hz-stack-3 hz-fg-muted">
                <p>We use a 4px base unit for all spacing measurements.</p>
                <p>Common spacing values: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px.</p>
                <p>Baseline grid: 4px with a primary line height of 1.5.</p>
              </div>
            </div>
          </section>
          
          {/* Icons & Illustrations */}
          <section>
            <h2 className="hz-t-2xl hz-w-bold hz-mb-6 hz-align-center">Icons & Illustrations</h2>
            <div className="hz-container-narrow hz-align-center">
              <p className="hz-fg-muted hz-mb-6">
                We use minimalist, monochrome SVG graphics with subtle animations to emphasize important concepts
                without compromising our clean, elegant aesthetic.
              </p>
              <div className="hz-row hz-wrap hz-gap-6 hz-jc-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hz-fg">
                  <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hz-fg">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hz-fg">
                  <path d="M15 4L9 12L15 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hz-fg">
                  <path d="M9 4L15 12L9 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Brand;

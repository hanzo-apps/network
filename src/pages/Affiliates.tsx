
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, DollarSign, BarChart, Target, Award, Briefcase, BookOpen } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";
import { GridLines } from "@/components/ui/architectural-elements";
import { Link } from "react-router-dom";

const Affiliates = () => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg hz-rel hz-clip">
      <Helmet>
        <title>Affiliate Program - Hanzo AI</title>
        <meta name="description" content="Join Hanzo's Affiliate Program and earn recurring commissions for promoting our AI tools and services to your audience." />
      </Helmet>
      
      {/* Background elements */}
      <div className="hz-fixed hz-inset hz-z-behind">
        <GridLines spacing={100} opacity={0.07} />
        <div className="hz-abs hz-top-0 hz-left-0 hz-bg-raised hz-r-full hz-blur-bg"></div>
        <div className="hz-abs hz-bottom-0 hz-right-0 hz-bg-raised hz-r-full hz-blur-bg"></div>
      </div>
      
      <Navbar />
      
      <main className="hz-pt-6 hz-pb-6">
        {/* Hero Section */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hz-align-center hz-mb-7"
            >
              <div className="hz-card hz-card-tight hz-fg-soft hz-mb-5">
                <Briefcase className="hz-sq-5" />
              </div>
              <ChromeText as="h1" className="hz-t-4xl hz-w-bold hz-mb-5">
                Hanzo Affiliate Program
              </ChromeText>
              <p className="hz-container-narrow hz-t-xl hz-fg-soft">
                Earn recurring commissions by promoting Hanzo's AI tools and services to your audience. Join our growing network of influencers, content creators, and AI enthusiasts.
              </p>
              <div className="hz-mt-6">
                <Button size="lg" className="hz-bg-raised hz-px-6 hz-hoverable">
                  Apply Now
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Commission Structure */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="hz-align-center hz-mb-7"
            >
              <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-4">
                Commission Structure
              </ChromeText>
              <p className="hz-container-narrow hz-t-xl hz-fg-soft">
                Earn competitive commissions on all Hanzo products and services
              </p>
            </motion.div>
            
            <div className="hz-grid hz-grid-3 hz-gap-6 hz-mb-7">
              {[
                {
                  icon: <DollarSign className="hz-sq-6 hz-fg-muted" />,
                  title: "30% First Payment",
                  description: "Earn 30% commission on the first payment made by customers you refer"
                },
                {
                  icon: <BarChart className="hz-sq-6 hz-fg-muted" />,
                  title: "15% Recurring Revenue",
                  description: "Continue earning 15% on recurring payments for the lifetime of the customer"
                },
                {
                  icon: <Target className="hz-sq-6 hz-fg-muted" />,
                  title: "90-Day Cookie",
                  description: "Our 90-day cookie tracking ensures you get credit for your referrals"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="hz-card hz-align-center"
                >
                  <div className="hz-sq-8 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center hz-mx-auto hz-mb-5">
                    {item.icon}
                  </div>
                  <h3 className="hz-t-2xl hz-w-bold hz-mb-3">{item.title}</h3>
                  <p className="hz-fg-soft">{item.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="hz-card"
            >
              <div className="hz-col-row hz-ai-center hz-jc-between hz-gap-6">
                <div>
                  <h3 className="hz-t-2xl hz-w-bold hz-mb-2">Revenue Calculator</h3>
                  <p className="hz-fg-soft">
                    See how much you could earn as a Hanzo affiliate based on your audience size and conversion rates.
                  </p>
                </div>
                <Button className="hz-bg-raised hz-px-5 hz-hoverable">
                  Calculate Your Earnings
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="hz-align-center hz-mb-7"
            >
              <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-4">
                Why Become an Affiliate
              </ChromeText>
              <p className="hz-container-narrow hz-t-xl hz-fg-soft">
                Join forces with a leading AI technology company and earn while helping others discover powerful AI tools
              </p>
            </motion.div>
            
            <div className="hz-grid hz-grid-3 hz-gap-6">
              {[
                {
                  icon: <Award className="hz-sq-5 hz-fg-muted" />,
                  title: "Industry-Leading Commissions",
                  description: "Earn some of the highest commission rates in the AI industry with our tiered structure"
                },
                {
                  icon: <BookOpen className="hz-sq-5 hz-fg-muted" />,
                  title: "Comprehensive Resources",
                  description: "Access marketing materials, banners, product information, and case studies"
                },
                {
                  icon: <DollarSign className="hz-sq-5 hz-fg-muted" />,
                  title: "Timely Payments",
                  description: "Get paid reliably every month via PayPal, Square, or bank transfer"
                },
                {
                  icon: <BarChart className="hz-sq-5 hz-fg-muted" />,
                  title: "Detailed Analytics",
                  description: "Track your performance with real-time reporting and conversion data"
                },
                {
                  icon: <Target className="hz-sq-5 hz-fg-muted" />,
                  title: "Dedicated Support",
                  description: "Work with our affiliate manager to optimize your campaigns and maximize earnings"
                },
                {
                  icon: <ExternalLink className="hz-sq-5 hz-fg-muted" />,
                  title: "High-Converting Landing Pages",
                  description: "Direct your traffic to optimized pages designed to convert visitors into customers"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="hz-card"
                >
                  <div className="hz-sq-7 hz-r-lg hz-bg-raised hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center hz-mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="hz-t-xl hz-w-bold hz-mb-2">{benefit.title}</h3>
                  <p className="hz-fg-soft">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="hz-align-center hz-mb-7"
            >
              <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-4">
                How It Works
              </ChromeText>
              <p className="hz-container-narrow hz-t-xl hz-fg-soft">
                Get started with Hanzo's Affiliate Program in just a few simple steps
              </p>
            </motion.div>
            
            <div className="hz-rel">
              <div className="hz-desktop-only hz-center-x hz-abs hz-h-full hz-bw-1"></div>
              
              <div className="hz-stack-6 hz-rel">
                {[
                  {
                    number: "01",
                    title: "Apply to the Program",
                    description: "Fill out our simple application form to join the Hanzo Affiliate Program"
                  },
                  {
                    number: "02",
                    title: "Get Approved",
                    description: "Our team will review your application and approve your account within 48 hours"
                  },
                  {
                    number: "03",
                    title: "Access Your Dashboard",
                    description: "Get your unique affiliate links and access marketing materials through your dashboard"
                  },
                  {
                    number: "04",
                    title: "Promote Hanzo",
                    description: "Share your affiliate links through your website, social media, newsletter, or other channels"
                  },
                  {
                    number: "05",
                    title: "Track Performance",
                    description: "Monitor your referrals, conversions, and earnings in real-time"
                  },
                  {
                    number: "06",
                    title: "Get Paid",
                    description: "Receive monthly payments for all qualified conversions"
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`hz-col ${index % 2 === 0 ? '' : ''} hz-ai-center hz-gap-6`}
                  >
                    <div className="hz-row hz-jc-center">
                      <div className="hz-sq-8 hz-r-full hz-row hz-ai-center hz-jc-center hz-t-3xl hz-w-bold hz-z-raised">
                        {step.number}
                      </div>
                    </div>
                    <div className="hz-card">
                      <h3 className="hz-t-xl hz-w-bold hz-mb-2">{step.title}</h3>
                      <p className="hz-fg-soft">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="hz-py-7 hz-px-4">
          <div className="hz-container-wide hz-card hz-align-center">
            <ChromeText as="h2" className="hz-t-3xl hz-w-bold hz-mb-4">
              Ready to Become an Affiliate?
            </ChromeText>
            <p className="hz-container-narrow hz-t-xl hz-fg-soft hz-mb-6">
              Join our affiliate program today and start earning commissions by promoting Hanzo's powerful AI tools and services.
            </p>
            <div className="hz-col-row hz-gap-4 hz-jc-center">
              <Button size="lg" className="hz-bg-raised hz-px-6 hz-hoverable">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="hz-px-6 hz-hoverable">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Affiliates;

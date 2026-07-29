import { motion } from "framer-motion";
import { BarChart, LineChart, PieChart, Activity, Users, Globe, Zap, Brain, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Analytics = () => {
  // Container animation variants
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Hover animation variants
  const hoverVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  // User Insights section animation variants
  const userInsightsVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  const userInsightItemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // AI Analytics section animation variants
  const aiAnalyticsVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };
  const aiAnalyticsItemVariants = {
    hidden: {
      opacity: 0,
      x: -15,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14
      }
    }
  };

  // Animation variants for the milestone progress
  const milestoneLineVariants = {
    hidden: {
      width: 0
    },
    visible: (custom: number) => ({
      width: `${custom}%`,
      transition: {
        duration: 1,
        delay: custom === 25 ? 0 : custom === 50 ? 2 : custom === 75 ? 4 : 6,
        ease: "easeInOut"
      }
    })
  };
  const milestoneCircleVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0.5,
      borderColor: "#4B5563"
    },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      borderColor: "#FFFFFF",
      transition: {
        duration: 0.5,
        delay: custom === 1 ? 1 : custom === 2 ? 3 : custom === 3 ? 5 : 0,
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    })
  };

  // Fixed icon variants - now using predefined color states rather than functions in the hidden state
  const iconVariantsFirst = {
    hidden: {
      color: "#a3a3a3"
    },
    visible: {
      color: "#FFFFFF",
      transition: {
        duration: 0.3,
        delay: 1
      }
    }
  };
  const iconVariantsSecond = {
    hidden: {
      color: "#a3a3a3"
    },
    visible: {
      color: "#FFFFFF",
      transition: {
        duration: 0.3,
        delay: 3
      }
    }
  };
  const iconVariantsThird = {
    hidden: {
      color: "#a3a3a3"
    },
    visible: {
      color: "#FFFFFF",
      transition: {
        duration: 0.3,
        delay: 5
      }
    }
  };

  return <section className="hz-py-7 hz-bg">
      <div className="hz-container">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        margin: "-100px"
      }} transition={{
        duration: 0.5
      }} className="hz-align-center hz-mb-7">
          <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.1,
          duration: 0.4
        }} className="hz-inline hz-ai-center hz-inline-2 hz-bg-surface hz-px-4 hz-py-1 hz-r-full hz-mb-5">
            <Activity className="hz-sq-2 hz-fg-muted" />
            <span className="hz-t-sm hz-fg-muted">Real-time Analytics</span>
          </motion.div>
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.2,
          duration: 0.4
        }} className="hz-t-3xl hz-display hz-fg hz-mb-4">
            Scale from Zero to One Billion Users
          </motion.h2>
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.3,
          duration: 0.4
        }} className="hz-container-narrow hz-t-lg hz-fg-soft hz-py-0">
            Enterprise-grade analytics built for the AI era. Track, analyze, and optimize your application with our powerful analytics suite.
          </motion.p>
        </motion.div>

        {/* Milestone Progress Indicator - With numbered circles instead of icons */}
        <div className="hz-rel hz-mb-4 hz-row hz-jc-center">
          <div className="hz-rel hz-w-full hz-mw-lg">
            {/* Background line */}
            <div className="hz-abs hz-left-0 hz-w-full hz-bh-1 hz-bg-raised hz-r-full"></div>
            
            {/* Animated progress lines in segments - with fixed percentages for equal spacing */}
            <motion.div className="hz-abs hz-left-0 hz-bh-1 hz-bg-inverse hz-r-full" variants={milestoneLineVariants} initial="hidden" whileInView="visible" viewport={{
            once: true,
            margin: "-100px"
          }} custom={33.33}></motion.div>
            
            <motion.div className="hz-abs hz-bh-1 hz-bg-inverse hz-r-full" variants={milestoneLineVariants} initial="hidden" whileInView="visible" viewport={{
            once: true,
            margin: "-100px"
          }} custom={33.33}></motion.div>
            
            <motion.div className="hz-abs hz-bh-1 hz-bg-inverse hz-r-full" variants={milestoneLineVariants} initial="hidden" whileInView="visible" viewport={{
            once: true,
            margin: "-100px"
          }} custom={33.34}></motion.div>
            
            {/* Milestone Points - with numbers clearly visible */}
            <div className="hz-row hz-jc-between hz-ai-center hz-rel hz-w-full">
              {/* First Milestone */}
              <div className="hz-align-center hz-rel hz-px-4">
                <motion.div className="hz-sq-7 hz-r-full hz-bg-surface hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center hz-mx-auto hz-rel" variants={milestoneCircleVariants} initial="hidden" whileInView="visible" viewport={{
                once: true,
                margin: "-100px"
              }} custom={1}>
                  <motion.span className="hz-t-xl hz-w-bold hz-fg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>1</motion.span>
                </motion.div>
                <p className="hz-mt-2 hz-w-medium hz-fg hz-t-xs hz-whitespace-nowrap">Real-time Events</p>
              </div>
              
              {/* Second Milestone - Center */}
              <div className="hz-align-center hz-rel hz-px-2">
                <motion.div className="hz-sq-7 hz-r-full hz-bg-surface hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center hz-mx-auto" variants={milestoneCircleVariants} initial="hidden" whileInView="visible" viewport={{
                once: true,
                margin: "-100px"
              }} custom={2}>
                  <motion.span className="hz-t-xl hz-w-bold hz-fg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>2</motion.span>
                </motion.div>
                <p className="hz-mt-2 hz-w-medium hz-fg hz-t-xs hz-whitespace-nowrap">User Insights</p>
              </div>
              
              {/* Third Milestone */}
              <div className="hz-align-center hz-rel hz-px-4">
                <motion.div className="hz-sq-7 hz-r-full hz-bg-surface hz-bordered hz-border-strong hz-row hz-ai-center hz-jc-center hz-mx-auto" variants={milestoneCircleVariants} initial="hidden" whileInView="visible" viewport={{
                once: true,
                margin: "-100px"
              }} custom={3}>
                  <motion.span className="hz-t-xl hz-w-bold hz-fg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }}>3</motion.span>
                </motion.div>
                <p className="hz-mt-2 hz-w-medium hz-fg hz-t-xs hz-whitespace-nowrap">AI Analytics</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: "-50px"
      }} className="hz-grid hz-grid-3 hz-gap-4 hz-mb-7 hz-mt-6">
          <motion.div variants={itemVariants} whileHover="hover" whileTap="tap" className="hz-p-4 hz-r-lg hz-transition hz-col hz-ai-center hz-align-center">
            <p className="hz-t-xs hz-fg-soft">Track user behavior, system events, and business metrics in real-time with millisecond latency.</p>
          </motion.div>

          <motion.div variants={itemVariants} whileHover="hover" whileTap="tap" className="hz-p-4 hz-r-lg hz-transition hz-col hz-ai-center hz-align-center">
            <p className="hz-t-xs hz-fg-soft">Understand user journeys, cohorts, and behavior patterns with AI-powered analytics.</p>
          </motion.div>

          <motion.div variants={itemVariants} whileHover="hover" whileTap="tap" className="hz-p-4 hz-r-lg hz-transition hz-col hz-ai-center hz-align-center">
            <p className="hz-t-xs hz-fg-soft">Leverage machine learning to predict trends, detect anomalies, and optimize performance.</p>
          </motion.div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        margin: "-50px"
      }} transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }} className="hz-r-lg hz-p-6 hz-mb-7">
          <div className="hz-grid hz-grid-2 hz-gap-6 hz-ai-center">
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.3,
            duration: 0.5
          }}>
              <h3 className="hz-t-xl hz-w-semibold hz-fg hz-mb-4">Planetary-Scale Infrastructure</h3>
              <motion.ul variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
              once: true
            }} className="hz-stack-4">
                <motion.li variants={itemVariants} className="hz-row hz-ai-start hz-inline-3">
                  <Zap className="hz-sq-3 hz-fg-muted hz-mt-1" />
                  <div>
                    <h4 className="hz-t-sm hz-fg hz-w-semibold">Global Edge Network</h4>
                    <p className="hz-t-xs hz-fg-soft">200+ data centers worldwide ensuring sub-50ms latency for 99% of users</p>
                  </div>
                </motion.li>
                <motion.li variants={itemVariants} className="hz-row hz-ai-start hz-inline-3">
                  <Globe className="hz-sq-3 hz-fg-muted hz-mt-1" />
                  <div>
                    <h4 className="hz-t-sm hz-fg hz-w-semibold">Infinite Scale</h4>
                    <p className="hz-t-xs hz-fg-soft">Handle billions of events per day with automatic scaling and zero maintenance</p>
                  </div>
                </motion.li>
                <motion.li variants={itemVariants} className="hz-row hz-ai-start hz-inline-3">
                  <Brain className="hz-sq-3 hz-fg-muted hz-mt-1" />
                  <div>
                    <h4 className="hz-t-sm hz-fg hz-w-semibold">AI-Powered Insights</h4>
                    <p className="hz-t-xs hz-fg-soft">Automatic anomaly detection, trend analysis, and predictive analytics</p>
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>
            
          </div>
        </motion.div>

        {/* User Insights Section - Enhanced centering */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        margin: "-50px"
      }} transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 90
      }} className="hz-mb-7 hz-mx-auto">
          <motion.h2 initial={{
          opacity: 0,
          y: 15
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.2,
          duration: 0.5
        }} className="hz-t-2xl hz-w-semibold hz-fg hz-align-center hz-mb-7">
            Powerful User Insights for Growth
          </motion.h2>

          <motion.div variants={userInsightsVariants} initial="hidden" whileInView="visible" viewport={{
          once: true
        }} className="hz-grid hz-grid-3 hz-gap-4">
            <motion.div variants={userInsightItemVariants} whileHover={{
            y: -5,
            transition: {
              duration: 0.2
            }
          }} className="hz-r-lg hz-p-4 hz-ring hz-col hz-ai-center hz-align-center">
              <div className="hz-sq-6 hz-r-full hz-p-2 hz-row hz-ai-center hz-jc-center hz-mb-3">
                <Users className="hz-sq-3 hz-fg-soft" />
              </div>
              <h3 className="hz-t-base hz-w-medium hz-fg hz-mb-2">Cohort Analysis</h3>
              <p className="hz-t-xs hz-fg-soft">Group users by common characteristics and behaviors to discover usage patterns.</p>
            </motion.div>

            <motion.div variants={userInsightItemVariants} whileHover={{
            y: -5,
            transition: {
              duration: 0.2
            }
          }} className="hz-r-lg hz-p-4 hz-ring hz-col hz-ai-center hz-align-center">
              <div className="hz-sq-6 hz-r-full hz-p-2 hz-row hz-ai-center hz-jc-center hz-mb-3">
                <LineChart className="hz-sq-3 hz-fg-soft" />
              </div>
              <h3 className="hz-t-base hz-w-medium hz-fg hz-mb-2">User Journeys</h3>
              <p className="hz-t-xs hz-fg-soft">Visualize and optimize the complete user journey from acquisition to conversion.</p>
            </motion.div>

            <motion.div variants={userInsightItemVariants} whileHover={{
            y: -5,
            transition: {
              duration: 0.2
            }
          }} className="hz-r-lg hz-p-4 hz-ring hz-col hz-ai-center hz-align-center">
              <div className="hz-sq-6 hz-r-full hz-p-2 hz-row hz-ai-center hz-jc-center hz-mb-3">
                <PieChart className="hz-sq-3 hz-fg-soft" />
              </div>
              <h3 className="hz-t-base hz-w-medium hz-fg hz-mb-2">Engagement Metrics</h3>
              <p className="hz-t-xs hz-fg-soft">Capture and analyze key engagement metrics to improve user retention.</p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        margin: "-50px"
      }} transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 85
      }} className="hz-r-lg hz-p-6 hz-mb-7">
          <motion.h2 initial={{
          opacity: 0,
          y: 15
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.2,
          duration: 0.5
        }} className="hz-t-2xl hz-w-semibold hz-fg hz-align-center hz-mb-6">
            Easily Integrate Hanzo AI-Powered Analytics
          </motion.h2>

          <motion.div variants={aiAnalyticsVariants} initial="hidden" whileInView="visible" viewport={{
          once: true
        }} className="hz-stack-5">
            <motion.div variants={aiAnalyticsItemVariants} whileHover={{
            x: 5,
            transition: {
              duration: 0.2
            }
          }} className="hz-r-lg hz-p-4 hz-ring hz-row hz-ai-start hz-inline-4">
              <div className="hz-r-lg hz-p-3">
                <Brain className="hz-sq-3 hz-fg-soft" />
              </div>
              <div className="hz-grow hz-align-center">
                <h3 className="hz-t-base hz-w-medium hz-fg hz-mb-2">Predictive Analysis</h3>
                <p className="hz-t-xs hz-fg-soft">Forecast future trends and user behaviors with advanced machine learning algorithms.</p>
              </div>
            </motion.div>

            <motion.div variants={aiAnalyticsItemVariants} whileHover={{
            x: 5,
            transition: {
              duration: 0.2
            }
          }} className="hz-r-lg hz-p-4 hz-ring hz-row hz-ai-start hz-inline-4">
              <div className="hz-r-lg hz-p-3">
                <Activity className="hz-sq-3 hz-fg-soft" />
              </div>
              <div className="hz-grow hz-align-center">
                <h3 className="hz-t-base hz-w-medium hz-fg hz-mb-2">Anomaly Detection</h3>
                <p className="hz-t-xs hz-fg-soft">Automatically identify unusual patterns and potential issues in your application.</p>
              </div>
            </motion.div>

            <motion.div variants={aiAnalyticsItemVariants} whileHover={{
            x: 5,
            transition: {
              duration: 0.2
            }
          }} className="hz-r-lg hz-p-4 hz-ring hz-row hz-ai-start hz-inline-4">
              <div className="hz-r-lg hz-p-3">
                <BarChart className="hz-sq-3 hz-fg-soft" />
              </div>
              <div className="hz-grow hz-align-center">
                <h3 className="hz-t-base hz-w-medium hz-fg hz-mb-2">Intelligent Recommendations</h3>
                <p className="hz-t-xs hz-fg-soft">Get actionable insights and recommendations to optimize your business metrics.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        delay: 0.8,
        duration: 0.5
      }} className="hz-align-center">
          <motion.div whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} transition={{
          type: "spring",
          stiffness: 400,
          damping: 10
        }}>
            <Button className="hz-bg-raised hz-fg hz-px-5 hz-py-4 hz-t-base hz-r-lg hz-hoverable">
              Get Started with Analytics
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};
export default Analytics;

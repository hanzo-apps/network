
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Building, 
  ShieldCheck, 
  BadgeCheck, 
  Clock, 
  Users,
  ArrowRight
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const EnterpriseReadiness = () => {
  const enterpriseFeatures = [
    {
      icon: <Building className="hz-sq-5 hz-fg-muted" />,
      title: "Custom Deployment",
      description: "On-premises, private cloud, or hybrid deployment options to meet your specific security and compliance requirements."
    },
    {
      icon: <Users className="hz-sq-5 hz-fg-muted" />,
      title: "Team Management",
      description: "Comprehensive tools for managing teams, permissions, and access controls across your organization."
    },
    {
      icon: <ShieldCheck className="hz-sq-5 hz-fg-muted" />,
      title: "Data Sovereignty",
      description: "Control where your data is stored and processed to meet regional compliance requirements."
    },
    {
      icon: <BadgeCheck className="hz-sq-5 hz-fg-muted" />,
      title: "Custom AI Training",
      description: "Train AI agents on your proprietary data and workflows for specialized domain expertise."
    },
    {
      icon: <Clock className="hz-sq-5 hz-fg-muted" />,
      title: "24/7 Support",
      description: "Round-the-clock dedicated support team and guaranteed response times for critical issues."
    },
    {
      icon: <Briefcase className="hz-sq-5 hz-fg-muted" />,
      title: "Implementation Services",
      description: "Professional services for seamless integration, migration, and onboarding with your existing systems."
    }
  ];

  return (
    <section className="hz-py-7 hz-px-4 hz-bg-surface">
      <div className="hz-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-align-center hz-mb-7"
        >
          <div className="hz-inline hz-p-2 hz-r-full hz-bg-raised hz-bordered hz-border-strong hz-fg-muted hz-mb-4">
            <Briefcase className="hz-sq-4" />
          </div>
          <h2 className="hz-t-3xl hz-w-bold hz-mb-5">
            Enterprise Ready
          </h2>
          <p className="hz-container-narrow hz-t-xl hz-fg-soft">
            Hanzo Team is built from the ground up for enterprise deployments,
            with the security, scalability, and support your organization requires.
          </p>
        </motion.div>

        <div className="hz-grid hz-grid-3 hz-gap-6 hz-mb-7">
          {enterpriseFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hz-h-full hz-bg-overlay hz-bordered hz-border-strong hz-glass">
                <CardHeader className="hz-pb-4">
                  <div className="hz-bg-raised hz-p-3 hz-r-lg hz-inline hz-mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="hz-t-xl hz-w-semibold">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="hz-fg-muted">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hz-card hz-align-center"
        >
          <h3 className="hz-t-2xl hz-w-bold hz-mb-4">Ready to equip your enterprise?</h3>
          <p className="hz-container-narrow hz-mw-md hz-fg-soft hz-mb-6">
            Contact our enterprise sales team for a personalized demo and custom pricing that meets your organization's unique needs.
          </p>
          <Button 
            size="lg"
            className=""
          >
            Contact Enterprise Sales
            <ArrowRight className="hz-sq-2 hz-ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EnterpriseReadiness;

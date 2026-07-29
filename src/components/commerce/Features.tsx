
import React from "react";
import { 
  ShoppingCart, CreditCard, Package, BarChart, 
  Tags, Gift, Truck, Globe, Shield, Database
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="hz-card hz-transition hz-card-interactive">
      <div className="hz-bg-raised hz-p-3 hz-r-lg hz-w-fit hz-mb-4">
        {icon}
      </div>
      <h3 className="hz-t-xl hz-w-semibold hz-mb-2">{title}</h3>
      <p className="hz-fg-muted">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <ShoppingCart className="hz-sq-4 hz-fg-muted" />,
      title: "Headless Shopping Carts",
      description: "Flexible cart management with customizable checkout flows for any frontend."
    },
    {
      icon: <Package className="hz-sq-4 hz-fg-muted" />,
      title: "Product Management",
      description: "Powerful catalog management with variants, collections, and custom attributes."
    },
    {
      icon: <CreditCard className="hz-sq-4 hz-fg-muted" />,
      title: "Payment Processing",
      description: "Seamless integration with multiple payment gateways and subscription billing."
    },
    {
      icon: <Gift className="hz-sq-4 hz-fg-muted" />,
      title: "Promotions & Discounts",
      description: "Create complex discount rules, coupons, and loyalty programs."
    },
    {
      icon: <Tags className="hz-sq-4 hz-fg-muted" />,
      title: "Dynamic Pricing",
      description: "Implement sophisticated pricing strategies with targeted rules and segmentation."
    },
    {
      icon: <BarChart className="hz-sq-4 hz-fg-muted" />,
      title: "Analytics & Reporting",
      description: "Real-time insights into sales, inventory, customer behavior, and more."
    },
    {
      icon: <Truck className="hz-sq-4 hz-fg-muted" />,
      title: "Order Management",
      description: "Complete visibility and control over the entire order lifecycle."
    },
    {
      icon: <Globe className="hz-sq-4 hz-fg-muted" />,
      title: "Multi-channel Selling",
      description: "Sell across websites, mobile apps, social media, and marketplaces."
    },
    {
      icon: <Shield className="hz-sq-4 hz-fg-muted" />,
      title: "Fraud Protection",
      description: "Advanced security features to protect your business and customers."
    },
    {
      icon: <Database className="hz-sq-4 hz-fg-muted" />,
      title: "Scalable Infrastructure",
      description: "Built for high-volume transactions with enterprise-grade reliability."
    }
  ];

  return (
    <section className="hz-py-7 hz-bg">
      <div className="hz-container hz-mx-auto hz-px-4">
        <div className="hz-align-center hz-mb-7">
          <h2 className="hz-t-3xl hz-w-bold">Powerful E-commerce Features</h2>
          <p className="hz-container-narrow hz-mw-md hz-mt-4 hz-fg-muted">
            Everything you need to build exceptional shopping experiences, all through a simple API-first approach.
          </p>
        </div>
        
        <div className="hz-grid hz-grid-3 hz-gap-5">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

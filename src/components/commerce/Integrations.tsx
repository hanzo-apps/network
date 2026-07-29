
import React from "react";
import { CheckCircle } from "lucide-react";

const IntegrationCategory = ({ title, items }: { title: string, items: string[] }) => {
  return (
    <div className="hz-mb-6">
      <h3 className="hz-t-xl hz-w-semibold hz-mb-4">{title}</h3>
      <ul className="hz-grid hz-grid-3 hz-gap-5 hz-gap-2">
        {items.map((item, index) => (
          <li key={index} className="hz-row hz-ai-center">
            <CheckCircle className="hz-sq-3 hz-fg-muted hz-mr-2 hz-none" />
            <span className="hz-fg-soft">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Integrations = () => {
  const integrationCategories = [
    {
      title: "Payment Gateways",
      items: ["Square", "PayPal", "Adyen", "Square", "Braintree", "Klarna", "Affirm", "Apple Pay"]
    },
    {
      title: "Marketing & CRM",
      items: ["Mailchimp", "Klaviyo", "HubSpot", "Salesforce", "Segment", "Meta Pixel", "Google Analytics", "Customer.io"]
    },
    {
      title: "Shipping & Fulfillment",
      items: ["ShipStation", "ShipBob", "EasyPost", "FedEx", "UPS", "USPS", "DHL", "AfterShip"]
    },
    {
      title: "Accounting & ERP",
      items: ["QuickBooks", "Xero", "NetSuite", "SAP", "Avalara", "TaxJar", "Sage", "Microsoft Dynamics"]
    }
  ];

  return (
    <section className="hz-py-7 hz-bg">
      <div className="hz-container hz-mx-auto hz-px-4">
        <div className="hz-align-center hz-mb-7">
          <h2 className="hz-t-3xl hz-w-bold">Integrations</h2>
          <p className="hz-container-narrow hz-mw-md hz-mt-4 hz-fg-muted">
            Connect seamlessly with your existing technology stack and third-party services.
          </p>
        </div>
        
        <div className="hz-card">
          {integrationCategories.map((category, index) => (
            <IntegrationCategory 
              key={index}
              title={category.title}
              items={category.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;

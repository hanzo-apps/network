
import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Receipt, Clock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { createAnimationVariant, curves } from "@/components/ui/animation-variants";

const cardAnimation = createAnimationVariant("fadeInBlur", {
  duration: 0.4,
  curve: curves.snappy,
  distance: 15
});

const InvoicesSummary = () => {
  return (
    <div className="hz-grid hz-grid-3 hz-gap-5">
      <motion.div 
        variants={cardAnimation}
        className="hz-card"
      >
        <div className="hz-row hz-ai-center hz-gap-3 hz-mb-4">
          <CreditCard className="hz-sq-3 hz-fg-muted" />
          <h3 className="hz-t-xl hz-w-medium">Active Subscription</h3>
        </div>
        
        <div className="hz-mb-5">
          <div className="hz-t-3xl hz-w-bold hz-mb-1">Trial Plan</div>
          <p className="hz-fg-muted">Free credit grant of $5.00</p>
        </div>
        
        <Button 
          className="hz-bg-raised hz-fg hz-w-full hz-hoverable"
        >
          View Plan Details
        </Button>
      </motion.div>
      
      <motion.div 
        variants={cardAnimation}
        className="hz-card"
      >
        <div className="hz-row hz-ai-center hz-gap-3 hz-mb-4">
          <Receipt className="hz-sq-3 hz-fg-muted" />
          <h3 className="hz-t-xl hz-w-medium">Payment Summary</h3>
        </div>
        
        <div className="hz-stack-2 hz-mb-4">
          <div className="hz-row hz-jc-between">
            <span className="hz-fg-muted">Current Usage</span>
            <span>$0.04</span>
          </div>
          <div className="hz-row hz-jc-between">
            <span className="hz-fg-muted">Next Invoice</span>
            <span>$0.00</span>
          </div>
          <div className="hz-row hz-jc-between hz-w-medium">
            <span>Credits Available</span>
            <span>$5.00</span>
          </div>
        </div>
        
        <Button className="hz-bg-inverse hz-fg-inverse hz-w-full hz-hoverable">
          Purchase Credits
        </Button>
      </motion.div>
      
      <motion.div 
        variants={cardAnimation}
        className="hz-card"
      >
        <div className="hz-row hz-ai-center hz-gap-3 hz-mb-4">
          <Clock className="hz-sq-3 hz-fg-muted" />
          <h3 className="hz-t-xl hz-w-medium">Upcoming Charges</h3>
        </div>
        
        <div className="hz-bg-overlay hz-p-4 hz-r-lg hz-row hz-ai-center hz-gap-3 hz-mb-5">
          <AlertCircle className="hz-sq-3 hz-fg-muted" />
          <p className="hz-fg-soft">No upcoming charges. You're on a trial plan.</p>
        </div>
        
        <Button 
          variant="outline" 
          className="hz-w-full"
        >
          View Pricing
        </Button>
      </motion.div>
    </div>
  );
};

export default InvoicesSummary;


import React from "react";
import { Users, Shield, ExternalLink, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const ExpertServices: React.FC = () => {
  return (
    <div className="hz-card hz-mb-7">
      <div className="hz-grid hz-grid-2 hz-gap-6">
        <div className="hz-card hz-transition hz-h-full hz-card-interactive">
          <div className="hz-p-3 hz-r-lg hz-bg-raised hz-self-start hz-mb-4">
            <Users className="hz-sq-4 hz-fg-muted" strokeWidth={1.5} />
          </div>
          <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-3">Hanzo Agency</h3>
          <p className="hz-fg-soft hz-mb-4">
            Our AI-powered creative agency helps brands transform their digital presence with cutting-edge design, 
            content, and marketing strategies powered by artificial intelligence.
          </p>
          <div className="hz-row hz-wrap hz-gap-4">
            <a 
              href="https://hanzo.agency" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hz-btn hz-gap-2 hz-fg hz-transition"
            >
              <span>Visit Hanzo Agency</span>
              <ExternalLink size={14} />
            </a>
            <a 
              href="/contact" 
              className="hz-btn hz-btn-ghost hz-gap-2 hz-fg-muted hz-transition"
            >
              <span>Contact us</span>
              <Mail size={14} />
            </a>
          </div>
        </div>
        <div className="hz-card hz-transition hz-h-full hz-card-interactive">
          <div className="hz-p-3 hz-r-lg hz-bg-raised hz-self-start hz-mb-4">
            <Shield className="hz-sq-4 hz-fg-muted" strokeWidth={1.5} />
          </div>
          <h3 className="hz-t-2xl hz-w-bold hz-fg hz-mb-3">Sensei Group</h3>
          <p className="hz-fg-soft hz-mb-4">
            Our collective of fractional CXOs and industry experts help enterprises implement transformative 
            technology solutions and drive strategic growth initiatives.
          </p>
          <div className="hz-row hz-wrap hz-gap-4">
            <a 
              href="https://sensei.group" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hz-btn hz-gap-2 hz-fg hz-transition"
            >
              <span>Visit Sensei Group</span>
              <ExternalLink size={14} />
            </a>
            <a 
              href="tel:+1234567890" 
              className="hz-btn hz-btn-ghost hz-gap-2 hz-fg-muted hz-transition"
            >
              <span>Schedule a call</span>
              <Phone size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertServices;

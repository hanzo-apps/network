
import React, { ReactNode } from 'react';

interface AuthPageContentProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const AuthPageContent: React.FC<AuthPageContentProps> = ({ 
  title, 
  subtitle, 
  children,
  footer
}) => {
  return (
    <div className="hz-min-h-screen hz-bg hz-fg hz-row hz-ai-center hz-jc-center hz-p-4">
      <div className="hz-w-full hz-mw-sm hz-stack-5">
        <div className="hz-align-center hz-mb-5">
          <a href="/" className="hz-mb-6">
            <img 
              src="/placeholder.svg" 
              alt="Hanzo Logo" 
              className="hz-bh-6 hz-mx-auto"
            />
          </a>
          <h1 className="hz-t-3xl hz-w-bold">{title}</h1>
          {subtitle && (
            <p className="hz-fg-muted hz-mt-2">{subtitle}</p>
          )}
        </div>
        
        <div className="hz-card">
          {children}
        </div>
        
        {footer && (
          <div className="hz-align-center hz-t-sm hz-fg-muted">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPageContent;

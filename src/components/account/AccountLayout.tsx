
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  User, CreditCard, BarChart3, FileText, 
  Building, Settings, ChevronRight, LogOut, 
  Gift, Link as LinkIcon
} from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useAccount } from '@/contexts/AccountContext';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import AnimatedSection, { AnimatedHeading } from '@/components/ui/animated-section';

const AccountLayout = ({ children }: { children?: React.ReactNode }) => {
  const { user, organizations, currentOrganization, switchOrganization, isLoading } = useAccount();
  const location = useLocation();

  const accountNavItems = [
    { name: 'Profile', path: '/account', icon: User },
    { name: 'Organization', path: '/account/organization', icon: Building },
    { name: 'Billing', path: '/account/billing', icon: CreditCard },
    { name: 'Usage', path: '/account/usage', icon: BarChart3 },
    { name: 'Invoices', path: '/invoices', icon: FileText },
    { name: 'Referrals', path: '/account/referrals', icon: Gift },
    { name: 'Settings', path: '/account/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/account/billing' && location.pathname.startsWith('/account/billing')) {
      return true;
    }
    if (path === '/account/referrals' && location.pathname.startsWith('/account/referrals')) {
      return true;
    }
    return location.pathname === path;
  };

  if (isLoading) {
    return <div className="hz-row hz-ai-center hz-jc-center hz-min-h-screen">Loading...</div>;
  }

  return (
    <div className="hz-min-h-screen hz-bg hz-fg">
      <Navbar />
      
      <main className="hz-pt-6 hz-pb-6 hz-px-4">
        <div className="hz-container-wide">
          <AnimatedSection>
            <div className="hz-row hz-jc-between hz-ai-center hz-mb-6">
              <AnimatedHeading>
                <h1 className="hz-t-3xl hz-w-medium">Account</h1>
              </AnimatedHeading>
              
              {currentOrganization && (
                <Select 
                  value={currentOrganization.id} 
                  onValueChange={switchOrganization}
                >
                  <SelectTrigger className="hz-bg">
                    <SelectValue>
                      <div className="hz-row hz-ai-center">
                        <div className="hz-sq-4 hz-bg-surface hz-r-full hz-mr-2 hz-row hz-ai-center hz-jc-center hz-t-sm">
                          {currentOrganization.name.charAt(0)}
                        </div>
                        {currentOrganization.name}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="hz-bg">
                    {organizations.map((org) => (
                      <SelectItem key={org.id} value={org.id} className="hz-fg hz-hoverable">
                        <div className="hz-row hz-ai-center">
                          <div className="hz-sq-4 hz-bg-surface hz-r-full hz-mr-2 hz-row hz-ai-center hz-jc-center hz-t-sm">
                            {org.name.charAt(0)}
                          </div>
                          {org.name}
                          <span className="hz-ml-2 hz-fg-muted hz-t-xs">({org.role})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="hz-grid hz-grid-4 hz-gap-6">
              {/* Sidebar Navigation */}
              <div className="">
                <div className="hz-card hz-glass hz-stack-1">
                  {accountNavItems.map((item) => (
                    <Link 
                      key={item.path} 
                      to={item.path}
                      className={`hz-row hz-ai-center hz-inline-3 hz-p-3 hz-r-lg hz-transition ${
                        isActive(item.path) 
                          ? 'hz-bg-surface hz-fg' 
                          : 'hz-fg-muted hz-link'
                      }`}
                    >
                      <item.icon className="hz-sq-3" />
                      <span className="hz-w-medium">{item.name}</span>
                      {isActive(item.path) && <ChevronRight className="hz-sq-2 hz-ml-auto" />}
                    </Link>
                  ))}
                  
                  <Button 
                    variant="ghost" 
                    className="hz-w-full hz-jc-start hz-fg-muted hz-mt-5 hz-p-3 hz-link"
                  >
                    <LogOut className="hz-sq-3 hz-mr-3" />
                    Sign Out
                  </Button>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="">
                <div className="hz-card hz-glass">
                  {children || <Outlet />}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <div className="hz-w-full">
        <Footer />
      </div>
    </div>
  );
};

export default AccountLayout;

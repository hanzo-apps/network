
import React from 'react';
import { useAccount } from '@/contexts/AccountContext';
import { Button } from '@/components/ui/button';
import { Building, Users, Calendar, Globe, Edit, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AccountLayout from '@/components/account/AccountLayout';

const OrganizationProfile = () => {
  const { currentOrganization } = useAccount();
  const navigate = useNavigate();

  if (!currentOrganization) {
    return <div>No organization selected.</div>;
  }

  // This would come from a real organization profile model
  const orgProfile = {
    description: "Leading AI and development solutions provider.",
    founded: "2018",
    location: "San Francisco, CA",
    website: "https://hanzo.industries",
    teamSize: "43 members",
    plans: "Pro Plan ($49/month)",
    security: "SOC 2 Compliant, GDPR Ready"
  };

  // Mock team members data
  const teamMembers = [
    { id: '1', name: 'Alex Johnson', role: 'Owner', avatar: '/placeholder.svg' },
    { id: '2', name: 'Sarah Chen', role: 'Admin', avatar: '/placeholder.svg' },
    { id: '3', name: 'Miguel Rodriguez', role: 'Member', avatar: '/placeholder.svg' },
    { id: '4', name: 'Leila Patel', role: 'Member', avatar: '/placeholder.svg' },
  ];

  return (
    <AccountLayout>
      <div className="hz-stack-6">
        {/* Organization Header */}
        <div className="hz-col-row hz-gap-6 hz-ai-start">
          <div className="hz-sq-8 hz-bg-surface hz-r-lg hz-row hz-ai-center hz-jc-center">
            <Building className="hz-sq-8 hz-fg-muted" />
          </div>
          
          <div className="hz-grow">
            <div className="hz-col-row hz-gap-4">
              <div>
                <h1 className="hz-t-3xl hz-w-bold">{currentOrganization.name}</h1>
                <p className="hz-fg-muted hz-mt-1">{orgProfile.description}</p>
                
                <div className="hz-row hz-wrap hz-gap-4 hz-mt-4">
                  <div className="hz-row hz-ai-center hz-fg-muted">
                    <Calendar className="hz-sq-2 hz-mr-2" />
                    Founded {orgProfile.founded}
                  </div>
                  <div className="hz-row hz-ai-center hz-fg-muted">
                    <Globe className="hz-sq-2 hz-mr-2" />
                    {orgProfile.location}
                  </div>
                  <div className="hz-row hz-ai-center hz-fg-muted">
                    <Users className="hz-sq-2 hz-mr-2" />
                    {orgProfile.teamSize}
                  </div>
                  <div className="hz-row hz-ai-center hz-fg-muted">
                    <Shield className="hz-sq-2 hz-mr-2" />
                    {orgProfile.security}
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/account/organization')} 
                variant="outline" 
                className="hz-row hz-ai-center hz-bg hz-hoverable"
              >
                <Edit className="hz-sq-2 hz-mr-2" />
                Edit Organization
              </Button>
            </div>
          </div>
        </div>
        
        {/* Organization Stats */}
        <div className="hz-grid hz-grid-3 hz-gap-5">
          <div className="hz-bg hz-border-none hz-r-lg hz-p-5">
            <h3 className="hz-w-medium hz-fg-muted hz-mb-2">Current Plan</h3>
            <div className="hz-t-2xl hz-w-bold">Pro Plan</div>
            <div className="hz-t-sm hz-fg-muted hz-mt-1">$49/month, billed annually</div>
          </div>
          
          <div className="hz-bg hz-border-none hz-r-lg hz-p-5">
            <h3 className="hz-w-medium hz-fg-muted hz-mb-2">Team Members</h3>
            <div className="hz-t-2xl hz-w-bold">{teamMembers.length}</div>
            <div className="hz-t-sm hz-fg-muted hz-mt-1">
              {teamMembers.filter(m => m.role === 'Owner' || m.role === 'Admin').length} admins, 
              {teamMembers.filter(m => m.role === 'Member').length} members
            </div>
          </div>
          
          <div className="hz-bg hz-border-none hz-r-lg hz-p-5">
            <h3 className="hz-w-medium hz-fg-muted hz-mb-2">Your Role</h3>
            <div className="hz-t-2xl hz-w-bold">{currentOrganization.role}</div>
            <div className="hz-t-sm hz-fg-muted hz-mt-1">
              {currentOrganization.role === 'owner' 
                ? 'Full access to all settings' 
                : currentOrganization.role === 'admin' 
                  ? 'Can invite members and modify settings'
                  : 'Standard access to resources'}
            </div>
          </div>
        </div>
        
        {/* Team Members */}
        <div className="hz-bg hz-border-none hz-r-lg hz-p-5">
          <div className="hz-row hz-jc-between hz-ai-center hz-mb-4">
            <h2 className="hz-t-xl hz-w-medium">Team Members</h2>
            <Button 
              onClick={() => navigate('/account/organization')} 
              size="sm"
              className="hz-bg-surface hz-border-none hz-hoverable"
            >
              View All
            </Button>
          </div>
          
          <div className="hz-grid hz-grid-3 hz-gap-4">
            {teamMembers.slice(0, 3).map(member => (
              <div key={member.id} className="hz-row hz-ai-center hz-p-3 hz-bg-surface hz-r-lg">
                <div className="hz-sq-6 hz-bg-surface hz-r-full hz-mr-3 hz-row hz-ai-center hz-jc-center hz-t-sm hz-w-medium">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <div className="hz-w-medium">{member.name}</div>
                  <div className="hz-t-xs hz-fg-muted">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default OrganizationProfile;

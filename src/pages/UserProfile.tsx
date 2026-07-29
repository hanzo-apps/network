
import React, { useState, useEffect } from 'react';
import { useAccount } from '@/contexts/AccountContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Calendar, Link as LinkIcon, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AccountLayout from '@/components/account/AccountLayout';

const UserProfile = () => {
  const { user, currentOrganization } = useAccount();
  const navigate = useNavigate();

  if (!user) {
    return <div>Loading user profile...</div>;
  }

  // This would come from a real profile model
  const userProfile = {
    bio: "Senior Developer at Hanzo Industries with a passion for AI and web technologies.",
    location: "San Francisco, CA",
    joinedDate: "January 2022",
    website: "https://alexjohnson.dev",
    projects: [
      { id: 1, name: "Hanzo AI Platform", description: "Leading AI development platform" },
      { id: 2, name: "Vector DB Integration", description: "High-performance vector database" },
      { id: 3, name: "Cloud Deployment System", description: "Automated cloud infrastructure" }
    ]
  };

  return (
    <AccountLayout>
      <div className="hz-stack-6">
        {/* Profile Header */}
        <div className="hz-col-row hz-gap-6 hz-ai-start">
          <Avatar className="hz-sq-8 hz-bordered hz-border-strong">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="hz-t-4xl hz-bg-raised">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="hz-grow">
            <div className="hz-col-row hz-gap-4">
              <div>
                <h1 className="hz-t-3xl hz-w-bold">{user.name}</h1>
                <p className="hz-fg-muted hz-mt-1">{userProfile.bio}</p>
                
                <div className="hz-row hz-wrap hz-gap-4 hz-mt-4">
                  <div className="hz-row hz-ai-center hz-fg-muted">
                    <MapPin className="hz-sq-2 hz-mr-2" />
                    {userProfile.location}
                  </div>
                  <div className="hz-row hz-ai-center hz-fg-muted">
                    <Calendar className="hz-sq-2 hz-mr-2" />
                    Joined {userProfile.joinedDate}
                  </div>
                  <div className="hz-row hz-ai-center hz-fg-muted">
                    <Mail className="hz-sq-2 hz-mr-2" />
                    {user.email}
                  </div>
                  <div className="hz-row hz-ai-center hz-fg-muted">
                    <LinkIcon className="hz-sq-2 hz-mr-2" />
                    <a href={userProfile.website} target="_blank" rel="noopener noreferrer" className="hz-fg-muted">
                      {userProfile.website.replace('https://', '')}
                    </a>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/account')} 
                variant="outline" 
                className="hz-row hz-ai-center"
              >
                <Edit className="hz-sq-2 hz-mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
        
        {/* Organization Info */}
        <div className="hz-card">
          <h2 className="hz-t-xl hz-w-medium hz-mb-4">Current Organization</h2>
          <div className="hz-row hz-ai-center hz-inline-4">
            <div className="hz-sq-7 hz-bg-raised hz-r-lg hz-row hz-ai-center hz-jc-center hz-t-lg hz-w-bold">
              {currentOrganization?.name.charAt(0)}
            </div>
            <div>
              <div className="hz-w-medium hz-t-lg">{currentOrganization?.name}</div>
              <div className="hz-t-sm hz-fg-muted">Role: {currentOrganization?.role}</div>
            </div>
          </div>
        </div>
        
        {/* Projects */}
        <div className="hz-card">
          <h2 className="hz-t-xl hz-w-medium hz-mb-4">Recent Projects</h2>
          <div className="hz-grid hz-grid-3 hz-gap-4">
            {userProfile.projects.map(project => (
              <div key={project.id} className="hz-bg-raised hz-r-lg hz-p-4 hz-transition hz-hoverable">
                <h3 className="hz-w-medium">{project.name}</h3>
                <p className="hz-t-sm hz-fg-muted hz-mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default UserProfile;

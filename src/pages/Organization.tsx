
import React, { useState, useEffect } from 'react';
import { useAccount } from '@/contexts/AccountContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Building, User, UserPlus, MoreVertical, Upload, MapPin, Globe, Link as LinkIcon } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import AnimatedSection, { AnimatedHeading } from '@/components/ui/animated-section';

const Organization = () => {
  const { currentOrganization, updateOrganization } = useAccount();
  const [orgName, setOrgName] = useState('');
  const [orgDescription, setOrgDescription] = useState('');
  const [orgWebsite, setOrgWebsite] = useState('');
  const [orgLocation, setOrgLocation] = useState('');
  
  useEffect(() => {
    if (currentOrganization) {
      setOrgName(currentOrganization.name || '');
      setOrgDescription(currentOrganization.description || '');
      setOrgWebsite(currentOrganization.website || '');
      setOrgLocation(currentOrganization.location || '');
    }
  }, [currentOrganization]);
  
  // Mock team members for demonstration
  const teamMembers = [
    { id: '1', name: 'Alex Johnson', email: 'alex@hanzo.ai', role: 'Owner', avatar: '/placeholder.svg' },
    { id: '2', name: 'Sarah Chen', email: 'sarah@hanzo.ai', role: 'Admin', avatar: '/placeholder.svg' },
    { id: '3', name: 'Miguel Rodriguez', email: 'miguel@hanzo.ai', role: 'Member', avatar: '/placeholder.svg' },
    { id: '4', name: 'Leila Patel', email: 'leila@hanzo.ai', role: 'Member', avatar: '/placeholder.svg' },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateOrganization({
      name: orgName,
      description: orgDescription,
      website: orgWebsite,
      location: orgLocation
    });
    
    toast.success('Organization settings updated');
  };
  
  const handleInviteMember = () => {
    // In a real app, this would open a modal for invitation
    toast.success('Invitation link created and copied to clipboard');
  };

  if (!currentOrganization) {
    return <div>No organization selected.</div>;
  }

  return (
    <AnimatedSection>
      <div className="hz-stack-6">
        <AnimatedHeading>
          <h2 className="hz-t-2xl hz-w-bold hz-mb-5">Organization Settings</h2>
        </AnimatedHeading>

        <div className="hz-col-row hz-gap-5">
          <div className="hz-sq-8 hz-bg-surface hz-r-lg hz-row hz-ai-center hz-jc-center">
            <Building className="hz-sq-7 hz-fg-muted" />
          </div>
          
          <div>
            <h2 className="hz-t-2xl hz-w-bold hz-mb-2">{currentOrganization.name}</h2>
            <div className="hz-fg-muted">
              {currentOrganization.role === 'owner' ? 'You are the owner of this organization' : 
                `You are a ${currentOrganization.role} in this organization`}
            </div>
            
            <div className="hz-mt-4 hz-inline-4">
              <Button variant="outline" size="sm" className="hz-bg hz-inline-2 hz-hoverable">
                <Upload className="hz-sq-2" />
                <span>Upload Logo</span>
              </Button>
              <Link to="/organization-profile">
                <Button variant="outline" size="sm" className="hz-bg hz-hoverable">
                  View Public Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="hz-border-t hz-pt-6">
          <h3 className="hz-t-xl hz-w-medium hz-mb-4">Organization Details</h3>
          
          <form onSubmit={handleSubmit} className="hz-stack-5 hz-mw-md">
            <div className="hz-stack-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="hz-bg-surface"
              />
            </div>
            
            <div className="hz-stack-2">
              <Label htmlFor="orgDescription">Description</Label>
              <Textarea
                id="orgDescription"
                value={orgDescription}
                onChange={(e) => setOrgDescription(e.target.value)}
                className="hz-bg-surface"
                placeholder="Tell us about your organization"
              />
            </div>
            
            <div className="hz-stack-2">
              <Label htmlFor="orgWebsite">Website</Label>
              <Input
                id="orgWebsite"
                value={orgWebsite}
                onChange={(e) => setOrgWebsite(e.target.value)}
                className="hz-bg-surface"
                placeholder="https://example.com"
              />
            </div>
            
            <div className="hz-stack-2">
              <Label htmlFor="orgLocation">Location</Label>
              <Input
                id="orgLocation"
                value={orgLocation}
                onChange={(e) => setOrgLocation(e.target.value)}
                className="hz-bg-surface"
                placeholder="City, Country"
              />
            </div>
            
            <Button type="submit" className="hz-bg-surface hz-border-none hz-hoverable">
              Update Organization
            </Button>
          </form>
        </div>

        <div className="hz-pt-6">
          <div className="hz-row hz-jc-between hz-ai-center hz-mb-4">
            <h3 className="hz-t-xl hz-w-medium">Team Members</h3>
            
            <Button onClick={handleInviteMember} className="hz-inline-2 hz-bg-surface hz-border-none hz-hoverable">
              <UserPlus className="hz-sq-2" />
              <span>Invite Member</span>
            </Button>
          </div>
          
          <div className="hz-r-lg hz-clip">
            <Table>
              <TableHeader className="hz-bg-surface">
                <TableRow className="hz-border-none">
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hz-align-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id} className="">
                    <TableCell>
                      <div className="hz-row hz-ai-center hz-inline-3">
                        <Avatar className="hz-sq-5">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="hz-bg-surface">{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="hz-w-medium">{member.name}</div>
                          <div className="hz-t-sm hz-fg-muted">{member.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`hz-px-2 hz-py-1 hz-r-full hz-t-xs ${
                        member.role === 'Owner' 
                          ? 'hz-bg-raised hz-fg-soft' 
                          : member.role === 'Admin' 
                            ? 'hz-bg-raised hz-fg-soft' 
                            : 'hz-bg-surface hz-fg-soft'
                      }`}>
                        {member.role}
                      </span>
                    </TableCell>
                    <TableCell className="hz-align-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="hz-sq-5 hz-p-0">
                            <MoreVertical className="hz-sq-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="hz-bg">
                          <DropdownMenuItem className="hz-fg hz-hoverable">
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hz-fg hz-hoverable">
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hz-fg-muted hz-link">
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Organization;

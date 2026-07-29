
import React, { useState, useEffect } from 'react';
import { useAccount } from '@/contexts/AccountContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, Key, Shield, UserCircle, MapPin, Phone, Globe, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection, { AnimatedHeading } from '@/components/ui/animated-section';

const Account = () => {
  const { user, updateUserProfile } = useAccount();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  
  useEffect(() => {
    if (user) {
      setFullName(user.name || '');
      setEmail(user.email || '');
      setBio(user.bio || '');
      setLocation(user.location || '');
      setWebsite(user.website || '');
      setPhone(user.phone || '');
    }
  }, [user]);
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateUserProfile({
      name: fullName,
      email,
      bio,
      location,
      website,
      phone
    });
    
    toast.success('Profile updated successfully');
  };

  if (!user) {
    return <div>Please sign in to access your account.</div>;
  }

  return (
    <AnimatedSection>
      <div className="hz-stack-6">
        <AnimatedHeading>
          <h2 className="hz-t-2xl hz-w-medium hz-mb-6">Profile Settings</h2>
        </AnimatedHeading>

        <div className="hz-col-row hz-gap-6">
          <Avatar className="hz-sq-8">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="hz-t-2xl hz-bg-surface">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="hz-t-2xl hz-w-medium hz-mb-2">{user.name}</h2>
            <div className="hz-row hz-ai-center hz-fg-muted">
              <Mail className="hz-sq-2 hz-mr-2" />
              {user.email}
            </div>
            
            <div className="hz-mt-4 hz-inline-4">
              <Button variant="outline" size="sm" className="hz-bg hz-hoverable">
                Upload New Picture
              </Button>
              <Button variant="outline" size="sm" className="hz-bg hz-fg-muted hz-link">
                Remove
              </Button>
            </div>
          </div>
        </div>
        
        <div className="hz-border-t hz-pt-6">
          <h3 className="hz-t-xl hz-w-medium hz-mb-5">Personal Information</h3>
          
          <form onSubmit={handleProfileSubmit} className="hz-stack-6 hz-mw-md">
            <div className="hz-stack-2">
              <Label htmlFor="fullName" className="hz-fg">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="hz-bg-overlay"
              />
            </div>
            
            <div className="hz-stack-2">
              <Label htmlFor="email" className="hz-fg">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="hz-bg-overlay"
              />
            </div>
            
            <div className="hz-stack-2">
              <Label htmlFor="bio" className="hz-fg">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="hz-bg-overlay"
                placeholder="Tell us about yourself"
              />
            </div>
            
            <div className="hz-grid hz-grid-2 hz-gap-6">
              <div className="hz-stack-2">
                <Label htmlFor="location" className="hz-fg">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="hz-bg-overlay"
                  placeholder="City, Country"
                />
              </div>
              
              <div className="hz-stack-2">
                <Label htmlFor="phone" className="hz-fg">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="hz-bg-overlay"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            
            <div className="hz-stack-2">
              <Label htmlFor="website" className="hz-fg">Website</Label>
              <Input
                id="website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="hz-bg-overlay"
                placeholder="https://example.com"
              />
            </div>
            
            <div className="hz-row hz-gap-4 hz-pt-4">
              <Button 
                type="submit" 
                className="hz-bg hz-bordered hz-hoverable"
              >
                Update Profile
              </Button>
              <Link to="/user-profile">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="hz-bg hz-hoverable"
                >
                  View Public Profile
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Account;

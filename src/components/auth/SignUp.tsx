
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    organization: '',
    role: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToTerms: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      
      if (!formData.agreeToTerms) {
        toast.error('You must agree to the terms of service');
        return;
      }
      
      setStep(2);
    } else if (step === 2) {
      if (!formData.name || !formData.organization) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      // Store user data in localStorage to simulate account creation
      localStorage.setItem('user', JSON.stringify({
        id: 'user-' + Date.now(),
        name: formData.name,
        email: formData.email,
        avatar: null
      }));
      
      localStorage.setItem('organizations', JSON.stringify([
        { 
          id: 'org-' + Date.now(), 
          name: formData.organization, 
          role: 'owner' 
        }
      ]));
      
      toast.success('Account created successfully!');
      
      // Redirect to payment method page
      navigate('/billing#payment-methods');
    }
  };
  
  return (
    <div className="hz-min-h-screen hz-bg hz-fg hz-row hz-ai-center hz-jc-center hz-p-4">
      <div className="hz-w-full hz-mw-sm hz-stack-5">
        <div className="hz-align-center">
          <h1 className="hz-t-3xl hz-w-bold">Create Account</h1>
          <p className="hz-fg-muted hz-mt-2">
            {step === 1 ? 'Enter your details to get started' : 'Set up your profile'}
          </p>
        </div>
        
        <div className="hz-card">
          <form onSubmit={handleSubmit} className="hz-stack-4">
            {step === 1 ? (
              <>
                <div className="hz-stack-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="hz-rel">
                    <Mail className="hz-sq-2 hz-abs hz-fg-muted" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="hz-px-6"
                    />
                  </div>
                </div>
                
                <div className="hz-stack-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="hz-rel">
                    <Lock className="hz-sq-2 hz-abs hz-fg-muted" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="hz-px-6"
                    />
                  </div>
                </div>
                
                <div className="hz-stack-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="hz-rel">
                    <Lock className="hz-sq-2 hz-abs hz-fg-muted" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="hz-px-6"
                    />
                  </div>
                </div>
                
                <div className="hz-row hz-ai-center hz-inline-2 hz-pt-4">
                  <Checkbox 
                    id="terms" 
                    checked={formData.agreeToTerms}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="terms" className="hz-t-sm">
                    I agree to the <a href="/terms" className="hz-fg-muted">Terms of Service</a> and <a href="/privacy" className="hz-fg-muted">Privacy Policy</a>
                  </Label>
                </div>
              </>
            ) : (
              <>
                <div className="hz-stack-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="hz-rel">
                    <User className="hz-sq-2 hz-abs hz-fg-muted" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="hz-px-6"
                    />
                  </div>
                </div>
                
                <div className="hz-stack-2">
                  <Label htmlFor="organization">Organization Name</Label>
                  <div className="hz-rel">
                    <Input
                      id="organization"
                      name="organization"
                      placeholder="Your Company"
                      value={formData.organization}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="hz-stack-2">
                  <Label htmlFor="role">Your Role (Optional)</Label>
                  <div className="hz-rel">
                    <Input
                      id="role"
                      name="role"
                      placeholder="e.g. Developer, Manager"
                      value={formData.role}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}
            
            <Button 
              type="submit" 
              className="hz-w-full hz-mt-5 hz-bg-raised hz-fg hz-hoverable"
            >
              {step === 1 ? 'Continue' : 'Create Account'}
              <ArrowRight className="hz-sq-2 hz-ml-2" />
            </Button>
          </form>
        </div>
        
        <div className="hz-align-center hz-t-sm hz-fg-muted">
          Already have an account?{" "}
          <a href="/login" className="hz-fg-muted">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

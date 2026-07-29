
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    // Simulate login success - in a real app this would verify credentials
    toast.success('Login successful!');
    
    // For demo purposes, create a mock user if none exists
    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify({
        id: 'user-demo',
        name: 'Demo User',
        email: formData.email,
        avatar: null
      }));
      
      localStorage.setItem('organizations', JSON.stringify([
        { 
          id: 'org-demo', 
          name: 'Demo Company', 
          role: 'owner' 
        }
      ]));
    }
    
    // Redirect to the account page
    navigate('/account');
  };
  
  return (
    <div className="hz-min-h-screen hz-bg hz-fg hz-row hz-ai-center hz-jc-center hz-p-4">
      <div className="hz-w-full hz-mw-sm hz-stack-5">
        <div className="hz-align-center">
          <h1 className="hz-t-3xl hz-w-bold">Welcome Back</h1>
          <p className="hz-fg-muted hz-mt-2">
            Sign in to your account
          </p>
        </div>
        
        <div className="hz-card">
          <form onSubmit={handleSubmit} className="hz-stack-4">
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
              <div className="hz-row hz-jc-between hz-ai-center">
                <Label htmlFor="password">Password</Label>
                <a href="/forgot-password" className="hz-t-sm hz-fg-muted">
                  Forgot password?
                </a>
              </div>
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
            
            <Button 
              type="submit" 
              className="hz-w-full hz-mt-5 hz-bg-raised hz-fg hz-hoverable"
            >
              Sign In
              <ArrowRight className="hz-sq-2 hz-ml-2" />
            </Button>
          </form>
        </div>
        
        <div className="hz-align-center hz-t-sm hz-fg-muted">
          Don't have an account?{" "}
          <a href="/signup" className="hz-fg-muted">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

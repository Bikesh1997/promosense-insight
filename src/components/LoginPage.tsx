import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AllerganLogo from './AllerganLogo';
import { Eye, EyeOff, ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const demoCredentials = {
    email: 'demo@allerganaesthetics.com',
    password: 'demo123'
  };

  const handleDemoLogin = () => {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard on successful login
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-allergan-secondary via-white to-allergan-accent flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">
        {/* Enhanced Logo Section */}
        <div className="text-center mb-8 sm:mb-12">
          {/* Premium Logo Container */}
          <div className="relative inline-flex items-center justify-center mb-8">
            {/* Enhanced Logo Background */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-primary via-white to-accent rounded-full shadow-2xl border-4 border-white/30 backdrop-blur-sm">
              {/* Inner Logo Container with Premium Styling */}
              <div className="absolute inset-3 bg-gradient-to-br from-white to-allergan-secondary rounded-full shadow-inner flex items-center justify-center border border-allergan-primary/10">
                <div className="scale-150 sm:scale-175">
                  <AllerganLogo />
                </div>
              </div>
              {/* Dynamic Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-full animate-pulse"></div>
              {/* Outer Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-20 blur-sm"></div>
            </div>
            
            {/* Premium Status Badge */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-success to-primary rounded-full flex items-center justify-center shadow-xl border-2 border-white">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Enhanced Typography */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-allergan-text to-primary bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <div className="flex items-center justify-center space-x-3 text-allergan-text-light">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              <p className="text-base font-semibold text-primary">PromoSense Portal</p>
              <div className="w-12 h-px bg-gradient-to-l from-transparent via-primary/50 to-transparent"></div>
            </div>
            <p className="text-sm text-allergan-text-light/90 font-medium">
              AI-Powered Analytics Platform
            </p>
          </div>
        </div>

        {/* Login Form - No Card Background */}
        <div className="relative">
          {/* Header Section */}
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-allergan-text mb-2">Sign In</h2>
            <p className="text-allergan-text-light text-sm">Enter your credentials to continue</p>
          </div>
          
          {/* Form Content */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field - Enhanced */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-allergan-text flex items-center space-x-1">
                  <span>Email Address</span>
                  <span className="text-destructive text-xs">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 sm:h-12 px-3 sm:px-4 border-border/50 bg-white focus:border-allergan-primary focus:ring-allergan-primary/20 transition-all duration-200 text-sm sm:text-base rounded-lg"
                  required
                />
              </div>

              {/* Password Field - Enhanced */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-allergan-text flex items-center space-x-1">
                  <span>Password</span>
                  <span className="text-destructive text-xs">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 sm:h-12 px-3 sm:px-4 pr-10 sm:pr-12 border-border/50 bg-white focus:border-allergan-primary focus:ring-allergan-primary/20 transition-all duration-200 text-sm sm:text-base rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-allergan-text-light hover:text-allergan-text transition-colors p-1 rounded-md hover:bg-allergan-accent/20"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Enhanced Action Links - All functionality preserved */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="flex items-center space-x-2 text-xs sm:text-sm text-allergan-primary hover:text-allergan-primary/80 transition-all duration-200 group px-3 py-1.5 rounded-lg hover:bg-allergan-accent/10 w-full sm:w-auto justify-center sm:justify-start"
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Use Demo Account</span>
                </button>
                
                <button
                  type="button"
                  className="text-xs sm:text-sm text-allergan-primary hover:text-allergan-primary/80 underline underline-offset-2 transition-all duration-200 px-3 py-1.5 rounded-lg hover:bg-allergan-accent/10 w-full sm:w-auto text-center"
                >
                  Forgot password?
                </button>
              </div>

              {/* Enhanced Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full h-11 sm:h-12 bg-gradient-to-r from-primary to-allergan-primary hover:from-primary/90 hover:to-allergan-primary/90 text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-200 group text-sm sm:text-base rounded-lg relative overflow-hidden"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                {isLoading ? (
                  <div className="flex items-center space-x-2 relative z-10">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 relative z-10">
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                )}
              </Button>
            </form>

            {/* Enhanced Contact Section - All functionality preserved */}
            <div className="pt-6">
              <div className="relative">
                <Separator className="mb-4" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gradient-to-r from-allergan-secondary to-white px-4 text-xs text-allergan-text-light font-medium">or</div>
                </div>
              </div>
              <div className="text-center space-y-4">
                <p className="text-sm text-allergan-text-light">
                  Don't have an account?
                </p>
                <button className="text-primary hover:text-primary/80 font-semibold underline underline-offset-2 transition-all duration-200 text-sm px-6 py-3 rounded-lg hover:bg-accent/10 inline-flex items-center space-x-1 border border-primary/20 hover:border-primary/40">
                  <span>Contact your administrator</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer - All functionality preserved */}
        <div className="text-center mt-6 sm:mt-8 space-y-3 px-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-allergan-text-light/30"></div>
            <p className="text-xs text-allergan-text-light font-medium">
              © 2024 Allergan Aesthetics
            </p>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-allergan-text-light/30"></div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs">
            <button className="text-allergan-text-light hover:text-allergan-text transition-all duration-200 px-3 py-1 rounded-md hover:bg-allergan-accent/10">
              Privacy Policy
            </button>
            <div className="hidden sm:block w-1 h-1 bg-allergan-text-light/30 rounded-full"></div>
            <button className="text-allergan-text-light hover:text-allergan-text transition-all duration-200 px-3 py-1 rounded-md hover:bg-allergan-accent/10">
              Terms of Service
            </button>
          </div>
          
          {/* Subtle PromoSense Branding */}
          <div className="pt-2">
            <p className="text-xs text-allergan-text-light/60">
              Powered by PromoSense AI Analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
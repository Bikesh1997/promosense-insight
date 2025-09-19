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
        <div className="text-center mb-6 sm:mb-8">
          {/* Improved Logo Container */}
          <div className="relative inline-flex items-center justify-center mb-6">
            {/* Logo Background with Gradient */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-white via-allergan-secondary to-allergan-accent rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm">
              {/* Inner Logo Container */}
              <div className="absolute inset-2 bg-white rounded-2xl shadow-inner flex items-center justify-center">
                <div className="scale-125 sm:scale-150">
                  <AllerganLogo />
                </div>
              </div>
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-allergan-primary/10 to-transparent rounded-3xl"></div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-allergan-primary to-primary rounded-full flex items-center justify-center shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Enhanced Typography */}
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-semibold text-allergan-text mb-1">
              Welcome Back
            </h1>
            <div className="flex items-center justify-center space-x-2 text-allergan-text-light">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-allergan-primary/30"></div>
              <p className="text-sm font-medium">PromoSense Portal</p>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-allergan-primary/30"></div>
            </div>
            <p className="text-xs sm:text-sm text-allergan-text-light/80">
              AI-Powered Analytics Platform
            </p>
          </div>
        </div>

        {/* Enhanced Login Card */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-allergan-primary/5 via-transparent to-allergan-accent/5 pointer-events-none"></div>
          
          <CardHeader className="space-y-1 pb-4 sm:pb-6 px-4 sm:px-6 relative">
            <CardTitle className="text-lg sm:text-xl text-center text-allergan-text flex items-center justify-center space-x-2">
              <span>Sign In</span>
            </CardTitle>
            <CardDescription className="text-center text-allergan-text-light text-sm">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 relative">
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
            <div className="pt-3 sm:pt-4">
              <div className="relative">
                <Separator className="mb-3 sm:mb-4" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white px-3 text-xs text-allergan-text-light">or</div>
                </div>
              </div>
              <div className="text-center space-y-3">
                <p className="text-xs sm:text-sm text-allergan-text-light">
                  Don't have an account?
                </p>
                <button className="text-allergan-primary hover:text-allergan-primary/80 font-medium underline underline-offset-2 transition-all duration-200 text-sm px-4 py-2 rounded-lg hover:bg-allergan-accent/10 inline-flex items-center space-x-1">
                  <span>Contact your administrator</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

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
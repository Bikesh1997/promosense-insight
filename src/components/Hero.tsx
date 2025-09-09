import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart3, Brain, Target } from "lucide-react";
import heroImage from "@/assets/hero-analytics.jpg";

const Hero = () => {
  return (
    <div className="relative min-h-[600px] bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40 z-10" />
      <img 
        src={heroImage} 
        alt="AI Analytics Platform" 
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      
      <div className="relative z-20 container mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-primary">AI-Powered</span>
                <br />
                Promotion Analytics
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Transform your promotion effectiveness with intelligent insights, ROI tracking, and patient acquisition analytics.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                View Dashboard
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-success">+189%</div>
                <div className="text-sm text-muted-foreground">Average ROI</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">24.3%</div>
                <div className="text-sm text-muted-foreground">Conversion Rate</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-accent">1,847</div>
                <div className="text-sm text-muted-foreground">New Patients</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">ROI Tracking</h3>
                    <p className="text-muted-foreground">Real-time promotion performance monitoring</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Brain className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">AI Insights</h3>
                    <p className="text-muted-foreground">Intelligent recommendations and predictions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-success/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-success" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Patient Acquisition</h3>
                    <p className="text-muted-foreground">Funnel optimization and churn detection</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
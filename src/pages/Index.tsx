import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import PromotionManagement from "@/components/PromotionManagement";
import PatientAnalytics from "@/components/PatientAnalytics";
import AIInsights from "@/components/AIInsights";

const Index = () => {
  const [activeView, setActiveView] = useState('overview');

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <Hero />;
      case 'dashboard':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
              <p className="text-muted-foreground">Real-time promotion effectiveness and patient acquisition insights</p>
            </div>
            <Dashboard />
          </div>
        );
      case 'promotions':
        return (
          <div className="p-6">
            <PromotionManagement />
          </div>
        );
      case 'patients':
        return (
          <div className="p-6">
            <PatientAnalytics />
          </div>
        );
      case 'insights':
        return (
          <div className="p-6">
            <AIInsights />
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Settings</h2>
            <p className="text-muted-foreground">Coming soon - Platform configuration and preferences</p>
          </div>
        );
      default:
        return <Hero />;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Navigation activeView={activeView} onViewChange={setActiveView} />
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
};

export default Index;

import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import PromotionStrategies from "@/components/PromotionStrategies";
import FunnelLeakageAnalysis from "@/components/FunnelLeakageAnalysis";
import DataIntegrationHub from "@/components/DataIntegrationHub";
import AIInsights from "@/components/AIInsights";

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
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
      case 'strategies':
        return (
          <div className="p-6">
            <PromotionStrategies />
          </div>
        );
      case 'funnel':
        return (
          <div className="p-6">
            <FunnelLeakageAnalysis />
          </div>
        );
      case 'data-hub':
        return (
          <div className="p-6">
            <DataIntegrationHub />
          </div>
        );
      case 'insights':
        return (
          <div className="p-6">
            <AIInsights />
          </div>
        );
      default:
        return (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
              <p className="text-muted-foreground">Real-time promotion effectiveness and patient acquisition insights</p>
            </div>
            <Dashboard />
          </div>
        );
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Header onNavigate={setActiveView} activeView={activeView} />
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

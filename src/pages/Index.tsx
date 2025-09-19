import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "@/components/Dashboard";
import PromotionStrategiesEnhanced from "@/components/PromotionStrategiesEnhanced";
import FunnelLeakageAnalysis from "@/components/FunnelLeakageAnalysis";
import DataIntegrationHub from "@/components/DataIntegrationHub";
import ExecutiveDashboard from "@/components/ExecutiveDashboard";
import SalesManagerDashboard from "@/components/SalesManagerDashboard";
import RepDashboardRevised from "@/components/RepDashboardRevised";
import SystemAdminDashboard from "@/components/SystemAdminDashboard";
import AIInsights from "@/components/AIInsights";

const Index = () => {
  const [activeView, setActiveView] = useState('executive');

  const renderContent = () => {
    switch (activeView) {
      case 'alle-loyalty':
      case 'strategies':
        return <PromotionStrategiesEnhanced />;
      case 'funnel':
        return <FunnelLeakageAnalysis />;
      case 'data-hub':
        return <DataIntegrationHub />;
      case 'insights':
        return <AIInsights />;
      case 'executive':
        return <ExecutiveDashboard />;
      case 'manager':
        return <SalesManagerDashboard />;
      case 'rep':
        return <RepDashboardRevised />;
      case 'admin':
        return <SystemAdminDashboard />;
      default:
        return <ExecutiveDashboard />;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <AppSidebar activeView={activeView} onViewChange={setActiveView} />
          <main className="flex-1 p-6 ml-72">
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

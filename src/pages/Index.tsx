import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "@/components/Dashboard";
import PromotionStrategies from "@/components/PromotionStrategies";
import FunnelLeakageAnalysis from "@/components/FunnelLeakageAnalysis";
import DataIntegrationHub from "@/components/DataIntegrationHub";
import ExecutiveDashboard from "@/components/ExecutiveDashboard";
import SalesManagerDashboard from "@/components/SalesManagerDashboard";
import RepDashboard from "@/components/RepDashboard";
import SystemAdminDashboard from "@/components/SystemAdminDashboard";
import AIInsights from "@/components/AIInsights";

const Index = () => {
  const [activeView, setActiveView] = useState('executive');

  const renderContent = () => {
    switch (activeView) {
      case 'strategies':
        return <PromotionStrategies />;
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
        return <RepDashboard />;
      case 'admin':
        return <SystemAdminDashboard />;
      default:
        return <ExecutiveDashboard />;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background w-full">
        {/* Fixed header at top */}
        <header className="fixed top-0 left-0 right-0 h-16 flex items-center border-b px-4 bg-card shadow-sm z-50">
          <SidebarTrigger />
          <div className="flex-1">
            <Header onNavigate={setActiveView} activeView={activeView} />
          </div>
        </header>
        
        {/* Content area with sidebar - starts below header */}
        <div className="flex pt-16 min-h-screen">
          <AppSidebar activeView={activeView} onViewChange={setActiveView} />
          <main className="flex-1 p-6 overflow-auto bg-background">
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

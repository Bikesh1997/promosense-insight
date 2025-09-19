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
          <div className="hidden lg:block">
            <AppSidebar activeView={activeView} onViewChange={setActiveView} />
          </div>
          <main className="flex-1 p-4 sm:p-6 lg:ml-72">
            {renderContent()}
          </main>
        </div>
        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-2">
          <div className="flex justify-center">
            <select 
              value={activeView} 
              onChange={(e) => setActiveView(e.target.value)}
              className="bg-background border border-border rounded-md px-3 py-2 text-sm w-full max-w-xs"
            >
              <option value="executive">Executive Dashboard</option>
              <option value="manager">Sales Manager</option>
              <option value="rep">Rep Dashboard</option>
              <option value="admin">System Admin</option>
              <option value="strategies">Promotion Strategies</option>
              <option value="funnel">Funnel Analysis</option>
              <option value="data-hub">Data Integration</option>
              <option value="insights">AI Insights</option>
            </select>
          </div>
        </div>
      </div>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
};

export default Index;

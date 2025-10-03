import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import MobileSidebar from "@/components/MobileSidebar";
import Dashboard from "@/components/Dashboard";
import PromotionStrategiesEnhanced from "@/components/PromotionStrategiesEnhanced";
import FunnelLeakageAnalysis from "@/components/FunnelLeakageAnalysis";
import DataIntegrationHub from "@/components/DataIntegrationHub";
import DoctorDashboard from "@/components/DoctorDashboard";
import AIInsights from "@/components/AIInsights";

const Index = () => {
  const [activeView, setActiveView] = useState('doctor-dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'doctor-dashboard':
        return <DoctorDashboard />;
      case 'strategies':
        return <PromotionStrategiesEnhanced />;
      case 'funnel':
        return <FunnelLeakageAnalysis />;
      case 'data-hub':
        return <DataIntegrationHub />;
      case 'insights':
        return <AIInsights />;
      default:
        return <DoctorDashboard />;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Header 
          activeView={activeView}
          onMobileMenuToggle={handleMobileMenuToggle}
        />
        
        <div className="flex">
          <div className="hidden lg:block">
            <AppSidebar activeView={activeView} onViewChange={setActiveView} />
          </div>
          <main className="flex-1 p-4 sm:p-6 lg:ml-72">
            {renderContent()}
          </main>
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={mobileMenuOpen}
          onClose={handleMobileMenuClose}
          activeView={activeView}
          onViewChange={setActiveView}
        />
      </div>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
};

export default Index;

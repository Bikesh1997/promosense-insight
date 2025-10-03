import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  onViewChange: (view: string) => void;
}

const MobileSidebar = ({ isOpen, onClose, activeView, onViewChange }: MobileSidebarProps) => {
  const sidebarItems = [
    {
      id: 'doctor-dashboard',
      title: 'My Practice Dashboard',
      description: 'Performance overview',
      badge: null
    },
    {
      id: 'strategies',
      title: 'Allergan Offers',
      description: 'Available promotions',
      badge: 'NEW'
    },
    {
      id: 'funnel',
      title: 'Patient Analytics',
      description: 'Journey insights',
      badge: null
    },
    {
      id: 'data-hub',
      title: 'Data Integration',
      description: 'Connect your systems',
      badge: null
    },
    {
      id: 'insights',
      title: 'AI Insights',
      description: 'Smart recommendations',
      badge: 'AI'
    }
  ];

  const handleItemClick = (viewId: string) => {
    onViewChange(viewId);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-sidebar border-r border-sidebar-border z-50 lg:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-foreground">Navigation</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                "w-full text-left p-3 rounded-lg transition-all duration-200",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                activeView === item.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{item.title}</span>
                    {item.badge && (
                      <Badge 
                        variant={item.badge === "AI" ? "default" : "secondary"} 
                        className="text-xs px-1.5 py-0.5 h-4"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs opacity-70">{item.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart3, Users, Target, Brain, Settings, Home } from "lucide-react";

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Navigation = ({ activeView, onViewChange }: NavigationProps) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'promotions', label: 'Promotions', icon: Target },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'insights', label: 'AI Insights', icon: Brain },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-card border-r border-border w-64 min-h-[calc(100vh-4rem)]">
      <div className="p-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeView === item.id && "bg-primary text-primary-foreground"
                )}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
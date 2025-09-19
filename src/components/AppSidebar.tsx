import React from 'react';
import { 
  Target, 
  TrendingDown, 
  Database, 
  Brain, 
  BarChart3, 
  Users, 
  Smartphone, 
  Settings,
  ChevronRight,
  Gift
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: "Funnel Leakage Analysis", 
    subtitle: "Patient Journey Insights",
    id: "funnel",
    icon: TrendingDown,
    badge: null
  },
  {
    title: "Data Integration Hub",
    subtitle: "Pipeline monitoring",
    id: "data-hub", 
    icon: Database,
    badge: null
  },
  {
    title: "AI Force Multiplier",
    subtitle: "Intelligent recommendations",
    id: "insights",
    icon: Brain,
    badge: "AI"
  },
  {
    title: "Executive Dashboard",
    subtitle: "Strategic overview",
    id: "executive",
    icon: BarChart3,
    badge: null
  },
  {
    title: "Sales Manager Hub", 
    subtitle: "Team performance",
    id: "manager",
    icon: Users,
    badge: null
  },
  {
    title: "Rep Dashboard",
    subtitle: "Mobile-optimized",
    id: "rep",
    icon: Smartphone,
    badge: null
  },
  {
    title: "System Admin",
    subtitle: "Data quality monitor",
    id: "admin",
    icon: Settings,
    badge: null
  }
];

interface AppSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function AppSidebar({ activeView, onViewChange }: AppSidebarProps) {
  return (
    <div className="w-72 bg-card border-r border-border h-screen fixed left-0 top-0 pt-16">
      <nav className="px-4 py-4 h-full">
        {sidebarItems.map((item) => {
          const isActive = activeView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "group relative w-full transition-all duration-200 p-3 rounded-lg text-left mb-2",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <div className="flex items-center w-full">
                <Icon className={cn(
                  "h-5 w-5 flex-shrink-0 transition-transform duration-200",
                  isActive ? 'scale-110' : 'group-hover:scale-105'
                )} />
                
                <div className="flex-1 flex flex-col ml-3 min-w-0">
                  {item.badge && (
                    <Badge 
                      variant={item.badge === "AI" ? "default" : "secondary"} 
                      className="text-xs px-1.5 py-0.5 h-4 mb-1 self-end"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  <div className="font-medium text-sm truncate">
                    {item.title}
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className={cn(
                      "text-xs truncate mt-0.5 flex-1",
                      isActive 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground'
                    )}>
                      {item.subtitle}
                    </div>
                    <ChevronRight className={cn(
                      "h-3 w-3 transition-transform duration-200 flex-shrink-0",
                      isActive ? 'rotate-90' : 'group-hover:rotate-90',
                      isActive 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    )} />
                  </div>
                </div>
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-foreground rounded-r-full" />
              )}
            </button>
          );
        })}
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs text-muted-foreground text-center">
            PromoSense
            <div className="text-xs opacity-70">AI Analytics Platform</div>
          </div>
        </div>
      </nav>
    </div>
  );
}
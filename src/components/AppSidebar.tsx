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
    title: "Allē Loyalty Dashboard",
    subtitle: "Rewards program analytics",
    id: "alle-loyalty",
    icon: Gift,
    badge: "Featured"
  },
  {
    title: "Promotion Effectiveness",
    subtitle: "8-strategy ROI analysis",
    id: "strategies",
    icon: Target,
    badge: "New"
  },
  {
    title: "Funnel Leakage Analysis", 
    subtitle: "Patient journey insights",
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
    <div className="w-80 border-r border-border bg-background shadow-sm mt-2 mb-2 ml-2 rounded-lg flex flex-col">
      <div className="h-full p-4 flex flex-col">
        {/* Header */}
        <div className="pb-4 mb-4 border-b border-border">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Navigation
          </h2>
        </div>

        {/* Navigation Items */}
        <div className="flex-1">
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = activeView === item.id;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "group relative w-full transition-all duration-200 p-3 rounded-lg text-left",
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
                    
                    <div className="flex-1 flex items-center justify-between ml-3 min-w-0">
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm truncate">
                          {item.title}
                        </div>
                        <div className={cn(
                          "text-xs truncate mt-0.5",
                          isActive 
                            ? 'text-primary-foreground/80' 
                            : 'text-muted-foreground'
                        )}>
                          {item.subtitle}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-2">
                        {item.badge && (
                          <Badge 
                            variant={item.badge === "AI" ? "default" : "secondary"} 
                            className="text-xs px-2 py-0.5 h-5"
                          >
                            {item.badge}
                          </Badge>
                        )}
                        <ChevronRight className={cn(
                          "h-3 w-3 transition-transform duration-200",
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
          </nav>
        </div>
        
        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-border bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 bg-primary-foreground rounded opacity-90"></div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold">PromoSense</div>
              <div className="text-xs text-muted-foreground">Allergan Aesthetics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
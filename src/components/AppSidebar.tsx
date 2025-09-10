import React from 'react';
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { 
  Target, 
  TrendingDown, 
  Database, 
  Brain, 
  BarChart3, 
  Users, 
  Smartphone, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const sidebarItems = [
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
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border h-full">
      <SidebarContent className="bg-sidebar-background h-full">
        <SidebarGroup className="px-4 py-6">
          <SidebarGroupLabel className={`${isCollapsed ? "sr-only" : "px-4 py-3 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider mb-2"}`}>
            PromoSense Analytics Platform
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="space-y-2">
              {sidebarItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onViewChange(item.id)}
                      className={`
                        group relative cursor-pointer rounded-xl transition-all duration-200 ease-out
                        ${isCollapsed ? 'p-4 justify-center' : 'p-4 justify-start'}
                        ${isActive 
                          ? "bg-primary text-primary-foreground shadow-lg border border-primary/20" 
                          : "hover:bg-accent/60 text-sidebar-foreground hover:text-accent-foreground border border-transparent hover:border-accent/30"
                        }
                      `}
                    >
                      <div className="flex items-center space-x-4 min-w-0 flex-1">
                        <item.icon className={`
                          h-6 w-6 flex-shrink-0 transition-transform duration-200
                          ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                        `} />
                        {!isCollapsed && (
                          <div className="flex-1 min-w-0 px-2">
                            <div className="flex items-center justify-between">
                              <div className="min-w-0 flex-1">
                                <div className={`
                                  font-semibold text-base leading-none truncate mb-1
                                  ${isActive ? 'text-primary-foreground' : ''}
                                `}>
                                  {item.title}
                                </div>
                                <div className={`
                                  text-sm truncate leading-relaxed
                                  ${isActive 
                                    ? 'text-primary-foreground/85' 
                                    : 'text-sidebar-foreground/70 group-hover:text-accent-foreground/80'
                                  }
                                `}>
                                  {item.subtitle}
                                </div>
                              </div>
                              <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
                                {item.badge && (
                                  <Badge 
                                    variant={item.badge === "AI" ? "default" : "secondary"} 
                                    className="text-xs px-2 py-1 h-6 font-medium"
                                  >
                                    {item.badge}
                                  </Badge>
                                )}
                                <ChevronRight className={`
                                  h-4 w-4 transition-all duration-200
                                  ${isActive 
                                    ? 'text-primary-foreground/80 rotate-90' 
                                    : 'text-sidebar-foreground/50 group-hover:text-accent-foreground/70 group-hover:rotate-90'
                                  }
                                `} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary-foreground rounded-r-full" />
                      )}
                      
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="
                          absolute left-full ml-3 px-4 py-3 bg-popover text-popover-foreground 
                          rounded-lg shadow-lg border opacity-0 pointer-events-none
                          group-hover:opacity-100 transition-opacity duration-200 z-50
                          whitespace-nowrap text-sm min-w-max
                        ">
                          <div className="font-semibold mb-1">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{item.subtitle}</div>
                          {item.badge && (
                            <Badge variant="outline" className="mt-1 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Footer with branding */}
        {!isCollapsed && (
          <div className="mt-auto p-6 border-t border-sidebar-border bg-sidebar-background/50">
            <div className="flex items-center space-x-4 px-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <div className="w-5 h-5 bg-primary-foreground rounded-sm"></div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-base font-semibold text-sidebar-foreground">PromoSense</div>
                <div className="text-sm text-sidebar-foreground/70">Allergan Aesthetics</div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
import React from 'react';
import { useLocation } from 'react-router-dom';
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
  Settings 
} from 'lucide-react';

const sidebarItems = [
  {
    title: "Promotion Effectiveness Tracking",
    id: "strategies",
    icon: Target
  },
  {
    title: "Funnel Leakage Analysis", 
    id: "funnel",
    icon: TrendingDown
  },
  {
    title: "Data Integration Hub",
    id: "data-hub", 
    icon: Database
  },
  {
    title: "AI Insights / Force Multiplier",
    id: "insights",
    icon: Brain
  },
  {
    title: "Executive Dashboard",
    id: "executive",
    icon: BarChart3
  },
  {
    title: "Sales Manager Dashboard", 
    id: "manager",
    icon: Users
  },
  {
    title: "Rep Dashboard (Mobile-First)",
    id: "rep",
    icon: Smartphone
  },
  {
    title: "System Admin / Data Quality Monitor",
    id: "admin",
    icon: Settings
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
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            PromoSense Dashboards
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.id)}
                    className={`cursor-pointer ${
                      activeView === item.id 
                        ? "bg-primary text-primary-foreground font-medium" 
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="text-sm leading-tight">{item.title}</span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
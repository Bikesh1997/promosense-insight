import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Bell, Search, User, X } from "lucide-react";
import AllerganLogo from "./AllerganLogo";

interface HeaderProps {
  onNavigate?: (view: string) => void;
  activeView?: string;
}

const Header = ({ onNavigate, activeView }: HeaderProps) => {
  const { toast } = useToast();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleSearch = () => {
    setSearchOpen(true);
  };

  const handleNotifications = () => {
    setNotificationsOpen(true);
  };

  const handleProfile = () => {
    toast({
      title: "Profile",
      description: "Dr. Sarah Johnson - Aesthetic Clinic Director",
    });
  };

  const notifications = [
    { id: 1, message: "New patient booked Botox consultation", time: "2 min ago", type: "booking" },
    { id: 2, message: "Spring promotion ROI increased by 15%", time: "1 hour ago", type: "analytics" },
    { id: 3, message: "Monthly report is ready for review", time: "3 hours ago", type: "report" }
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4">
          <AllerganLogo />
          <Badge variant="secondary" className="ml-4">
            PromoSense - AI Analytics Platform
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Search PromoSense</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Search promotions, patients, analytics..." className="w-full" />
                <div className="text-sm text-muted-foreground">
                  Try searching for "Botox promotion", "patient analytics", or "ROI trends"
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="relative" onClick={handleNotifications}>
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></div>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Notifications</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="ghost" size="sm" onClick={handleProfile}>
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
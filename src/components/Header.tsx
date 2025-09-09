import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Bell, Search, Settings, User } from "lucide-react";

const Header = () => {
  const { toast } = useToast();

  const handleSearch = () => {
    toast({
      title: "Search",
      description: "Opening search functionality...",
    });
  };

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "You have 3 new notifications",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Opening settings panel...",
    });
  };

  const handleProfile = () => {
    toast({
      title: "Profile",
      description: "Opening user profile...",
    });
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">PromoSense</h1>
              <p className="text-xs text-muted-foreground">Allergan Aesthetics</p>
            </div>
          </div>
          <Badge variant="secondary" className="ml-4">
            AI-Powered Analytics
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="relative" onClick={handleNotifications}>
            <Bell className="h-4 w-4" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></div>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleSettings}>
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleProfile}>
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { Menu, Settings, Bell, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  onToggleLeftSidebar: () => void;
  onToggleRightSidebar: () => void;
  onOpenSettings: () => void;
  onExport: () => void;
  alertCount: number;
}

export const DashboardHeader = ({
  onToggleLeftSidebar,
  onToggleRightSidebar,
  onOpenSettings,
  onExport,
  alertCount,
}: DashboardHeaderProps) => {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleLeftSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center glow-effect">
            <span className="text-lg font-bold text-primary-foreground">T</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">NASA TEMPO</h1>
            <p className="text-xs text-muted-foreground">Air Quality Dashboard</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {alertCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {alertCount}
              </Badge>
            )}
          </Button>
        </div>

        <Button variant="ghost" size="icon" onClick={onExport}>
          <Download className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={onOpenSettings}>
          <Settings className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleRightSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, AlertCircle, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface LeftSidebarProps {
  isOpen: boolean;
  selectedPollutant: string;
  onPollutantChange: (value: string) => void;
  opacity: number;
  onOpacityChange: (value: number) => void;
  showAQI: boolean;
  onToggleAQI: (value: boolean) => void;
  onCreateAlert: () => void;
}

const pollutants = [
  { value: "no2", label: "Nitrogen Dioxide (NO₂)", color: "pollutant-no2" },
  { value: "o3", label: "Ozone (O₃)", color: "pollutant-o3" },
  { value: "hcho", label: "Formaldehyde (HCHO)", color: "pollutant-hcho" },
  { value: "pm25", label: "Particulate Matter (PM₂.₅)", color: "pollutant-pm25" },
];

export const LeftSidebar = ({
  isOpen,
  selectedPollutant,
  onPollutantChange,
  opacity,
  onOpacityChange,
  showAQI,
  onToggleAQI,
  onCreateAlert,
}: LeftSidebarProps) => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <aside
      className={cn(
        "w-80 border-r border-border bg-card/30 backdrop-blur-sm overflow-y-auto transition-transform duration-300 lg:translate-x-0 flex-shrink-0",
        isOpen ? "translate-x-0" : "-translate-x-full absolute lg:relative z-30 h-full"
      )}
    >
      <div className="p-4 space-y-6">
        {/* Pollutant Selection */}
        <Card className="p-4 space-y-3 bg-card/50">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">Pollutant</Label>
            <div 
              className={cn("w-3 h-3 rounded-full", `bg-${pollutants.find(p => p.value === selectedPollutant)?.color}`)}
              style={{ 
                backgroundColor: `hsl(var(--pollutant-${selectedPollutant}))`
              }}
            />
          </div>
          <Select value={selectedPollutant} onValueChange={onPollutantChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pollutants.map((pollutant) => (
                <SelectItem key={pollutant.value} value={pollutant.value}>
                  {pollutant.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Date & Time Selection */}
        <Card className="p-4 space-y-3 bg-card/50">
          <Label className="text-sm font-semibold">Date & Time</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
            </PopoverContent>
          </Popover>
        </Card>

        {/* Layer Preview */}
        <Card className="p-4 space-y-3 bg-card/50">
          <Label className="text-sm font-semibold">Layer Preview</Label>
          <div className="aspect-video w-full overflow-hidden rounded-md border border-border bg-muted">
            {/* Replace this src with your photo link */}
            <img src="https://grist.org/wp-content/uploads/2015/08/map.jpg?quality=75&strip=all" alt="US Pollution Heatmap Preview" className="w-full h-full object-cover" />
          </div>
        </Card>

        {/* Heatmap Controls */}
        <Card className="p-4 space-y-4 bg-card/50">
          <Label className="text-sm font-semibold">Heatmap Settings</Label>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Opacity</Label>
              <span className="text-xs font-medium">{Math.round(opacity * 100)}%</span>
            </div>
            <Slider
              value={[opacity * 100]}
              onValueChange={([value]) => onOpacityChange(value / 100)}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm">Show AQI Scale</Label>
            <Switch checked={showAQI} onCheckedChange={onToggleAQI} />
          </div>
        </Card>

        {/* Data Layers */}
        <Card className="p-4 space-y-3 bg-card/50">
          <Label className="text-sm font-semibold">Data Layers</Label>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Ground Stations</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs">Weather Overlay</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs">TEMPO Coverage</Label>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Alerts */}
        <Card className="p-4 space-y-3 bg-card/50">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">Alerts</Label>
            <AlertCircle className="h-4 w-4 text-warning" />
          </div>
          <Button onClick={onCreateAlert} className="w-full" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create Alert
          </Button>
        </Card>

        {/* Legend */}
        <Card className="p-4 space-y-3 bg-card/50">
          <Label className="text-sm font-semibold">AQI Scale</Label>
          <div className="space-y-2">
            {[
              { label: "Good", range: "0-50", color: "success" },
              { label: "Moderate", range: "51-100", color: "warning" },
              { label: "Unhealthy", range: "101-150", color: "destructive" },
              { label: "Very Unhealthy", range: "151-200", color: "destructive" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", `bg-${item.color}`)} />
                  <span>{item.label}</span>
                </div>
                <span className="text-muted-foreground">{item.range}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </aside>
  );
};

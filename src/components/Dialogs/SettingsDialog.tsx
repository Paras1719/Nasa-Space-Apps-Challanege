import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Key, Database, Satellite, Info } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const [tempoApiKey, setTempoApiKey] = useState("");
  const [weatherApiKey, setWeatherApiKey] = useState("");
  const [mapboxApiKey, setMapboxApiKey] = useState("");

  const handleSave = () => {
    if (!tempoApiKey && !weatherApiKey && !mapboxApiKey) {
      toast.error("Please enter at least one API key");
      return;
    }
    
    // Store API keys in localStorage (for demo purposes)
    // In production, use secure backend storage
    if (tempoApiKey) localStorage.setItem("tempo_api_key", tempoApiKey);
    if (weatherApiKey) localStorage.setItem("weather_api_key", weatherApiKey);
    if (mapboxApiKey) localStorage.setItem("mapbox_api_key", mapboxApiKey);
    
    toast.success("API keys saved successfully! Refresh to apply changes.");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Dashboard Settings</DialogTitle>
          <DialogDescription>
            Configure API keys and data sources for the TEMPO dashboard
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="api" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="api">
              <Key className="h-4 w-4 mr-2" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="about">
              <Info className="h-4 w-4 mr-2" />
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="api" className="space-y-4">
            <Card className="p-4 bg-card/50">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <Satellite className="h-5 w-5 text-primary" />
                  <Label className="font-semibold">NASA TEMPO API</Label>
                </div>
                <Input
                  type="password"
                  placeholder="Enter your NASA TEMPO API key"
                  value={tempoApiKey}
                  onChange={(e) => setTempoApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Get your API key from <a href="https://www.earthdata.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">NASA Earthdata</a>
                </p>
              </div>
            </Card>

            <Card className="p-4 bg-card/50">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="h-5 w-5 text-primary" />
                  <Label className="font-semibold">Weather Data API</Label>
                </div>
                <Input
                  type="password"
                  placeholder="Enter your weather API key"
                  value={weatherApiKey}
                  onChange={(e) => setWeatherApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Get your API key from <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenWeatherMap</a>
                </p>
              </div>
            </Card>

            <Card className="p-4 bg-card/50">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="h-5 w-5 text-primary" />
                  <Label className="font-semibold">Mapbox API (Optional)</Label>
                </div>
                <Input
                  type="password"
                  placeholder="Enter your Mapbox API key"
                  value={mapboxApiKey}
                  onChange={(e) => setMapboxApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  For enhanced map features. Get your key from <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mapbox</a>
                </p>
              </div>
            </Card>

            <Button onClick={handleSave} className="w-full">
              Save API Keys
            </Button>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <Card className="p-4 bg-card/50">
              <h3 className="font-semibold mb-2">About NASA TEMPO</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The Tropospheric Emissions: Monitoring of Pollution (TEMPO) is NASA's first space-based instrument 
                to continuously measure air quality over North America with unprecedented spatial and temporal resolution.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resolution:</span>
                  <span className="font-medium">10km² spatial, hourly temporal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coverage:</span>
                  <span className="font-medium">North America</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Launch Date:</span>
                  <span className="font-medium">April 2023</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/50">
              <h3 className="font-semibold mb-2">Monitored Pollutants</h3>
              <div className="space-y-2">
                {[
                  { name: "NO₂", full: "Nitrogen Dioxide", impact: "Respiratory issues, smog formation" },
                  { name: "O₃", full: "Ozone", impact: "Lung damage, crop damage" },
                  { name: "HCHO", full: "Formaldehyde", impact: "Air quality indicator, health hazard" },
                  { name: "PM₂.₅", full: "Particulate Matter", impact: "Cardiovascular and respiratory problems" },
                ].map((pollutant) => (
                  <div key={pollutant.name} className="text-sm">
                    <p className="font-medium">{pollutant.name} - {pollutant.full}</p>
                    <p className="text-xs text-muted-foreground">{pollutant.impact}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

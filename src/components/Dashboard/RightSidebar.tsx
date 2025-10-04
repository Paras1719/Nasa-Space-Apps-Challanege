import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendChart } from "../Charts/TrendChart";
import { ForecastChart } from "../Charts/ForecastChart";
import { ComparisonChart } from "../Charts/ComparisonChart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, GitCompare } from "lucide-react";
import { cn } from "@/lib/utils";

interface RightSidebarProps {
  isOpen: boolean;
  selectedPollutant: string;
}

export const RightSidebar = ({ isOpen, selectedPollutant }: RightSidebarProps) => {
  return (
    <aside
      className={cn(
        "w-96 border-l border-border bg-card/30 backdrop-blur-sm overflow-y-auto transition-transform duration-300 lg:translate-x-0 flex-shrink-0",
        isOpen ? "translate-x-0" : "translate-x-full absolute right-0 lg:relative z-30 h-full"
      )}
    >
      <div className="p-4 space-y-4">
        {/* Current Stats */}
        <Card className="p-4 bg-gradient-primary glow-effect">
          <div className="space-y-2">
            <Label className="text-sm text-primary-foreground/80">Current AQI</Label>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary-foreground">--</span>
              <Badge variant="secondary" className="text-xs">No Data</Badge>
            </div>
            <p className="text-xs text-primary-foreground/70">Connect API to view live data</p>
          </div>
        </Card>

        {/* Data Insights Tabs */}
        <Card className="p-4 bg-card/50">
          <Tabs defaultValue="trends" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="trends" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="forecast" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Forecast
              </TabsTrigger>
              <TabsTrigger value="compare" className="text-xs">
                <GitCompare className="h-3 w-3 mr-1" />
                Compare
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trends" className="space-y-4 mt-4">
              <div>
                <Label className="text-sm font-semibold mb-2 block">24-Hour Trend</Label>
                <TrendChart pollutant={selectedPollutant} />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Card className="p-3 bg-card/30">
                  <Label className="text-xs text-muted-foreground">Peak</Label>
                  <p className="text-lg font-bold text-muted-foreground">--</p>
                  <p className="text-xs text-muted-foreground">No data</p>
                </Card>
                <Card className="p-3 bg-card/30">
                  <Label className="text-xs text-muted-foreground">Low</Label>
                  <p className="text-lg font-bold text-muted-foreground">--</p>
                  <p className="text-xs text-muted-foreground">No data</p>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="forecast" className="space-y-4 mt-4">
              <div>
                <Label className="text-sm font-semibold mb-2 block">48-Hour Forecast</Label>
                <ForecastChart pollutant={selectedPollutant} />
              </div>
              
              <Card className="p-3 bg-muted/10 border-muted">
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="text-muted-foreground border-muted">Info</Badge>
                  <div className="text-xs">
                    <p className="font-semibold">No forecast data available</p>
                    <p className="text-muted-foreground mt-1">Connect API to view predictions</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="compare" className="space-y-4 mt-4">
              <div>
                <Label className="text-sm font-semibold mb-2 block">TEMPO vs Ground Sensors</Label>
                <ComparisonChart pollutant={selectedPollutant} />
              </div>
              
              <Card className="p-3 bg-card/30">
                <Label className="text-xs text-muted-foreground mb-2 block">Correlation</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-muted" style={{ width: '0%' }} />
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">--</span>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Station Info */}
        <Card className="p-4 bg-card/50 space-y-3">
          <Label className="text-sm font-semibold">Nearby Stations</Label>
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">No station data available</p>
            <p className="text-xs text-muted-foreground mt-1">Connect API to view stations</p>
          </div>
        </Card>
      </div>
    </aside>
  );
};

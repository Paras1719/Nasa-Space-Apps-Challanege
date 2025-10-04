import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { airQualityAPI } from "@/services/api";
import type { ComparisonDataPoint } from "@/types/airquality";
import { Loader2 } from "lucide-react";

interface ComparisonChartProps {
  pollutant: string;
}

export const ComparisonChart = ({ pollutant }: ComparisonChartProps) => {
  const [data, setData] = useState<ComparisonDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const comparisonData = await airQualityAPI.fetchComparisonData(pollutant as any);
        setData(comparisonData);
      } catch (error) {
        console.error("Failed to load comparison data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [pollutant]);

  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="location"
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            tickLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend
            wrapperStyle={{
              fontSize: "10px",
            }}
          />
          <Bar dataKey="tempo" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="TEMPO Satellite" />
          <Bar dataKey="ground" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Ground Sensors" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

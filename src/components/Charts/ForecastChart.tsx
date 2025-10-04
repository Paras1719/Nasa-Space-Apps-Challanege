import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { airQualityAPI } from "@/services/api";
import type { ForecastDataPoint } from "@/types/airquality";
import { Loader2 } from "lucide-react";

interface ForecastChartProps {
  pollutant: string;
  lat?: number;
  lng?: number;
}

export const ForecastChart = ({ pollutant, lat = 40.7128, lng = -74.0060 }: ForecastChartProps) => {
  const [data, setData] = useState<ForecastDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const forecastData = await airQualityAPI.fetchForecastData(pollutant as any, lat, lng, 48);
        setData(forecastData);
      } catch (error) {
        console.error("Failed to load forecast data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [pollutant, lat, lng]);

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
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="time"
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            tickLine={false}
            interval={5}
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
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            name="Forecast AQI"
          />
          <Line
            type="monotone"
            dataKey="confidence"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1}
            strokeDasharray="5 5"
            dot={false}
            name="Confidence"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

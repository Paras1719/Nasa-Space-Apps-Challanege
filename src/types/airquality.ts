// Air Quality Data Types for API Integration

export interface PollutantData {
  timestamp: string;
  value: number;
  unit: string;
  aqi: number;
}

export interface GroundStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  aqi: number;
  status: "active" | "maintenance" | "offline";
  pollutants: {
    no2?: PollutantData;
    o3?: PollutantData;
    hcho?: PollutantData;
    pm25?: PollutantData;
  };
}

export interface TrendDataPoint {
  time: string;
  value: number;
  aqi: number;
}

export interface ForecastDataPoint {
  time: string;
  forecast: number;
  confidence: number;
  aqi: number;
}

export interface ComparisonDataPoint {
  location: string;
  tempo: number;
  ground: number;
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
}

export type PollutantType = "no2" | "o3" | "hcho" | "pm25";

export interface ApiConfig {
  tempoApiKey: string;
  weatherApiKey: string;
  mapboxApiKey?: string;
}

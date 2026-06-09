export interface DataPoint {
  time: number;
  value: number;
}

export interface ComparisonData {
  tempo: DataPoint[];
  ground: DataPoint[];
}

const generateRandomData = (numPoints: number, min: number, max: number, startHour: number = 0): DataPoint[] => {
  return Array.from({ length: numPoints }, (_, i) => ({
    time: startHour + i,
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};

export const getMockTrendData = (): DataPoint[] => {
  return generateRandomData(24, 10, 150);
};

export const getMockForecastData = (): DataPoint[] => {
  return generateRandomData(48, 20, 130);
};

export const getMockComparisonData = (): ComparisonData => {
  const tempo = generateRandomData(24, 10, 150);
  const ground = tempo.map(d => ({
    time: d.time,
    value: Math.max(0, d.value + (Math.random() - 0.5) * 30),
  }));
  return { tempo, ground };
};

export const getAqiInfo = (aqi: number): { level: string; className: string } => {
  if (aqi <= 50) return { level: "Good", className: "bg-success text-success-foreground" };
  if (aqi <= 100) return { level: "Moderate", className: "bg-warning text-warning-foreground" };
  if (aqi <= 150) return { level: "Unhealthy", className: "bg-destructive/80 text-destructive-foreground" };
  return { level: "Very Unhealthy", className: "bg-destructive text-destructive-foreground" };
};

export const calculateCorrelation = (data1: DataPoint[], data2: DataPoint[]): number => {
    if (data1.length === 0) return 0;
    const sum1 = data1.reduce((acc, d) => acc + d.value, 0);
    const sum2 = data2.reduce((acc, d) => acc + d.value, 0);
    const avg1 = sum1 / data1.length;
    const avg2 = sum2 / data2.length;
    const diff1 = data1.map(d => d.value - avg1);
    const diff2 = data2.map(d => d.value - avg2);
    const numerator = diff1.reduce((acc, d, i) => acc + d * diff2[i], 0);
    return Math.abs(numerator / sum1) * 100; // Simplified correlation for display
};
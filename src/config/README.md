# NASA TEMPO Dashboard - API Integration Guide

## Overview
This dashboard is designed to connect with real NASA TEMPO satellite data, weather APIs, and ground sensor networks. All mock data has been removed and replaced with API service layer ready for integration.

## Setup Instructions

### 1. Configure API Keys
Click the **Settings icon (⚙️)** in the dashboard header and enter your API keys:

#### Required APIs:
- **NASA TEMPO/Earthdata API**: Get from [https://www.earthdata.nasa.gov/](https://www.earthdata.nasa.gov/)
- **Weather Data API**: OpenWeatherMap or similar [https://openweathermap.org/api](https://openweathermap.org/api)

#### Optional APIs:
- **Mapbox API**: For enhanced map tiles [https://www.mapbox.com/](https://www.mapbox.com/)

### 2. API Service Integration
All API calls are centralized in `src/services/api.ts`. Implement the following methods:

#### Ground Stations
```typescript
async fetchGroundStations(pollutant: PollutantType): Promise<GroundStation[]>
```
Fetch EPA/monitoring station locations and current readings.

#### Trend Data
```typescript
async fetchTrendData(pollutant: PollutantType, lat: number, lng: number, hours: number): Promise<TrendDataPoint[]>
```
Get historical hourly data for the last 24 hours.

#### Forecast Data
```typescript
async fetchForecastData(pollutant: PollutantType, lat: number, lng: number, hours: number): Promise<ForecastDataPoint[]>
```
Get predicted AQI values for next 48 hours.

#### Comparison Data
```typescript
async fetchComparisonData(pollutant: PollutantType): Promise<ComparisonDataPoint[]>
```
Compare TEMPO satellite vs ground sensor measurements.

#### Heatmap Data
```typescript
async fetchHeatmapData(pollutant: PollutantType, timestamp?: string): Promise<HeatmapPoint[]>
```
Get gridded pollution data for map overlay visualization.

### 3. Data Types
All TypeScript interfaces are defined in `src/types/airquality.ts`:
- `GroundStation` - Station metadata and readings
- `TrendDataPoint` - Time series data point
- `ForecastDataPoint` - Predicted values with confidence
- `ComparisonDataPoint` - Satellite vs ground comparison
- `HeatmapPoint` - Lat/lng/intensity for heatmap

### 4. Example API Implementation

```typescript
// In src/services/api.ts
async fetchGroundStations(pollutant: PollutantType): Promise<GroundStation[]> {
  const response = await fetch(
    `${API_BASE_URL}/stations?pollutant=${pollutant}`,
    {
      headers: {
        'Authorization': `Bearer ${this.tempoApiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch ground stations');
  }
  
  return response.json();
}
```

## NASA TEMPO Data Sources

### Official NASA APIs:
1. **NASA Earthdata**: https://www.earthdata.nasa.gov/
   - Register for API access
   - Access TEMPO L2 and L3 products

2. **Giovanni - NASA GES DISC**: https://giovanni.gsfc.nasa.gov/
   - Web-based data visualization
   - Time-averaged maps and animations

3. **EPA AirNow API**: https://www.airnow.gov/
   - Real-time ground sensor data
   - AQI calculations and forecasts

### Data Products:
- **NO₂**: Nitrogen Dioxide column density
- **O₃**: Tropospheric ozone
- **HCHO**: Formaldehyde column density
- **Aerosol**: For PM₂.₅ estimates

## Testing Without APIs
The dashboard includes loading states and "No data available" messages when APIs are not connected. This allows you to:
- Test UI/UX without live data
- Develop frontend independently
- Integrate APIs incrementally

## Production Deployment
For production use:
1. Move API keys to secure environment variables
2. Implement backend proxy for API calls (avoid exposing keys in frontend)
3. Add rate limiting and caching
4. Set up error monitoring
5. Enable CORS properly for your domain

## Support
For TEMPO data access issues, contact NASA Earthdata support or visit the TEMPO mission page:
https://tempo.si.edu/

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { airQualityAPI } from "@/services/api";
import type { GroundStation } from "@/types/airquality";
import { Loader2 } from "lucide-react";

interface MapComponentProps {
  selectedPollutant: string;
  opacity: number;
  onStationClick?: (stationId: string) => void;
}

export const MapComponent = ({ selectedPollutant, opacity, onStationClick }: MapComponentProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stations, setStations] = useState<GroundStation[]>([]);

  // Fetch ground stations when pollutant changes
  useEffect(() => {
    const loadStations = async () => {
      setIsLoading(true);
      try {
        const data = await airQualityAPI.fetchGroundStations(selectedPollutant as any);
        setStations(data);
      } catch (error) {
        console.error("Failed to load ground stations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStations();
  }, [selectedPollutant]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [39.8283, -98.5795], // Center of USA
      zoom: 5,
      zoomControl: true,
      minZoom: 4,
      maxZoom: 12,
    });

    mapRef.current = map;

    // Add satellite tile layer as the base
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    }).addTo(map);

    // Add a layer for labels (roads, cities) on top of the satellite imagery
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
      // This pane is set to a high z-index to ensure labels appear above other layers.
      pane: 'shadowPane', 
    }).addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when stations data changes
  useEffect(() => {
    if (!mapRef.current || stations.length === 0) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    stations.forEach((station) => {
      const color = station.aqi > 100 ? "#ef4444" : station.aqi > 50 ? "#f59e0b" : "#10b981";
      
      const marker = L.circleMarker([station.lat, station.lng], {
        radius: 8,
        fillColor: color,
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      }).addTo(mapRef.current!);

      marker.bindPopup(`
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">${station.name}</h3>
          <p style="margin: 4px 0; font-size: 12px;"><strong>Station:</strong> ${station.id}</p>
          <p style="margin: 4px 0; font-size: 12px;"><strong>AQI:</strong> ${station.aqi}</p>
          <p style="margin: 4px 0; font-size: 12px;"><strong>Status:</strong> <span style="color: ${color};">${station.status}</span></p>
        </div>
      `);

      marker.on("click", () => {
        onStationClick?.(station.id);
      });

      markersRef.current.push(marker);
    });
  }, [stations, onStationClick]);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-[1000]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading stations...</p>
          </div>
        </div>
      )}
      
      <div ref={mapContainerRef} className="absolute inset-0" />
      
      {/* Pollutant overlay info */}
      <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg z-[1000]">
        <p className="text-xs font-semibold mb-1">Active Layer</p>
        <p className="text-sm text-primary">{selectedPollutant.toUpperCase()}</p>
        <p className="text-xs text-muted-foreground mt-1">Opacity: {Math.round(opacity * 100)}%</p>
      </div>

      {/* Map legend */}
      <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg z-[1000]">
        <p className="text-xs font-semibold mb-2">Station Status</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span>Good (0-50)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span>Moderate (51-100)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span>Unhealthy (101+)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

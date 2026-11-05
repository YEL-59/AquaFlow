import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Truck,
  MapPin,
  Navigation,
  Phone,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Clock,
  ShieldCheck,
  Zap,
  Info,
} from "lucide-react";
import { formatBDT } from "../../lib/utils";

// Custom HTML Icons for Leaflet to match AquaFlow's premium design tokens
const createCustomMarker = (type, label) => {
  if (type === "HUB") {
    return L.divIcon({
      className: "custom-hub-marker",
      html: `
        <div class="relative flex items-center justify-center">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center shadow-lg border-2 border-white transform hover:scale-110 transition-all">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 2.84L18 11v7H6v-7l6-5.16zM9 13h6v5H9v-5z"/>
            </svg>
          </div>
          <span class="absolute -bottom-5 px-2 py-0.5 rounded-md bg-slate-900/90 text-[10px] font-bold text-white shadow whitespace-nowrap border border-slate-700">
            ${label || "Micro-Hub"}
          </span>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  }

  if (type === "VAN") {
    return L.divIcon({
      className: "custom-van-marker",
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute -inset-2 rounded-full bg-emerald-500/30 animate-ping"></div>
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xl border-2 border-white z-10 transform hover:scale-110 transition-all">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-2 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          </div>
          <span class="absolute -bottom-5 px-2 py-0.5 rounded-md bg-emerald-950/95 text-[10px] font-black text-emerald-300 shadow whitespace-nowrap border border-emerald-700 z-10 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            ${label || "Live Van 01"}
          </span>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    });
  }

  // Destination / Customer Doorstep
  return L.divIcon({
    className: "custom-dest-marker",
    html: `
      <div class="relative flex items-center justify-center">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-lg border-2 border-white transform hover:scale-110 transition-all">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <span class="absolute -bottom-5 px-2 py-0.5 rounded-md bg-slate-900/90 text-[10px] font-bold text-amber-300 shadow whitespace-nowrap border border-slate-700">
          ${label || "Doorstep"}
        </span>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

export function DhakaDeliveryMap({
  orderNumber = "ORD-20261104-7821",
  driverName = "Md. Rafiqul Islam",
  driverPhone = "+8801811223344",
  vanPlate = "Dhaka Metro-CHA-11-8492",
  deliveryAddress = "House 14, Road 11, Block D, Banani",
  currentLang = "en",
  height = "380px",
  interactive = true,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const vanMarkerRef = useRef(null);
  const polylineRef = useRef(null);
  const simIntervalRef = useRef(null);

  // Delivery Corridor Coordinates: Banani Hub to Customer House on Road 11
  const [hubCoords] = useState([23.7937, 90.4043]);
  const [destCoords] = useState([23.7968, 90.4079]);

  // Intermediate route waypoints along Banani / Gulshan roads
  const routeWaypoints = [
    [23.7937, 90.4043], // Hub (Road 11 Entry)
    [23.7942, 90.4049],
    [23.7947, 90.4055],
    [23.7954, 90.4063], // Default mid position
    [23.7960, 90.4071],
    [23.7968, 90.4079], // Destination (House 14)
  ];

  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(3);
  const [isSimulating, setIsSimulating] = useState(false);
  const [etaMinutes, setEtaMinutes] = useState(12);
  const [distanceKm, setDistanceKm] = useState(0.65);
  const [speedKmh, setSpeedKmh] = useState(24);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent double init

    // Center map midway between hub and destination
    const centerLat = (hubCoords[0] + destCoords[0]) / 2;
    const centerLng = (hubCoords[1] + destCoords[1]) / 2;

    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 16,
      zoomControl: false,
      attributionControl: false,
    });

    // Custom OpenStreetMap / CartoDB Voyager tiles (modern, elegant look)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      subdomains: "abcd",
    }).addTo(map);

    // Zoom control in bottom right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // 1. Hub Marker
    const hubMarker = L.marker(hubCoords, {
      icon: createCustomMarker("HUB", "Banani Hub"),
    }).addTo(map);
    hubMarker.bindPopup(`
      <div style="font-family: inherit; font-size: 12px; font-weight: bold; color: #0f172a;">
        🏭 Banani Micro-Hub
        <p style="font-weight: normal; font-size: 11px; color: #64748b; margin-top: 2px;">
          Stock allocated & disinfected (Road 11)
        </p>
      </div>
    `);

    // 2. Destination Marker
    const destMarker = L.marker(destCoords, {
      icon: createCustomMarker("DEST", "Doorstep"),
    }).addTo(map);
    destMarker.bindPopup(`
      <div style="font-family: inherit; font-size: 12px; font-weight: bold; color: #0f172a;">
        📍 Delivery Destination
        <p style="font-weight: normal; font-size: 11px; color: #64748b; margin-top: 2px;">
          ${deliveryAddress}
        </p>
      </div>
    `);

    // 3. Planned Route Polyline
    const polyline = L.polyline(routeWaypoints, {
      color: "#0284c7",
      weight: 5,
      opacity: 0.8,
      dashArray: "8, 8",
      lineCap: "round",
    }).addTo(map);
    polylineRef.current = polyline;

    // 4. Van Marker (at initial waypoint)
    const initialVanPos = routeWaypoints[currentWaypointIndex];
    const vanMarker = L.marker(initialVanPos, {
      icon: createCustomMarker("VAN", "Van 01"),
      zIndexOffset: 1000,
    }).addTo(map);

    vanMarker.bindPopup(`
      <div style="font-family: inherit; font-size: 12px; font-weight: bold; color: #0f172a;">
        🚐 ${driverName}
        <p style="font-weight: normal; font-size: 11px; color: #64748b; margin-top: 2px;">
          ${vanPlate} • Speed: 24 km/h
        </p>
      </div>
    `);
    vanMarkerRef.current = vanMarker;

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Van Marker Position when waypoint index changes
  useEffect(() => {
    if (!vanMarkerRef.current || !mapInstanceRef.current) return;
    const targetCoord = routeWaypoints[currentWaypointIndex];
    vanMarkerRef.current.setLatLng(targetCoord);

    // Calculate dynamic ETA and distance based on index progress
    const remainingSteps = routeWaypoints.length - 1 - currentWaypointIndex;
    const calcDist = Math.max(0.1, Number((remainingSteps * 0.22).toFixed(2)));
    const calcEta = Math.max(2, Math.round(remainingSteps * 4));

    setDistanceKm(calcDist);
    setEtaMinutes(calcEta);
  }, [currentWaypointIndex]);

  // Simulation Controller: Automatically advance van along route
  useEffect(() => {
    if (isSimulating) {
      simIntervalRef.current = setInterval(() => {
        setCurrentWaypointIndex((prev) => {
          if (prev >= routeWaypoints.length - 1) {
            setIsSimulating(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    } else {
      if (simIntervalRef.current) clearInterval(simIntervalRef.current);
    }
    return () => {
      if (simIntervalRef.current) clearInterval(simIntervalRef.current);
    };
  }, [isSimulating]);

  const handleCenterOnVan = () => {
    if (!mapInstanceRef.current) return;
    const currentPos = routeWaypoints[currentWaypointIndex];
    mapInstanceRef.current.setView(currentPos, 17, { animate: true });
  };

  const handleFitBounds = () => {
    if (!mapInstanceRef.current) return;
    const bounds = L.latLngBounds(routeWaypoints);
    mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setCurrentWaypointIndex(0);
    setSpeedKmh(26);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden border border-sky-200 dark:border-slate-800 shadow-xl bg-slate-900 group">
      {/* 1. Map Container */}
      <div
        ref={mapContainerRef}
        style={{ height, width: "100%" }}
        className="z-0"
      />

      {/* 2. Floating Top Telemetry HUD Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 pointer-events-auto">
        <div className="glass-card p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-sky-100 dark:border-slate-800 shadow-lg flex items-center justify-between gap-3 text-xs">
          {/* Driver & Van Profile */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shadow-inner flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>{driverName}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                {vanPlate}
              </p>
            </div>
          </div>

          {/* Live Telemetry Metrics */}
          <div className="flex items-center gap-2 sm:gap-4 border-l border-slate-200 dark:border-slate-700 pl-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {currentLang === "bn" ? "দূরত্ব" : "Distance"}
              </span>
              <span className="font-mono font-black text-slate-900 dark:text-white text-xs sm:text-sm">
                {distanceKm} km
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {currentLang === "bn" ? "পৌঁছানোর সময়" : "ETA"}
              </span>
              <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
                {etaMinutes} mins
              </span>
            </div>

            {/* Quick Call Button */}
            <a
              href={`tel:${driverPhone}`}
              className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1 text-[11px] font-bold"
              title="Call Delivery Driver"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{currentLang === "bn" ? "কল" : "Call"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Floating Bottom Controls: Simulation & Quick Map Actions */}
      <div className="absolute bottom-3 left-3 z-10 pointer-events-auto flex items-center gap-1.5">
        {interactive && (
          <div className="glass-card p-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg flex items-center gap-1 text-xs">
            {/* Play/Pause Live Simulation */}
            <button
              type="button"
              onClick={() => setIsSimulating(!isSimulating)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                isSimulating
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-sky-600 hover:bg-sky-500 text-white shadow-sm"
              }`}
            >
              {isSimulating ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>{currentLang === "bn" ? "পজ" : "Pause"}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{currentLang === "bn" ? "লাইভ ট্রানজিট" : "Simulate Transit"}</span>
                </>
              )}
            </button>

            {/* Reset */}
            <button
              type="button"
              onClick={handleResetSimulation}
              className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
              title="Reset Position"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Recenter */}
            <button
              type="button"
              onClick={handleCenterOnVan}
              className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
              title="Center on Van"
            >
              <Navigation className="w-3.5 h-3.5" />
            </button>

            {/* Fit Route */}
            <button
              type="button"
              onClick={handleFitBounds}
              className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
              title="Fit Full Route"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 4. Live Speed & Traffic Badge (Bottom Right) */}
      <div className="absolute bottom-3 right-12 z-10 pointer-events-none hidden sm:block">
        <div className="glass-card px-2.5 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[10px] text-slate-300 font-mono flex items-center gap-2">
          <span className="flex items-center gap-1 text-cyan-400 font-bold">
            <Zap className="w-3 h-3" />
            <span>{speedKmh} km/h</span>
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-medium">Traffic: Clear</span>
        </div>
      </div>
    </div>
  );
}

export default DhakaDeliveryMap;

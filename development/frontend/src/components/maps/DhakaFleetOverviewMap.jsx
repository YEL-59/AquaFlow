import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Truck, MapPin, Activity, ShieldCheck, BatteryCharging, Phone, CheckCircle2 } from "lucide-react";

const FLEET_VANS = [
  {
    id: "VAN-01",
    driverName: "Md. Rafiqul Islam",
    phone: "+8801811223344",
    zone: "Gulshan-Banani",
    plate: "Dhaka Metro-CHA-11-8492",
    lat: 23.7954,
    lng: 90.4063,
    status: "ON_DELIVERY",
    completed: "8/12 Stops",
    jarsOnBoard: 14,
    battery: "88%",
  },
  {
    id: "VAN-02",
    driverName: "Shafiqul Alam",
    phone: "+8801722334455",
    zone: "Dhanmondi-Mohammadpur",
    plate: "Dhaka Metro-GA-14-3321",
    lat: 23.7485,
    lng: 90.3768,
    status: "ON_DELIVERY",
    completed: "6/10 Stops",
    jarsOnBoard: 18,
    battery: "94%",
  },
  {
    id: "VAN-03",
    driverName: "Kamrul Hasan",
    phone: "+8801933445566",
    zone: "Uttara Sectors 1-14",
    plate: "Dhaka Metro-CHA-12-5509",
    lat: 23.8720,
    lng: 90.3835,
    status: "ON_DELIVERY",
    completed: "9/11 Stops",
    jarsOnBoard: 6,
    battery: "76%",
  },
  {
    id: "VAN-04",
    driverName: "Abdur Rashid",
    phone: "+8801844556677",
    zone: "Mirpur-DOHS",
    plate: "Dhaka Metro-CHA-10-9943",
    lat: 23.8185,
    lng: 90.3620,
    status: "AT_HUB",
    completed: "12/12 Stops",
    jarsOnBoard: 0,
    battery: "91%",
  },
];

const HUBS = [
  { name: "Tejgaon Central Plant", lat: 23.7597, lng: 90.3992, type: "MAIN_PLANT" },
  { name: "Banani Micro-Hub", lat: 23.7937, lng: 90.4043, type: "DEPOT" },
  { name: "Dhanmondi Hub", lat: 23.7461, lng: 90.3742, type: "DEPOT" },
  { name: "Uttara Hub", lat: 23.8759, lng: 90.3795, type: "DEPOT" },
];

export function DhakaFleetOverviewMap({ currentLang = "en" }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedVan, setSelectedVan] = useState(FLEET_VANS[0]);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [23.7925, 90.4078], // Dhaka Center
      zoom: 12,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      subdomains: "abcd",
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    // 1. Plot Hubs
    HUBS.forEach((hub) => {
      const hubIcon = L.divIcon({
        className: "fleet-hub-marker",
        html: `
          <div class="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 2.84L18 11v7H6v-7l6-5.16z"/>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
      const marker = L.marker([hub.lat, hub.lng], { icon: hubIcon }).addTo(map);
      marker.bindPopup(`<b>${hub.name}</b><br/><span style="color:#64748b;font-size:11px;">AquaFlow Certified Micro-Hub</span>`);
    });

    // 2. Plot Delivery Vans
    FLEET_VANS.forEach((van) => {
      const vanIcon = L.divIcon({
        className: `fleet-van-marker-${van.id}`,
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xl border-2 border-white transform hover:scale-110 transition">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-2 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </div>
            <span class="absolute -bottom-4 px-1.5 py-0.2 rounded bg-slate-900/90 text-[9px] font-bold text-emerald-300 shadow whitespace-nowrap">
              ${van.id}
            </span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker([van.lat, van.lng], { icon: vanIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-size:12px;">
          <b style="color:#0f172a;">${van.id} — ${van.driverName}</b><br/>
          <span style="color:#0284c7;font-weight:600;">Zone: ${van.zone}</span><br/>
          <span style="color:#64748b;font-size:11px;">Completed: ${van.completed} • Battery: ${van.battery}</span>
        </div>
      `);
      marker.on("click", () => setSelectedVan(van));
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleFocusVan = (van) => {
    setSelectedVan(van);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([van.lat, van.lng], 15, { animate: true });
    }
  };

  return (
    <div className="space-y-4">
      {/* Fleet Metric Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-left">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Fleet Vans</span>
          <span className="text-lg font-black text-emerald-400">4 / 4 Active</span>
          <span className="text-[10px] text-emerald-500/80 block mt-0.5">100% GPS Signal OK</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-left">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Dhaka Neighborhoods</span>
          <span className="text-lg font-black text-sky-400">7 Zones Active</span>
          <span className="text-[10px] text-sky-500/80 block mt-0.5">Gulshan, Banani, Uttara</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-left">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Daily Delivery Progress</span>
          <span className="text-lg font-black text-amber-400">35 / 45 Stops (78%)</span>
          <span className="text-[10px] text-amber-500/80 block mt-0.5">Pace: 18 mins / stop</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-left">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Liters in Transit</span>
          <span className="text-lg font-black text-cyan-400">760 Liters</span>
          <span className="text-[10px] text-cyan-500/80 block mt-0.5">38 Pure Water Jars</span>
        </div>
      </div>

      {/* Main Map Box & Live Van Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column: Interactive Van Queue */}
        <div className="lg:col-span-1 space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Active Vehicles ({FLEET_VANS.length})
          </h4>
          <div className="space-y-2">
            {FLEET_VANS.map((van) => (
              <div
                key={van.id}
                onClick={() => handleFocusVan(van)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all text-left ${
                  selectedVan.id === van.id
                    ? "bg-slate-800 border-sky-500 ring-2 ring-sky-500/20 shadow-md"
                    : "bg-slate-900/70 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-white flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <span>{van.id}</span>
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    van.status === "ON_DELIVERY"
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      : "bg-slate-800 text-slate-300"
                  }`}>
                    {van.status}
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-1 font-medium">{van.driverName}</div>
                <div className="text-[11px] text-slate-500 mt-0.5 flex justify-between">
                  <span>{van.zone}</span>
                  <span className="text-emerald-400 font-mono font-bold">{van.completed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Leaflet Map Container */}
        <div className="lg:col-span-3 relative rounded-3xl overflow-hidden border border-slate-800 shadow-xl bg-slate-900 min-h-[420px]">
          <div
            ref={mapContainerRef}
            style={{ height: "420px", width: "100%" }}
            className="z-0"
          />

          {/* Active Van Quick HUD Overlay in Top Left */}
          {selectedVan && (
            <div className="absolute top-3 left-3 z-10 pointer-events-auto">
              <div className="glass-card p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs text-left shadow-lg space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Focused: {selectedVan.id} ({selectedVan.driverName})</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Zone: {selectedVan.zone} • Plate: {selectedVan.plate}
                </p>
                <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-300">
                  <span>Completed: <strong className="text-emerald-400">{selectedVan.completed}</strong></span>
                  <span>Battery: <strong className="text-cyan-400">{selectedVan.battery}</strong></span>
                  <a
                    href={`tel:${selectedVan.phone}`}
                    className="text-sky-400 hover:text-sky-300 font-bold underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Driver</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DhakaFleetOverviewMap;

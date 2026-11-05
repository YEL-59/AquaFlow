# TASK-025: Interactive Live Maps & Dhaka Delivery Fleet GPS Route Tracking

> **Status**: `DONE`  
> **Assignee**: `friday` (Frontend), `jarvis` (UI/UX), `edith` (Backend), `thanos` (QA)  
> **Priority**: `P0` (Critical)  
> **Dependencies**: `TASK-024` (Payment Gateways), `TASK-012` (Customer Portal), `TASK-016` (Delivery Staff App) (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As an AquaFlow customer, delivery driver, and operations manager, implement an authentic **Interactive Live Maps & Dhaka Delivery Fleet GPS Route Tracking Subsystem** using OpenStreetMap and Leaflet. Enable customers to watch their pure water delivery van moving live towards their doorstep with real-time ETA countdown, provide delivery drivers with interactive route navigation across Dhaka neighborhoods (Gulshan, Banani, Dhanmondi, Uttara), and provide admins with real-time Dhaka fleet map monitoring.

---

## 2. Technical Blueprint & Scope

### 2.1 Backend Telemetry & Route API (`edith`)
- **Endpoints**:
  - `GET /api/v1/orders/:orderId/live-tracking`:
    - Returns micro-hub origin (`lat`, `lng`), customer destination (`lat`, `lng`), live rider location, waypoint polylines across Dhaka streets, speed (`km/h`), traffic status, and remaining ETA in minutes.
  - `GET /api/v1/fleet/live-tracking`:
    - Returns real-time coordinates, battery/GPS health, stop completion status, and active routes for all 4 Dhaka delivery vans (Tejgaon, Gulshan/Banani, Dhanmondi, Uttara).

### 2.2 Frontend Interactive Map & HUD Components (`friday` & `jarvis`)
- **Interactive Component (`DhakaDeliveryMap.jsx`)**:
  - Leaflet + OpenStreetMap engine with custom map tiles and smooth controls.
  - Custom SVG markers:
    - 🏭 **Micro-Hub Marker**: Water-blue badge with hub name.
    - 🚐 **Delivery Van Marker**: Animated vehicle icon with glowing emerald radar ripple.
    - 📍 **Customer Destination Marker**: Amber/red location pin with address callout.
  - Polyline route renderer with dashed trajectory animation.
  - Glassmorphic Telemetry HUD overlay:
    - Live speed meter, remaining distance, ETA countdown in English and Bangla, and traffic indicator.
    - Interactive "Simulate Live Transit" toggle allowing users to watch the van advance along the route.
    - Quick actions: "Recenter on Van", "Full Route Fit", and "Open Google Maps".
- **Application Views Integration**:
  - **Customer Portal (`Account.jsx`)**: Live tracking map inside active order timeline.
  - **Delivery Staff Dashboard (`DeliveryDashboard.jsx`)**: Route navigation modal for field workers.
  - **Admin Orders Dispatch (`OrdersDispatch.jsx`)**: Dhaka fleet overview map showing active vans.

---

## 3. Verification & Acceptance Criteria
- [x] Backend route & fleet tracking endpoints respond cleanly with valid coordinates.
- [x] Leaflet map renders correctly with OpenStreetMap tiles without API key requirements.
- [x] Markers for Hub, Van, and Destination render with custom branding and popups.
- [x] Interactive live route simulation smoothly animates vehicle coordinates along waypoints.
- [x] Customer Portal displays live map on active orders with ETA and driver details.
- [x] Delivery Staff Dashboard provides turn-by-turn route overview for active stops.
- [x] Production build passes with zero errors and responsive UI across mobile and desktop.

---

## 4. Thanos Verification Log
- **Backend E2E Route & Fleet Verification**:
  ```bash
  node verify-maps-e2e.js
  # [PASS] Live tracking endpoint responds with micro-hub coordinates & rider position
  # [PASS] Route waypoints across Dhaka polyline returned
  # [PASS] Real-time telemetry (speed, traffic, ETA in mins) returned
  # [PASS] Fleet overview endpoint returned all 4 operational Dhaka delivery vans
  # [PASS] All 5 Map & Telemetry assertions passed cleanly!
  ```
- **Vite Production Compilation**:
  ```bash
  npm run build
  # 2431 modules transformed.
  # dist/index.html 1.29 kB
  # dist/assets/index-CqtqlIg2.css 121.22 kB
  # dist/assets/index-BfOm3_ro.js 1,616.42 kB
  # built in 42.02s with exit code 0
  ```

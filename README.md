# 🌍 Life-Link — Intelligent Disaster Management & Risk Prediction System

Life-Link is a modern disaster management platform designed to help communities stay safe during natural disasters.  
It provides real-time alerts, risk prediction, interactive maps, incident reporting, and nearest shelter guidance — combined into one powerful system.

---

## 🚀 Features

### ⭐ 1. Live Disaster Alerts
- Fetch alerts from IMD / NASA EONET / mock APIs  
- Alerts categorized by severity:
  - 🔴 Severe  
  - 🟠 Moderate  
  - 🟡 Mild  
- Each alert includes title, description, timestamp, and location  

---

### ⭐ 2. Interactive Map System
- Custom markers for hazards, shelters, and user location  
- Popups showing risk level, last update, and more  
- Smooth animations and dynamic map layers  
- Dark/Light mode map support

---

### ⭐ 3. Slide-In Information Panel
- Opens when clicking a map marker  
- Displays location details  
- Risk summary  
- Nearest shelters  
- Optional photos and additional metadata  
- Smooth UI transitions for a modern experience

---

### ⭐ 4. Risk Prediction System
- Users input environmental factors:
  - Rainfall  
  - Elevation  
  - Distance to river/sea  
  - Historical flood data  
- Output:
  - Low Risk  
  - Medium Risk  
  - High Risk  
- Includes explanation of risk level

---

### ⭐ 5. Incident Reporting System
- Users can report:
  - Flood  
  - Fire  
  - Road Blockage  
  - Other incidents  
- Supports:
  - Photo upload  
  - Automatic GPS location  
  - Description input  
- Submitted incidents appear on the map in real time

---

### ⭐ 6. Nearest Shelter Navigation
- Displays shelters close to the user or hazard location  
- Shows distance  
- Includes "Open in Google Maps" navigation button  

---

### ⭐ 7. Dark Mode
- Full dark/light theme support  
- Switch instantly  
- Changes map tiles and UI components

---

### ⭐ 8. Analytics Dashboard (Optional)
- Weekly incident trends  
- Risk category distribution  
- Heatmap of danger zones  
- Helpful for authorities monitoring disaster activity

---

## 🛠️ Tech Stack

### Frontend
- React / Vite / Next.js (depending on setup)
- Leaflet / Mapbox for maps
- Tailwind CSS for styling
- Framer Motion for animations

### Backend (Optional)
- Node.js / Express  
- Firebase / MongoDB  
- REST APIs

### APIs Used
- NASA EONET  
- IMD Weather Alerts  
- OpenStreetMap  
- GeoLocation API  

---

## 📁 Folder Structure (Example)

Life-Link/  
├─ src/  
│  ├─ components/  
│  ├─ pages/  
│  ├─ assets/  
│  ├─ context/  
│  ├─ utils/  
│  ├─ styles/  
├─ public/  
├─ package.json  
├─ README.md  

---

## 📌 How to Run Locally

### 1️⃣ Clone the repository

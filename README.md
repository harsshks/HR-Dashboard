# 💼 HR Dashboard

A modern **Employee Management Portal** built with React 18 and Vite. Explore your workforce, analyse salaries, view employee locations on an interactive map, and capture employee photos — all in a sleek dark-themed UI.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Session-based login with protected routes |
| 👥 **Employee Directory** | Searchable table with all employee records |
| 📊 **Salary Analytics** | Interactive bar chart of top 10 salaries |
| 🗺️ **City Map** | Live geocoded map showing employee locations across India |
| 📸 **Camera Capture** | Live webcam feed to capture employee photos |
| 📱 **Responsive UI** | Works across desktop and tablet screens |

---

## 🖥️ Screenshots

> Login → Employee Directory → Salary Analytics & City Map → Employee Details + Camera

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/hr-dashboard.git
cd hr-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Demo Credentials

| Field | Value |
|---|---|
| Username | `testuser` |
| Password | `Test123` |

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── AppHeader.jsx       # Shared sticky navigation header
│   ├── AppFooter.jsx       # Shared footer with links & info
│   ├── SalaryChart.jsx     # Recharts bar chart component
│   └── CityMap.jsx         # Leaflet map with geocoding
├── context/
│   └── AuthContext.jsx     # Authentication state (session storage)
├── pages/
│   ├── LoginPage.jsx       # Login screen
│   ├── EmployeeListPage.jsx    # Main directory with stats & search
│   ├── EmployeeDetailsPage.jsx # Profile view + live camera
│   └── PhotoResultPage.jsx     # Captured photo result screen
├── services/
│   └── api.js              # Employee data service (mock / real API)
└── App.jsx                 # Routes + ProtectedLayout
```

---

## 🛠️ Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool & dev server
- **React Router v6** — Client-side routing
- **Recharts** — Salary bar chart
- **React Leaflet + Leaflet** — Interactive city map
- **Nominatim API** — Free geocoding for city coordinates
- **React Webcam** — Live camera capture

---

## 🔌 Connecting a Real Backend

The app currently uses mock data. To connect a real API, open `src/services/api.js` and replace the mock section:

```js
import axios from 'axios';
const API_URL = 'https://your-backend.com/api/employees';

export async function fetchEmployees() {
    const response = await axios.post(
        API_URL,
        { username: 'your_user', password: 'your_pass' },
        { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
}
```

---

## 📦 Build for Production

```bash
npm run build
```

Output is in the `dist/` folder, ready to deploy on Vercel, Netlify, or any static host.

---

## 📄 License

MIT © 2026 HRDashboard

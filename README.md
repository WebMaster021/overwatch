# 🛡️ Project Overwatch (Real-Time GPS Tracking System)

A Full-Stack Military Simulation Dashboard that tracks assets. using a **Spring Boot** backend and a **React/Leaflet** visualization layer.

## 🚀 Key Features
* **Real-Time Telemetry:** Backend simulates GPS movement and battery drain for multiple units every 2 seconds.
* **Live Visualization:** React Dashboard renders units on a tactical dark-mode map using Leaflet.js.
* **Persistence:** All unit states are stored and retrieved from a PostgreSQL database.
* **Auto-Recovery:** Simulation includes logic to "recharge" and redeploy units if battery hits 0%.

## 🛠️ Tech Stack
* **Backend:** Java 17, Spring Boot 3, Spring Data JPA, Hibernate.
* **Database:** PostgreSQL.
* **Frontend:** React (Vite), TypeScript, Tailwind CSS, React-Leaflet.
* **Architecture:** Polling-based REST API (Plan to upgrade to WebSockets in V2).

## 📸 Screenshots
<img width="1913" height="896" alt="image" src="https://github.com/user-attachments/assets/81d4aa22-13c2-482f-a630-74bf6392b6bc" />


## ⚡ How to Run
1.  **Database:** Create a Postgres DB named `overwatch_db`.
2.  **Backend:** Run `mvnw spring-boot:run` (Starts on port 8080).
3.  **Frontend:** `cd overwatch-dashboard` -> `npm run dev` (Starts on port 5173).

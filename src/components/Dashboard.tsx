// src/components/Dashboard.tsx
import React, { useEffect, useState } from "react";
import API from "../api/api";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ totalFlights: 0, totalReservations: 0 });

  useEffect(() => {
    (async () => {
      try {
        const flights = await API.get("/flights");
        const reservations = await API.get("/reservations");
        setStats({ totalFlights: flights.data.length, totalReservations: reservations.data.length });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="card">
      <div className="header">
        <div>
          <div className="h-title">Dashboard</div>
          <div className="h-sub">Quick stats</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <div className="card" style={{ flex: 1 }}>
          <div className="h-title">{stats.totalFlights}</div>
          <div className="small">Total flights</div>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <div className="h-title">{stats.totalReservations}</div>
          <div className="small">Total reservations</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// src/pages/LandingPage.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="container">
      <div style={{ display: "flex", gap: 20, alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28 }}>SkyBook — Flight Reservation</h1>
          <p style={{ color: "var(--muted)" }}>Book flights quickly. Admins manage flights effortlessly.</p>
          <div style={{ marginTop: 12 }}>
            <Link to="/flights" className="button" style={{ marginRight: 8 }}>Browse Flights</Link>
            <Link to="/admin" className="button ghost">Admin Panel</Link>
          </div>
        </div>
        <div className="card" style={{ maxWidth: 420 }}>
          <div className="h-title">Quick Search</div>
          <div className="small">Search by route or date in flights page</div>
        </div>
      </div>
    </div>
  );
}

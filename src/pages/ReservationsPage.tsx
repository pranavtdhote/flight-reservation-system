// src/pages/ReservationsPage.tsx
import React from "react";
import axios from "axios";
import FlightList from "../components/FlightList";

const ReservationsPage: React.FC = () => {
  const handleReserve = async (flightId: string) => {
    try {
      // Normally you'd fetch from auth context/localStorage
      const userId = localStorage.getItem("userId") || "68c973ae0dd829835c2caa8a";
      const name = localStorage.getItem("userName") || "Demo User";
      const email = localStorage.getItem("userEmail") || "demo@example.com";

      const res = await axios.post("http://localhost:5000/api/reservations", {
        name,
        email,
        flightId,
        userId,
      });

      alert("✅ Reservation successful!");
      console.log("Reservation:", res.data);
    } catch (error: any) {
      console.error("❌ Error reserving flight:", error.response?.data || error);
      alert(`Reservation failed: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="page">
      <h2 className="page-title">Reserve Your Flight</h2>
      <FlightList onReserve={handleReserve} />
    </div>
  );
};

export default ReservationsPage;

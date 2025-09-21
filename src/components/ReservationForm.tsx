// src/components/ReservationForm.tsx
import React, { useState } from "react";
import { createReservation } from "../api/api";

type Props = {
  flightId: string;
  onSuccess: () => void;
};

const ReservationForm: React.FC<Props> = ({ flightId, onSuccess }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReserve = async () => {
    if (!name) { setMessage("Enter passenger name"); return; }
    setLoading(true);
    try {
      await createReservation({ flightId, passengerName: name, mobile });
      setMessage("Reservation confirmed");
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setMessage(err?.response?.data?.message || "Reservation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="h-title">Reserve Seat</div>
      <div className="small">Flight: {flightId}</div>

      <input placeholder="Passenger Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Mobile (optional)" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      <div style={{ display: "flex", gap: 8 }}>
        <button className="button" onClick={handleReserve} disabled={loading}>
          {loading ? "Reserving..." : "Confirm Reservation"}
        </button>
        <button className="button ghost" onClick={() => { setName(""); setMobile(""); setMessage(""); }}>
          Reset
        </button>
      </div>

      {message && <div className="toast" style={{ marginTop: 8 }}>{message}</div>}
    </div>
  );
};

export default ReservationForm;

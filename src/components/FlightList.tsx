// src/components/FlightList.tsx
import React, { useEffect, useState } from "react";
import { getFlights } from "../api/api";

export interface Flight {
  _id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  date: string;
  price?: number;
  availableSeats?: number;
}

type Props = {
  onReserve: (flightId: string) => void;
  showAdminActions?: boolean;
};

const FlightList: React.FC<Props> = ({ onReserve, showAdminActions = true }) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getFlights();
        setFlights(res.data);
      } catch (err) {
        console.error("Error fetching flights:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="card">Loading flights…</div>;
  if (flights.length === 0) return <div className="card">No flights available</div>;

  return (
    <div className="card">
      <div className="header">
        <div>
          <div className="h-title">Available Flights</div>
          <div className="h-sub">Browse & reserve</div>
        </div>
      </div>

      <div className="list">
        {flights.map((f) => (
          <div key={f._id} className="list-item">
            <div className="meta">
              <div style={{ fontWeight: 600 }}>
                {f.flightNumber} · {f.origin} → {f.destination}
              </div>
              <div className="small">{new Date(f.date).toLocaleString()}</div>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div className="small">Seats: {f.availableSeats ?? "—"}</div>
              <button
                className="button"
                onClick={() => onReserve(f._id)}
                disabled={(f.availableSeats ?? 0) <= 0}
              >
                Reserve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightList;

import React, { useEffect, useState } from "react";
import { getFlights, deleteFlight } from "../../api/api";
import FlightForm from "./FlightForm";

const FlightListAdmin: React.FC = () => {
  const [flights, setFlights] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);

  const fetch = async () => {
    try {
      const res = await getFlights(); setFlights(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete flight?")) return;
    await deleteFlight(id); fetch();
  };

  return (
    <div>
      <h2>Admin - Flights</h2>
      <FlightForm flightId={editing} onSuccess={() => { setEditing(null); fetch(); }} />
      <div className="list" style={{ marginTop: 12 }}>
        {flights.map(f => (
          <div key={f._id} className="list-item">
            <div className="meta">
              <div style={{ fontWeight: 700 }}>{f.flightNumber}</div>
              <div className="small">{f.origin} → {f.destination} • {new Date(f.date).toLocaleDateString()}</div>
            </div>
            <div>
              <button className="button ghost" onClick={() => setEditing(f._id)}>Edit</button>
              <button className="button" style={{ marginLeft: 8, background: "linear-gradient(90deg,#ff7a7a,#ffb27a)", color: "#04212b" }} onClick={() => handleDelete(f._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightListAdmin;

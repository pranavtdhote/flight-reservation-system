import React, { useState, useEffect } from "react";
import { createFlight, updateFlight, getFlight } from "../../api/api";

const FlightForm = ({ flightId, onSuccess }: { flightId?: string | null; onSuccess: () => void }) => {
  const [form, setForm] = useState({ flightNumber: "", origin: "", destination: "", date: "", availableSeats: 0 });
  useEffect(() => {
    if (!flightId) return;
    (async () => {
      try {
        const res = await getFlight(flightId);
        setForm(res.data);
      } catch (e) { console.error(e); }
    })();
  }, [flightId]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      if (flightId) await updateFlight(flightId, form);
      else await createFlight(form);
      onSuccess();
      setForm({ flightNumber: "", origin: "", destination: "", date: "", availableSeats: 0 });
    } catch (err) { console.error(err); }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="h-title">{flightId ? "Edit Flight" : "New Flight"}</div>
      <input name="flightNumber" placeholder="Flight No" value={form.flightNumber} onChange={e => setForm({...form, flightNumber: e.target.value})} />
      <input name="origin" placeholder="Origin" value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} />
      <input name="destination" placeholder="Destination" value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} />
      <input name="date" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
      <input name="availableSeats" type="number" value={form.availableSeats} onChange={e => setForm({...form, availableSeats: Number(e.target.value)})} />
      <div style={{ display: "flex", gap: 8 }}>
        <button className="button" type="button" onClick={() => handleSubmit()}>Save</button>
      </div>
    </form>
  );
};

export default FlightForm;

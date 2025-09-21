import { useEffect, useState } from "react";
import axios from "axios";
import { Flight, Reservation } from "../types/Flight";

export default function AdminDashboard() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [newFlight, setNewFlight] = useState({
    flightNumber: "",
    origin: "",
    destination: "",
    date: "",
    availableSeats: 0,
  });

  useEffect(() => {
    fetchFlights();
    fetchReservations();
  }, []);

  const fetchFlights = async () => {
    const res = await axios.get("http://localhost:5000/api/flights");
    setFlights(res.data);
  };

  const fetchReservations = async () => {
    const res = await axios.get("http://localhost:5000/api/reservations");
    setReservations(res.data);
  };

  const addFlight = async () => {
    await axios.post("http://localhost:5000/api/flights", newFlight);
    setNewFlight({ flightNumber: "", origin: "", destination: "", date: "", availableSeats: 0 });
    fetchFlights();
  };

  const deleteFlight = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/flights/${id}`);
    fetchFlights();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Add Flight */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="font-semibold mb-2">Add Flight</h3>
        <input
          className="border p-1 mr-2"
          placeholder="Flight Number"
          value={newFlight.flightNumber}
          onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })}
        />
        <input
          className="border p-1 mr-2"
          placeholder="Origin"
          value={newFlight.origin}
          onChange={(e) => setNewFlight({ ...newFlight, origin: e.target.value })}
        />
        <input
          className="border p-1 mr-2"
          placeholder="Destination"
          value={newFlight.destination}
          onChange={(e) => setNewFlight({ ...newFlight, destination: e.target.value })}
        />
        <input
          className="border p-1 mr-2"
          type="datetime-local"
          value={newFlight.date}
          onChange={(e) => setNewFlight({ ...newFlight, date: e.target.value })}
        />
        <input
          className="border p-1 mr-2"
          type="number"
          placeholder="Seats"
          value={newFlight.availableSeats}
          onChange={(e) =>
            setNewFlight({ ...newFlight, availableSeats: Number(e.target.value) })
          }
        />
        <button onClick={addFlight} className="bg-green-600 text-white px-3 py-1 rounded">
          Add Flight
        </button>
      </div>

      {/* Flight List */}
      <h3 className="font-semibold mb-2">Flights</h3>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="border px-2">Flight</th>
            <th className="border px-2">Route</th>
            <th className="border px-2">Date</th>
            <th className="border px-2">Seats</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((f) => (
            <tr key={f._id}>
              <td className="border px-2">{f.flightNumber}</td>
              <td className="border px-2">{f.origin} → {f.destination}</td>
              <td className="border px-2">{new Date(f.date).toLocaleString()}</td>
              <td className="border px-2">{f.availableSeats}</td>
              <td className="border px-2">
                <button
                  onClick={() => deleteFlight(f._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Reservations */}
      <h3 className="font-semibold mt-6 mb-2">Reservations</h3>
      <ul className="list-disc ml-6">
        {reservations.map((r) => (
          <li key={r._id}>
            Passenger {r.userId} booked {r.flightNumber} ({r.origin} → {r.destination})
          </li>
        ))}
      </ul>
    </div>
  );
}

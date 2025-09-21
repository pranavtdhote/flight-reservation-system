import { useEffect, useState } from "react";
import axios from "axios";
import { Flight } from "../types/Flight";
import { useAuth } from "../context/AuthContext";

export default function ReservationList() {
  const { user } = useAuth();
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/flights").then((res) => setFlights(res.data));
  }, []);

  const handleReserve = async (flightId: string) => {
    if (!user) return;
    await axios.post("http://localhost:5000/api/reservations", {
      userId: user.id,
      flightId,
    });
    alert("✅ Reservation Successful!");
    setFlights((prev) =>
      prev.map((f) =>
        f._id === flightId ? { ...f, availableSeats: f.availableSeats - 1 } : f
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Available Flights</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {flights.map((f) => (
          <div key={f._id} className="border rounded p-4 shadow hover:shadow-md">
            <h3 className="text-lg font-semibold">
              {f.flightNumber} - {f.origin} → {f.destination}
            </h3>
            <p>Date: {new Date(f.date).toLocaleString()}</p>
            <p>Seats: {f.availableSeats}</p>
            <button
              disabled={f.availableSeats <= 0}
              onClick={() => handleReserve(f._id)}
              className={`mt-2 px-4 py-1 rounded ${
                f.availableSeats > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-200"
              }`}
            >
              Reserve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

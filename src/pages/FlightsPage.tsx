// src/pages/FlightsPage.tsx
import React, { useState } from "react";
import FlightList from "../components/FlightList";
import ReservationForm from "../components/ReservationForm";
import UserProfile from "../components/UserProfile";

export default function FlightsPage() {
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<string | undefined>(undefined);
  const [reserved, setReserved] = useState(false);

  return (
    <div className="container grid">
      <div>
        <FlightList onReserve={(id) => setSelectedFlight(id)} />
        {selectedFlight && !reserved && (
          <ReservationForm flightId={selectedFlight} onSuccess={() => setReserved(true)} />
        )}
        {reserved && <div className="card">✅ Reservation successful</div>}
      </div>

      <div>
        <UserProfile userId={profileId} onProfileReady={(id) => setProfileId(id)} />
      </div>
    </div>
  );
}

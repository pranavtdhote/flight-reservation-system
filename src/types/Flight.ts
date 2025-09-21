export interface Flight {
  _id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  date: string;
  availableSeats: number;
}

export interface Reservation {
  _id: string;
  userId: string;
  flightId: string;
  flightNumber: string;
  origin: string;
  destination: string;
  date: string;
}

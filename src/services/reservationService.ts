// src/services/reservationService.ts
import Reservation, { IReservation } from '../models/reservation';
import Flight from '../models/flight';

export class ReservationService {
  async createReservation(data: { name: string; email: string; flightId: string; userId?: string }) {
    const flight = await Flight.findById(data.flightId);
    if (!flight || flight.availableSeats <= 0) throw new Error("No seats available");

    flight.availableSeats -= 1;
    await flight.save();

    const reservation = new Reservation({
      name: data.name,
      email: data.email,
      flightId: data.flightId,
      userId: data.userId || null, // optional
    });

    return await reservation.save();
  }

  async getReservations() {
    return await Reservation.find().populate("flightId");
  }

  async getReservationsByUser(userId: string) {
    return await Reservation.find({ userId }).populate("flightId");
  }

  async cancelReservation(id: string) {
    const reservation = await Reservation.findById(id);
    if (!reservation) return false;

    const flight = await Flight.findById(reservation.flightId);
    if (flight) {
      flight.availableSeats += 1;
      await flight.save();
    }

    await Reservation.findByIdAndDelete(id);
    return true;
  }
}

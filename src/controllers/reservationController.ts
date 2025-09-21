import { Request, Response } from 'express';
import { ReservationService } from '../services/reservationService';

const reservationService = new ReservationService();

export const createReservation = async (req: Request, res: Response) => {
  try {
    // expected body: { name, email, flightId, userId? }
    const { name, email, flightId, userId } = req.body;
    const saved = await reservationService.createReservation({ name, email, flightId, userId });
    res.status(201).json(saved);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await reservationService.getReservations();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
};

export const getReservationsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const reservations = await reservationService.getReservationsByUser(userId);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user reservations', error });
  }
};

export const cancelReservation = async (req: Request, res: Response) => {
  try {
    const result = await reservationService.cancelReservation(req.params.id);
    if (result) {
      res.status(200).json({ message: 'Reservation canceled successfully' });
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error canceling reservation', error });
  }
};

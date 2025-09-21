import { Router } from 'express';
import { createReservation, getReservations, cancelReservation, getReservationsByUser } from '../controllers/reservationController';

const router = Router();

// Create a reservation
router.post('/', createReservation);

// Get all reservations (admin)
router.get('/', getReservations);

// Get reservations for a specific user
router.get('/user/:userId', getReservationsByUser);

// Cancel reservation by id
router.delete('/:id', cancelReservation);

export default router;

import { Router } from 'express';
import { getFlights, createFlight, getFlightById, updateFlight, deleteFlight } from '../controllers/flightController';

const router = Router();

// Get all flights
router.get('/', getFlights);

// Create new flight
router.post('/', createFlight);

// Get flight by id
router.get('/:id', getFlightById);

// Update flight by id
router.put('/:id', updateFlight);

// Delete flight by id
router.delete('/:id', deleteFlight);

export default router;

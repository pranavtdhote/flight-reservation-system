import { Request, Response } from 'express';
import { FlightService } from '../services/flightService';

const flightService = new FlightService();

export const getFlights = async (req: Request, res: Response) => {
    const flights = await flightService.getAllFlights();
    res.json(flights);
};

export const createFlight = async (req: Request, res: Response) => {
    try {
        const newFlight = await flightService.createFlight(req.body);
        res.status(201).json(newFlight);
    } catch (error) {
        res.status(400).json({ message: 'Error creating flight', error });
    }
};

export const getFlightById = async (req: Request, res: Response) => {
    const flight = await flightService.getFlightById(req.params.id);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });
    res.json(flight);
};

export const updateFlight = async (req: Request, res: Response) => {
    const updated = await flightService.updateFlight(req.params.id, req.body);
    res.json(updated);
};

export const deleteFlight = async (req: Request, res: Response) => {
    await flightService.deleteFlight(req.params.id);
    res.status(204).send();
};
import Flight, { IFlight } from '../models/flight';

export class FlightService {
    async createFlight(flightData: Partial<IFlight>) {
        const flight = new Flight(flightData);
        return await flight.save();
    }

    async getAllFlights() {
        return await Flight.find();
    }

    async getFlightById(id: string) {
        return await Flight.findById(id);
    }

    async updateFlight(id: string, flightData: Partial<IFlight>) {
        return await Flight.findByIdAndUpdate(id, flightData, { new: true });
    }

    async deleteFlight(id: string) {
        return await Flight.findByIdAndDelete(id);
    }
}
import Reservation from '../models/reservation';
import Flight from '../models/flight';

export class DashboardService {
    async getDashboardData() {
        // simple totals
        const totalReservations = await Reservation.countDocuments();
        const totalFlights = await Flight.countDocuments();

        // Top destinations by reservation count
        const topDestinations = await Reservation.aggregate([
            {
                $lookup: {
                    from: 'flights',
                    localField: 'flightId',
                    foreignField: '_id',
                    as: 'flight'
                }
            },
            { $unwind: '$flight' },
            {
                $group: {
                    _id: '$flight.destination',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        // Reservations per flight (most booked)
        const perFlight = await Reservation.aggregate([
            {
                $group: {
                    _id: '$flightId',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 20 },
            {
                $lookup: {
                    from: 'flights',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'flight'
                }
            },
            { $unwind: '$flight' },
            {
                $project: {
                    flightId: '$_id',
                    flightNumber: '$flight.flightNumber',
                    origin: '$flight.origin',
                    destination: '$flight.destination',
                    count: 1
                }
            }
        ]);

        // Occupancy: for each flight, its seats and booked count
        const occupancy = await Flight.aggregate([
            {
                $lookup: {
                    from: 'reservations',
                    localField: '_id',
                    foreignField: 'flightId',
                    as: 'reservations'
                }
            },
            {
                $project: {
                    flightNumber: 1,
                    origin: 1,
                    destination: 1,
                    availableSeats: 1,
                    booked: { $size: '$reservations' }
                }
            },
            { $sort: { booked: -1 } }
        ]);

        return {
            totalReservations,
            totalFlights,
            topDestinations: topDestinations.map(d => ({ destination: d._id, count: d.count })),
            perFlight,
            occupancy
        };
    }
}

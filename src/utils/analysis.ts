import  Reservation  from '../models/reservation';
import  Flight from '../models/flight';

export const calculateReservationStats = async () => {
    const totalReservations = await Reservation.countDocuments();
    const totalFlights = await Flight.countDocuments();
    
    return {
        totalReservations,
        totalFlights,
        averageReservationsPerFlight: totalFlights ? (totalReservations / totalFlights) : 0,
    };
};

export const generateReservationReport = async () => {
    const reservations = await Reservation.find().populate('flightId').populate('userId');
    const report = reservations.map(reservation => ({
        reservationId: reservation._id,
        flightNumber: (reservation.flightId as any).flightNumber,
        user: (reservation.userId as any).username,
        reservationDate: reservation.reservationDate,
    }));

    return report;
};

import User from '../models/user';
import Flight from '../models/flight';
import Reservation from '../models/reservation';

export const seedData = async () => {
    // Check if data already exists
    const userCount = await User.countDocuments();
    const flightCount = await Flight.countDocuments();
    const reservationCount = await Reservation.countDocuments();

    if (userCount > 0 || flightCount > 0 || reservationCount > 0) {
        console.log('Seed data already exists. Skipping seeding.');
        return;
    }

    // Create sample users
    const users = await User.insertMany([
        { username: 'john_doe', email: 'john@example.com' },
        { username: 'jane_smith', email: 'jane@example.com' },
    ]);

    // Create sample flights
    const flights = await Flight.insertMany([
        { flightNumber: 'FL123', origin: 'New York', destination: 'London', departureTime: new Date(), arrivalTime: new Date() },
        { flightNumber: 'FL456', origin: 'Paris', destination: 'Tokyo', departureTime: new Date(), arrivalTime: new Date() },
    ]);

    // Create sample reservations
    await Reservation.insertMany([
        { userId: users[0]._id, flightId: flights[0]._id, reservationDate: new Date() },
        { userId: users[1]._id, flightId: flights[1]._id, reservationDate: new Date() },
    ]);

    console.log('Seed data created successfully.');
};

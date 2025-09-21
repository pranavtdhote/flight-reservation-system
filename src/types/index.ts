export interface Flight {
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;
    airline: string;
    price: number;
}

export interface Reservation {
    userId: string;
    flightId: string;
    reservationDate: Date;
    status: 'confirmed' | 'canceled' | 'pending';
}

export interface User {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
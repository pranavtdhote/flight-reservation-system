import mongoose, { Schema, Document } from 'mongoose';

export interface IFlight extends Document {
    flightNumber: string;
    origin: string;
    destination: string;
    date: string;
    availableSeats: number;
}

const FlightSchema: Schema = new Schema({
    flightNumber: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
    availableSeats: { type: Number, required: true }
});

export default mongoose.model<IFlight>('Flight', FlightSchema);
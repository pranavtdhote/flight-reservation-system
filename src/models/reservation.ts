import mongoose, { Schema, Document } from 'mongoose';

export interface IReservation extends Document {
  name: string;
  email: string;
  flightId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId; // optional link to app user
  createdAt: Date;
}

const ReservationSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  flightId: { type: Schema.Types.ObjectId, ref: 'Flight', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // optional
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IReservation>('Reservation', ReservationSchema);

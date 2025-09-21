import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import flightRoutes from './routes/flightRoutes';
import reservationRoutes from './routes/reservationRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

// Middleware: enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/flightdb';

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    });

    console.log('MongoDB connected successfully.');

    // Routes setup
    app.use('/api/flights', flightRoutes);
    app.use('/api/reservations', reservationRoutes);
    app.use('/api/dashboard', dashboardRoutes);
    app.use('/api/users', userRoutes);

    // Start Express server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process if DB connection fails
  }
}

startServer();

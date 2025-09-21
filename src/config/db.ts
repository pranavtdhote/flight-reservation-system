import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/flightdb';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;

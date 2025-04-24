import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/country-info-app';

    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB successfully connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    } else {
      console.error('Unknown error while connecting to MongoDB');
    }

    process.exit(1);
  }
};


export const closeDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error in closing connection with MongoDB:', error);
  }
};
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("connecting...");
    const conn = await mongoose.connect(`${process.env.MONGODB_URL}TO-DO-APP`);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log("Error in Connecting with DB : ", error);
    process.exit(1);
  }
};

export default connectDB;

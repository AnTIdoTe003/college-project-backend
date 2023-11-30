import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection established")
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb

import mongoose from "mongoose";

export const connectToDB = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");

  } catch (error) {

    console.log("Error occured connecting to database", error);
    process.exit(1);
    
  }
};

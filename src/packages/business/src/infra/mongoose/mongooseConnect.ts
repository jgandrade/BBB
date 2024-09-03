import { connect } from "mongoose";

const connectMongooseInstance = async () => {
  try {
    await connect(process.env.MONGODB_CREDENTIAL || "");
    console.log("Successfully Connected to Mongodb instance");
  } catch (error) {
    throw new Error(
      `Error has occured connecting to Mongodb instance: ${(error as Error).message}`
    );
  }
};

connectMongooseInstance();

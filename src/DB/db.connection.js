import mongoose from "mongoose";
import envConfig from "../config/env.config.js";
import userModel from "./models/user.model.js";

const dbConnection = async () => {
  try {
    await mongoose.connect(envConfig.database.uri, {
      dbName: envConfig.database.name,
    });
    await userModel.syncIndexes();

    console.log(
      `Connected successfully to database: ${mongoose.connection.name}`,
    );
  } catch (error) {
    console.log("Database connection faild");
  }
};

export default dbConnection;

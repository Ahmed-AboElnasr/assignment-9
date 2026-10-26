import "./config/env.config.js";
import express from "express";
import envConfig from "./config/env.config.js";
import { globalErrorHandling } from "./middleware/error.middleware.js";
import dbConnection from "./DB/db.connection.js";
import { userRouter, messageRouter, authRouter } from "./modules/index.js";

const app = express();

// Connecting to the database
dbConnection();

// Convert buffer data
app.use(express.json());

// Application routing
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/message", messageRouter);

// Sample endpoint
app.get("/", (req, res) => {
  res.json({ message: "Sample endpoint" });
});

// In-valid routing
app.all("{/*dummy}", (req, res) => {
  res.json({ message: "Endpoint not found" });
});

// Error handling
app.use(globalErrorHandling);

app.listen(envConfig.port, () => {
  console.log(`Application is running on port ${envConfig.port}/`);
});

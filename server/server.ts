import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "http";
import dotenv from "dotenv";
import authRoutes from "./controller/auth"; // Import auth routes
import answerController from "./controller/answer";
import questionController from "./controller/question";
import tagController from "./controller/tag";
import profileRoutes from "./controller/profile";
import commentRoutes from "./controller/comment";
import votesRoutes from "./controller/vote";
import { appRateLimiter } from "./sanitizers/rateLimiter";

dotenv.config();
const MONGO_URI: string =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/stackUnderflow";
const CLIENT_URL: string = process.env.CLIENT_URL || "http://localhost:3000";
const port: number = parseInt(process.env.PORT || "8000", 10);

mongoose.connect(MONGO_URI);

const app: Express = express();
app.set("trust proxy", 1);

/**
 * Middleware to allow cross-origin requests
 */
// app.use(
//   cors({
//     credentials: true,
//     origin: [CLIENT_URL],
//   })
// );

app.use(cors());

app.use(appRateLimiter);
/**
 * Middleware to parse incoming requests
 */
app.use(express.json());
app.get("/", (req, res) => {
  res.send("REST Service for Fake Stack Overflow");
  res.end();
});

// Use the controllers and routes.
app.use("/question", questionController);
app.use("/tag", tagController);
app.use("/answer", answerController);
app.use("/auth", authRoutes); // Use the auth routes
app.use("/profile", profileRoutes);
app.use("/comment", commentRoutes);
app.use("/vote", votesRoutes);

// Start the server and assign it to the 'server' variable
const server: Server = app.listen(port, () => {
  console.log(`Server starts at http://localhost:${port}`);
});

/**
 * Gracefully close the server and the database connection
 */
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed.");
  });
  mongoose
    .disconnect()
    .then(() => {
      console.log("Database instance disconnected.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error during disconnection:", err);
      process.exit(1);
    });
});

module.exports = server;

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import FoodRoutes from "./routes/Food.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", UserRoutes);
app.use("/api/food", FoodRoutes);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello developers from GFG",
  });
});

// Database connection function
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    console.error(error);
    process.exit(1); // Exit the process on failure
  }
};

// Start server function
const startServer = async () => {
  await connectDB();
  app.listen(8080, () => {
    console.log("Server started on port 8080");
  });
};

// Log MongoDB URI for debugging
console.log('MongoDB URI:', process.env.MONGODB_URI);

// Start the server
startServer();

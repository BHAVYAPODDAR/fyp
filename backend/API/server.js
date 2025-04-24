const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ Import cors
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const app = express();

// ✅ Enable CORS - allow all origins (good for development)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// API routes
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

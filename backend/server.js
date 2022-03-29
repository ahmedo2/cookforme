// Require dependencies
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const { routeNotFound, errorHandler } = require("./middlewares/error");
const userRoutes = require("./routes/user");
const foodRoutes = require("./routes/food");
const orderRoutes = require("./routes/order.routes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Express server
const app = express();

// Parse JSON body
app.use(express.json());

// Log requests
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routers
app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

// Error middlewares
app.use(routeNotFound);
app.use(errorHandler);

// Start listening to requests
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

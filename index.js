require("dotenv").config();
const express = require("express");
const path = require("path");
const dbConnect = require("./config/db-connect");

const authRouter = require("./routes/auth");
const eventRouter = require("./routes/event");
const bookingRouter = require("./routes/booking");

const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

dbConnect();
app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "EventHub API is running..." });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/bookings", bookingRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
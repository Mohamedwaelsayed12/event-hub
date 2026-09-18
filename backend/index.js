require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const orderRoutes = require('./routes/orders');

const app = express();

// Disable Mongoose buffering globally
mongoose.set('bufferCommands', false);

// Middleware
app.use(cors());
app.use(express.json());

// Database Readiness Guard
app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database is not connected yet. Please verify MongoDB Atlas IP Whitelist (0.0.0.0/0).'
    });
  }
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/orders', orderRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'EventHub API running',
    databaseStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} does not exist.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[500 Server Error]:', err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://nti-G5:deadomar12495@cluster0.g1a3fgq.mongodb.net/Eventhub?retryWrites=true&w=majority';

// Database event logging
mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB Atlas Database');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Atlas Connection Error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB Atlas Connection Disconnected');
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false
    });
  } catch (err) {
    console.error('❌ MongoDB Atlas connection failed:', err.message);
  }
};

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  connectDB();
});
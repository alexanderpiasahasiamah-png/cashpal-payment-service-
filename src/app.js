require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// Routes
const paymentRoutes = require('./routes/payment.routes');
app.use('/api/payments', paymentRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;

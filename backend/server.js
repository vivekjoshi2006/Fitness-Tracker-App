const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Global Middleware Config
app.use(cors());
app.use(express.json());

// Main Routing Table
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/logs', require('./routes/food'));
app.use('/api/activities', require('./routes/activity'));

// Base Health Probe Route
app.get('/', (req, res) => {
  res.json({ message: 'FitTrack API is Active' });
});

// JSON Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
});

module.exports = app;
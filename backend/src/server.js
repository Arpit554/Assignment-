require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const seedDatabase = require('./utils/seedData');
const Competition = require('./models/Competition');

const competitionRoutes = require('./routes/competitionRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow mobile apps and web frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id'],
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/competitions', competitionRoutes);
app.use('/api/users', userRoutes);

// Root & Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Feedants Competition API',
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Feedants Competition Details API',
    endpoints: {
      competition: '/api/competitions/:id',
      latestCompetition: '/api/competitions/latest',
      register: 'POST /api/competitions/:id/register',
      submit: 'POST /api/competitions/:id/submit',
      users: '/api/users',
      reseed: 'POST /api/competitions/seed/reset',
    },
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Server Initialization
const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed if database is empty
    const competitionCount = await Competition.countDocuments();
    if (competitionCount === 0) {
      console.log('Database is empty. Automatically running seeder...');
      await seedDatabase();
    }

    app.listen(PORT, () => {
      console.log(`🚀 Feedants Server running on http://localhost:${PORT}`);
      console.log(`📡 API Documentation & Health: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;

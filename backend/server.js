const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const redis = require('redis');
const winston = require('winston');

// Import routes
const trendsRoutes = require('./src/routes/trends');
const contentRoutes = require('./src/routes/content');
const analyticsRoutes = require('./src/routes/analytics');
const authRoutes = require('./src/routes/auth');

// Import middleware
const authMiddleware = require('./src/middleware/auth');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Redis client setup
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
  logger.error('Redis Client Error:', err);
});

redisClient.connect().catch(console.error);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trendlens', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => logger.info('Connected to MongoDB'))
.catch(err => logger.error('MongoDB connection error:', err));

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/trends', authMiddleware, trendsRoutes);
app.use('/api/content', authMiddleware, contentRoutes);
app.use('/api/analytics', authMiddleware, analyticsRoutes);

// Welcome message for root route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Welcome to TrendLens AI API',
    version: '1.0.0',
    documentation: '/api/docs',
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The route ${req.originalUrl} does not exist on this server.`,
    availableRoutes: [
      'GET /',
      'GET /health',
      'POST /api/auth/login',
      'GET /api/trends/realtime',
      'POST /api/content/generate',
      'GET /api/analytics/performance'
    ]
  });
});

// Global error handler
app.use((error, req, res, next) => {
  logger.error('Unhandled error:', error);

  res.status(error.status || 500).json({
    error: error.message || 'Internal Server Error',
    timestamp: new Date().toISOString(),
    path: req.path
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');

  // Close database connections
  await mongoose.connection.close();
  await redisClient.quit();

  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 TrendLens AI Backend running on port ${PORT}`);
  logger.info(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;

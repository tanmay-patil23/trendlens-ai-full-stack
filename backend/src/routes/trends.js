const express = require('express');
const trendsController = require('../controllers/trendsController');
const { validateTrendRequest } = require('../middleware/validation');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiting for trends API
const trendsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: 'Too many trend requests, please try again later.'
});

// Apply rate limiting to all trends routes
router.use(trendsLimiter);

/**
 * @route GET /api/trends/realtime
 * @desc Get real-time trending topics
 * @access Private
 */
router.get('/realtime', trendsController.getRealTimeTrends);

/**
 * @route POST /api/trends/analyze
 * @desc Analyze specific keywords for trends
 * @access Private
 */
router.post('/analyze', validateTrendRequest, trendsController.analyzeKeywords);

/**
 * @route GET /api/trends/predictions
 * @desc Get AI-powered trend predictions
 * @access Private
 */
router.get('/predictions', trendsController.getTrendPredictions);

/**
 * @route GET /api/trends/historical/:keyword
 * @desc Get historical trend data for a keyword
 * @access Private
 */
router.get('/historical/:keyword', async (req, res) => {
  try {
    const { keyword } = req.params;
    const { days = 30 } = req.query;

    // Mock historical data for now
    const mockData = Array.from({ length: parseInt(days) }, (_, i) => ({
      date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      volume: Math.floor(Math.random() * 10000) + 1000,
      sentiment: (Math.random() * 2 - 1).toFixed(2)
    })).reverse();

    res.json({
      success: true,
      data: {
        keyword,
        period: `${days} days`,
        data: mockData
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get historical data',
      message: error.message
    });
  }
});

module.exports = router;

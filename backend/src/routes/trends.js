const express = require('express');
const router = express.Router();

// Mock trends data
const generateMockTrends = (platform = 'all', limit = 20) => {
  const mockTrends = [
    { name: 'AI Revolution 2025', platform: 'twitter', volume: 15420, sentiment: 0.8 },
    { name: 'Climate Tech Solutions', platform: 'instagram', volume: 8930, sentiment: 0.6 },
    { name: 'Web3 Development', platform: 'linkedin', volume: 5670, sentiment: 0.4 },
    { name: 'Sustainable Energy', platform: 'twitter', volume: 12340, sentiment: 0.7 },
    { name: 'Remote Work Culture', platform: 'all', volume: 18750, sentiment: 0.9 },
    { name: 'Digital Marketing', platform: 'instagram', volume: 9870, sentiment: 0.5 },
    { name: 'Blockchain Innovation', platform: 'twitter', volume: 7650, sentiment: 0.3 }
  ];

  let filtered = mockTrends;
  if (platform !== 'all') {
    filtered = mockTrends.filter(trend => 
      trend.platform === platform || trend.platform === 'all'
    );
  }

  return filtered.slice(0, parseInt(limit)).map(trend => ({
    ...trend,
    growth: ((Math.random() - 0.5) * 200).toFixed(1) + '%'
  }));
};

// GET /api/trends/realtime
router.get('/realtime', async (req, res) => {
  try {
    const { platform = 'all', limit = 20 } = req.query;
    
    const trends = generateMockTrends(platform, limit);

    res.json({
      success: true,
      data: trends,
      cached: false,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Realtime trends error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trending topics',
      message: error.message
    });
  }
});

// POST /api/trends/analyze  
router.post('/analyze', async (req, res) => {
  try {
    const { keywords, timeframe = '24h' } = req.body;
    
    if (!Array.isArray(keywords) || keywords.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Keywords array is required'
      });
    }

    const analysis = keywords.map(keyword => ({
      keyword,
      volume: Math.floor(Math.random() * 1000) + 100,
      growth: ((Math.random() - 0.5) * 200).toFixed(1) + '%',
      sentiment: (Math.random() * 2 - 1).toFixed(2),
      platforms: ['twitter', 'instagram', 'linkedin'],
      viral_potential: Math.floor(Math.random() * 100)
    }));

    res.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Keyword analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze keywords',
      message: error.message
    });
  }
});

// GET /api/trends/predictions
router.get('/predictions', async (req, res) => {
  try {
    const mockPredictions = [
      {
        trend: 'AI-Powered Content Creation',
        probability: 0.87,
        timeframe: '2-3 weeks',
        category: 'technology'
      },
      {
        trend: 'Sustainable Fashion Movement', 
        probability: 0.72,
        timeframe: '1-2 months',
        category: 'lifestyle'
      },
      {
        trend: 'Remote Work Innovation',
        probability: 0.65,
        timeframe: '3-4 weeks', 
        category: 'business'
      }
    ];

    res.json({
      success: true,
      data: mockPredictions,
      confidence: 0.78,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Trend predictions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get trend predictions',
      message: error.message
    });
  }
});

module.exports = router;

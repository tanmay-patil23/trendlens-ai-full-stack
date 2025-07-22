const express = require('express');
const router = express.Router();

// Mock analytics endpoint
router.get('/dashboard', async (req, res) => {
  try {
    const mockAnalytics = {
      total_posts: Math.floor(Math.random() * 1000) + 100,
      engagement_rate: (Math.random() * 15 + 5).toFixed(2) + '%',
      top_platforms: ['instagram', 'twitter', 'tiktok'],
      trending_topics: [
        { topic: 'AI Technology', growth: '+45%' },
        { topic: 'Sustainable Living', growth: '+32%' },
        { topic: 'Remote Work', growth: '+28%' }
      ],
      generated_at: new Date().toISOString()
    };

    res.json({
      success: true,
      data: mockAnalytics
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics',
      message: error.message
    });
  }
});

module.exports = router;

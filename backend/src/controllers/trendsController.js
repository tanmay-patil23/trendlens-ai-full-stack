const redis = require('redis');

// Create Redis client
const redisClient = redis.createClient({ 
  url: process.env.REDIS_URL || 'redis://redis:6379'
});

redisClient.on('error', err => console.error('Redis Client Error:', err));
redisClient.connect().catch(err => console.error('Redis connection failed:', err));

class TrendsController {
  async getRealTimeTrends(req, res) {
    try {
      const { platform = 'all', location = 'worldwide', limit = 20 } = req.query;
      
      // Mock trending data
      const mockTrends = [
        { name: 'AI Revolution', platform: 'twitter', volume: 15420 },
        { name: 'Climate Tech', platform: 'instagram', volume: 8930 },
        { name: 'Web3 Development', platform: 'linkedin', volume: 5670 },
        { name: 'Sustainable Energy', platform: 'twitter', volume: 12340 },
        { name: 'Machine Learning', platform: 'all', volume: 18750 }
      ];

      let filtered = mockTrends;
      if (platform !== 'all') {
        filtered = mockTrends.filter(trend => 
          trend.platform === platform || trend.platform === 'all'
        );
      }

      const limited = filtered.slice(0, parseInt(limit));

      res.json({
        success: true,
        data: limited,
        cached: false,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error getting real-time trends:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch trending topics',
        message: error.message
      });
    }
  }

  async analyzeKeywords(req, res) {
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
        growth: (Math.random() * 200 - 100).toFixed(2) + '%',
        sentiment: (Math.random() * 2 - 1).toFixed(2),
        platforms: ['twitter', 'instagram', 'linkedin'],
        viralPotential: Math.floor(Math.random() * 100)
      }));

      res.json({
        success: true,
        data: analysis,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error analyzing keywords:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to analyze keywords',
        message: error.message
      });
    }
  }

  async getTrendPredictions(req, res) {
    try {
      const { category = 'all', timeRange = '7d' } = req.query;

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
          trend: 'Remote Work Technology',
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
      console.error('Error getting trend predictions:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get trend predictions',
        message: error.message
      });
    }
  }
}

module.exports = new TrendsController();

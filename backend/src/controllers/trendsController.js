const TrendAnalyzer = require('../services/socialMediaService');
const redis = require('redis');

const trendAnalyzer = new TrendAnalyzer();
const redisClient = redis.createClient(process.env.REDIS_URL);

class TrendsController {
  // Get real-time trending topics
  async getRealTimeTrends(req, res) {
    try {
      const { platform = 'all', location = 'worldwide', limit = 20 } = req.query;

      // Check cache first
      const cacheKey = `trends:${platform}:${location}:${limit}`;
      const cachedTrends = await redisClient.get(cacheKey);

      if (cachedTrends) {
        return res.json({
          success: true,
          data: JSON.parse(cachedTrends),
          cached: true,
          timestamp: new Date().toISOString()
        });
      }

      // Get fresh trends data
      const trendsData = await trendAnalyzer.getTrendingTopics(location);

      // Filter by platform if specified
      let filteredTrends = trendsData;
      if (platform !== 'all') {
        filteredTrends = trendsData.filter(trend => 
          trend.platform === platform || trend.platforms?.includes(platform)
        );
      }

      // Limit results
      const limitedTrends = filteredTrends.slice(0, parseInt(limit));

      // Cache for 5 minutes
      await redisClient.setex(cacheKey, 300, JSON.stringify(limitedTrends));

      res.json({
        success: true,
        data: limitedTrends,
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

  // Analyze specific keywords
  async analyzeKeywords(req, res) {
    try {
      const { keywords, timeframe = '24h', platforms = ['all'] } = req.body;

      if (!keywords || !Array.isArray(keywords)) {
        return res.status(400).json({
          success: false,
          error: 'Keywords array is required'
        });
      }

      const analysis = await Promise.all(
        keywords.map(async (keyword) => {
          const trendData = await trendAnalyzer.analyzeKeywordTrend(keyword, timeframe);
          const sentiment = await trendAnalyzer.analyzeSentiment(keyword);

          return {
            keyword,
            volume: trendData.volume,
            growth: trendData.growth,
            sentiment: sentiment.score,
            platforms: trendData.platforms,
            viralPotential: trendData.viralScore
          };
        })
      );

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

  // Get trend predictions
  async getTrendPredictions(req, res) {
    try {
      const { category = 'all', timeRange = '7d' } = req.query;

      // This would typically call your AI service
      const predictions = await fetch(`${process.env.AI_SERVICE_URL}/api/trends/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, timeRange })
      });

      const data = await predictions.json();

      res.json({
        success: true,
        data: data.predictions || [],
        confidence: data.confidence || 0,
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

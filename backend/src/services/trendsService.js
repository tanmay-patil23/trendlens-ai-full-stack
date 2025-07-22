// backend/src/services/trendsService.js

class TrendsService {
  constructor() {
    if (process.env.TWITTER_API_KEY && process.env.TWITTER_API_SECRET) {
      const { TwitterApi } = require('twitter-api-v2');
      this.twitter = new TwitterApi({
        appKey:    process.env.TWITTER_API_KEY,
        appSecret: process.env.TWITTER_API_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessSecret: process.env.TWITTER_ACCESS_SECRET,
      }).v1;
    }
  }

  async getTwitterTrends(woeid = 1) {
    if (!this.twitter) return [];
    const trends = await this.twitter.trends(woeid);
    return trends[0].trends.map(t => ({
      name: t.name, platform: 'twitter', volume: t.tweet_volume||0
    }));
  }

  // … getGoogleTrends, getNewsHeadlines, getAllTrends combine these …
}

module.exports = new TrendsService();

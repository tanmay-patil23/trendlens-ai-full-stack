const express = require('express');
const router = express.Router();

// Mock content generation endpoint
router.post('/generate', async (req, res) => {
  try {
    const { prompt, platform = 'general' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }

    // Mock response
    const mockContent = {
      content: `Generated content about: ${prompt}. Perfect for ${platform}! 🚀 #trending #ai`,
      platform: platform,
      engagement_score: Math.floor(Math.random() * 100) + 50,
      generated_at: new Date().toISOString()
    };

    res.json({
      success: true,
      data: mockContent
    });

  } catch (error) {
    console.error('Content generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate content',
      message: error.message
    });
  }
});

module.exports = router;

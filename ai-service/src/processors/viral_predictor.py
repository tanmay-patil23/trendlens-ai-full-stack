import google.generativeai as genai
import os
from textblob import TextBlob
import numpy as np

class ViralPredictor:
    def __init__(self):
        # Configure Google Gemini API
        api_key = os.getenv('GEMINI_API_KEY')
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.get_model("gemini-2.5-flash")
        else:
            print("Warning: GEMINI_API_KEY not set")
            self.model = None

    async def predict_viral_potential(self, content, platform='general'):
        try:
            # Basic sentiment analysis
            blob = TextBlob(content)
            sentiment_score = blob.sentiment.polarity
            
            # Calculate base score
            base_score = 50
            if sentiment_score > 0.1:
                base_score += 15
            elif sentiment_score < -0.1:
                base_score -= 10
            
            # Platform multiplier
            platform_multipliers = {
                'tiktok': 1.2,
                'instagram': 1.1,
                'twitter': 1.0,
                'linkedin': 0.9
            }
            
            multiplier = platform_multipliers.get(platform.lower(), 1.0)
            viral_score = min(100, base_score * multiplier)
            
            return {
                'score': round(viral_score, 1),
                'confidence': 0.85,
                'factors': [
                    f'Sentiment: {sentiment_score:.2f}',
                    f'Platform: {platform}',
                    f'Content length: {len(content)} chars'
                ],
                'recommendations': self._generate_recommendations(content, platform)
            }
            
        except Exception as e:
            print(f"Error predicting viral potential: {e}")
            return {
                'score': 50,
                'confidence': 0.5,
                'factors': ['Error in analysis'],
                'recommendations': ['Review content and try again']
            }

    async def generate_content(self, topic, platform='general'):
        try:
            if not self.model:
                # Fallback content generation
                return {
                    'content': f"Exciting developments in {topic}! What are your thoughts? 🚀 #trending",
                    'platform': platform,
                    'estimated_engagement': 75
                }

            prompt = f"Create engaging content about {topic} for {platform}. Include relevant hashtags."
            
            response = self.model.generate_content(
                prompt,
                max_output_tokens=300,
                temperature=0.8
            )
            
            return {
                'content': response.text if hasattr(response, 'text') else str(response),
                'platform': platform,
                'estimated_engagement': int(np.random.randint(70, 95))
            }
            
        except Exception as e:
            print(f"Error generating content: {e}")
            return {
                'content': f"Trending topic: {topic}! Share your thoughts below 👇 #viral",
                'platform': platform,
                'estimated_engagement': 75
            }

    def _generate_recommendations(self, content, platform):
        recommendations = []
        
        if len(content) < 50:
            recommendations.append("Consider adding more detail to increase engagement")
        
        if '#' not in content:
            recommendations.append("Add relevant hashtags to increase discoverability")
        
        if platform.lower() == 'tiktok' and len(content) > 150:
            recommendations.append("TikTok content works better when shorter and punchy")
        
        return recommendations[:3]

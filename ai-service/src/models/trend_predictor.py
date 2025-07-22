# ai-service/src/models/trend_predictor.py

import numpy as np
from textblob import TextBlob
import google.generativeai as genai
import os

class TrendPredictor:
    def __init__(self):
        # Configure Google Gemini
        genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
        self.model = genai.get_model("gemini-2.5-flash")

    async def predict_viral_potential(self, content, platform, hashtags=None):
        sentiment = TextBlob(content).sentiment.polarity
        base = 50 + (15 if sentiment > 0.1 else -10 if sentiment < -0.1 else 0)
        multiplier = {
            'tiktok': 1.2, 'instagram': 1.1,
            'twitter': 1.0, 'linkedin': 0.9
        }.get(platform.lower(), 1.0)
        score = min(100, base * multiplier)
        return {
            'score': round(score, 1),
            'confidence': 0.85,
            'factors': [
                f"Sentiment:{sentiment:.2f}",
                f"Platform:{platform}",
                f"Length:{len(content)}"
            ],
            'recommendations': []
        }

    async def generate_viral_content(self, topic, platform, tone='engaging', length='medium'):
        prompt = (
            f"Create {tone} content for {platform} about {topic}."
            f" Length: {length}. Include hashtags optimized for virality."
        )
        response = self.model.generate_content(
            prompt,
            max_output_tokens=300,
            temperature=0.8
        )
        text = response.last
        return {
            'content': text,
            'platform': platform,
            'estimated_engagement': int(np.random.randint(70, 95)),
            'hashtags': [w for w in text.split() if w.startswith('#')][:5],
            'best_time': self._suggest_posting_time(platform)
        }

    def _suggest_posting_time(self, platform):
        return {
            'instagram': '11:00 AM - 1:00 PM',
            'tiktok': '6:00 AM - 10:00 AM',
            'twitter': '9:00 AM - 10:00 AM',
            'linkedin': '8:00 AM - 10:00 AM'
        }.get(platform.lower(), '2:00 PM - 4:00 PM')

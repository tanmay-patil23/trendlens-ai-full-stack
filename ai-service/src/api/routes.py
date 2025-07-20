from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# Import processors
from ..processors.trend_analyzer import TrendAnalyzer
from ..models.trend_predictor import TrendPredictor

# Initialize services
trend_analyzer = TrendAnalyzer()
trend_predictor = TrendPredictor()

class TrendRequest(BaseModel):
    keywords: List[str]
    platform: Optional[str] = "general"
    timeframe: Optional[str] = "24h"

class ViralityRequest(BaseModel):
    content: str
    platform: str
    hashtags: Optional[List[str]] = []

@router.post("/trends/analyze")
async def analyze_trends(request: TrendRequest):
    """Analyze trends for given keywords"""
    try:
        result = await trend_analyzer.analyze_keywords(
            keywords=request.keywords,
            platform=request.platform,
            timeframe=request.timeframe
        )
        return {"success": True, "data": result}
    except Exception as e:
        logger.error(f"Trend analysis error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/predict/virality")
async def predict_virality(request: ViralityRequest):
    """Predict viral potential of content"""
    try:
        result = await trend_predictor.predict_viral_potential(
            content=request.content,
            platform=request.platform,
            hashtags=request.hashtags
        )
        return {"success": True, "data": result}
    except Exception as e:
        logger.error(f"Virality prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

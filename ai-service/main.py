import os
import uvicorn
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import logging
from datetime import datetime

# Import our custom modules
from src.api.routes import router as api_router
from src.processors.trend_analyzer import TrendAnalyzer
from src.processors.viral_predictor import ViralPredictor
from src.models.trend_predictor import TrendPredictor

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="TrendLens AI Service",
    description="Advanced AI service for trend prediction and viral content analysis",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI models
trend_analyzer = TrendAnalyzer()
viral_predictor = ViralPredictor()
trend_predictor = TrendPredictor()

# Pydantic models for request/response
class TrendRequest(BaseModel):
    keywords: List[str]
    platform: Optional[str] = "general"
    timeframe: Optional[str] = "24h"

class ViralityRequest(BaseModel):
    content: str
    platform: str
    hashtags: Optional[List[str]] = []

class ContentGenerationRequest(BaseModel):
    topic: str
    platform: str
    tone: Optional[str] = "engaging"
    length: Optional[str] = "medium"

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "TrendLens AI",
        "version": "1.0.0"
    }

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "🤖 TrendLens AI Service is running!",
        "endpoints": {
            "health": "/health",
            "docs": "/docs",
            "trends": "/api/trends",
            "predict": "/api/predict",
            "generate": "/api/generate"
        }
    }

# Trend analysis endpoint
@app.post("/api/trends/analyze")
async def analyze_trends(request: TrendRequest):
    try:
        logger.info(f"Analyzing trends for keywords: {request.keywords}")

        # Analyze trends using our trend analyzer
        analysis_result = await trend_analyzer.analyze_keywords(
            keywords=request.keywords,
            platform=request.platform,
            timeframe=request.timeframe
        )

        return {
            "success": True,
            "data": analysis_result,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error analyzing trends: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Virality prediction endpoint
@app.post("/api/predict/virality")
async def predict_virality(request: ViralityRequest):
    try:
        logger.info(f"Predicting virality for content on {request.platform}")

        # Predict virality using our viral predictor
        prediction = await viral_predictor.predict_viral_potential(
            content=request.content,
            platform=request.platform,
            hashtags=request.hashtags
        )

        return {
            "success": True,
            "data": {
                "virality_score": prediction.get("score", 0),
                "confidence": prediction.get("confidence", 0),
                "factors": prediction.get("factors", []),
                "recommendations": prediction.get("recommendations", [])
            },
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error predicting virality: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Content generation endpoint
@app.post("/api/generate/content")
async def generate_content(request: ContentGenerationRequest):
    try:
        logger.info(f"Generating content for topic: {request.topic}")

        # Generate content using our AI models
        generated_content = await trend_predictor.generate_viral_content(
            topic=request.topic,
            platform=request.platform,
            tone=request.tone,
            length=request.length
        )

        return {
            "success": True,
            "data": generated_content,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error generating content: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Sentiment analysis endpoint
@app.post("/api/analyze/sentiment")
async def analyze_sentiment(content: str):
    try:
        from src.models.sentiment_analyzer import SentimentAnalyzer

        sentiment_analyzer = SentimentAnalyzer()
        result = sentiment_analyzer.analyze(content)

        return {
            "success": True,
            "data": result,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error analyzing sentiment: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Include API routes
app.include_router(api_router, prefix="/api", tags=["api"])

# Exception handler for HTTPExceptions
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "message": exc.detail,
            "timestamp": datetime.now().isoformat()
        }
    )

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "error": True,
            "message": "Internal server error",
            "timestamp": datetime.now().isoformat()
        }
    )

if __name__ == "__main__":
    # Get configuration from environment
    host = os.getenv("AI_SERVICE_HOST", "0.0.0.0")
    port = int(os.getenv("AI_SERVICE_PORT", "8001"))
    debug = os.getenv("DEBUG", "false").lower() == "true"

    logger.info(f"Starting TrendLens AI Service on {host}:{port}")

    # Run the application
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=debug,
        log_level="info" if not debug else "debug"
    )

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import os
from src.processors.viral_predictor import ViralPredictor

app = FastAPI(title="TrendLens AI Service", version="1.0.0")

# Initialize the viral predictor
predictor = ViralPredictor()

class ContentRequest(BaseModel):
    content: str
    platform: Optional[str] = 'general'

class GenerateRequest(BaseModel):
    topic: str
    platform: Optional[str] = 'general'

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "TrendLens AI"}

@app.post("/api/predict")
async def predict_viral_potential(request: ContentRequest):
    try:
        result = await predictor.predict_viral_potential(
            request.content, 
            request.platform
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate")
async def generate_content(request: GenerateRequest):
    try:
        result = await predictor.generate_content(
            request.topic, 
            request.platform
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

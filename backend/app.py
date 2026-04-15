from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os

app = FastAPI(title="AI Clinical Trial Matcher")

class PatientData(BaseModel):
    age: int
    condition: str
    location: str
    biomarkers: Optional[str] = None

@app.get("/")
def home():
    return {"status": "AI Assistant Backend Active"}

@app.post("/match")
async def match_trials(data: PatientData):
    # Logic for LLM integration or Clinical Reasoning goes here
    # Example logic for demonstration:
    matches = [
        {
            "id": "NCT012345",
            "title": f"Phase III Study for {data.condition}",
            "match_score": 0.95,
            "reasoning": f"Patient's biomarkers align with the inclusion criteria for {data.condition}."
        }
    ]
    return {"matches": matches}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
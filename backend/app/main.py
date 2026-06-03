from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.detector import detect_drowsiness

app = FastAPI(
    title="Driver Drowsiness Detection API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ImageRequest(BaseModel):
    image: str


@app.get("/")
def home():
    return {
        "message": "Driver Drowsiness Detection API"
    }


@app.post("/detect")
def detect(data: ImageRequest):
    return detect_drowsiness(data.image)
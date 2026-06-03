from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from app.detector import detect_drowsiness

app = FastAPI(
    title="Driver Drowsiness Detection API"
)

# Static folder mount karo
app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static"
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
        "message": "Driver Drowsiness Detection API",
        "alarm_sound": "/static/alarm_sound.mp3"
    }


@app.post("/detect")
def detect(data: ImageRequest):
    return detect_drowsiness(data.image)

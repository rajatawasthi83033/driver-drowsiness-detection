from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
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

# Static folder mount
app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static"
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

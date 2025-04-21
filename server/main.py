from typing import List
from fastapi import FastAPI, HTTPException, status, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from time import sleep
from models.models import ChatMessage

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"Hi: Welcome to Quick-Chat Server"}


@app.post(
    "/message",
    status_code=status.HTTP_201_CREATED,
)
async def ai_gen(query: ChatMessage):
    sleep(3)
    return {
        "response": f"⚡Simulated response to [User->{query.user} / Message->{query.message}]"
    }


@app.post(
    "/upload",
    status_code=status.HTTP_201_CREATED,
)
async def upload_file(file: UploadFile):
    """ """
    print(file.filename)
    return file.filename

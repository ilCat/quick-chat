from typing import List
from fastapi import FastAPI, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from time import sleep
from models.models import ChatMessage
from data.mock import src_docs
import fitz

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
async def upload_file(file: UploadFile = File(...)):
    """ """
    contents = await file.read()
    doc = fitz.open(stream=contents, filetype="pdf")
    first_page = doc.load_page(0)
    text = first_page.get_text()
    doc.close()
    return {"extracted_text": text[:500]}


@app.get("/Ref")
async def get_references():
    return src_docs

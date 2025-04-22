from typing import List
from fastapi import FastAPI, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from models.models import ChatMessage, CacheStruct
from data import mock, cache
import fitz
from services.chat_keeper import save_chat, get_chat_history
import asyncio


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


@app.get("/memories/{user_id}")
async def get_history(user_id: str):
    history = await get_chat_history(user_id)
    return {"history": history}


@app.post(
    "/message",
    status_code=status.HTTP_201_CREATED,
)
async def ai_gen(query: ChatMessage):
    cached_response = await read_from_cache(query.message)
    if cached_response:
        await save_chat(query.user, query.message, cached_response)
    else:
        await save_chat(
            query.user,
            query.message,
            f"⚡Simulated response to [User->{query.user} / Message->{query.message}]",
        )
    hist = await get_chat_history(query.user)
    print(hist)
    return {"response": hist[-1]}


# PDF HANDLING
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


# REFERENCE AND SOURCE HANDLING
@app.get("/Ref")
async def get_references():
    return mock.src_docs


# CACHE HANDLING
ai_cache = cache.default_cache.copy()
cache_lock = asyncio.Lock()


@app.get("/cache")
async def read_from_cache(question: str):
    await asyncio.sleep(2)
    async with cache_lock:
        return ai_cache.get(question)


@app.post("/cache")
async def write_to_cache(line: CacheStruct):
    await asyncio.sleep(2)
    async with cache_lock:
        ai_cache[line.question] = line.answer
    return read_from_cache(line.question)

import json
import os

DATA_DIR = "/data/chat_logs"

os.makedirs(DATA_DIR, exist_ok=True)


async def save_chat(user_id: str, user_message: str, ia_message: str):
    path = os.path.join(DATA_DIR, f"{user_id}.json")
    chat = {"owner": "human", "message": user_message}

    # Leer el archivo si existe
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        data = []

    data.append(chat)
    data.append({"owner": "system", "message": ia_message})

    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


async def get_chat_history(user_id: str):
    path = os.path.join(DATA_DIR, f"{user_id}.json")

    if not os.path.exists(path):
        return []  # there is no history

    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data

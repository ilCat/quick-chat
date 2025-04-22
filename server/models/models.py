from typing import Optional
from pydantic import ConfigDict, BaseModel, Field
from pydantic.functional_validators import BeforeValidator

from typing_extensions import Annotated


class ChatMessage(BaseModel):
    user: str
    message: str
    document: bool
    model_config = ConfigDict(
        json_schema_extra={
            "example": {"user": "ALX", "message": "Ciao, come va?", "document": False}
        },
    )


class CacheStruct(BaseModel):
    question: str
    answer: str

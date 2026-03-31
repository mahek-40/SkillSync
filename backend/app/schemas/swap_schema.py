from pydantic import BaseModel
from typing import List, Optional

class SwapCreate(BaseModel):
    requesterId: str
    receiverId: str
    requesterSkills: List[str]
    receiverSkills: List[str]

class SwapUpdate(BaseModel):
    status: str  # pending, accepted, rejected, completed

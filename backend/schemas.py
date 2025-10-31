from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class CoffeeBase(BaseModel):
    name: str = Field(..., max_length=100)
    origin: Optional[str] = None
    roast_level: Optional[str] = Field(None, description="light|medium|dark")
    blend_type: Optional[str] = Field(None, description="single|blend")
    process: Optional[str] = None
    price: Optional[int] = None
    image_url: Optional[str] = None
    description: Optional[str] = None

class CoffeeCreate(CoffeeBase):
    pass

class CoffeeUpdate(BaseModel):
    name: Optional[str] = None
    origin: Optional[str] = None
    roast_level: Optional[str] = None
    blend_type: Optional[str] = None
    process: Optional[str] = None
    price: Optional[int] = None
    image_url: Optional[str] = None
    description: Optional[str] = None

class CoffeeOut(CoffeeBase):
    id: int
    seller_id: int

# ---------- Auth ----------
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=72)
    nickname: str = Field(min_length=1, max_length=100)

class UserOut(BaseModel):
    id: int
    email: EmailStr
    nickname: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
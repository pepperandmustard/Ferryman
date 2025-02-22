from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class FerryBase(BaseModel):
    name: str
    capacity: int
    available: bool = True

class FerryCreate(FerryBase):
    pass

class FerryResponse(FerryBase):
    id: int
    class Config:
        from_attributes = True

class RouteBase(BaseModel):
    source: str
    destination: str
    departure_time: datetime

class RouteCreate(RouteBase):
    ferry_id: int

class RouteResponse(RouteBase):
    id: int
    ferry: FerryResponse
    class Config:
        from_attributes = True

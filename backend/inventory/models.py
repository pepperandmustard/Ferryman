# backend/inventory/models.py

from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
import datetime

# Define the Base class
Base = declarative_base()

class Ferry(Base):
    __tablename__ = "ferries"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    capacity = Column(Integer, nullable=False)
    available = Column(Boolean, default=True)

class Route(Base):
    __tablename__ = "routes"
    id = Column(Integer, primary_key=True, index=True)
    source = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    departure_time = Column(DateTime, default=datetime.datetime.utcnow)
    ferry_id = Column(Integer, ForeignKey("ferries.id"))

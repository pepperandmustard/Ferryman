from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from models import Ferry
import uvicorn

# Create database tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Ferry Inventory Service")

@app.post("/ferries/")
def create_ferry(name: str, capacity: int, db: Session = Depends(get_db)):
    ferry = Ferry(name=name, capacity=capacity)
    db.add(ferry)
    db.commit()
    db.refresh(ferry)
    return ferry

@app.get("/ferries/{ferry_id}")
def read_ferry(ferry_id: int, db: Session = Depends(get_db)):
    ferry = db.query(Ferry).filter(Ferry.id == ferry_id).first()
    if ferry is None:
        raise HTTPException(status_code=404, detail="Ferry not found")
    return ferry

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, crud

router = APIRouter()

@router.post("/", response_model=schemas.FerryResponse)
def add_ferry(ferry: schemas.FerryCreate, db: Session = Depends(get_db)):
    return crud.create_ferry(db, ferry)

@router.get("/{ferry_id}", response_model=schemas.FerryResponse)
def get_ferry(ferry_id: int, db: Session = Depends(get_db)):
    ferry = crud.get_ferry(db, ferry_id)
    if not ferry:
        raise HTTPException(status_code=404, detail="Ferry not found")
    return ferry

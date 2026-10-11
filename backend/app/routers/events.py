from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.database import get_db
from app.models.event import Event
from app.models.user import User
from app.schemas.event import EventCreate, EventUpdate, EventResponse
from app.routers.auth import get_current_user, get_admin_user

router = APIRouter(prefix="/events", tags=["Events"])


@router.get("", response_model=List[EventResponse])
def list_events(
    search: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    upcoming: bool = Query(False),
    db: Session = Depends(get_db),
):
    query = db.query(Event).filter(Event.is_active == True)
    if search:
        query = query.filter(
            Event.title.ilike(f"%{search}%") | Event.description.ilike(f"%{search}%")
        )
    if category:
        query = query.filter(Event.category == category)
    if upcoming:
        query = query.filter(Event.date_time >= datetime.utcnow())
    return query.order_by(Event.date_time).all()


@router.get("/categories/all")
def get_categories(db: Session = Depends(get_db)):
    rows = db.query(Event.category).filter(Event.is_active == True).distinct().all()
    return [r[0] for r in rows]


@router.get("/{event_id}", response_model=EventResponse)
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id, Event.is_active == True).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.post("", response_model=EventResponse, status_code=201)
def create_event(data: EventCreate, db: Session = Depends(get_db), admin: User = Depends(get_admin_user)):
    event = Event(**data.model_dump(), created_by=admin.id)
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


@router.put("/{event_id}", response_model=EventResponse)
def update_event(event_id: int, data: EventUpdate, db: Session = Depends(get_db), admin: User = Depends(get_admin_user)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    for field, val in data.model_dump(exclude_unset=True).items():
        setattr(event, field, val)
    db.commit()
    db.refresh(event)
    return event


@router.delete("/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db), admin: User = Depends(get_admin_user)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    event.is_active = False
    db.commit()
    return {"message": "Event deleted successfully"}

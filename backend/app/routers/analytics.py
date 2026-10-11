from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from app.database import get_db
from app.models.event import Event, Registration
from app.models.user import User
from app.routers.auth import get_admin_user

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/overview")
def overview(db: Session = Depends(get_db), admin: User = Depends(get_admin_user)):
    return {
        "total_events": db.query(Event).filter(Event.is_active == True).count(),
        "total_users": db.query(User).count(),
        "total_registrations": db.query(Registration).filter(Registration.is_active == True).count(),
        "upcoming_events": db.query(Event).filter(
            Event.is_active == True, Event.date_time >= datetime.utcnow()
        ).count(),
    }


@router.get("/events/by-category")
def by_category(db: Session = Depends(get_db), admin: User = Depends(get_admin_user)):
    rows = db.query(Event.category, func.count(Event.id)).filter(
        Event.is_active == True
    ).group_by(Event.category).all()
    return [{"category": r[0], "count": r[1]} for r in rows]


@router.get("/events/capacity")
def capacity_chart(db: Session = Depends(get_db), admin: User = Depends(get_admin_user)):
    events = db.query(Event).filter(Event.is_active == True).all()
    return [
        {
            "title": e.title[:20] + "..." if len(e.title) > 20 else e.title,
            "capacity": e.capacity,
            "registered": e.registered_count,
        }
        for e in events
    ]


@router.get("/registrations/trend")
def trend(db: Session = Depends(get_db), admin: User = Depends(get_admin_user)):
    rows = db.query(
        func.date(Registration.registered_at).label("date"),
        func.count(Registration.id).label("count"),
    ).filter(Registration.is_active == True).group_by(
        func.date(Registration.registered_at)
    ).order_by("date").all()
    return [{"date": str(r[0]), "count": r[1]} for r in rows]

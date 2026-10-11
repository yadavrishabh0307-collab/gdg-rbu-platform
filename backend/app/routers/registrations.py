from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from app.database import get_db
from app.models.event import Event, Registration
from app.models.user import User
from app.schemas.event import RegistrationResponse
from app.routers.auth import get_current_user, get_admin_user
from app.services.qr_service import generate_qr_code
from app.services.email_service import send_registration_confirmation

router = APIRouter(prefix="/registrations", tags=["Registrations"])


@router.post("/{event_id}", response_model=RegistrationResponse, status_code=201)
async def register_for_event(
    event_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    event = db.query(Event).filter(Event.id == event_id, Event.is_active == True).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    existing = db.query(Registration).filter(
        Registration.user_id == current_user.id,
        Registration.event_id == event_id,
    ).first()

    if existing and existing.is_active:
        raise HTTPException(status_code=400, detail="Already registered for this event")

    if event.is_full:
        raise HTTPException(status_code=400, detail="Event is at full capacity")

    qr = generate_qr_code(current_user.id, event_id, current_user.name, event.title)

    if existing and not existing.is_active:
        existing.is_active = True
        existing.qr_code = qr
        existing.registered_at = func.now()
        db.commit()
        db.refresh(existing)
        reg = existing
    else:
        reg = Registration(user_id=current_user.id, event_id=event_id, qr_code=qr)
        db.add(reg)
        db.commit()
        db.refresh(reg)

    background_tasks.add_task(
        send_registration_confirmation,
        current_user.name,
        current_user.email,
        event.title,
        event.date_time.strftime("%d %b %Y, %I:%M %p"),
        event.venue,
    )
    return reg


@router.delete("/{event_id}")
def unregister(event_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    reg = db.query(Registration).filter(
        Registration.user_id == current_user.id,
        Registration.event_id == event_id,
        Registration.is_active == True,
    ).first()
    if not reg:
        raise HTTPException(status_code=404, detail="Registration not found")
    reg.is_active = False
    db.commit()
    return {"message": "Unregistered successfully"}


@router.get("/my/events")
def my_events(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    regs = db.query(Registration).filter(
        Registration.user_id == current_user.id,
        Registration.is_active == True,
    ).all()
    return [
        {
            "registration_id": r.id,
            "registered_at": r.registered_at,
            "qr_code": r.qr_code,
            "event": {
                "id": r.event.id,
                "title": r.event.title,
                "date_time": r.event.date_time,
                "venue": r.event.venue,
                "category": r.event.category,
                "image_url": r.event.image_url,
            },
        }
        for r in regs
    ]


@router.get("/event/{event_id}/attendees")
def event_attendees(event_id: int, db: Session = Depends(get_db), admin: User = Depends(get_admin_user)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    regs = db.query(Registration).filter(Registration.event_id == event_id, Registration.is_active == True).all()
    return [
        {
            "user_id": r.user.id,
            "name": r.user.name,
            "email": r.user.email,
            "registered_at": r.registered_at,
            "qr_code": r.qr_code,
        }
        for r in regs
    ]

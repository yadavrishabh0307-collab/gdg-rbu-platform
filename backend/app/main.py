import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.database import engine, Base
from app.routers import auth, events, registrations, analytics
from app.services.scheduler import start_scheduler, stop_scheduler
import app.models.user   # noqa — registers models with Base
import app.models.event  # noqa

logging.basicConfig(level=logging.INFO)

# Create all DB tables
Base.metadata.create_all(bind=engine)

limiter = Limiter(key_func=get_remote_address, default_limits=["200/minute"])

app = FastAPI(
    title="GDG Event Management API",
    description="Event Management & Registration System — GDG RBU Recruitment 2026-27",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(events.router)
app.include_router(registrations.router)
app.include_router(analytics.router)


@app.on_event("startup")
async def on_startup():
    # Seed default admin if not exists
    from app.database import SessionLocal
    from app.models.user import User
    from app.services.auth_service import get_password_hash

    db = SessionLocal()
    try:
        if not db.query(User).filter(User.email == "admin@gdg.com").first():
            db.add(User(
                name="GDG Admin",
                email="admin@gdg.com",
                hashed_password=get_password_hash("admin123"),
                is_admin=True,
            ))
            db.commit()
            logging.info("Admin user seeded: admin@gdg.com / admin123")

        # Seed sample events
        from app.models.event import Event
        from datetime import datetime, timedelta
        if db.query(Event).count() == 0:
            admin = db.query(User).filter(User.email == "admin@gdg.com").first()
            sample_events = [
                Event(title="Google Cloud Study Jam", description="Hands-on cloud workshop with GCP tools, BigQuery, and App Engine.", date_time=datetime.utcnow() + timedelta(days=3), venue="CS Seminar Hall, RBU", capacity=50, category="Workshop", created_by=admin.id),
                Event(title="Flutter Development Bootcamp", description="Build your first Flutter app from scratch. No experience needed!", date_time=datetime.utcnow() + timedelta(days=7), venue="Main Auditorium, RBU", capacity=100, category="Bootcamp", created_by=admin.id),
                Event(title="AI/ML with TensorFlow", description="Introduction to machine learning using TensorFlow and Google Colab.", date_time=datetime.utcnow() + timedelta(days=10), venue="Lab 3, IT Department", capacity=40, category="Tech Talk", created_by=admin.id),
                Event(title="Open Source Contribution Drive", description="Learn how to contribute to open source projects and build your GitHub profile.", date_time=datetime.utcnow() + timedelta(days=14), venue="Conference Room, RBU", capacity=60, category="Workshop", created_by=admin.id),
                Event(title="DevFest RBU 2026", description="Annual developer festival with talks, workshops, and hackathon.", date_time=datetime.utcnow() + timedelta(days=30), venue="Main Auditorium, RBU", capacity=200, category="Festival", created_by=admin.id),
            ]
            db.add_all(sample_events)
            db.commit()
            logging.info("Sample events seeded")
    finally:
        db.close()

    start_scheduler()


@app.on_event("shutdown")
async def on_shutdown():
    stop_scheduler()


@app.get("/", tags=["Root"])
def root():
    return {
        "message": "GDG Event Management API",
        "docs": "http://localhost:8000/docs",
        "version": "1.0.0",
    }

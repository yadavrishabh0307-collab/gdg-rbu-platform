import logging
from datetime import datetime, timedelta
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

logger = logging.getLogger(__name__)
scheduler = AsyncIOScheduler()


async def send_daily_reminders():
    """Runs daily at 9 AM — emails users about events happening tomorrow."""
    from app.database import SessionLocal
    from app.models.event import Event, Registration
    from app.services.email_service import send_event_reminder

    db = SessionLocal()
    try:
        tomorrow_start = (datetime.utcnow() + timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)
        tomorrow_end = tomorrow_start.replace(hour=23, minute=59, second=59)

        events = db.query(Event).filter(
            Event.date_time >= tomorrow_start,
            Event.date_time <= tomorrow_end,
            Event.is_active == True,
        ).all()

        count = 0
        for event in events:
            for reg in event.registrations:
                if reg.is_active:
                    await send_event_reminder(
                        reg.user.name,
                        reg.user.email,
                        event.title,
                        event.date_time.strftime("%d %b %Y, %I:%M %p"),
                        event.venue,
                    )
                    count += 1

        logger.info(f"Reminder job: sent {count} emails for {len(events)} events")
    except Exception as e:
        logger.error(f"Reminder job failed: {e}")
    finally:
        db.close()


def start_scheduler():
    scheduler.add_job(send_daily_reminders, CronTrigger(hour=9, minute=0), id="daily_reminders")
    scheduler.start()
    logger.info("APScheduler started — daily reminders at 9 AM")


def stop_scheduler():
    if scheduler.running:
        scheduler.shutdown()

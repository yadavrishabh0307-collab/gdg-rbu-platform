import aiosmtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import settings

logger = logging.getLogger(__name__)


async def send_email(to_email: str, subject: str, html_body: str):
    if not settings.SMTP_USER:
        logger.info(f"[EMAIL SKIPPED — no SMTP config] To: {to_email} | Subject: {subject}")
        return
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = settings.FROM_EMAIL
        msg["To"] = to_email
        msg.attach(MIMEText(html_body, "html"))

        await aiosmtplib.send(
            msg,
            hostname=settings.SMTP_HOST,
            port=settings.SMTP_PORT,
            start_tls=True,
            username=settings.SMTP_USER,
            password=settings.SMTP_PASSWORD,
        )
        logger.info(f"Email sent to {to_email}")
    except Exception as e:
        logger.error(f"Email failed: {e}")


async def send_registration_confirmation(user_name: str, user_email: str, event_title: str, event_date: str, event_venue: str):
    body = f"""
    <html><body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px">
      <div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:30px">
        <h2 style="color:#4285f4">🎉 You're Registered!</h2>
        <p>Hi <strong>{user_name}</strong>,</p>
        <p>You've successfully registered for:</p>
        <div style="background:#f0f4ff;border-left:4px solid #4285f4;padding:15px;border-radius:6px;margin:20px 0">
          <h3 style="margin:0;color:#1a1a2e">{event_title}</h3>
          <p style="margin:5px 0;color:#555">📅 {event_date}</p>
          <p style="margin:5px 0;color:#555">📍 {event_venue}</p>
        </div>
        <p>Check your dashboard for your QR code. See you there!</p>
        <p style="color:#888;font-size:12px">GDG RBU — Ramdeobaba University</p>
      </div>
    </body></html>
    """
    await send_email(user_email, f"Registered: {event_title}", body)


async def send_event_reminder(user_name: str, user_email: str, event_title: str, event_date: str, event_venue: str):
    body = f"""
    <html><body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px">
      <div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:30px">
        <h2 style="color:#fbbc04">⏰ Event Tomorrow!</h2>
        <p>Hi <strong>{user_name}</strong>,</p>
        <p>Just a reminder — your event is <strong>tomorrow</strong>!</p>
        <div style="background:#fffbf0;border-left:4px solid #fbbc04;padding:15px;border-radius:6px;margin:20px 0">
          <h3 style="margin:0;color:#1a1a2e">{event_title}</h3>
          <p style="margin:5px 0;color:#555">📅 {event_date}</p>
          <p style="margin:5px 0;color:#555">📍 {event_venue}</p>
        </div>
        <p>Don't forget to bring your QR code from your dashboard!</p>
        <p style="color:#888;font-size:12px">GDG RBU — Ramdeobaba University</p>
      </div>
    </body></html>
    """
    await send_email(user_email, f"Reminder: {event_title} is tomorrow!", body)

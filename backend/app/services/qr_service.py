import qrcode
import io
import base64
import json


def generate_qr_code(user_id: int, event_id: int, user_name: str, event_title: str) -> str:
    """Generate a QR code encoding registration info, return as base64 PNG string."""
    data = json.dumps({
        "user_id": user_id,
        "event_id": event_id,
        "user": user_name,
        "event": event_title
    })

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=8,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="#1a1a2e", back_color="white")
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)

    return base64.b64encode(buffer.getvalue()).decode("utf-8")

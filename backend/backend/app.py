import os
from uuid import UUID

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from postgrest import APIError
from supabase import Client, create_client

load_dotenv()

app = Flask(__name__)

supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_PUBLISHABLE_KEY")
supabase: Client | None = (
    create_client(supabase_url, supabase_key) if supabase_url and supabase_key else None
)


@app.after_request
def add_cors_headers(response):
    """Allow browser clients from any origin to call this API."""
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


def json_error(message: str, status: int):
    return jsonify({"error": message}), status


def valid_uuid(value):
    try:
        return str(UUID(str(value)))
    except (ValueError, TypeError, AttributeError):
        return None


@app.errorhandler(APIError)
def handle_database_error(error):
    app.logger.exception("Supabase request failed")
    return json_error("Database request failed", 500)


@app.get("/")
def index():
    return jsonify({"service": "events API", "status": "ok"})


@app.get("/api/events")
def list_events():
    if supabase is None:
        return json_error("Database is not configured", 500)
    response = supabase.table("events").select("*").execute()
    return jsonify(response.data)


@app.get("/api/events/<event_id>")
def get_event(event_id):
    if supabase is None:
        return json_error("Database is not configured", 500)
    event_id = valid_uuid(event_id)
    if not event_id:
        return json_error("event id must be a UUID", 400)

    response = (
        supabase.table("events").select("*").eq("id", event_id).maybe_single().execute()
    )
    if not response.data:
        return json_error("Event not found", 404)
    return jsonify(response.data)


@app.post("/api/registrations")
def create_registration():
    if supabase is None:
        return json_error("Database is not configured", 500)
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return json_error("Request body must be a JSON object", 400)

    user_id = valid_uuid(payload.get("user_id"))
    event_id = valid_uuid(payload.get("event_id"))
    if not user_id or not event_id:
        return json_error("user_id and event_id must be valid UUIDs", 400)

    event_result = (
        supabase.table("events")
        .select("id, capacity, status")
        .eq("id", event_id)
        .maybe_single()
        .execute()
    )
    event = event_result.data
    if not event:
        return json_error("Event not found", 404)
    if event.get("status") and event["status"].lower() not in ("open", "active"):
        return json_error("Event is not open for registration", 409)

    existing = (
        supabase.table("registrations")
        .select("id")
        .eq("user_id", user_id)
        .eq("event_id", event_id)
        .limit(1)
        .execute()
    )
    if existing.data:
        return json_error("User is already registered for this event", 409)

    capacity = event.get("capacity")
    if capacity is not None:
        count_result = (
            supabase.table("registrations")
            .select("id", count="exact")
            .eq("event_id", event_id)
            .execute()
        )
        if (count_result.count or 0) >= capacity:
            return json_error("Event is at capacity", 409)

    created = (
        supabase.table("registrations")
        .insert({"user_id": user_id, "event_id": event_id})
        .execute()
    )
    registration = created.data[0] if created.data else None
    return jsonify(registration), 201


@app.get("/api/me/registrations")
def my_registrations():
    if supabase is None:
        return json_error("Database is not configured", 500)
    user_id = valid_uuid(request.args.get("user_id"))
    if not user_id:
        return json_error("user_id query parameter must be a valid UUID", 400)

    response = (
        supabase.table("registrations")
        .select("*, events(*)")
        .eq("user_id", user_id)
        .execute()
    )
    return jsonify(response.data)


@app.get("/api/events/<event_id>/registrations")
def event_registrations(event_id):
    if supabase is None:
        return json_error("Database is not configured", 500)
    event_id = valid_uuid(event_id)
    organizer_id = valid_uuid(request.args.get("organizer_id"))
    if not event_id or not organizer_id:
        return json_error(
            "event id and organizer_id query parameter must be valid UUIDs", 400
        )

    event_result = (
        supabase.table("events")
        .select("id, organizer_id")
        .eq("id", event_id)
        .maybe_single()
        .execute()
    )
    event = event_result.data
    if not event:
        return json_error("Event not found", 404)
    if event.get("organizer_id") != organizer_id:
        return json_error("Only the event organizer may view registrations", 403)

    response = (
        supabase.table("registrations")
        .select("*, users(id, email, role)")
        .eq("event_id", event_id)
        .execute()
    )
    return jsonify(response.data)


if __name__ == "__main__":
    app.run(debug=True)

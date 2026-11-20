# CampusPulse frontend

React + Vite frontend styled from `../design/stitch_campus_event_hub`.

## Run locally

```sh
npm install
npm run dev
```

Set `VITE_API_BASE_URL` in `.env.local` to the backend URL. Copy `.env.example` to `.env.local` for local development, then update the URL if your backend runs elsewhere. The frontend calls `GET /api/events` and submits guest registrations to `POST /api/registrations`. A guest UUID is generated locally and persisted in the browser; there is no login or authentication flow.

The Render API currently responds at `/` but `GET /api/events` returns HTTP 500. The frontend shows the service error and provides a retry action; event data will display once the backend's Supabase configuration is healthy.

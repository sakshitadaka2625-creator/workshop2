# CampusPulse frontend

React + Vite frontend styled from `../design/stitch_campus_event_hub`.

## Run locally

```sh
npm install
npm run dev
```

The API base URL is set in `local.env` and mirrored in `.env.local` for Vite. Update both when changing backend environments. The frontend calls `GET /api/events` and submits guest registrations to `POST /api/registrations`. A guest UUID is generated locally and persisted in the browser; there is no login or authentication flow.

The Render API currently responds at `/` but `GET /api/events` returns HTTP 500. The frontend shows the service error and provides a retry action; event data will display once the backend's Supabase configuration is healthy.

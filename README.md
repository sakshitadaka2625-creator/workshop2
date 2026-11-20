# Events API

## Deploy to Render

Create a Render Web Service from this folder (or select `backend` as the service root directory in a larger repository). Render can use `render.yaml` as a Blueprint, or use these settings directly:

- Runtime: Python
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn app:app`

Set these environment variables in the Render service settings:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`

The `.env` file is for local development and is ignored by Git. Do not upload it or commit database credentials.

## Local run

Install dependencies with `pip install -r requirements.txt`, set the two environment variables above (or put them in `.env`), then run `python app.py`.

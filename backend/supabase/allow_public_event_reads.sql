-- The public Flask API uses Supabase's anon role (publishable key).
-- This permits the frontend to list and view public events without login.
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON TABLE public.events TO anon;

-- If Row Level Security is enabled on events, the grant above is not enough.
-- This policy allows public reads while leaving writes restricted.
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS events_public_read ON public.events;
CREATE POLICY events_public_read
  ON public.events
  FOR SELECT
  TO anon
  USING (true);

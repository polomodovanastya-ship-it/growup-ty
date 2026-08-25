CREATE TABLE public.mood_clicks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mood text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT INSERT ON public.mood_clicks TO anon;
GRANT INSERT, SELECT ON public.mood_clicks TO authenticated;
GRANT ALL ON public.mood_clicks TO service_role;
ALTER TABLE public.mood_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can record a mood click" ON public.mood_clicks FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view mood clicks" ON public.mood_clicks FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE INDEX mood_clicks_created_at_idx ON public.mood_clicks (created_at DESC);
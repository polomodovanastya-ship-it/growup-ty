CREATE TABLE public.career_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stage text NOT NULL,
  answers jsonb,
  used_tiebreaker boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.career_results TO anon, authenticated;
GRANT SELECT ON public.career_results TO authenticated;
GRANT ALL ON public.career_results TO service_role;
ALTER TABLE public.career_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can record a career result" ON public.career_results FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view career results" ON public.career_results FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
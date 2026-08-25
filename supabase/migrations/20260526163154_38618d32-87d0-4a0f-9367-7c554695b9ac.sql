
-- ROLES
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

CREATE POLICY "Users see own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ASSESSMENTS
CREATE TABLE public.kidscreen_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT NOT NULL,
  age INTEGER,
  sex TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);
CREATE INDEX idx_assessments_token ON public.kidscreen_assessments(session_token);
GRANT SELECT, INSERT, UPDATE ON public.kidscreen_assessments TO anon, authenticated;
GRANT ALL ON public.kidscreen_assessments TO service_role;
ALTER TABLE public.kidscreen_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert assessment" ON public.kidscreen_assessments
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read own assessment" ON public.kidscreen_assessments
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can update own assessment" ON public.kidscreen_assessments
  FOR UPDATE TO anon, authenticated USING (true);
CREATE POLICY "Admins view all assessments" ON public.kidscreen_assessments
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ANSWERS
CREATE TABLE public.kidscreen_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.kidscreen_assessments(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  answer_value INTEGER NOT NULL CHECK (answer_value BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(assessment_id, question_id)
);
CREATE INDEX idx_answers_assessment ON public.kidscreen_answers(assessment_id);
GRANT SELECT, INSERT ON public.kidscreen_answers TO anon, authenticated;
GRANT ALL ON public.kidscreen_answers TO service_role;
ALTER TABLE public.kidscreen_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone insert answers" ON public.kidscreen_answers
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone read answers" ON public.kidscreen_answers
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins view all answers" ON public.kidscreen_answers
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- SCALE RESULTS
CREATE TABLE public.kidscreen_scale_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.kidscreen_assessments(id) ON DELETE CASCADE,
  scale_id TEXT NOT NULL,
  raw_score NUMERIC NOT NULL,
  t_value NUMERIC NOT NULL,
  level TEXT NOT NULL,
  support_flag BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(assessment_id, scale_id)
);
CREATE INDEX idx_results_assessment ON public.kidscreen_scale_results(assessment_id);
GRANT SELECT, INSERT ON public.kidscreen_scale_results TO anon, authenticated;
GRANT ALL ON public.kidscreen_scale_results TO service_role;
ALTER TABLE public.kidscreen_scale_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone insert results" ON public.kidscreen_scale_results
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone read results" ON public.kidscreen_scale_results
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins view all results" ON public.kidscreen_scale_results
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));


-- Drop overly permissive policies on kidscreen_assessments
DROP POLICY IF EXISTS "Anyone can read own assessment" ON public.kidscreen_assessments;
DROP POLICY IF EXISTS "Anyone can update own assessment" ON public.kidscreen_assessments;
DROP POLICY IF EXISTS "Anyone can insert assessment" ON public.kidscreen_assessments;

-- Drop overly permissive policies on kidscreen_answers
DROP POLICY IF EXISTS "Anyone read answers" ON public.kidscreen_answers;
DROP POLICY IF EXISTS "Anyone insert answers" ON public.kidscreen_answers;

-- Drop overly permissive policies on kidscreen_scale_results
DROP POLICY IF EXISTS "Anyone read results" ON public.kidscreen_scale_results;
DROP POLICY IF EXISTS "Anyone insert results" ON public.kidscreen_scale_results;

-- Revoke direct table grants from anon (writes go through edge function with service_role)
REVOKE ALL ON public.kidscreen_assessments FROM anon;
REVOKE ALL ON public.kidscreen_answers FROM anon;
REVOKE ALL ON public.kidscreen_scale_results FROM anon;

REVOKE INSERT, UPDATE, DELETE ON public.kidscreen_assessments FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.kidscreen_answers FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.kidscreen_scale_results FROM authenticated;

-- Lock down has_role SECURITY DEFINER function — only used internally by RLS policies
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;

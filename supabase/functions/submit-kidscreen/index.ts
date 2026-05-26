import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// === Шкалы (продублировано из src/kidscreen/scales.ts) ===
type ScaleId =
  | "physical" | "psychological" | "moods" | "self_perception" | "autonomy"
  | "parent_relations" | "financial" | "social_support" | "school" | "social_acceptance";

interface ScaleDef { id: ScaleId; name: string; questionIds: string[]; reverseIds: string[]; }

const SCALES: ScaleDef[] = [
  { id: "physical", name: "Физическое благополучие", questionIds: ["h1","h2","h3","h4","h5"], reverseIds: ["h1"] },
  { id: "psychological", name: "Психологическое благополучие", questionIds: ["f1","f2","f3","f4","f5","f6"], reverseIds: [] },
  { id: "moods", name: "Настроение и эмоции", questionIds: ["m1","m2","m3","m4","m5","m6","m7"], reverseIds: ["m1","m2","m3","m4","m5","m6","m7"] },
  { id: "self_perception", name: "Восприятие себя", questionIds: ["s1","s2","s3","s4","s5"], reverseIds: ["s3","s4","s5"] },
  { id: "autonomy", name: "Самостоятельность", questionIds: ["ft1","ft2","ft3","ft4","ft5"], reverseIds: [] },
  { id: "parent_relations", name: "Отношения с родителями и дом", questionIds: ["fa1","fa2","fa3","fa4","fa5","fa6"], reverseIds: [] },
  { id: "financial", name: "Финансовые ресурсы", questionIds: ["mo1","mo2","mo3"], reverseIds: [] },
  { id: "social_support", name: "Друзья и поддержка", questionIds: ["fr1","fr2","fr3","fr4","fr5","fr6"], reverseIds: [] },
  { id: "school", name: "Школьная среда", questionIds: ["sc1","sc2","sc3","sc4","sc5","sc6"], reverseIds: [] },
  { id: "social_acceptance", name: "Социальное принятие", questionIds: ["b1","b2","b3"], reverseIds: ["b1","b2","b3"] },
];

function levelFromT(t: number) {
  if (t < 35) return "low";
  if (t < 50) return "below_avg";
  if (t < 65) return "average";
  return "high";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { session_token, age, sex, answers } = body as {
      session_token: string;
      age?: number;
      sex?: string;
      answers: Record<string, number>;
    };

    if (!session_token || !answers || typeof answers !== "object") {
      return new Response(JSON.stringify({ error: "Bad request" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Валидация значений 1..5
    for (const [k, v] of Object.entries(answers)) {
      if (!Number.isInteger(v) || v < 1 || v > 5) {
        return new Response(JSON.stringify({ error: `Invalid answer for ${k}` }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // 1. Создаём assessment
    const { data: assessment, error: aErr } = await supabase
      .from("kidscreen_assessments")
      .insert({
        session_token,
        age: age ?? null,
        sex: sex ?? null,
        user_agent: req.headers.get("user-agent") ?? null,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (aErr) throw aErr;

    // 2. Сохраняем ответы
    const answerRows = Object.entries(answers).map(([qid, v]) => ({
      assessment_id: assessment.id,
      question_id: qid,
      answer_value: v,
    }));
    const { error: ansErr } = await supabase.from("kidscreen_answers").insert(answerRows);
    if (ansErr) throw ansErr;

    // 3. Считаем результаты по шкалам
    const results = SCALES.map((s) => {
      const values = s.questionIds.map((qid) => {
        const v = answers[qid] ?? 3;
        return s.reverseIds.includes(qid) ? 6 - v : v;
      });
      const raw = values.reduce((a, b) => a + b, 0);
      const n = s.questionIds.length;
      const t = Math.round(((raw - n) / (n * 5 - n)) * 100);
      const level = levelFromT(t);
      return {
        assessment_id: assessment.id,
        scale_id: s.id,
        raw_score: raw,
        t_value: t,
        level,
        support_flag: level === "low",
      };
    });
    const { error: rErr } = await supabase.from("kidscreen_scale_results").insert(results);
    if (rErr) throw rErr;

    return new Response(JSON.stringify({ assessment_id: assessment.id, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("submit-kidscreen error:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

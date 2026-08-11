import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SCALES } from "@/kidscreen/scales";
import {
  Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

const MOOD_LABELS: Record<string, string> = {
  spokoyno: "Спокойно",
  zlyus: "Злюсь",
  plachu: "Плачу",
  lyubov: "Любовь",
  boyus: "Боюсь",
  nichego: "Не чувствую ничего",
};

const STAGE_LABELS: Record<string, string> = {
  search: "SEARCH — нащупать зачем",
  find: "FIND — искать",
  take: "TAKE — пробовать",
  make: "MAKE — собирать своё",
};

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--secondary))",
  "hsl(var(--muted-foreground))",
  "hsl(var(--destructive))",
  "hsl(var(--ring))",
];

interface Props { totalAssessments: number }

const AdminDashboard = ({ totalAssessments }: Props) => {
  const [weekCount, setWeekCount] = useState(0);
  const [byDay, setByDay] = useState<{ day: string; count: number }[]>([]);
  const [scaleStats, setScaleStats] = useState<{ name: string; avgT: number; lowShare: number }[]>([]);
  const [moods, setMoods] = useState<{ name: string; value: number }[]>([]);
  const [careerStages, setCareerStages] = useState<{ name: string; value: number }[]>([]);
  const [careerWeek, setCareerWeek] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const weekAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();

      const [{ data: recent }, { data: results }, { data: clicks }, { data: career }] = await Promise.all([
        supabase.from("kidscreen_assessments").select("created_at").gte("created_at", weekAgo),
        supabase.from("kidscreen_scale_results").select("scale_id, t_value, level"),
        supabase.from("mood_clicks").select("mood"),
        supabase.from("career_results").select("stage, created_at"),
      ]);

      setWeekCount(recent?.length ?? 0);

      const days: { day: string; count: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(Date.now() - i * 24 * 3600 * 1000);
        const key = d.toISOString().slice(0, 10);
        const count = (recent ?? []).filter((r) => (r.created_at as string).slice(0, 10) === key).length;
        days.push({ day: d.toLocaleDateString("ru", { day: "2-digit", month: "2-digit" }), count });
      }
      setByDay(days);

      const grouped: Record<string, { sum: number; n: number; low: number }> = {};
      (results ?? []).forEach((r) => {
        const g = (grouped[r.scale_id] ??= { sum: 0, n: 0, low: 0 });
        g.sum += Number(r.t_value);
        g.n += 1;
        if (r.level === "low" || r.level === "below_avg") g.low += 1;
      });
      setScaleStats(
        Object.entries(grouped)
          .map(([id, g]) => ({
            name: SCALES.find((s) => s.id === id)?.name ?? id,
            avgT: Math.round((g.sum / g.n) * 10) / 10,
            lowShare: Math.round((g.low / g.n) * 100),
          }))
          .sort((a, b) => a.avgT - b.avgT),
      );

      const m: Record<string, number> = {};
      (clicks ?? []).forEach((c) => { m[c.mood] = (m[c.mood] ?? 0) + 1; });
      setMoods(Object.entries(m).map(([k, v]) => ({ name: MOOD_LABELS[k] ?? k, value: v })).sort((a, b) => b.value - a.value));

      const st: Record<string, number> = {};
      (career ?? []).forEach((c) => { st[c.stage] = (st[c.stage] ?? 0) + 1; });
      setCareerStages(
        Object.entries(st)
          .map(([k, v]) => ({ name: STAGE_LABELS[k] ?? k, value: v }))
          .sort((a, b) => b.value - a.value),
      );
      setCareerWeek((career ?? []).filter((c) => (c.created_at as string) >= weekAgo).length);

      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="text-muted-foreground text-sm">Загрузка статистики…</p>;

  const worst = scaleStats[0];

  return (
    <div className="space-y-6 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <p className="text-sm text-muted-foreground">Заполнено за 7 дней</p>
          <p className="text-3xl font-bold mt-1">{weekCount}</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <p className="text-sm text-muted-foreground">Всего прохождений</p>
          <p className="text-3xl font-bold mt-1">{totalAssessments}</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <p className="text-sm text-muted-foreground">Самый проседающий блок</p>
          <p className="text-lg font-semibold mt-1">{worst?.name ?? "—"}</p>
          {worst && (
            <p className="text-xs text-muted-foreground mt-1">
              средний T {worst.avgT} · ниже нормы у {worst.lowShare}%
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <h3 className="font-semibold mb-4">Прохождения по дням (7 дней)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={byDay}>
              <XAxis dataKey="day" fontSize={12} />
              <YAxis allowDecimals={false} fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" name="Прохождений" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <h3 className="font-semibold mb-4">Клики по смайликам на главной</h3>
          {moods.length === 0 ? (
            <p className="text-sm text-muted-foreground">Пока нет данных</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={moods} dataKey="value" nameKey="name" outerRadius={80} label>
                  {moods.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <div className="flex items-baseline justify-between mb-4 gap-4">
          <h3 className="font-semibold">Тест «Выбор профессии»: стадии</h3>
          <p className="text-sm text-muted-foreground">
            всего {careerStages.reduce((a, b) => a + b.value, 0)} · за 7 дней {careerWeek}
          </p>
        </div>
        {careerStages.length === 0 ? (
          <p className="text-sm text-muted-foreground">Пока нет данных</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={careerStages} dataKey="value" nameKey="name" outerRadius={90} label>
                {careerStages.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <h3 className="font-semibold mb-4">Средний T-балл по шкалам (меньше — хуже)</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={scaleStats} layout="vertical" margin={{ left: 120 }}>
            <XAxis type="number" domain={[0, 100]} fontSize={12} />
            <YAxis type="category" dataKey="name" width={140} fontSize={11} />
            <Tooltip />
            <Bar dataKey="avgT" name="Средний T" fill="hsl(var(--accent))" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;

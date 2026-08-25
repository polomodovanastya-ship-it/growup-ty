import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SCALES } from "@/kidscreen/scales";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AGE_LABELS: Record<number, string> = {
  11: "до 12",
  13: "12–14",
  16: "15–17",
  18: "18 и старше",
};

const SEX_LABELS: Record<string, string> = {
  female: "Женский",
  male: "Мужской",
  other: "Другой",
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
  "#94a3b8",
  "#f59e0b",
  "#10b981",
  "#6366f1",
];

const isRiskLevel = (level: string) => level === "low" || level === "below_avg";

const AdminDashboard = () => {
  const [kidscreenTotal, setKidscreenTotal] = useState(0);
  const [careerTotal, setCareerTotal] = useState(0);
  const [ageData, setAgeData] = useState<{ name: string; value: number }[]>([]);
  const [sexData, setSexData] = useState<{ name: string; value: number }[]>([]);
  const [riskZones, setRiskZones] = useState<{ name: string; count: number; share: number }[]>([]);
  const [careerStages, setCareerStages] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: assessments }, { data: scaleResults }, { data: career }] = await Promise.all([
        supabase.from("kidscreen_assessments").select("age, sex").not("completed_at", "is", null),
        supabase.from("kidscreen_scale_results").select("scale_id, level"),
        supabase.from("career_results").select("stage"),
      ]);

      setKidscreenTotal(assessments?.length ?? 0);

      const ages: Record<string, number> = {};
      (assessments ?? []).forEach((a) => {
        if (a.age == null) return;
        const label = AGE_LABELS[a.age] ?? String(a.age);
        ages[label] = (ages[label] ?? 0) + 1;
      });
      setAgeData(
        Object.entries(ages)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value),
      );

      const sexes: Record<string, number> = {};
      (assessments ?? []).forEach((a) => {
        if (!a.sex) return;
        const label = SEX_LABELS[a.sex] ?? a.sex;
        sexes[label] = (sexes[label] ?? 0) + 1;
      });
      setSexData(
        Object.entries(sexes)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value),
      );

      const riskByScale: Record<string, { risk: number; total: number }> = {};
      (scaleResults ?? []).forEach((r) => {
        const g = (riskByScale[r.scale_id] ??= { risk: 0, total: 0 });
        g.total += 1;
        if (isRiskLevel(r.level)) g.risk += 1;
      });
      setRiskZones(
        Object.entries(riskByScale)
          .map(([id, g]) => ({
            name: SCALES.find((s) => s.id === id)?.name ?? id,
            count: g.risk,
            share: g.total ? Math.round((g.risk / g.total) * 100) : 0,
          }))
          .sort((a, b) => b.share - a.share),
      );

      setCareerTotal(career?.length ?? 0);
      const stages: Record<string, number> = {};
      (career ?? []).forEach((c) => {
        stages[c.stage] = (stages[c.stage] ?? 0) + 1;
      });
      setCareerStages(
        Object.entries(stages)
          .map(([k, v]) => ({ name: STAGE_LABELS[k] ?? k, value: v }))
          .sort((a, b) => b.value - a.value),
      );

      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="text-muted-foreground text-sm">Загрузка статистики…</p>;

  const topRisk = riskZones[0];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <p className="text-sm text-muted-foreground">KIDSCREEN — прошли тест</p>
          <p className="text-3xl font-bold mt-1">{kidscreenTotal}</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <p className="text-sm text-muted-foreground">Выбор профессии — прошли тест</p>
          <p className="text-3xl font-bold mt-1">{careerTotal}</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <p className="text-sm text-muted-foreground">Чаще всего в зоне риска</p>
          <p className="text-lg font-semibold mt-1">{topRisk?.name ?? "—"}</p>
          {topRisk && (
            <p className="text-xs text-muted-foreground mt-1">
              {topRisk.share}% прохождений с низким/ниже среднего уровнем
            </p>
          )}
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">KIDSCREEN</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Возраст">
            {ageData.length === 0 ? (
              <EmptyState />
            ) : (
              <PieChartBlock data={ageData} />
            )}
          </ChartCard>
          <ChartCard title="Пол">
            {sexData.length === 0 ? (
              <EmptyState />
            ) : (
              <PieChartBlock data={sexData} />
            )}
          </ChartCard>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <h3 className="font-semibold mb-1">Зоны в рисковых интервалах</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Доля прохождений, где шкала попала в «низкий» или «ниже среднего» уровень
          </p>
          {riskZones.length === 0 ? (
            <EmptyState />
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={riskZones} layout="vertical" margin={{ left: 8, right: 16 }}>
                <XAxis type="number" domain={[0, 100]} unit="%" fontSize={12} />
                <YAxis type="category" dataKey="name" width={160} fontSize={11} />
                <Tooltip
                  formatter={(value: number, _name, item) => [
                    `${value}% (${item.payload.count} из ${kidscreenTotal || "—"})`,
                    "В зоне риска",
                  ]}
                />
                <Bar dataKey="share" name="В зоне риска" fill="hsl(var(--destructive))" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Выбор профессии</h2>
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <h3 className="font-semibold mb-4">Распределение по стадиям</h3>
          {careerStages.length === 0 ? (
            <EmptyState />
          ) : (
            <PieChartBlock data={careerStages} height={280} />
          )}
        </div>
      </section>
    </div>
  );
};

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border/60 bg-card p-5">
    <h3 className="font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const EmptyState = () => <p className="text-sm text-muted-foreground py-8 text-center">Пока нет данных</p>;

const PieChartBlock = ({
  data,
  height = 240,
}: {
  data: { name: string; value: number }[];
  height?: number;
}) => (
  <ResponsiveContainer width="100%" height={height}>
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} label={({ name, percent }) =>
        `${name} (${Math.round(percent * 100)}%)`
      }>
        {data.map((_, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export default AdminDashboard;

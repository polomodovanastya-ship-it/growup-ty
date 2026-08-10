import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ArrowLeft, LogOut } from "lucide-react";
import { SCALES } from "@/kidscreen/scales";
import { INTERPRETATION } from "@/kidscreen/interpretation";

interface Assessment {
  id: string;
  session_token: string;
  age: number | null;
  sex: string | null;
  created_at: string;
  completed_at: string | null;
}

interface ScaleResult {
  scale_id: string;
  raw_score: number;
  t_value: number;
  level: "low" | "below_avg" | "average" | "high";
  support_flag: boolean;
}

interface Answer { question_id: string; answer_value: number }

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [selected, setSelected] = useState<Assessment | null>(null);
  const [results, setResults] = useState<ScaleResult[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login", { replace: true });
        return;
      }
      setUserEmail(session.user.email ?? "");
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const admin = !!roles?.some((r) => r.role === "admin");
      setIsAdmin(admin);
      if (admin) {
        const { data } = await supabase
          .from("kidscreen_assessments")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(200);
        setAssessments((data as Assessment[]) ?? []);
      }
      setLoading(false);
    })();
  }, [navigate]);

  const openDetail = async (a: Assessment) => {
    setSelected(a);
    const [{ data: r }, { data: ans }] = await Promise.all([
      supabase.from("kidscreen_scale_results").select("*").eq("assessment_id", a.id),
      supabase.from("kidscreen_answers").select("question_id, answer_value").eq("assessment_id", a.id),
    ]);
    setResults((r as ScaleResult[]) ?? []);
    setAnswers((ans as Answer[]) ?? []);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  if (loading) return <main className="min-h-screen flex items-center justify-center text-muted-foreground">Загрузка…</main>;

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Нет доступа</h1>
          <p className="text-muted-foreground">
            Аккаунт <span className="text-foreground font-medium">{userEmail}</span> не имеет роли <code>admin</code>.
            Попроси владельца проекта добавить роль в таблице <code>user_roles</code>.
          </p>
          <Button variant="outline" onClick={logout} className="rounded-full"><LogOut size={16} className="mr-2" />Выйти</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              На главную
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">KIDSCREEN — внутренний отчёт</h1>
              <p className="text-sm text-muted-foreground mt-1">{userEmail}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={logout} className="rounded-full">
            <LogOut size={14} className="mr-2" />Выйти
          </Button>
        </header>

        {!selected ? (
          <>
          <AdminDashboard totalAssessments={assessments.length} />
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Session token</TableHead>
                  <TableHead>Возраст</TableHead>
                  <TableHead>Пол</TableHead>
                  <TableHead>Завершено</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessments.length === 0 && (
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Пока нет прохождений</TableCell></TableRow>
                )}
                {assessments.map((a) => (
                  <TableRow key={a.id} className="cursor-pointer" onClick={() => openDetail(a)}>
                    <TableCell>{new Date(a.created_at).toLocaleString("ru")}</TableCell>
                    <TableCell className="font-mono text-xs">{a.session_token.slice(0, 12)}…</TableCell>
                    <TableCell>{a.age ?? "—"}</TableCell>
                    <TableCell>{a.sex ?? "—"}</TableCell>
                    <TableCell>{a.completed_at ? "✓" : "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          </>
        ) : (
          <div className="space-y-6">
            <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>
              <ArrowLeft size={16} className="mr-1" /> Назад к списку
            </Button>
            <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-1">
              <p className="text-sm text-muted-foreground">Прохождение</p>
              <p className="font-mono text-xs">{selected.id}</p>
              <p className="text-sm">{new Date(selected.created_at).toLocaleString("ru")}</p>
            </div>

            <section>
              <h2 className="text-lg font-semibold mb-3">Профиль по шкалам</h2>
              <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Шкала</TableHead>
                      <TableHead>Raw</TableHead>
                      <TableHead>T</TableHead>
                      <TableHead>Уровень</TableHead>
                      <TableHead>Поддержка</TableHead>
                      <TableHead>Интерпретация</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((r) => {
                      const def = SCALES.find((s) => s.id === r.scale_id);
                      const text = def ? INTERPRETATION[def.id][r.level] : "";
                      return (
                        <TableRow key={r.scale_id}>
                          <TableCell className="font-medium">{def?.name ?? r.scale_id}</TableCell>
                          <TableCell>{r.raw_score}</TableCell>
                          <TableCell>{r.t_value}</TableCell>
                          <TableCell>{r.level}</TableCell>
                          <TableCell>{r.support_flag ? "⚠️" : "—"}</TableCell>
                          <TableCell className="text-sm text-muted-foreground max-w-md">{text}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">Ответы ({answers.length})</h2>
              <div className="rounded-2xl border border-border/60 bg-card p-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm font-mono">
                {answers.map((a) => (
                  <div key={a.question_id} className="flex justify-between border-b border-border/30 py-1">
                    <span className="text-muted-foreground">{a.question_id}</span>
                    <span className="font-semibold">{a.answer_value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default Admin;

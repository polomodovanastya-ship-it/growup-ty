import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast({ title: "Пароли не совпадают", variant: "destructive" });
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({ title: "Пароль обновлён", description: "Теперь можно войти в админку." });
      navigate("/admin", { replace: true });
    } catch (err) {
      toast({ title: "Ошибка", description: (err as Error).message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          На главную
        </Link>
        <form onSubmit={submit} className="w-full space-y-5 rounded-2xl border border-border/60 p-6 md:p-8 bg-card">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Новый пароль</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {ready
                ? "Придумай новый пароль для входа в админку"
                : "Открой эту страницу по ссылке из письма для сброса пароля"}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Повтори пароль</Label>
            <Input
              id="confirm"
              type="password"
              required
              minLength={6}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full rounded-full" disabled={busy || !ready}>
            {busy ? "..." : "Сохранить пароль"}
          </Button>
          <Link
            to="/admin/login"
            className="block text-sm text-muted-foreground hover:text-foreground text-center"
          >
            Вернуться ко входу
          </Link>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;

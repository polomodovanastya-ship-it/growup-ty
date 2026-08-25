import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import AdminDashboard from "@/components/AdminDashboard";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");

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
      setIsAdmin(!!roles?.some((r) => r.role === "admin"));
      setLoading(false);
    })();
  }, [navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-muted-foreground">
        Загрузка…
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Нет доступа</h1>
          <p className="text-muted-foreground">
            Аккаунт <span className="text-foreground font-medium">{userEmail}</span> не имеет роли{" "}
            <code>admin</code>. Попроси владельца проекта добавить роль в таблице{" "}
            <code>user_roles</code>.
          </p>
          <Button variant="outline" onClick={logout} className="rounded-full">
            <LogOut size={16} className="mr-2" />
            Выйти
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              На главную
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Дашборд результатов</h1>
              <p className="text-sm text-muted-foreground mt-1">{userEmail}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={logout} className="rounded-full">
            <LogOut size={14} className="mr-2" />
            Выйти
          </Button>
        </header>

        <AdminDashboard />
      </div>
    </main>
  );
};

export default Admin;

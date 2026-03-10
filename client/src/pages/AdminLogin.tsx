import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Verificação simples (em produção, isso seria feito no backend)
    if (username === "@conceitomaribrandao" && password === "262829ma") {
      // Salvar sessão no localStorage
      localStorage.setItem("adminSession", JSON.stringify({
        username,
        loginTime: new Date().toISOString(),
      }));
      toast.success("Login realizado com sucesso!");
      setLocation("/admin/dashboard");
    } else {
      toast.error("Usuário ou senha incorretos");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Painel Administrativo
          </h1>
          <p className="text-muted-foreground">Acesso exclusivo da proprietária</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Usuário
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@conceitomaribrandao"
              disabled={isLoading}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              className="mt-2"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !username || !password}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 mt-6"
          >
            {isLoading ? "Entrando..." : "Entrar no Painel"}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-4">Voltar para</p>
          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            className="w-full"
          >
            Página Inicial
          </Button>
        </div>
      </Card>
    </div>
  );
}

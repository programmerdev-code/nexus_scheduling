import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, LogOut, Trash2, Edit2, Lock, MessageCircle, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "assistant", content: "Olá! Sou a IA assistente do Agendify. Como posso ajudar você hoje?" }
  ]);
  const [aiInput, setAiInput] = useState("");

  const { data: appointments } = trpc.appointments.list.useQuery();
  const deleteAppointment = trpc.appointments.delete.useMutation();
  const updateAppointmentStatus = trpc.appointments.update.useMutation();

  useEffect(() => {
    const session = localStorage.getItem("adminSession");
    if (!session) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    toast.success("Logout realizado com sucesso");
    setLocation("/");
  };

  const handleDeleteAppointment = async (id: number) => {
    if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
      try {
        await deleteAppointment.mutateAsync({ id });
        toast.success("Agendamento cancelado");
      } catch (error) {
        toast.error("Erro ao cancelar agendamento");
      }
    }
  };

  const handleConfirmAppointment = async (id: number) => {
    try {
      await updateAppointmentStatus.mutateAsync({ id, status: "confirmed" });
      toast.success("Agendamento confirmado");
    } catch (error) {
      toast.error("Erro ao confirmar agendamento");
    }
  };

  const handleSendAIMessage = () => {
    if (!aiInput.trim()) return;

    setAiMessages([...aiMessages, { role: "user", content: aiInput }]);

    // Simular resposta da IA
    setTimeout(() => {
      const responses = [
        "Baseado nos dados, você tem mais agendamentos nas terças e quintas à tarde. Sugiro oferecer horários extras nesses dias.",
        "Você teve 5 cancelamentos este mês. Recomendo enviar lembretes 24h antes dos agendamentos.",
        "O procedimento 'Botox' é o mais popular. Considere aumentar os horários disponíveis para este serviço.",
        "Sua taxa de ocupação está em 78%. Excelente desempenho!",
        "Você pode aumentar a receita oferecendo pacotes promocionais para clientes frequentes.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiMessages(prev => [...prev, { role: "assistant", content: randomResponse }]);
    }, 500);

    setAiInput("");
  };

  const filteredAppointments = appointments?.filter((apt: any) => {
    const aptDate = new Date(apt.appointmentDate);
    return (
      aptDate.getDate() === selectedDate.getDate() &&
      aptDate.getMonth() === selectedDate.getMonth() &&
      aptDate.getFullYear() === selectedDate.getFullYear()
    );
  }) || [];

  const stats = {
    total: appointments?.length || 0,
    confirmed: appointments?.filter((a: any) => a.status === "confirmed").length || 0,
    pending: appointments?.filter((a: any) => a.status === "pending").length || 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Painel Administrativo
            </h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Agendamentos</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500 opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmados</p>
                <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500 opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <Lock className="w-8 h-8 text-orange-500 opacity-20" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar & Appointments */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Picker */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Selecione uma Data</h2>
              <Input
                type="date"
                value={selectedDate.toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="w-full"
              />
            </Card>

            {/* Appointments List */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Agendamentos de {selectedDate.toLocaleDateString("pt-BR")}
              </h2>

              {filteredAppointments.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nenhum agendamento para este dia
                </p>
              ) : (
                <div className="space-y-3">
                  {filteredAppointments.map((apt: any) => (
                    <div
                      key={apt.id}
                      className="border border-border rounded-lg p-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{apt.clientName}</h3>
                          <p className="text-sm text-muted-foreground">{apt.clientPhone}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            apt.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : apt.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {apt.status === "confirmed"
                            ? "Confirmado"
                            : apt.status === "cancelled"
                            ? "Cancelado"
                            : "Pendente"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Procedimento:</span>
                          <p className="font-medium">{apt.serviceId}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Horário:</span>
                          <p className="font-medium">
                            {new Date(apt.appointmentDate).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {apt.status !== "confirmed" && (
                          <Button
                            size="sm"
                            onClick={() => handleConfirmAppointment(apt.id)}
                            className="bg-green-600 hover:bg-green-700 text-white flex-1"
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Confirmar
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteAppointment(apt.id)}
                          className="flex-1"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* AI Assistant */}
          <div className="lg:col-span-1">
            <Card className="p-6 h-full flex flex-col bg-gradient-to-br from-purple-50 to-blue-50">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-foreground">IA Assistente</h2>
              </div>

              <div className="flex-1 overflow-y-auto mb-4 space-y-3 max-h-96">
                {aiMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.role === "user"
                          ? "bg-purple-600 text-white"
                          : "bg-white text-foreground border border-border"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSendAIMessage();
                  }}
                  placeholder="Pergunte algo..."
                  className="text-sm"
                />
                <Button
                  size="sm"
                  onClick={handleSendAIMessage}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  →
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

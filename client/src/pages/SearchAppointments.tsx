import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Calendar, Phone, Clock, User, AlertCircle, CheckCircle, Clock3 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function SearchAppointments() {
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(false);
  const [, setLocation] = useLocation();
  const { data: appointments, isLoading, error } = trpc.appointments.getByPhone.useQuery(
    { phone },
    { enabled: searched && phone.length > 0 }
  );

  const handleSearch = () => {
    if (!phone.trim()) {
      toast.error("Digite seu número de telefone");
      return;
    }
    setSearched(true);
  };

  const handleNewBooking = () => {
    setLocation("/booking");
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; label: string; icon: any }> = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pendente", icon: Clock3 },
      confirmed: { color: "bg-green-100 text-green-800", label: "Confirmado", icon: CheckCircle },
      completed: { color: "bg-blue-100 text-blue-800", label: "Realizado", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-800", label: "Cancelado", icon: AlertCircle },
    };
    const config = statusMap[status] || statusMap.pending;
    const Icon = config.icon;
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4" />
        {config.label}
      </div>
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Meus Agendamentos</h1>
          <p className="text-gray-600">Consulte seus agendamentos futuros usando seu número de telefone</p>
        </div>

        {/* Search Card */}
        <Card className="p-6 mb-8 shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Número de Telefone
                </div>
              </label>
              <Input
                type="tel"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? "Buscando..." : "Buscar Agendamentos"}
            </Button>
          </div>
        </Card>

        {/* Results */}
        {searched && (
          <>
            {isLoading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-gray-600 mt-2">Buscando agendamentos...</p>
              </div>
            )}

            {error && (
              <Card className="p-6 bg-red-50 border-red-200">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <div>
                    <h3 className="font-semibold text-red-900">Erro na busca</h3>
                    <p className="text-red-700 text-sm">Não foi possível buscar seus agendamentos. Tente novamente.</p>
                  </div>
                </div>
              </Card>
            )}

            {!isLoading && !error && appointments && appointments.length === 0 && (
              <Card className="p-8 text-center bg-blue-50 border-blue-200">
                <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum agendamento encontrado</h3>
                <p className="text-gray-600 mb-4">Você não possui agendamentos registrados com este número de telefone.</p>
                <Button
                  onClick={handleNewBooking}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Fazer um Novo Agendamento
                </Button>
              </Card>
            )}

            {!isLoading && !error && appointments && appointments.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    {appointments.length} agendamento{appointments.length !== 1 ? "s" : ""} encontrado{appointments.length !== 1 ? "s" : ""}
                  </h2>
                </div>

                {appointments.map((apt: any) => (
                  <Card key={apt.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <User className="w-4 h-4" />
                          <span className="text-sm">Cliente</span>
                        </div>
                        <p className="font-semibold text-gray-900">{apt.clientName}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">Telefone</span>
                        </div>
                        <p className="font-semibold text-gray-900">{apt.clientPhone}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">Data</span>
                        </div>
                        <p className="font-semibold text-gray-900">{formatDate(apt.appointmentDate)}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">Horário</span>
                        </div>
                        <p className="font-semibold text-gray-900">{formatTime(apt.appointmentDate)}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <span className="text-sm">Serviço</span>
                        </div>
                        <p className="font-semibold text-gray-900">{apt.serviceName || "Não especificado"}</p>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600 mb-2">Status</div>
                        {getStatusBadge(apt.status)}
                      </div>
                    </div>
                  </Card>
                ))}

                <Button
                  onClick={handleNewBooking}
                  variant="outline"
                  className="w-full mt-6"
                >
                  Fazer um Novo Agendamento
                </Button>
              </div>
            )}
          </>
        )}

        {/* Help Text */}
        {!searched && (
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2">Como funciona?</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Digite o número de telefone usado no agendamento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Clique em "Buscar Agendamentos"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Veja todos os seus agendamentos futuros e passados</span>
              </li>
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
}

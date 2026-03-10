import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [step, setStep] = useState<"service" | "datetime" | "confirm">("service");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const { data: services } = trpc.services.list.useQuery();
  const { data: appointments } = trpc.appointments.list.useQuery();
  const createAppointment = trpc.appointments.create.useMutation();

  // Gerar horários disponíveis (9h-17h, 30min de intervalo)
  const availableTimes = useMemo(() => {
    const times = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let min = 0; min < 60; min += 30) {
        times.push(`${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
      }
    }
    return times;
  }, []);

  // Verificar se horário está disponível
  const isTimeAvailable = (date: Date, time: string) => {
    if (!appointments) return true;
    const [hour, min] = time.split(":").map(Number);
    const appointmentDateTime = new Date(date);
    appointmentDateTime.setHours(hour, min);

    return !appointments.some((apt: any) => {
      const aptDate = new Date(apt.appointmentDate);
      return (
        aptDate.getDate() === appointmentDateTime.getDate() &&
        aptDate.getMonth() === appointmentDateTime.getMonth() &&
        aptDate.getFullYear() === appointmentDateTime.getFullYear() &&
        aptDate.getHours() === hour &&
        aptDate.getMinutes() === min &&
        apt.status !== "cancelled"
      );
    });
  };

  // Gerar datas disponíveis (próximos 30 dias)
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Sem domingos e sábados
        dates.push(date);
      }
    }
    return dates;
  }, []);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !selectedService || !clientName || !clientPhone) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const [hour, min] = selectedTime.split(":").map(Number);
    const appointmentDateTime = new Date(selectedDate);
    appointmentDateTime.setHours(hour, min);

    try {
      await createAppointment.mutateAsync({
        clientName,
        clientPhone,
        clientEmail,
        serviceId: parseInt(selectedService),
        appointmentDate: appointmentDateTime,
      });

      setBookingSuccess(true);
      toast.success("Agendamento realizado com sucesso!");
      
      // Resetar formulário após 3 segundos
      setTimeout(() => {
        setClientName("");
        setClientPhone("");
        setClientEmail("");
        setSelectedService("");
        setSelectedDate(null);
        setSelectedTime("");
        setStep("service");
        setBookingSuccess(false);
      }, 3000);
    } catch (error) {
      toast.error("Erro ao realizar agendamento");
    }
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Agendamento Confirmado!</h2>
          <p className="text-muted-foreground mb-4">
            Seu agendamento foi realizado com sucesso. Você receberá uma confirmação em breve.
          </p>
          <p className="text-sm text-muted-foreground">
            Redirecionando em alguns segundos...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Agende seu Horário</h1>
          <p className="text-lg text-muted-foreground">
            Escolha o serviço, data e hora que melhor se adequam a você
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between mb-8">
          {["service", "datetime", "confirm"].map((s, idx) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step === s || (step === "datetime" && idx < 1) || (step === "confirm" && idx < 2)
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {idx + 1}
              </div>
              {idx < 2 && (
                <div
                  className={`w-12 h-1 mx-2 ${
                    (step === "datetime" && idx < 1) || (step === "confirm" && idx < 2)
                      ? "bg-primary"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="p-8">
          {/* Step 1: Select Service */}
          {step === "service" && (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-4 block">Selecione o Serviço</Label>
                <div className="grid grid-cols-1 gap-3">
                  {services?.map((service: any) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(String(service.id))}
                      className={`p-4 rounded-lg border-2 transition text-left ${
                        selectedService === String(service.id)
                          ? "border-primary bg-blue-50"
                          : "border-gray-200 hover:border-primary"
                      }`}
                    >
                      <h3 className="font-semibold text-foreground">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                      <p className="text-sm text-primary font-semibold mt-2">
                        {service.duration} min
                        {service.price && ` • R$ ${(service.price / 100).toFixed(2)}`}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setStep("datetime")}
                disabled={!selectedService}
                className="w-full bg-primary text-white hover:bg-blue-700"
              >
                Continuar
              </Button>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === "datetime" && (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-4 block flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Selecione a Data
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {availableDates.map((date) => (
                    <button
                      key={date.toISOString()}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-lg border-2 transition text-center ${
                        selectedDate?.toDateString() === date.toDateString()
                          ? "border-primary bg-blue-50"
                          : "border-gray-200 hover:border-primary"
                      }`}
                    >
                      <p className="text-sm font-semibold">
                        {date.toLocaleDateString("pt-BR", { weekday: "short" })}
                      </p>
                      <p className="text-lg font-bold">{date.getDate()}</p>
                      <p className="text-xs text-muted-foreground">
                        {date.toLocaleDateString("pt-BR", { month: "short" })}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div>
                  <Label className="text-base font-semibold mb-4 block flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Selecione o Horário
                  </Label>
                  <div className="grid grid-cols-4 gap-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        disabled={!isTimeAvailable(selectedDate, time)}
                        className={`p-3 rounded-lg border-2 transition text-center font-semibold ${
                          selectedTime === time
                            ? "border-primary bg-blue-50 text-primary"
                            : isTimeAvailable(selectedDate, time)
                            ? "border-gray-200 hover:border-primary text-foreground"
                            : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep("service")}
                  variant="outline"
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep("confirm")}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 bg-primary text-white hover:bg-blue-700"
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm & Client Info */}
          {step === "confirm" && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Resumo do Agendamento</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Serviço:</span>{" "}
                    <span className="font-semibold">
                      {services?.find((s: any) => String(s.id) === selectedService)?.name}
                    </span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Data:</span>{" "}
                    <span className="font-semibold">
                      {selectedDate?.toLocaleDateString("pt-BR")}
                    </span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Horário:</span>{" "}
                    <span className="font-semibold">{selectedTime}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email (opcional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep("datetime")}
                  variant="outline"
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleBooking}
                  disabled={createAppointment.isPending || !clientName || !clientPhone}
                  className="flex-1 bg-primary text-white hover:bg-blue-700"
                >
                  {createAppointment.isPending ? "Agendando..." : "Confirmar Agendamento"}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

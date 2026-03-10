import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Instagram, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const sendMessage = trpc.contact.send.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      await sendMessage.mutateAsync({
        name,
        email,
        message,
      });

      setSubmitted(true);
      toast.success("Mensagem enviada com sucesso!");

      // Resetar formulário após 3 segundos
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      toast.error("Erro ao enviar mensagem");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Mensagem Enviada!</h2>
          <p className="text-muted-foreground mb-4">
            Obrigado pelo contato. Responderemos em breve.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Entre em Contato</h1>
          <p className="text-lg text-muted-foreground">
            Tem dúvidas? Estamos aqui para ajudar!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Envie uma Mensagem</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  disabled={sendMessage.isPending}
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  disabled={sendMessage.isPending}
                />
              </div>

              <div>
                <Label htmlFor="message">Mensagem *</Label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Sua mensagem aqui..."
                  rows={6}
                  disabled={sendMessage.isPending}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button
                type="submit"
                disabled={sendMessage.isPending || !name || !email || !message}
                className="w-full bg-primary text-white hover:bg-blue-700"
              >
                {sendMessage.isPending ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </Card>

          {/* Contact Info & Instagram */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Informações de Contato</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Telefone</h3>
                    <p className="text-muted-foreground">(11) 99999-9999</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">contato@agendify.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Localização</h3>
                    <p className="text-muted-foreground">São Paulo, SP</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Instagram Button */}
            <Card className="p-8 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mx-auto mb-4">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Siga-nos no Instagram</h3>
                <p className="text-muted-foreground mb-4">@conceitomaribrandao</p>
                <Button
                  onClick={() => window.open("https://instagram.com/conceitomaribrandao", "_blank")}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  Falar pelo Instagram
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Instagram Button */}
      <a
        href="https://instagram.com/conceitomaribrandao"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-40"
        title="Falar pelo Instagram"
      >
        <Instagram className="w-7 h-7" />
      </a>
    </div>
  );
}

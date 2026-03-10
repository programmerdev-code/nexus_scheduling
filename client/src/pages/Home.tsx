import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Calendar, Users, Zap, Bell, BarChart3, ChevronRight, Star, Instagram } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const { user, loading, logout } = useAuth();
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: Calendar,
      title: "Agenda Online",
      description: "Visualize todos os compromissos em um calendário simples e organizado.",
    },
    {
      icon: Users,
      title: "Cadastro de Clientes",
      description: "Guarde informações importantes e histórico de atendimentos.",
    },
    {
      icon: Zap,
      title: "Agendamento Automático",
      description: "Permita que clientes escolham horários disponíveis diretamente pelo link.",
    },
    {
      icon: Bell,
      title: "Lembretes Automáticos",
      description: "Envie notificações automáticas para evitar faltas.",
    },
    {
      icon: BarChart3,
      title: "Relatórios Inteligentes",
      description: "Acompanhe dados e desempenho do seu negócio.",
    },
    {
      icon: CheckCircle2,
      title: "Controle Financeiro",
      description: "Registre pagamentos e acompanhe o faturamento.",
    },
  ];

  const professionals = [
    "Clínicas de Estética",
    "Consultórios Médicos",
    "Psicólogos",
    "Salões de Beleza",
    "Barbearias",
    "Dentistas",
    "Terapeutas",
    "Fotógrafos",
    "Prestadores de Serviço",
  ];

  const testimonials = [
    {
      name: "Ana",
      role: "Esteticista",
      text: "Depois que comecei a usar o sistema, minha agenda ficou muito mais organizada.",
      rating: 5,
    },
    {
      name: "Carlos",
      role: "Barbeiro",
      text: "O agendamento online facilitou muito para meus clientes.",
      rating: 5,
    },
    {
      name: "Marina",
      role: "Dentista",
      text: "Reduzi drasticamente as faltas de pacientes com os lembretes automáticos.",
      rating: 5,
    },
  ];

  const plans = [
    {
      name: "Plano Básico",
      description: "Para profissionais autônomos",
      price: "R$ 49",
      period: "/mês",
      features: ["Até 100 agendamentos/mês", "1 profissional", "Lembretes por email"],
      cta: "Testar grátis por 7 dias",
      highlighted: false,
    },
    {
      name: "Plano Profissional",
      description: "Para empresas em crescimento",
      price: "R$ 149",
      period: "/mês",
      features: ["Até 500 agendamentos/mês", "Até 5 profissionais", "Lembretes SMS", "Relatórios básicos"],
      cta: "Testar grátis por 7 dias",
      highlighted: true,
    },
    {
      name: "Plano Empresarial",
      description: "Para clínicas e equipes maiores",
      price: "Sob demanda",
      period: "",
      features: ["Agendamentos ilimitados", "Profissionais ilimitados", "Lembretes SMS + WhatsApp", "Relatórios avançados", "Suporte prioritário"],
      cta: "Entrar em contato",
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: "O sistema funciona no celular?",
      answer: "Sim, o Agendify funciona perfeitamente em qualquer dispositivo - celular, tablet ou computador.",
    },
    {
      question: "Preciso instalar algo?",
      answer: "Não, o sistema funciona diretamente no navegador. Não é necessário instalar nada.",
    },
    {
      question: "Posso cancelar quando quiser?",
      answer: "Sim, o cancelamento pode ser feito a qualquer momento, sem multas ou taxas de cancelamento.",
    },
    {
      question: "Como funciona o período de teste grátis?",
      answer: "Você tem 7 dias grátis para testar todas as funcionalidades. Não é necessário cartão de crédito.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Agendify
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition">
              Funcionalidades
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition">
              Planos
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">{user.name}</span>
                <Button
                  onClick={() => {
                    logout();
                    setLocation("/");
                  }}
                  variant="outline"
                  size="sm"
                >
                  Sair
                </Button>
              </>
            ) : (
              <Button className="bg-primary text-white hover:bg-blue-700" size="sm">
                Entrar
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                A maneira simples e inteligente de organizar seus atendimentos
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Organize seus horários, gerencie clientes e automatize seus atendimentos com uma plataforma simples, moderna e acessível de qualquer lugar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setLocation("/booking")}
                  className="bg-primary text-white hover:bg-blue-700 px-6 py-3 text-base h-auto inline-flex items-center gap-2"
                >
                  Agendar Horário <ChevronRight className="w-5 h-5" />
                </Button>
                <Button
                  onClick={() => window.open("https://instagram.com/conceitomaribrandao", "_blank")}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 px-6 py-3 text-base h-auto inline-flex items-center gap-2"
                >
                  <Instagram className="w-5 h-5" />
                  Falar no Instagram
                </Button>
              </div>
            </div>
            <div className="slide-in-left">
              <div className="w-full rounded-lg shadow-lg bg-gradient-to-br from-blue-100 to-purple-100 p-8 h-96 flex items-center justify-center">
                <Calendar className="w-32 h-32 text-primary opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Principais funcionalidades
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar seus agendamentos de forma eficiente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="bg-card rounded-lg p-8 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Para quem é o sistema
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              O Agendify é ideal para diversos profissionais e empresas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {professionals.map((prof, idx) => (
              <div
                key={idx}
                className="bg-muted rounded-lg p-6 flex items-center justify-center text-center hover:bg-blue-50 transition"
              >
                <p className="text-lg font-medium text-foreground">{prof}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Como funciona
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Comece a usar o Agendify em 4 passos simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Abrir a agenda", desc: "Acesse o site do Agendify." },
              { step: "2", title: "Escolher horário", desc: "Selecione o serviço e horário disponível." },
              { step: "3", title: "Preencher dados", desc: "Informe seu nome e telefone." },
              { step: "4", title: "Confirmar", desc: "Finalize o agendamento." },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              O que nossos clientes dizem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="bg-card rounded-lg p-8 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Planos simples e transparentes
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Escolha o plano que melhor se adequa ao seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`bg-card rounded-lg p-8 shadow-sm border border-border flex flex-col ${
                  plan.highlighted ? "ring-2 ring-primary md:scale-105" : ""
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-primary text-white text-center py-2 rounded-t-lg -m-8 mb-4 px-8">
                    Mais popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={
                    plan.highlighted
                      ? "bg-primary text-white hover:bg-blue-700 w-full"
                      : "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white w-full"
                  }
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Perguntas frequentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="bg-card rounded-lg border border-border p-6">
                <details className="cursor-pointer">
                  <summary className="flex items-center justify-between font-semibold text-foreground hover:text-primary transition">
                    {faq.question}
                    <span className="text-2xl">+</span>
                  </summary>
                  <p className="text-muted-foreground mt-4">{faq.answer}</p>
                </details>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Organize seus atendimentos e leve seu negócio para o próximo nível
          </h2>
          <Button
            onClick={() => setLocation("/booking")}
            className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg h-auto inline-flex items-center gap-2"
          >
            Agendar Agora <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-xl font-bold">Agendify</span>
              </div>
              <p className="text-gray-400">Seu sistema de agendamento online</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition">Funcionalidades</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Preços</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a onClick={() => setLocation("/contact")} className="hover:text-white transition cursor-pointer">Contato</a></li>
                <li><a href="https://instagram.com/conceitomaribrandao" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Social</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://instagram.com/conceitomaribrandao" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  @conceitomaribrandao
                </a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Agendify. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

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

import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Store,
  Clock,
  Link as LinkIcon,
  Bell,
  CreditCard,
  Shield,
  ChevronRight,
} from "lucide-react";

const settingsSections = [
  {
    id: "business",
    title: "Dados da Barbearia",
    description: "Nome, endereço e informações de contato",
    icon: Store,
  },
  {
    id: "hours",
    title: "Horário de Funcionamento",
    description: "Configure os dias e horários de atendimento",
    icon: Clock,
  },
  {
    id: "booking",
    title: "Link de Agendamento",
    description: "Personalize o link público para seus clientes",
    icon: LinkIcon,
  },
  {
    id: "notifications",
    title: "Notificações",
    description: "Configure lembretes e alertas automáticos",
    icon: Bell,
  },
  {
    id: "payments",
    title: "Pagamentos e Comissões",
    description: "Métodos de pagamento e regras de comissão",
    icon: CreditCard,
  },
  {
    id: "security",
    title: "Segurança",
    description: "Altere sua senha e configurações de acesso",
    icon: Shield,
  },
];

export default function Configuracoes() {
  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Configurações</h1>
          <p className="page-subtitle">Gerencie as configurações da sua barbearia</p>
        </div>

        {/* Settings Grid */}
        <div className="space-y-4 max-w-3xl">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              className="w-full stat-card flex items-center gap-4 text-left hover:border-accent/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <section.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Danger Zone */}
        <div className="mt-12 max-w-3xl">
          <h2 className="text-lg font-semibold text-foreground mb-4">Zona de Perigo</h2>
          <div className="stat-card border-destructive/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Encerrar Conta</h3>
                <p className="text-sm text-muted-foreground">
                  Esta ação é irreversível e excluirá todos os seus dados.
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Excluir Conta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Plus,
  MoreVertical,
  Calendar,
  DollarSign,
  Star,
  Clock,
} from "lucide-react";

const barbers = [
  {
    id: 1,
    name: "João Pedro",
    phone: "(11) 99999-1234",
    email: "joao@barbearia.com",
    avatar: null,
    status: "active",
    appointmentsToday: 8,
    appointmentsMonth: 145,
    revenue: 5250,
    rating: 4.9,
    services: ["Corte", "Barba", "Sobrancelha"],
    schedule: "Seg-Sáb: 09:00 - 19:00",
  },
  {
    id: 2,
    name: "Lucas Mendes",
    phone: "(11) 99999-5678",
    email: "lucas@barbearia.com",
    avatar: null,
    status: "active",
    appointmentsToday: 6,
    appointmentsMonth: 128,
    revenue: 4680,
    rating: 4.7,
    services: ["Corte", "Degradê", "Coloração"],
    schedule: "Ter-Sáb: 08:00 - 18:00",
  },
  {
    id: 3,
    name: "Rafael Costa",
    phone: "(11) 99999-9012",
    email: "rafael@barbearia.com",
    avatar: null,
    status: "break",
    appointmentsToday: 0,
    appointmentsMonth: 98,
    revenue: 3420,
    rating: 4.8,
    services: ["Corte", "Barba", "Relaxamento"],
    schedule: "Seg-Sex: 10:00 - 20:00",
  },
];

const statusMap = {
  active: { label: "Ativo", className: "badge-success" },
  break: { label: "Intervalo", className: "badge-warning" },
  offline: { label: "Offline", className: "bg-muted text-muted-foreground border border-border px-2.5 py-0.5 rounded-full text-xs font-medium" },
};

export default function Barbeiros() {
  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="page-header mb-0">
            <h1 className="page-title">Barbeiros</h1>
            <p className="page-subtitle">Gerencie sua equipe de profissionais</p>
          </div>
          <Button className="btn-accent w-fit">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Barbeiro
          </Button>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {barbers.map((barber) => (
            <div key={barber.id} className="stat-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-semibold text-primary">
                      {barber.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{barber.name}</h3>
                    <p className="text-sm text-muted-foreground">{barber.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={statusMap[barber.status as keyof typeof statusMap].className}>
                    {statusMap[barber.status as keyof typeof statusMap].label}
                  </span>
                  <button className="p-1 rounded hover:bg-muted transition-colors">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Services */}
              <div className="flex flex-wrap gap-2 mb-4">
                {barber.services.map((service) => (
                  <span
                    key={service}
                    className="px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-muted-foreground"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{barber.appointmentsToday}</p>
                    <p className="text-xs text-muted-foreground">Hoje</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-success" />
                  <div>
                    <p className="text-sm font-medium text-foreground">R$ {barber.revenue.toLocaleString("pt-BR")}</p>
                    <p className="text-xs text-muted-foreground">Este mês</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-warning" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{barber.rating}</p>
                    <p className="text-xs text-muted-foreground">Avaliação</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{barber.appointmentsMonth}</p>
                    <p className="text-xs text-muted-foreground">Atendimentos/mês</p>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {barber.schedule}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

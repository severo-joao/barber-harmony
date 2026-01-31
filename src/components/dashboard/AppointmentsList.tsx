import { Clock, User, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";

const appointments = [
  {
    id: 1,
    client: "Carlos Silva",
    service: "Corte + Barba",
    barber: "João Pedro",
    time: "09:00",
    status: "confirmed",
    price: 75,
  },
  {
    id: 2,
    client: "André Santos",
    service: "Corte Degradê",
    barber: "Lucas Mendes",
    time: "09:30",
    status: "confirmed",
    price: 45,
  },
  {
    id: 3,
    client: "Roberto Lima",
    service: "Barba",
    barber: "João Pedro",
    time: "10:00",
    status: "pending",
    price: 35,
  },
  {
    id: 4,
    client: "Fernando Costa",
    service: "Corte Simples",
    barber: "Lucas Mendes",
    time: "10:30",
    status: "confirmed",
    price: 35,
  },
  {
    id: 5,
    client: "Marcelo Dias",
    service: "Corte + Sobrancelha",
    barber: "João Pedro",
    time: "11:00",
    status: "pending",
    price: 55,
  },
];

const statusMap = {
  confirmed: { label: "Confirmado", className: "badge-success" },
  pending: { label: "Pendente", className: "badge-warning" },
  cancelled: { label: "Cancelado", className: "bg-destructive/10 text-destructive border border-destructive/20 px-2.5 py-0.5 rounded-full text-xs font-medium" },
};

export function AppointmentsList() {
  return (
    <div className="stat-card animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Próximos Agendamentos</h3>
          <p className="text-sm text-muted-foreground">Agenda de hoje</p>
        </div>
        <button className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
          Ver todos
        </button>
      </div>
      <div className="space-y-3">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-foreground">{appointment.time}</span>
                <span className={cn(statusMap[appointment.status as keyof typeof statusMap].className)}>
                  {statusMap[appointment.status as keyof typeof statusMap].label}
                </span>
              </div>
              <p className="text-sm text-foreground truncate">{appointment.client}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Scissors className="w-3 h-3" />
                  {appointment.service}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {appointment.barber}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">
                R$ {appointment.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Scissors,
  Phone,
  MoreVertical,
} from "lucide-react";

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
];

const barbers = [
  { id: 1, name: "João Pedro", color: "bg-accent" },
  { id: 2, name: "Lucas Mendes", color: "bg-info" },
  { id: 3, name: "Rafael Costa", color: "bg-warning" },
];

const appointments = [
  { id: 1, time: "09:00", duration: 60, client: "Carlos Silva", service: "Corte + Barba", barberId: 1, phone: "(11) 99999-1234" },
  { id: 2, time: "09:30", duration: 30, client: "André Santos", service: "Corte Degradê", barberId: 2, phone: "(11) 99999-5678" },
  { id: 3, time: "10:00", duration: 30, client: "Roberto Lima", service: "Barba", barberId: 1, phone: "(11) 99999-9012" },
  { id: 4, time: "11:00", duration: 45, client: "Fernando Costa", service: "Corte + Sobrancelha", barberId: 3, phone: "(11) 99999-3456" },
  { id: 5, time: "14:00", duration: 60, client: "Marcelo Dias", service: "Corte + Barba", barberId: 2, phone: "(11) 99999-7890" },
];

export default function Agendamentos() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const getAppointmentForSlot = (time: string, barberId: number) => {
    return appointments.find(
      (apt) => apt.time === time && apt.barberId === barberId
    );
  };

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="page-header mb-0">
            <h1 className="page-title">Agendamentos</h1>
            <p className="page-subtitle">Gerencie sua agenda de atendimentos</p>
          </div>
          <Button className="btn-accent w-fit">
            <Plus className="w-4 h-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>

        {/* Date Navigation */}
        <div className="stat-card mb-6">
          <div className="flex items-center justify-between">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors">
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="text-lg font-medium capitalize">{formatDate(selectedDate)}</span>
            </div>
            <button className="p-2 rounded-lg hover:bg-muted transition-colors">
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="stat-card overflow-hidden">
          {/* Barber Headers */}
          <div className="grid grid-cols-[80px_repeat(3,1fr)] gap-2 mb-4 pb-4 border-b border-border">
            <div className="text-sm font-medium text-muted-foreground">Horário</div>
            {barbers.map((barber) => (
              <div key={barber.id} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${barber.color}`} />
                <span className="text-sm font-medium text-foreground">{barber.name}</span>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="space-y-1 max-h-[600px] overflow-y-auto scrollbar-thin">
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-[80px_repeat(3,1fr)] gap-2">
                <div className="text-sm text-muted-foreground py-3 font-medium">
                  {time}
                </div>
                {barbers.map((barber) => {
                  const appointment = getAppointmentForSlot(time, barber.id);
                  if (appointment) {
                    return (
                      <div
                        key={`${time}-${barber.id}`}
                        className={`${barber.color}/10 border-l-4 ${barber.color} rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-foreground text-sm">{appointment.client}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Scissors className="w-3 h-3" />
                              {appointment.service}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" />
                              {appointment.phone}
                            </p>
                          </div>
                          <button className="p-1 rounded hover:bg-background/50 transition-colors">
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={`${time}-${barber.id}`}
                      className="rounded-lg border border-dashed border-border hover:border-accent hover:bg-accent/5 transition-colors cursor-pointer min-h-[52px] flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4 text-muted-foreground" />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

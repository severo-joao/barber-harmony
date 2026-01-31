import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { AppointmentsList } from "@/components/dashboard/AppointmentsList";
import { TopServices } from "@/components/dashboard/TopServices";
import {
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Bom dia! 👋</h1>
          <p className="page-subtitle">
            Agenda organizada para hoje. Você tem <span className="font-medium text-foreground">12 atendimentos</span> confirmados.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Faturamento Hoje"
            value="R$ 1.250,00"
            subtitle="Meta: R$ 2.000"
            icon={<DollarSign className="w-6 h-6" />}
            variant="success"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Agendamentos"
            value="12"
            subtitle="3 pendentes"
            icon={<Calendar className="w-6 h-6" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Clientes Atendidos"
            value="8"
            subtitle="4 novos este mês"
            icon={<Users className="w-6 h-6" />}
          />
          <StatCard
            title="Taxa de Ocupação"
            value="78%"
            subtitle="Acima da média"
            icon={<TrendingUp className="w-6 h-6" />}
            variant="accent"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart />
          <TopServices />
        </div>

        {/* Appointments */}
        <div className="grid grid-cols-1 gap-6">
          <AppointmentsList />
        </div>
      </div>
    </MainLayout>
  );
}

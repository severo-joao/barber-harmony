import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  Trophy,
  Gift,
  Users,
  TrendingUp,
  Star,
  Award,
} from "lucide-react";

const topClients = [
  { id: 1, name: "Roberto Lima", phone: "(11) 99999-9012", points: 320, visits: 32 },
  { id: 2, name: "Carlos Silva", phone: "(11) 99999-1234", points: 240, visits: 24 },
  { id: 3, name: "André Santos", phone: "(11) 99999-5678", points: 180, visits: 18 },
  { id: 4, name: "Marcelo Dias", phone: "(11) 99999-7890", points: 150, visits: 15 },
  { id: 5, name: "Fernando Costa", phone: "(11) 99999-3456", points: 80, visits: 8 },
];

const rewards = [
  { id: 1, name: "Corte Grátis", points: 100, icon: "✂️", redeemed: 45 },
  { id: 2, name: "Barba Grátis", points: 80, icon: "🧔", redeemed: 32 },
  { id: 3, name: "Produto Grátis", points: 150, icon: "🧴", redeemed: 18 },
  { id: 4, name: "Combo Completo", points: 200, icon: "🎁", redeemed: 12 },
];

export default function Fidelidade() {
  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Programa de Fidelidade</h1>
          <p className="page-subtitle">
            Seu cliente volta mais quando se sente lembrado
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Clientes Ativos"
            value="248"
            subtitle="Com pontos acumulados"
            icon={<Users className="w-6 h-6" />}
          />
          <StatCard
            title="Pontos Distribuídos"
            value="12.450"
            subtitle="Este mês"
            icon={<Trophy className="w-6 h-6" />}
            variant="accent"
          />
          <StatCard
            title="Recompensas Resgatadas"
            value="87"
            subtitle="Este mês"
            icon={<Gift className="w-6 h-6" />}
            variant="success"
          />
          <StatCard
            title="Taxa de Retorno"
            value="68%"
            subtitle="+5% vs mês passado"
            icon={<TrendingUp className="w-6 h-6" />}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Clients */}
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-warning" />
              <h3 className="text-lg font-semibold text-foreground">Top Clientes</h3>
            </div>
            <div className="space-y-4">
              {topClients.map((client, index) => (
                <div
                  key={client.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-warning">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning" />
                      {client.points}
                    </p>
                    <p className="text-xs text-muted-foreground">{client.visits} visitas</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards */}
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-6">
              <Gift className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Recompensas Disponíveis</h3>
            </div>
            <div className="space-y-4">
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                    {reward.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{reward.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {reward.redeemed} resgates este mês
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent/10 text-accent rounded-lg font-semibold text-sm">
                      <Trophy className="w-4 h-4" />
                      {reward.points} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

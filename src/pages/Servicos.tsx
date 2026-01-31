import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Plus,
  MoreVertical,
  Clock,
  DollarSign,
  Percent,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    id: 1,
    name: "Corte Simples",
    description: "Corte tradicional com máquina e tesoura",
    price: 35,
    duration: 30,
    commission: 40,
    monthlyCount: 145,
    revenue: 5075,
    category: "corte",
  },
  {
    id: 2,
    name: "Corte + Barba",
    description: "Corte completo com barba aparada e navalha",
    price: 75,
    duration: 60,
    commission: 45,
    monthlyCount: 98,
    revenue: 7350,
    category: "combo",
  },
  {
    id: 3,
    name: "Degradê",
    description: "Corte degradê estilo americano",
    price: 45,
    duration: 45,
    commission: 40,
    monthlyCount: 87,
    revenue: 3915,
    category: "corte",
  },
  {
    id: 4,
    name: "Barba",
    description: "Barba com toalha quente e navalha",
    price: 35,
    duration: 30,
    commission: 40,
    monthlyCount: 65,
    revenue: 2275,
    category: "barba",
  },
  {
    id: 5,
    name: "Sobrancelha",
    description: "Design de sobrancelha masculina",
    price: 15,
    duration: 15,
    commission: 35,
    monthlyCount: 42,
    revenue: 630,
    category: "adicional",
  },
  {
    id: 6,
    name: "Coloração",
    description: "Coloração ou descoloração completa",
    price: 120,
    duration: 90,
    commission: 50,
    monthlyCount: 18,
    revenue: 2160,
    category: "tratamento",
  },
];

const categoryColors = {
  corte: "bg-primary/10 text-primary border-primary/20",
  combo: "bg-accent/10 text-accent border-accent/20",
  barba: "bg-info/10 text-info border-info/20",
  adicional: "bg-warning/10 text-warning border-warning/20",
  tratamento: "bg-chart-4/10 text-chart-4 border-chart-4/20",
};

export default function Servicos() {
  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="page-header mb-0">
            <h1 className="page-title">Serviços</h1>
            <p className="page-subtitle">Gerencie seus serviços e preços</p>
          </div>
          <Button className="btn-accent w-fit">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Serviço
          </Button>
        </div>

        {/* Services Table */}
        <div className="stat-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Serviço</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Categoria</th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">Preço</th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">Duração</th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">Comissão</th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">Este mês</th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">Receita</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="table-row">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-foreground">{service.name}</p>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${categoryColors[service.category as keyof typeof categoryColors]}`}>
                        {service.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-success" />
                        <span className="font-medium text-foreground">R$ {service.price.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-foreground">{service.duration} min</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Percent className="w-3.5 h-3.5 text-accent" />
                        <span className="text-foreground">{service.commission}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-info" />
                        <span className="font-medium text-foreground">{service.monthlyCount}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-semibold text-success">
                        R$ {service.revenue.toLocaleString("pt-BR")}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-1.5 rounded hover:bg-muted transition-colors">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

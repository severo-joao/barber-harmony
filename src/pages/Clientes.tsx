import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  Phone,
  Calendar,
  DollarSign,
  Trophy,
  MoreVertical,
  User,
} from "lucide-react";

const clients = [
  {
    id: 1,
    name: "Carlos Silva",
    phone: "(11) 99999-1234",
    lastVisit: "2024-01-15",
    visits: 24,
    totalSpent: 1850,
    points: 240,
    favoriteBarber: "João Pedro",
    favoriteService: "Corte + Barba",
  },
  {
    id: 2,
    name: "André Santos",
    phone: "(11) 99999-5678",
    lastVisit: "2024-01-14",
    visits: 18,
    totalSpent: 1420,
    points: 180,
    favoriteBarber: "Lucas Mendes",
    favoriteService: "Degradê",
  },
  {
    id: 3,
    name: "Roberto Lima",
    phone: "(11) 99999-9012",
    lastVisit: "2024-01-12",
    visits: 32,
    totalSpent: 2480,
    points: 320,
    favoriteBarber: "João Pedro",
    favoriteService: "Barba",
  },
  {
    id: 4,
    name: "Fernando Costa",
    phone: "(11) 99999-3456",
    lastVisit: "2024-01-10",
    visits: 8,
    totalSpent: 640,
    points: 80,
    favoriteBarber: "Rafael Costa",
    favoriteService: "Corte Simples",
  },
  {
    id: 5,
    name: "Marcelo Dias",
    phone: "(11) 99999-7890",
    lastVisit: "2024-01-08",
    visits: 15,
    totalSpent: 1125,
    points: 150,
    favoriteBarber: "Lucas Mendes",
    favoriteService: "Corte + Barba",
  },
];

export default function Clientes() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="page-header mb-0">
            <h1 className="page-title">Clientes</h1>
            <p className="page-subtitle">Histórico e relacionamento com clientes</p>
          </div>
          <Button className="btn-accent w-fit">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Cliente
          </Button>
        </div>

        {/* Search */}
        <div className="stat-card mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome ou telefone..."
              className="input-field pl-12"
            />
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div key={client.id} className="stat-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{client.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {client.phone}
                    </p>
                  </div>
                </div>
                <button className="p-1 rounded hover:bg-muted transition-colors">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Favorite Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Barbeiro favorito</span>
                  <span className="font-medium text-foreground">{client.favoriteBarber}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Serviço favorito</span>
                  <span className="font-medium text-foreground">{client.favoriteService}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-2 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-info" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{client.visits}</p>
                  <p className="text-xs text-muted-foreground">Visitas</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-success" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">R$ {client.totalSpent}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Trophy className="w-3.5 h-3.5 text-warning" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{client.points}</p>
                  <p className="text-xs text-muted-foreground">Pontos</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{formatDate(client.lastVisit)}</p>
                  <p className="text-xs text-muted-foreground">Última</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

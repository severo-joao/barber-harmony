import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Seg", revenue: 1200, appointments: 8 },
  { name: "Ter", revenue: 1800, appointments: 12 },
  { name: "Qua", revenue: 1500, appointments: 10 },
  { name: "Qui", revenue: 2200, appointments: 15 },
  { name: "Sex", revenue: 2800, appointments: 18 },
  { name: "Sáb", revenue: 3500, appointments: 22 },
  { name: "Dom", revenue: 800, appointments: 5 },
];

export function RevenueChart() {
  return (
    <div className="stat-card animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Faturamento Semanal</h3>
        <p className="text-sm text-muted-foreground">Receita dos últimos 7 dias</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160 45% 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(160 45% 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 15% 88%)" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220 10% 45%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220 10% 45%)", fontSize: 12 }}
              tickFormatter={(value) => `R$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0 0% 100%)",
                border: "1px solid hsl(210 15% 88%)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px hsl(220 30% 15% / 0.08)",
              }}
              formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Receita"]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(160 45% 45%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

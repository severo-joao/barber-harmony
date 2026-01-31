import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Corte Simples", count: 45, revenue: 1575 },
  { name: "Corte + Barba", count: 38, revenue: 2850 },
  { name: "Degradê", count: 32, revenue: 1440 },
  { name: "Barba", count: 28, revenue: 980 },
  { name: "Sobrancelha", count: 22, revenue: 330 },
];

export function TopServices() {
  return (
    <div className="stat-card animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Serviços Mais Contratados</h3>
        <p className="text-sm text-muted-foreground">Este mês</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 15% 88%)" horizontal={true} vertical={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220 10% 45%)", fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220 10% 45%)", fontSize: 12 }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0 0% 100%)",
                border: "1px solid hsl(210 15% 88%)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px hsl(220 30% 15% / 0.08)",
              }}
              formatter={(value: number, name: string) => {
                if (name === "count") return [value, "Atendimentos"];
                return [`R$ ${value.toLocaleString("pt-BR")}`, "Receita"];
              }}
            />
            <Bar dataKey="count" fill="hsl(220 25% 20%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

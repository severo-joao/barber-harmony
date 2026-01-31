import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Agendamentos from "./pages/Agendamentos";
import Barbeiros from "./pages/Barbeiros";
import Servicos from "./pages/Servicos";
import Clientes from "./pages/Clientes";
import Fidelidade from "./pages/Fidelidade";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/barbeiros" element={<Barbeiros />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/fidelidade" element={<Fidelidade />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

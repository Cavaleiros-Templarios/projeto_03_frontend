import React, { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Line, Legend, Area,
  ComposedChart, CartesianGrid
} from "recharts";

export interface Cliente {
  id: number | undefined;
  nome: string;
  email: string;
  telefone?: string;
  oportunidade?: Oportunidade[] | null;
}

export interface Oportunidade {
  id: number;
  titulo: string;
  status: "Aberta" | "Fechada" | "Perdida";
  valor: number;
  data_abertura: string;
  data_fechamento: string;
  cliente: Cliente | null;
  usuario: Usuario | null;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

const COLORS = {
  primary: "#1E9FFF",
  primaryHover: "#1A8CDD",
  background: "#f3f4f6",
  cardBackground: "#f9fafb",
  tooltipBackground: "#f8fafc",
  accent1: "#2563EB",
  accent2: "#3B82F6",
  accent3: "#60A5FA",
  accent4: "#93C5FD",
  accent5: "#BFDBFE",
  accent6: "#DBEAFE",
  success: "#22C55E",
  warning: "#D97706",
};

const CHART_COLORS = [
  COLORS.primary, COLORS.accent1, COLORS.accent2, COLORS.accent3,
  COLORS.accent4, COLORS.accent5, COLORS.accent6, COLORS.success
];

type IconType = 'users' | 'building' | 'dollar' | 'target' | 'trending' | 'calendar' | 'chart' | 'pie' | 'activity' | 'briefcase' | 'star';

const Icon: React.FC<{ type: IconType; className?: string; style?: React.CSSProperties }> = ({ type, className = "w-6 h-6", style }) => {
  const icons: Record<IconType, JSX.Element> = {
    users: <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>,
    building: <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/></svg>,
    dollar: <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/></svg>,
    target: <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/></svg>,
    trending: <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/></svg>,
    calendar: <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/></svg>,
    chart: <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>,
    pie: <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/></svg>,
    activity: <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>,
    briefcase: <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-1a1 1 0 00-1 1v1h2V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>,
    star: <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
  };
  return icons[type] || <div />;
};

interface StatCardProps { title: string; value: string | number; icon: IconType; trend?: { value: string; isPositive: boolean; }; color: string; delay?: number; }
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color, delay = 0 }) => (
  <div className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-l-4 group bg-gray-50" style={{ borderLeftColor: color, animationDelay: `${delay}ms` }}>
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 mb-2 group-hover:text-gray-700">{title}</p>
        <p className="text-3xl font-bold mb-2" style={{ color }}>{value}</p>
        {trend && <div className={`flex items-center text-sm font-medium ${trend.isPositive ? 'text-green-500' : 'text-yellow-600'}`}><span className="mr-1">{trend.isPositive ? '↗️' : '↘️'}</span>{trend.value}</div>}
      </div>
      <div className="p-4 rounded-xl transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: `${color}15` }}><Icon type={icon} className="w-8 h-8" style={{ color }} /></div>
    </div>
  </div>
);

interface ChartContainerProps { title: string; subtitle?: string; children: React.ReactNode; className?: string; icon?: IconType; }
const ChartContainer: React.FC<ChartContainerProps> = ({ title, subtitle, children, className = "", icon }) => (
  <div className={`rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${className} bg-gray-50`}>
    <div className="flex items-center justify-between mb-6">
      <div>
        <div className="flex items-center mb-2">
          {icon && <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: `${COLORS.primary}15` }}><Icon type={icon} className="w-5 h-5" style={{ color: COLORS.primary }} /></div>}
          <h3 className="text-xl font-bold text-blue-500">{title}</h3>
        </div>
        <p className="text-sm text-blue-500">{subtitle}</p>
      </div>
    </div>
    <div className="chart-fade-in">{children}</div>
  </div>
);

const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 rounded-xl shadow-lg border-2 border-blue-500 bg-gray-50">
        <p className="font-semibold mb-2 text-blue-500">{label}</p>
        {payload.map((entry: any, index: number) => (<p key={index} className="text-sm" style={{ color: entry.color }}>{entry.name}: {formatter ? formatter(entry.value) : entry.value.toLocaleString('pt-BR')}</p>))}
      </div>
    );
  }
  return null;
};

export default function EstatisticasClienteOportunidade() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const carregarDadosReais = async () => {
      setLoading(true);
      try {
        const resClientes = await fetch("http://localhost:3001/clientes");
        const resOportunidades = await fetch("http://localhost:3001/oportunidades");

        const dadosClientes = await resClientes.json();
        const dadosOportunidades = await resOportunidades.json();

        setClientes(dadosClientes);
        setOportunidades(dadosOportunidades);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarDadosReais();
  }, []);

  const totalClientes = clientes.length;
  const totalOportunidades = oportunidades.length;
  const oportunidadesGanhas = oportunidades.filter(o => o.status === "Fechada").length;
  const valorTotalOportunidades = oportunidades.reduce((acc, o) => acc + o.valor, 0);
  const taxaConversao = totalOportunidades > 0 ? ((oportunidadesGanhas / totalOportunidades) * 100).toFixed(1) : "0";

  const dadosOportunidadesPorStatus = (() => {
    const map: Record<Oportunidade['status'], number> = { "Aberta": 0, "Fechada": 0, "Perdida": 0 };
    oportunidades.forEach(o => { map[o.status] = (map[o.status] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  })();

  const dadosValorPorStatus = (() => {
    const map: Record<Oportunidade['status'], number> = { "Aberta": 0, "Fechada": 0, "Perdida": 0 };
    oportunidades.forEach(o => { map[o.status] = (map[o.status] || 0) + o.valor; });
    return Object.entries(map).map(([status, valor]) => ({ status, valor }));
  })();

  const dadosTopClientesPorValor = (() => {
    const map: Record<string, number> = {};
    oportunidades.forEach(o => {
      const nomeCliente = o.cliente?.nome || "Cliente Desconhecido";
      map[nomeCliente] = (map[nomeCliente] || 0) + o.valor;
    });
    return Object.entries(map).map(([cliente, valor]) => ({ cliente, valor }))
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 10);
  })();

  const dadosEvolucaoMensalOportunidades = (() => {
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const dados: Record<string, { quantidade: number; valor: number }> = {};
    meses.forEach(m => { dados[m] = { quantidade: 0, valor: 0 }; });

    oportunidades.forEach(o => {
      if (o.data_abertura) {
        const mesIndex = new Date(o.data_abertura).getMonth();
        if (mesIndex >= 0 && mesIndex < 12) {
          const mes = meses[mesIndex];
          dados[mes].quantidade++;
          dados[mes].valor += o.valor;
        }
      }
    });
    const currentMonthIndex = new Date().getMonth();
    return Object.entries(dados).map(([mes, data]) => ({ ...data, mes })).slice(0, currentMonthIndex + 1);
  })();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <DNA visible={true} height={200} width={200} ariaLabel="loading" />
          <p className="mt-6 text-lg font-medium text-blue-500">Carregando Estatísticas de Clientes e Oportunidades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-blue-500">📈 Estatísticas de Clientes e Oportunidades</h1>
          <p className="text-xl max-w-2xl mx-auto text-blue-500">Visão geral do seu funil de vendas e base de clientes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total de Clientes" value={totalClientes} icon="users" color={COLORS.primary} />
          <StatCard title="Total de Oportunidades" value={totalOportunidades} icon="briefcase" color={COLORS.accent1} />
          <StatCard title="Oportunidades Ganhas" value={oportunidadesGanhas} icon="star" color={COLORS.accent2} trend={{ value: `${taxaConversao}% conversão`, isPositive: true }} />
          <StatCard title="Valor Total de Oportunidades" value={`R$ ${valorTotalOportunidades.toLocaleString('pt-BR')}`} icon="dollar" color={COLORS.accent3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartContainer title="Oportunidades por Status" subtitle="Distribuição atual do funil de vendas" icon="pie">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie data={dadosOportunidadesPorStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={140} innerRadius={70} paddingAngle={5} label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}>
                  {dadosOportunidadesPorStatus.map((_, index) => <Cell key={`cell-status-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip formatter={(v: number) => `${v} op.`} />} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" className="text-blue-500" />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Valor por Status de Oportunidade" subtitle="Valor monetário por etapa do funil" icon="dollar">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dadosValorPorStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="status" tick={{ fontSize: 12 }} className="text-blue-500" />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} className="text-blue-500" />
                <Tooltip content={<CustomTooltip formatter={(v: number) => `R$ ${v.toLocaleString('pt-BR')}`} />} />
                <Legend />
                <Bar dataKey="valor" fill={COLORS.primary} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartContainer title="Top 10 Clientes por Valor de Oportunidade" subtitle="Clientes com maior contribuição de valor" icon="building">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dadosTopClientesPorValor} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} className="text-blue-500" />
                <YAxis type="category" dataKey="cliente" tick={{ fontSize: 12 }} width={120} className="text-blue-500" />
                <Tooltip content={<CustomTooltip formatter={(v: number) => `R$ ${v.toLocaleString('pt-BR')}`} />} />
                <Bar dataKey="valor" fill={COLORS.accent1} radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Evolução Mensal de Oportunidades" subtitle="Novas oportunidades e valor gerado por mês" icon="trending">
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={dadosEvolucaoMensalOportunidades}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} className="text-blue-500" />
                <YAxis yAxisId="left" tick={{ fill: COLORS.primary }} tickFormatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} className="text-blue-500" />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: COLORS.primary }} className="text-blue-500" />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} className="text-blue-500" />
                <Area yAxisId="left" type="monotone" dataKey="valor" name="Valor (R$)" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.3} />
                <Line yAxisId="right" type="monotone" dataKey="quantidade" name="Oportunidades (Qtd)" stroke={COLORS.accent3} strokeWidth={4} dot={{ r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .chart-fade-in { animation: fadeIn 1s ease-out forwards; }
        .recharts-wrapper { transition: transform 0.3s ease; }
        .recharts-wrapper:hover { transform: scale(1.02); }
        .recharts-tooltip-wrapper { filter: drop-shadow(0 8px 16px rgba(30, 159, 255, 0.2)); }
        .recharts-legend-item-text { color: var(--color-blue-500); }
        .recharts-cartesian-axis-tick-value { fill: var(--color-blue-500); }
      `}</style>
    </div>
  );
}

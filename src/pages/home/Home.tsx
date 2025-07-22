import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';
import {
  ArrowUpRight,
  Users,
  CurrencyDollar,
  Target,
  ChartBar,
  ChartPie,
} from '@phosphor-icons/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, Cell, PieChart } from 'recharts';
import type Cliente from '../../models/Cliente';
import type Oportunidade from '../../models/Oportunidade';
import ChatBot from '../../components/chatbot/ChatBot';
import { useNavigate } from 'react-router-dom';

interface DashboardData {
  totalClientes: number;
  totalOportunidades: number;
  valorTotal: number;
  oportunidadesAbertas: number;
  oportunidadesFechadas: number;
  clientesRecentes: Cliente[];
  oportunidadesRecentes: Oportunidade[];
}

const Home: React.FC = () => {
  const { usuario, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalClientes: 0,
    totalOportunidades: 0,
    valorTotal: 0,
    oportunidadesAbertas: 0,
    oportunidadesFechadas: 0,
    clientesRecentes: [],
    oportunidadesRecentes: []
  });
  const [loading, setLoading] = useState(true);

  // You need to get the darkMode state from somewhere, 
  // as Home component itself doesn't manage it directly.
  // One way is to read it from localStorage directly, as Navbar does.
  // Or, if AuthContext could expose it, that would be ideal.
  // For now, let's assume it's read from localStorage for consistency with Navbar.
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Listen for changes to the 'theme' in localStorage to update darkMode state
  useEffect(() => {
    const handleStorageChange = () => {
      setDarkMode(localStorage.getItem('theme') === 'dark');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  const token = usuario.token;

  async function carregarDadosDashboard() {
    if (!token) {
      handleLogout();
      return;
    }

    try {
      setLoading(true);
      const header = {
        headers: {
          Authorization: token
        }
      };

      let listaClientes: Cliente[] = [];
      await buscar('/clientes', (setListaClientes: Cliente[]) => { listaClientes = setListaClientes; }, header);

      let listaOportunidades: Oportunidade[] = [];
      await buscar('/oportunidades', (setListaOportunidades: Oportunidade[]) => { listaOportunidades = setListaOportunidades; }, header);

      const totalClientes = listaClientes.length;
      const totalOportunidades = listaOportunidades.length;
      const valorTotal = listaOportunidades.reduce((acc, op) => acc + op.valor, 0);
      const oportunidadesAbertas = listaOportunidades.filter(op => op.status === 'Em Andamento' || op.status === 'Proposta').length;
      const oportunidadesFechadas = listaOportunidades.filter(op => op.status === 'Fechado').length;

      setDashboardData({
        totalClientes,
        totalOportunidades,
        valorTotal,
        oportunidadesAbertas,
        oportunidadesFechadas,
        clientesRecentes: listaClientes.slice(0, 3),
        oportunidadesRecentes: listaOportunidades.slice(0, 3)
      });

    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDadosDashboard();
  }, [token]);

  const dadosGrafico = [
    { mes: 'Jan', vendas: 45000 },
    { mes: 'Fev', vendas: 52000 },
    { mes: 'Mar', vendas: 48000 },
    { mes: 'Abr', vendas: 61000 },
    { mes: 'Mai', vendas: 55000 },
    { mes: 'Jun', vendas: 67000 }
  ];

  const dadosPizza = [
    { name: 'Fechadas', value: dashboardData.oportunidadesFechadas, color: '#10B981' }, // green-500
    { name: 'Em Andamento', value: dashboardData.oportunidadesAbertas, color: '#3B82F6' }, // blue-500
    { name: 'Propostas', value: dashboardData.totalOportunidades - dashboardData.oportunidadesAbertas - dashboardData.oportunidadesFechadas, color: '#F59E0B' } // amber-500 (similar to yellow)
  ];

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const handleViewPlans = () => {
    navigate('/planos');
  };

  // Determine stroke colors based on dark mode state
  const chartStrokeColor = darkMode ? '#cccccc' : '#888888';
  const gridStrokeColor = darkMode ? '#4a4a4a' : '#e0e0e0';


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      {/* Seção de Apresentação do CRM */}
      <div className="w-full bg-blue-600 dark:bg-gray-700 py-10 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white dark:text-gray-100 mb-4">
              Bem-vindo ao <span className="text-indigo-100 dark:text-blue-300">Kavio CRM</span>
            </h1>
            <p className="text-lg text-blue-100 dark:text-gray-300 max-w-2xl mx-auto">
              Um sistema completo de gestão de relacionamento com o cliente para impulsionar suas vendas e organizar suas oportunidades.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600"
                onClick={handleViewPlans}
              >
                Ver Planos
              </button>
            </div>
          </div>

          {/* Video Section on the right */}
          <div className="w-1/2 flex justify-end">
            <div className="w-3/4 max-w-md rounded-xl shadow-lg overflow-hidden">
              <video
                className="w-full h-auto opacity-90"
                autoPlay
                loop
                muted
                src="https://ik.imagekit.io/dmzx7is6a/Kavio/20250710_1451_Lively_Office_Workspace_simple_compose_01jztqcj3tftttrr773sp4t9fj.mp4?updatedAt=1752244664399"
              >
                Seu navegador não suporta a tag de vídeo.
              </video>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total de Clientes</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{dashboardData.totalClientes}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
                <Users size={24} className="text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight size={16} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+12%</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">este mês</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Oportunidades</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{dashboardData.totalOportunidades}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
                <Target size={24} className="text-green-600 dark:text-green-300" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight size={16} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+8%</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">este mês</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Valor Total</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{formatarMoeda(dashboardData.valorTotal)}</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-800 p-3 rounded-full">
                <CurrencyDollar size={24} className="text-yellow-600 dark:text-yellow-300" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight size={16} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+15%</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">este mês</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Taxa de Conversão</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">68%</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight size={16} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+5%</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">este mês</span>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Vendas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Vendas por Mês</h3>
              <ChartBar size={20} className="text-gray-500 dark:text-gray-300" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStrokeColor} /> {/* Use dynamic color */}
                <XAxis dataKey="mes" stroke={chartStrokeColor} /> {/* Use dynamic color */}
                <YAxis stroke={chartStrokeColor} /> {/* Use dynamic color */}
                <Tooltip formatter={(value: number) => formatarMoeda(value)} />
                <Bar dataKey="vendas" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Pizza */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Status das Oportunidades</h3>
              <ChartPie size={20} className="text-gray-500 dark:text-gray-300" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Tooltip />
                <Pie data={dadosPizza} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {dadosPizza.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {dadosPizza.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Listas Recentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Clientes Recentes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Clientes Recentes</h3>
            <div className="space-y-3">
              {dashboardData.clientesRecentes.map((cliente) => (
                <div key={cliente.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 dark:bg-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                      {cliente.nome.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{cliente.nome}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{cliente.email}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium dark:text-blue-400 dark:hover:text-blue-300">
                    Ver detalhes
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Oportunidades Recentes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Oportunidades Recentes</h3>
            <div className="space-y-3">
              {dashboardData.oportunidadesRecentes.map((oportunidade) => (
                <div key={oportunidade.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{oportunidade.titulo}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatarMoeda(oportunidade.valor)}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    oportunidade.status === 'Fechado'
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                      : oportunidade.status === 'Em Andamento'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                  }`}>
                    {oportunidade.status}
                  </span>
                  <ChatBot />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
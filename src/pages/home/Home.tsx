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
    { name: 'Fechadas', value: dashboardData.oportunidadesFechadas, color: '#10B981' },
    { name: 'Em Andamento', value: dashboardData.oportunidadesAbertas, color: '#3B82F6' },
    { name: 'Propostas', value: dashboardData.totalOportunidades - dashboardData.oportunidadesAbertas - dashboardData.oportunidadesFechadas, color: '#F59E0B' }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Seção de Apresentação do CRM */}
      <div className="w-full bg-blue-600 py-10 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Changed text-left to text-center for the welcome text container */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Bem-vindo ao <span className="text-indigo-100">Kavio CRM</span>
            </h1>
            {/* Added mx-auto for the paragraph to center it */}
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Um sistema completo de gestão de relacionamento com o cliente para impulsionar suas vendas e organizar suas oportunidades.
            </p>
            {/* Added justify-center to center the button container */}
            <div className="mt-6 flex justify-center space-x-4">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 transition-colors"
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
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Clientes</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardData.totalClientes}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users size={24} className="text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight size={16} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+12%</span>
              <span className="text-gray-500 ml-1">este mês</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Oportunidades</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardData.totalOportunidades}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Target size={24} className="text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight size={16} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+8%</span>
              <span className="text-gray-500 ml-1">este mês</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-3xl font-bold text-gray-900">{formatarMoeda(dashboardData.valorTotal)}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <CurrencyDollar size={24} className="text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight size={16} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+15%</span>
              <span className="text-gray-500 ml-1">este mês</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                <p className="text-3xl font-bold text-gray-900">68%</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight size={16} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+5%</span>
              <span className="text-gray-500 ml-1">este mês</span>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Vendas */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Vendas por Mês</h3>
              <ChartBar size={20} className="text-gray-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value: number) => formatarMoeda(value)} />
                <Bar dataKey="vendas" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Pizza */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Status das Oportunidades</h3>
              <ChartPie size={20} className="text-gray-500" />
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
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Listas Recentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Clientes Recentes */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Clientes Recentes</h3>
            <div className="space-y-3">
              {dashboardData.clientesRecentes.map((cliente) => (
                <div key={cliente.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {cliente.nome.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{cliente.nome}</p>
                      <p className="text-xs text-gray-500">{cliente.email}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Ver detalhes
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Oportunidades Recentes */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Oportunidades Recentes</h3>
            <div className="space-y-3">
              {dashboardData.oportunidadesRecentes.map((oportunidade) => (
                <div key={oportunidade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{oportunidade.titulo}</p>
                    <p className="text-xs text-gray-500">{formatarMoeda(oportunidade.valor)}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    oportunidade.status === 'Fechado'
                      ? 'bg-green-100 text-green-800'
                      : oportunidade.status === 'Em Andamento'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
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
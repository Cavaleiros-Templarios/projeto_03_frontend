import React, { useState, useEffect } from 'react'; // Added useEffect
import { CheckCircle } from '@phosphor-icons/react';

const Planos: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  // Add darkMode state and listener
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setDarkMode(localStorage.getItem('theme') === 'dark');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Preços mensais
  const monthlyPrices = {
    basico: 99,
    profissional: 299,
    empresarial: 799,
    ultimate: 1499
  };

  // Preços anuais (com desconto de 20%)
  const annualPrices = {
    basico: Math.round(monthlyPrices.basico * 12 * 0.8),
    profissional: Math.round(monthlyPrices.profissional * 12 * 0.8),
    empresarial: Math.round(monthlyPrices.empresarial * 12 * 0.8),
    ultimate: Math.round(monthlyPrices.ultimate * 12 * 0.8)
  };

  const getCurrentPrice = (plan: keyof typeof monthlyPrices) => {
    if (isAnnual) {
      return {
        price: annualPrices[plan],
        period: '/ano',
        monthlyEquivalent: Math.round(annualPrices[plan] / 12)
      };
    }
    return {
      price: monthlyPrices[plan],
      period: '/mês',
      monthlyEquivalent: null
    };
  };

  const getSavings = (plan: keyof typeof monthlyPrices) => {
    if (isAnnual) {
      const monthlyCost = monthlyPrices[plan] * 12;
      const annualCost = annualPrices[plan];
      return monthlyCost - annualCost;
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-6 lg:px-4 py-8">

        {/* Toggle de Planos Mensais/Anuais */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex items-center space-x-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                !isAnnual
                  ? 'bg-blue-600 text-white shadow-md dark:bg-blue-700 dark:text-white'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 relative ${
                isAnnual
                  ? 'bg-blue-600 text-white shadow-md dark:bg-blue-700 dark:text-white'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100'
              }`}
            >
              Anual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Plano Básico */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between border-t-8 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Básico</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">Ideal para pequenas empresas e startups que buscam organização inicial.</p>

              <div className="mb-6">
                <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                  R${getCurrentPrice('basico').price.toLocaleString('pt-BR')}
                  <span className="text-xl font-medium text-gray-500 dark:text-gray-400">{getCurrentPrice('basico').period}</span>
                </p>
                {isAnnual && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      R${getCurrentPrice('basico').monthlyEquivalent}/mês
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                      Economize R${getSavings('basico').toLocaleString('pt-BR')} por ano
                    </p>
                  </div>
                )}
              </div>

              <ul className="space-y-3 text-gray-700 dark:text-gray-200 mb-8 text-base">
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Gestão de até 50 clientes ativos</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Gestão de até 100 oportunidades</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Relatórios básicos de desempenho</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Suporte técnico por e-mail (24h resposta)</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Acesso a base de conhecimento</li>
              </ul>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 dark:bg-blue-700 dark:hover:bg-blue-600">
              Escolher Plano Básico
            </button>
          </div>

          {/* Plano Profissional */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between border-t-8 border-green-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative">
            <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase rotate-3 dark:bg-green-700">Mais Popular</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Profissional</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">Para empresas em crescimento que precisam de mais recursos e automação.</p>

              <div className="mb-6">
                <p className="text-4xl font-extrabold text-green-600 dark:text-green-400">
                  R${getCurrentPrice('profissional').price.toLocaleString('pt-BR')}
                  <span className="text-xl font-medium text-gray-500 dark:text-gray-400">{getCurrentPrice('profissional').period}</span>
                </p>
                {isAnnual && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      R${getCurrentPrice('profissional').monthlyEquivalent}/mês
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                      Economize R${getSavings('profissional').toLocaleString('pt-BR')} por ano
                    </p>
                  </div>
                )}
              </div>

              <ul className="space-y-3 text-gray-700 dark:text-gray-200 mb-8 text-base">
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Gestão ilimitada de clientes</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Gestão ilimitada de oportunidades</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Relatórios avançados e personalizados</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Suporte prioritário por chat e e-mail</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Integração com ferramentas de marketing (Mailchimp, etc.)</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Automação de tarefas básicas</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Acesso a APIs para integração customizada</li>
              </ul>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-300 dark:bg-green-700 dark:hover:bg-green-600">
              Escolher Plano Profissional
            </button>
          </div>

          {/* Plano Empresarial */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between border-t-8 border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Empresarial</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">Solução completa para grandes equipes e corporações com necessidades complexas.</p>

              <div className="mb-6">
                <p className="text-4xl font-extrabold text-purple-600 dark:text-purple-400">
                  R${getCurrentPrice('empresarial').price.toLocaleString('pt-BR')}
                  <span className="text-xl font-medium text-gray-500 dark:text-gray-400">{getCurrentPrice('empresarial').period}</span>
                </p>
                {isAnnual && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      R${getCurrentPrice('empresarial').monthlyEquivalent}/mês
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                      Economize R${getSavings('empresarial').toLocaleString('pt-BR')} por ano
                    </p>
                  </div>
                )}
              </div>

              <ul className="space-y-3 text-gray-700 dark:text-gray-200 mb-8 text-base">
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Todos os recursos do plano Profissional</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Personalização avançada da interface</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Gerente de conta dedicado</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Treinamento e implementação on-site</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />SLA (Service Level Agreement) garantido</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Segurança de dados de nível empresarial</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Integração com sistemas ERP e BI existentes</li>
              </ul>
            </div>
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors duration-300 dark:bg-purple-700 dark:hover:bg-purple-600">
              Escolher Plano Empresarial
            </button>
          </div>

          {/* Plano Ultimate */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between border-t-8 border-red-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Ultimate</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-base">A solução mais completa para grandes corporações e necessidades específicas.</p>

              <div className="mb-6">
                <p className="text-4xl font-extrabold text-red-600 dark:text-red-400">
                  R${getCurrentPrice('ultimate').price.toLocaleString('pt-BR')}
                  <span className="text-xl font-medium text-gray-500 dark:text-gray-400">{getCurrentPrice('ultimate').period}</span>
                </p>
                {isAnnual && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      R${getCurrentPrice('ultimate').monthlyEquivalent}/mês
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                      Economize R${getSavings('ultimate').toLocaleString('pt-BR')} por ano
                    </p>
                  </div>
                )}
              </div>

              <ul className="space-y-3 text-gray-700 dark:text-gray-200 mb-8 text-base">
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Todos os recursos do plano Empresarial</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Desenvolvimento de funcionalidades sob demanda</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Suporte 24/7 com tempo de resposta garantido</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Consultoria estratégica de CRM</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Infraestrutura dedicada e escalável</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Auditorias de segurança regulares</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Acesso a novas funcionalidades em beta</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2 dark:text-green-400" />Relatórios preditivos e IA</li>
              </ul>
            </div>
            <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors duration-300 dark:bg-red-700 dark:hover:bg-red-600">
              Escolher Plano Ultimate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planos;
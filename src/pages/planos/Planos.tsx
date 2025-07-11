import React from 'react';
import { CheckCircle } from '@phosphor-icons/react';

const Planos: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      

      <div className="max-w-screen-2xl mx-auto px-5 sm:px-6 lg:px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {/* Plano Básico */}
          <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col justify-between border-t-8 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Básico</h2>
              <p className="text-gray-600 mb-6 text-lg">Ideal para pequenas empresas e startups que buscam organização inicial.</p>
              <p className="text-5xl font-extrabold text-blue-600 mb-8">R$99<span className="text-2xl font-medium text-gray-500">/mês</span></p>
              <ul className="space-y-4 text-gray-700 mb-10 text-lg">
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Gestão de até 50 clientes ativos</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Gestão de até 100 oportunidades</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Relatórios básicos de desempenho</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Suporte técnico por e-mail (24h resposta)</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Acesso a base de conhecimento</li>
              </ul>
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-xl hover:bg-blue-700 transition-colors duration-300">
              Escolher Plano Básico
            </button>
          </div>

          {/* Plano Profissional */}
          <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col justify-between border-t-8 border-green-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative">
            <div className="absolute top-0 right-0 -mt-5 -mr-5 bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full uppercase rotate-3">Mais Popular</div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Profissional</h2>
              <p className="text-gray-600 mb-6 text-lg">Para empresas em crescimento que precisam de mais recursos e automação.</p>
              <p className="text-5xl font-extrabold text-green-600 mb-8">R$299<span className="text-2xl font-medium text-gray-500">/mês</span></p>
              <ul className="space-y-4 text-gray-700 mb-10 text-lg">
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Gestão ilimitada de clientes</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Gestão ilimitada de oportunidades</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Relatórios avançados e personalizados</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Suporte prioritário por chat e e-mail</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Integração com ferramentas de marketing (Mailchimp, etc.)</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Automação de tarefas básicas</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Acesso a APIs para integração customizada</li>
              </ul>
            </div>
            <button className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-xl hover:bg-green-700 transition-colors duration-300">
              Escolher Plano Profissional
            </button>
          </div>

          {/* Plano Empresarial */}
          <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col justify-between border-t-8 border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Empresarial</h2>
              <p className="text-gray-600 mb-6 text-lg">Solução completa para grandes equipes e corporações com necessidades complexas.</p>
              <p className="text-5xl font-extrabold text-purple-600 mb-8">R$799<span className="text-2xl font-medium text-gray-500">/mês</span></p>
              <ul className="space-y-4 text-gray-700 mb-10 text-lg">
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Todos os recursos do plano Profissional</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Personalização avançada da interface</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Gerente de conta dedicado</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Treinamento e implementação on-site</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />SLA (Service Level Agreement) garantido</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Segurança de dados de nível empresarial</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Integração com sistemas ERP e BI existentes</li>
              </ul>
            </div>
            <button className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold text-xl hover:bg-purple-700 transition-colors duration-300">
              Escolher Plano Empresarial
            </button>
          </div>

          {/* Novo Plano: Ultimate */}
          <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col justify-between border-t-8 border-red-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ultimate</h2>
              <p className="text-gray-600 mb-6 text-lg">A solução mais completa para grandes corporações e necessidades específicas.</p>
              <p className="text-5xl font-extrabold text-red-600 mb-8">R$1499<span className="text-2xl font-medium text-gray-500">/mês</span></p>
              <ul className="space-y-4 text-gray-700 mb-10 text-lg">
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Todos os recursos do plano Empresarial</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Desenvolvimento de funcionalidades sob demanda</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Suporte 24/7 com tempo de resposta garantido</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Consultoria estratégica de CRM</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Infraestrutura dedicada e escalável</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Auditorias de segurança regulares</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Acesso a novas funcionalidades em beta</li>
                <li className="flex items-center"><CheckCircle size={24} className="text-green-500 mr-3" />Relatórios preditivos e IA</li>
              </ul>
            </div>
            <button className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold text-xl hover:bg-red-700 transition-colors duration-300">
              Escolher Plano Ultimate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planos;



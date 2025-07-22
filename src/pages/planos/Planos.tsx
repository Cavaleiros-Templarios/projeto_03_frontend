import React from 'react';
import { CheckCircle } from '@phosphor-icons/react';

const Planos: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0E0E11]">

      <div className="max-w-screen-2xl mx-auto px-5 sm:px-6 lg:px-4 py-8"> {/* Reduced py here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"> {/* Reduced gap here */}
          {/* Plano Básico */}
          <div className="bg-[#18181B] rounded-xl shadow-lg p-6 flex flex-col justify-between border-t-8 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"> {/* Reduced p here (from p-10 to p-6) */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Básico</h2> {/* Reduced text size and mb */}
              <p className="text-gray-300 mb-4 text-base">Ideal para pequenas empresas e startups que buscam organização inicial.</p> {/* Reduced text size and mb */}
              <p className="text-4xl font-extrabold text-blue-600 mb-6">R$99<span className="text-xl font-medium text-gray-300">/mês</span></p> {/* Reduced text size and mb */}
              <ul className="space-y-3 text-gray-300 mb-8 text-base"> {/* Reduced space-y and mb */}
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Gestão de até 50 clientes ativos</li> {/* Reduced icon size and mr */}
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Gestão de até 100 oportunidades</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Relatórios básicos de desempenho</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Suporte técnico por e-mail (24h resposta)</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Acesso a base de conhecimento</li>
              </ul>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300"> {/* Reduced py and text size */}
              Escolher Plano Básico
            </button>
          </div>

          {/* Plano Profissional */}
          <div className="bg-[#18181B] rounded-xl shadow-lg p-6 flex flex-col justify-between border-t-8 border-green-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative"> {/* Reduced p */}
            <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase rotate-3">Mais Popular</div> {/* Reduced mt, mr, text size, px, py */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Profissional</h2>
              <p className="text-gray-300 mb-4 text-base">Para empresas em crescimento que precisam de mais recursos e automação.</p>
              <p className="text-4xl font-extrabold text-green-600 mb-6">R$299<span className="text-xl font-medium text-gray-300">/mês</span></p>
              <ul className="space-y-3 text-gray-300 mb-8 text-base">
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Gestão ilimitada de clientes</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Gestão ilimitada de oportunidades</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Relatórios avançados e personalizados</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Suporte prioritário por chat e e-mail</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Integração com ferramentas de marketing (Mailchimp, etc.)</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Automação de tarefas básicas</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Acesso a APIs para integração customizada</li>
              </ul>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-300">
              Escolher Plano Profissional
            </button>
          </div>

          {/* Plano Empresarial */}
          <div className="bg-[#18181B] rounded-xl shadow-lg p-6 flex flex-col justify-between border-t-8 border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"> {/* Reduced p */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Empresarial</h2>
              <p className="text-gray-300 mb-4 text-base">Solução completa para grandes equipes e corporações com necessidades complexas.</p>
              <p className="text-4xl font-extrabold text-purple-600 mb-6">R$799<span className="text-xl font-medium text-gray-300">/mês</span></p>
              <ul className="space-y-3 text-gray-300 mb-8 text-base">
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Todos os recursos do plano Profissional</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Personalização avançada da interface</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Gerente de conta dedicado</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Treinamento e implementação on-site</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />SLA (Service Level Agreement) garantido</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Segurança de dados de nível empresarial</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Integração com sistemas ERP e BI existentes</li>
              </ul>
            </div>
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors duration-300">
              Escolher Plano Empresarial
            </button>
          </div>

          {/* Novo Plano: Ultimate */}
          <div className="bg-[#18181B] rounded-xl shadow-lg p-6 flex flex-col justify-between border-t-8 border-red-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"> {/* Reduced p */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Ultimate</h2>
              <p className="text-gray-300 mb-4 text-base">A solução mais completa para grandes corporações e necessidades específicas.</p>
              <p className="text-4xl font-extrabold text-red-600 mb-6">R$1499<span className="text-xl font-medium text-gray-300">/mês</span></p>
              <ul className="space-y-3 text-gray-300 mb-8 text-base">
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Todos os recursos do plano Empresarial</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Desenvolvimento de funcionalidades sob demanda</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Suporte 24/7 com tempo de resposta garantido</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Consultoria estratégica de CRM</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Infraestrutura dedicada e escalável</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Auditorias de segurança regulares</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Acesso a novas funcionalidades em beta</li>
                <li className="flex items-center"><CheckCircle size={20} className="text-green-500 mr-2" />Relatórios preditivos e IA</li>
              </ul>
            </div>
            <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors duration-300">
              Escolher Plano Ultimate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planos;
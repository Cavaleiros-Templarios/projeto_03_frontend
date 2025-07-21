import React, { useState } from 'react';
import {
  CheckCircle,
  Users,
  DollarSign,
  Target,
  TrendingUp,
  Mail,
  Phone,
  ArrowRight,
  BarChart3,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  const [isAnnual, setIsAnnual] = useState(false);

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

  const getCurrentPrice = (plan) => {
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

  const getSavings = (plan) => {
    if (isAnnual) {
      const monthlyCost = monthlyPrices[plan] * 12;
      const annualCost = annualPrices[plan];
      return monthlyCost - annualCost;
    }
    return 0;
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="min-h-screen bg-[var(--cor-primaria-fundo)] font-sans"> {/* Changed to use --cor-primaria-fundo */}

      {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
              <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                  <img
                        src="https://ik.imagekit.io/v5ijt4s2j/projetos/logo_navbar.png?updatedAt=1752232304793"
                        alt="Logo"
                        className="h-10 w-auto"
                    />
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Recursos</a>
                  <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Planos</a>
                  <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Contato</a>
                </nav>
                <div>
                  {/* These links now use Link from react-router-dom */}
                  <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium mr-4">Entrar</Link>
                  <Link
                    to="/cadastro" // Directing to /cadastro for 'Comece Grátis'
                    className="bg-[var(--cor-primaria)] text-[var(--cor-texto-claro)] hover:bg-[var(--cor-primaria-hover)] px-5 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                  >
                    Comece Grátis
                  </Link>
                </div>
              </div>
            </header>

      {/* Hero Section */}
      <section className=" text-white bg-[var(--cor-primaria)]/90 y-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Simplifique sua Gestão de Clientes com <span className="text-[var(--cor-primaria-hover)]">Kavio CRM</span>
          </h1>
          <p className="text-xl mb-10 leading-relaxed">
            Organize vendas, acompanhe oportunidades e construa relacionamentos duradouros. Tudo em um solo lugar, de forma intuitiva.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/cadastro"
              className="px-8 py-4 rounded-lg text-lg font-bold transition-colors shadow-lg flex items-center justify-center bg-white text-gray-900 hover:bg-gray-200" // Using custom properties
            >
              Comece Grátis por 7 Dias <ArrowRight size={20} className="ml-2" />
            </Link>
            <a
              href="#pricing"
              className="bg-white text-gray-900 hover:bg-gray-200 px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg flex items-center justify-center"
            >
              Ver Planos <DollarSign size={20} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[var(--cor-primaria-hover)] text-center mb-12">Recursos que impulsionam seu negócio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-lg text-center shadow-sm">
              <Users size={48} className="text-[var(--cor-primaria)] mx-auto mb-6" /> {/* Using --cor-primaria */}
              <h3 className="text-xl font-semibold text-[var(--cor-primaria-hover)] mb-3">Gestão de Clientes Completa</h3>
              <p className="text-gray-600">
                Centralize todas as informações dos seus clientes, histórico de interações e preferências para um atendimento personalizado.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center shadow-sm">
              <TrendingUp size={48} className="text-[var(--cor-primaria)] mx-auto mb-6" /> {/* Using --cor-primaria */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Otimização de Vendas</h3>
              <p className="text-gray-600">
                Acompanhe o funil de vendas, identifique gargalos e transforme oportunidades em negócios fechados com mais eficiência.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center shadow-sm">
              <BarChart3 size={48} className="text-[var(--cor-primaria)] mx-auto mb-6" /> {/* Using --cor-primaria */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Relatórios e Análises Inteligentes</h3>
              <p className="text-gray-600">
                Tome decisões baseadas em dados com dashboards intuitivos e relatórios detalhados sobre suas vendas e clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Middle */}
      <section className="py-16 text-center bg-[var(--cor-primaria)]/90 from-gray-900 to-gray-800 text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-6">Pronto para transformar sua gestão?</h2>
          <p className="text-xl text-white mb-8">
            Comece hoje mesmo a usar o Kavio CRM e veja a diferença.
          </p>
          <Link
            to="/cadastro"
            className="bg-white text-gray-900 hover:bg-gray-200 px-8 py-4 rounded-lg text-lg font-bold transition-colors shadow-lg"
          >
            Experimente Grátis Agora!
          </Link>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[var(--cor-primaria-hover)] text-center mb-6">Planos Flexíveis para Cada Etapa do Seu Negócio</h2>
          <p className="text-lg text-gray-600 text-center mb-12">Escolha o plano que melhor se adapta às suas necessidades e comece a escalar.</p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Plano Básico */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Básico</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Para pequenas empresas iniciantes
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {formatarMoeda(getCurrentPrice('basico').price)}
                  </span>
                  <span className="text-gray-600 ml-1">{getCurrentPrice('basico').period}</span>
                  {isAnnual && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Economize {formatarMoeda(getSavings('basico'))} por ano
                      </p>
                      <p className="text-xs text-gray-400">
                        ({formatarMoeda(getCurrentPrice('basico').monthlyEquivalent)}/mês equivalente)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> 
                  <span className="text-sm text-gray-700">Até 50 clientes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> 
                  <span className="text-sm text-gray-700">Até 100 oportunidades</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> 
                  <span className="text-sm text-gray-700">Relatórios básicos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> 
                  <span className="text-sm text-gray-700">Suporte por email</span>
                </li>
              </ul>

              <Link to="/cadastro?plan=basico" className="w-full bg-[var(--cor-primaria)] text-[var(--cor-texto-claro)] hover:bg-[var(--cor-primaria-hover)]  py-3 rounded-md text-sm font-medium transition-colors duration-200 text-center">
                Começar
              </Link>
            </div>

            {/* Plano Profissional */}
            <div className="bg-white rounded-lg p-8 flex flex-col hover:shadow-lg relative border-2 border-[var(--cor-primaria)] transition-transform duration-300 ease-in-out transform hover:scale-105"> {/* Using --cor-primaria */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="text-white text-xs font-bold px-3 py-1 rounded-full shadow-md bg-[var(--cor-primaria)]"> {/* Using --cor-primaria */}
                  Recomendado
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Profissional</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Para empresas em crescimento
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {formatarMoeda(getCurrentPrice('profissional').price)}
                  </span>
                  <span className="text-gray-600 ml-1">{getCurrentPrice('profissional').period}</span>
                  {isAnnual && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Economize {formatarMoeda(getSavings('profissional'))} por ano
                      </p>
                      <p className="text-xs text-gray-400">
                        ({formatarMoeda(getCurrentPrice('profissional').monthlyEquivalent)}/mês equivalente)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> {/* Using --cor-primaria */}
                  <span className="text-sm text-gray-700">Clientes ilimitados</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> {/* Using --cor-primaria */}
                  <span className="text-sm text-gray-700">Oportunidades ilimitadas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> {/* Using --cor-primaria */}
                  <span className="text-sm text-gray-700">Relatórios avançados</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> {/* Using --cor-primaria */}
                  <span className="text-sm text-gray-700">Suporte prioritário</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> {/* Using --cor-primaria */}
                  <span className="text-sm text-gray-700">Integrações</span>
                </li>
              </ul>

              <Link to="/cadastro?plan=profissional" className="w-full bg-[var(--cor-primaria)] text-[var(--cor-texto-claro)] hover:bg-[var(--cor-primaria-hover)]  py-3 rounded-md text-sm font-medium transition-colors duration-200 text-center">
                Teste grátis por 7 dias
              </Link>
            </div>

            {/* Plano Empresarial */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Empresarial</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Para grandes equipes e empresas
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {formatarMoeda(getCurrentPrice('empresarial').price)}
                  </span>
                  <span className="text-gray-600 ml-1">{getCurrentPrice('empresarial').period}</span>
                  {isAnnual && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Economize {formatarMoeda(getSavings('empresarial'))} por ano
                      </p>
                      <p className="text-xs text-gray-400">
                        ({formatarMoeda(getCurrentPrice('empresarial').monthlyEquivalent)}/mês equivalente)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Tudo do Plano Profissional</span>
                </li>
                <li className="flex items-start"> --
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> 
                  <span className="text-sm text-gray-700">Gerenciamento de equipes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> {/* Using --cor-primaria */}
                  <span className="text-sm text-gray-700">Workflows personalizados</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> {/* Using --cor-primaria */}
                  <span className="text-sm text-gray-700">Treinamento dedicado</span>
                </li>
              </ul>

              <Link to="/cadastro?plan=empresarial" className="w-full bg-[var(--cor-primaria)] text-[var(--cor-texto-claro)] hover:bg-[var(--cor-primaria-hover)]  py-3 rounded-md text-sm font-medium transition-colors duration-200 text-center">
                Começar
              </Link>
            </div>

            {/* Plano Ultimate */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Ultimate</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Solução completa para grandes corporações
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {formatarMoeda(getCurrentPrice('ultimate').price)}
                  </span>
                  <span className="text-gray-600 ml-1">{getCurrentPrice('ultimate').period}</span>
                  {isAnnual && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Economize {formatarMoeda(getSavings('ultimate'))} por ano
                      </p>
                      <p className="text-xs text-gray-400">
                        ({formatarMoeda(getCurrentPrice('ultimate').monthlyEquivalent)}/mês equivalente)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> {/* Using --cor-primaria */}
                  <span className="text-sm text-gray-700">Tudo do Plano Profissional</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> {/* Using --cor-primaria */}
                  <span className="text-sm text-gray-700">SLA personalizado</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> {/* Using --cor-primaria */}
                  <span className="text-sm text-gray-700">Consultoria estratégica</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-[var(--cor-primaria)] mr-3 mt-0.5 flex-shrink-0" /> {/* Using --cor-primaria */}
                  <span className="text-sm text-gray-700">API completa</span>
                </li>
              </ul>

              <Link to="/contact" className="w-full bg-[var(--cor-primaria)] text-[var(--cor-texto-claro)] hover:bg-[var(--cor-primaria-hover)]  py-3 rounded-md text-sm font-medium transition-colors duration-200 text-center">
                Fale Conosco
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/Social Proof Section (Corrigido com estrelas preenchidas) */}
      <section className="bg-gradient-to-r bg-[var(--cor-primaria)] py-20 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">O que nossos clientes dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Testemunho 1 */}
            <div className="bg-gray-50 text-[var(--cor-primaria-hover)] p-8 rounded-lg shadow-md">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="var(--cor-aviso)" viewBox="0 0 24 24" className="inline-block mb-3 w-5 h-5 mr-0.5">
                  <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.27 0 9.423l8.332-1.268z" />
                </svg>
              ))}
              <p className="italic text-lg mb-4">
                "Kavio CRM transformou a forma como gerenciamos nossos clientes. Simples, intuitivo e poderoso!"
              </p>
              <p className="font-semibold">- Ana Paula, CEO da Startup X</p>
            </div>

            {/* Testemunho 2 */}
            <div className="bg-gray-50 text-[var(--cor-primaria-hover)] p-8 rounded-lg shadow-md">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="var(--cor-aviso)" viewBox="0 0 24 24" className="inline-block mb-3 w-5 h-5 mr-0.5">
                  <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.27 0 9.423l8.332-1.268z" />
                </svg>
              ))}
              <p className="italic text-lg mb-4">
                "Aumentamos nossa taxa de conversão em 30% desde que começamos a usar o Kavio. Altamente recomendado!"
              </p>
              <p className="font-semibold">- João Silva, Diretor de Vendas</p>
            </div>

          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Fale Conosco</h2>
          <p className="text-lg text-gray-600 mb-12">
            Tem dúvidas ou precisa de um plano personalizado? Entre em contato!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-center justify-center flex-col">
              <Mail size={32} className="text-[var(--cor-primaria)] mb-4" /> {/* Using --cor-primaria */}
              <h3 className="font-medium text-gray-900 mb-2">Email</h3>
              <a href="mailto:contato@kavio.com" className="text-[var(--cor-primaria)] hover:underline">contato@kavio.com</a> {/* Using --cor-primaria */}
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-center justify-center flex-col">
              <Phone size={32} className="text-[var(--cor-primaria)] mb-4" /> 
              <h3 className="font-medium text-gray-900 mb-2">Telefone</h3>
              <a href="tel:+5511999999999" className="text-[var(--cor-primaria)] hover:underline">(11) 99999-9999</a> {/* Using --cor-primaria */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
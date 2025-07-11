import React from 'react';

// Paleta de cores azul consistente com a identidade Kavio CRM
const COLORS = {
  primary: "#005de3",        // Azul principal
  primaryHover: "#003d9e",   // Azul escuro para hover
  background: "#f8fafc",     // Fundo claro
  cardBackground: "#ffffff", // Branco para cards
  accent1: "#0052cc",        // Azul médio escuro
  accent2: "#0066ff",        // Azul médio
  accent3: "#3b82f6",        // Azul claro
  accent4: "#60a5fa",        // Azul muito claro
  accent5: "#93c5fd",        // Azul pastel
  success: "#10b981",        // Verde sucesso
  warning: "#f59e0b",        // Laranja para avisos
  danger: "#ef4444",         // Vermelho para deletar
  info: "#06b6d4"            // Ciano para informações
};

// Interface para membro da equipe
interface TeamMember {
  name: string;
  role: string;
  github?: string;
  linkedin?: string;
  avatar?: string;
}

// Interface para tecnologia
interface Technology {
  name: string;
  emoji: string;
  description: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'deployment';
  color: string;
}

// Componente da Seção de Tecnologias
const TechnologiesSection: React.FC = () => {
  const technologies: Technology[] = [
    // Frontend
    {
      name: "React",
      emoji: "⚛️",
      description: "Biblioteca JavaScript para interfaces",
      category: "frontend",
      color: COLORS.accent3
    },
    {
      name: "TypeScript",
      emoji: "📘",
      description: "JavaScript com tipagem estática",
      category: "frontend",
      color: COLORS.accent2
    },
    {
      name: "Tailwind CSS",
      emoji: "🎨",
      description: "Framework CSS utilitário",
      category: "frontend",
      color: COLORS.accent4
    },

    // Backend
    {
      name: "Java",
      emoji: "☕",
      description: "Linguagem de programação robusta",
      category: "backend",
      color: COLORS.primary
    },
    {
      name: "Spring",
      emoji: "🌱",
      description: "Framework Java para aplicações",
      category: "backend",
      color: COLORS.accent1
    },
    {
      name: "Node.js",
      emoji: "🟢",
      description: "Runtime JavaScript no servidor",
      category: "backend",
      color: COLORS.success
    },

    // Database
    {
      name: "PostgreSQL",
      emoji: "🐘",
      description: "Banco de dados relacional avançado",
      category: "database",
      color: COLORS.accent2
    },

    // Tools
    {
      name: "VS Code",
      emoji: "💻",
      description: "Editor de código moderno",
      category: "tools",
      color: COLORS.accent3
    },
    {
      name: "Swagger",
      emoji: "📋",
      description: "Documentação de APIs",
      category: "tools",
      color: COLORS.accent1
    },

    // Deployment
    {
      name: "Railway",
      emoji: "🚂",
      description: "Plataforma de deploy em nuvem",
      category: "deployment",
      color: COLORS.primary
    }
  ];

  return (
    <section id="tecnologias-utilizadas" className="mb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header da Seção */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div>
              <h2
                className="text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent2})`
                }}
              >
                Tecnologias Utilizadas
              </h2>
            </div>
          </div>
        </div>

        {/* Grid Centralizado de Tecnologias */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-5xl">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 overflow-hidden animate-fade-in-up"
                style={{
                  backgroundColor: COLORS.cardBackground,
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                {/* Background Gradient */}
                <div
                  className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${tech.color}30, ${tech.color}10)`
                  }}
                ></div>

                {/* Conteúdo do Card */}
                <div className="relative p-6 text-center">
                  {/* Emoji/Ícone */}
                  <div
                    className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-transform duration-500"
                    style={{
                      backgroundColor: `${tech.color}15`,
                      border: `3px solid ${tech.color}30`
                    }}
                  >
                    <span className="text-5xl">{tech.emoji}</span>
                  </div>

                  {/* Nome da Tecnologia */}
                  <h4
                    className="text-lg font-bold mb-3 group-hover:scale-105 transition-transform duration-300"
                    style={{ color: tech.color }}
                  >
                    {tech.name}
                  </h4>

                  {/* Descrição */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                {/* Efeito de borda no hover */}
                <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.accent3}10)`
                }}
            ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente principal Sobre
const Sobre: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Pedro Coelho",
      role: "Developer",
      github: "https://github.com/phccoelho",
      linkedin: "https://linkedin.com/in/pedro-coelho-646552273",
      avatar: "https://ik.imagekit.io/dmzx7is6a/FasGen/Desenvolvedores/forte.jpg?updatedAt=1751557438146"
    },
    {
      name: "Fabricio Vicente Soares",
      role: "Developer",
      github: "https://github.com/Fabriciovics",
      linkedin: "https://linkedin.com/in/fabriciovics",
      avatar: "https://ik.imagekit.io/dmzx7is6a/FasGen/Desenvolvedores/fabricio.jpg?updatedAt=1751557438115"
    },
    {
      name: "Cristiano Forner",
      role: "Developer",
      github: "https://github.com/cristianoforner",
      linkedin: "https://linkedin.com/in/cristianoforner",
      avatar: "https://ik.imagekit.io/dmzx7is6a/FasGen/Desenvolvedores/truco.jpg?updatedAt=1751557438147"
    },
    {
      name: "Gustavo Brassaroto Lira",
      role: "Developer",
      github: "https://github.com/Brassaroto",
      linkedin: "https://linkedin.com/in/gustavo-brassaroto-lira-a9a378221",
      avatar: "https://ik.imagekit.io/dmzx7is6a/FasGen/Desenvolvedores/ex.jpg?updatedAt=1751557438293"
    },
    {
      name: "Alex Ikezili",
      role: "Developer",
      github: "https://github.com/alexikezili",
      linkedin: "https://linkedin.com/in/alexikezili",
      avatar: "https://ik.imagekit.io/dmzx7is6a/FasGen/Desenvolvedores/alex.jpg?updatedAt=1751557438211"
    },
    {
      name: "Wesley Lima",
      role: "Developer",
      github: "https://github.com/Wezzlim",
      linkedin: "https://www.linkedin.com/in/wesleytecnologia/",
      avatar: "https://ik.imagekit.io/dmzx7is6a/FasGen/Desenvolvedores/wesley.jpg?updatedAt=1751557438143"
    },
    {
      name: "Thiago Tasseli",
      role: "Developer",
      github: "https://github.com/tasselii",
      linkedin: "https://linkedin.com/in/thiagotasseli-tech",
      avatar: "https://ik.imagekit.io/dmzx7is6a/FasGen/Desenvolvedores/eu.jpg?updatedAt=1751557438326"
    }
  ];

  return (
    <div
      className="min-h-screen py-8"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Sobre o Kavio CRM - Redesenhado */}
        <section id="sobre-kavio-crm" className="mb-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Header da seção */}
            <div className="mb-12">
              <h1
                className="text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent2})`
                }}
              >
                Sobre o Kavio CRM
              </h1>
            </div>

            {/* Card principal com informações */}
            <div
              className="rounded-3xl shadow-2xl px-12 py-16 mb-12 relative overflow-hidden"
              style={{ backgroundColor: COLORS.cardBackground }}
            >
              {/* Background decorativo */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.accent3}10)`
                }}
              ></div>

              {/* Conteúdo */}
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: COLORS.primary }}
                  >
                    Sistema de Gestão de Relacionamento com Cliente
                  </h3>
                </div>

                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p className="text-xl">
                    O <span style={{ color: COLORS.primary, fontWeight: 'bold' }}>Kavio CRM</span> é uma plataforma moderna e intuitiva para gestão de relacionamento com clientes.
                  </p>
                  <p>
                    Funciona de forma <span style={{ color: COLORS.accent2, fontWeight: 'semibold' }}>rápida e clara</span>, com estrutura pronta para crescer junto com sua empresa.
                  </p>
                  <p>
                    Nosso projeto nasceu da necessidade de <span style={{ color: COLORS.accent1, fontWeight: 'semibold' }}>otimizar e modernizar</span> os processos de vendas e atendimento, colocando o cliente no centro da estratégia.
                  </p>
                </div>

                {/* Features destacadas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  {[
                    { icon: "⚡", title: "Rápido", desc: "Interface otimizada para produtividade" },
                    { icon: "📊", title: "Intuitivo", desc: "Design focado na experiência do usuário" },
                    { icon: "🚀", title: "Escalável", desc: "Cresce junto com sua empresa" }
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="text-center p-6 rounded-2xl"
                      style={{ backgroundColor: `${COLORS.accent3}10` }}
                    >
                      <div className="text-4xl mb-3">{feature.icon}</div>
                      <h4
                        className="text-lg font-bold mb-2"
                        style={{ color: COLORS.primary }}
                      >
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipe de Desenvolvimento - Layout 4+3 Centralizado */}
        <section id="equipe-desenvolvimento" className="mb-20">
          <div className="max-w-7xl mx-auto">
            {/* Header da seção */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div>
                  <h2
                    className="text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent2})`
                    }}
                  >
                    Equipe de Desenvolvimento
                  </h2>
                  <p className="text-gray-600 text-xl mt-2">
                    Profissionais dedicados ao seu sucesso
                  </p>
                </div>
              </div>

              {/* Linha decorativa */}
              <div
                className="w-40 h-1.5 mx-auto rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${COLORS.accent5}, ${COLORS.accent3}, ${COLORS.accent1})`
                }}
              ></div>
            </div>

            {/* Grid de membros da equipe */}
            <div className="flex flex-wrap justify-center gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden animate-fade-in-up"
                  style={{
                    backgroundColor: COLORS.cardBackground,
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both',
                    width: '300px',
                    minHeight: '400px'
                  }}
                >
                  {/* Background gradient */}
                  <div
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.accent3}10)`
                    }}
                  ></div>

                  {/* Conteúdo do card */}
                  <div className="relative p-8 text-center h-full flex flex-col justify-between">
                    <div>
                      {/* Avatar */}
                      <div className="relative mb-6">
                        <div
                          className="w-32 h-32 rounded-full mx-auto overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-500"
                          style={{ border: `4px solid ${COLORS.accent3}30` }}
                        >
                          {member.avatar ? (
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Badge de status */}
                        <div
                          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white"
                          style={{ backgroundColor: COLORS.success }}
                        ></div>
                      </div>

                      {/* Informações */}
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:scale-105 transition-transform duration-300">
                        {member.name}
                      </h3>
                      <p
                        className="font-semibold mb-6 text-lg"
                        style={{ color: COLORS.accent2 }}
                      >
                        {member.role}
                      </p>
                    </div>

                    {/* Links sociais */}
                    <div className="flex justify-center space-x-4">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                          style={{
                            backgroundColor: COLORS.info,
                            color: 'white'
                          }}
                          aria-label={`LinkedIn profile of ${member.name}`}
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                          </svg>
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                          style={{
                            backgroundColor: '#333',
                            color: 'white'
                          }}
                          aria-label={`GitHub profile of ${member.name}`}
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.299 24 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Tecnologias Modernizada e Centralizada */}
        <TechnologiesSection />
      </div>

      {/* Estilos CSS inline para animações */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Sobre;
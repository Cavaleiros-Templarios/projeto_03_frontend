import React, { useState, useEffect } from 'react';
import { CheckCircle } from '@phosphor-icons/react';

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
  color: string; // This is a CSS variable, e.g., "var(--cor-primaria)"
}

// Componente da Seção de Tecnologias
const TechnologiesSection: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const technologies: Technology[] = [
    // Frontend
    {
      name: "React",
      emoji: "⚛️",
      description: "Biblioteca JavaScript para interfaces",
      category: "frontend",
      color: "var(--cor-primaria)"
    },
    {
      name: "TypeScript",
      emoji: "📘",
      description: "JavaScript com tipagem estática",
      category: "frontend",
      color: "var(--cor-secundaria)"
    },
    {
      name: "Tailwind CSS",
      emoji: "🎨",
      description: "Framework CSS utilitário",
      category: "frontend",
      color: "var(--cor-info)"
    },

    // Backend
    {
      name: "Java",
      emoji: "☕",
      description: "Linguagem de programação robusta",
      category: "backend",
      color: "var(--cor-primaria)"
    },
    {
      name: "Spring",
      emoji: "🌱",
      description: "Framework Java para aplicações",
      category: "backend",
    color: "var(--cor-primaria-hover)"
    },
    {
      name: "Node.js",
      emoji: "🟢",
      description: "Runtime JavaScript no servidor",
      category: "backend",
      color: "var(--cor-sucesso)"
    },

    // Database
    {
      name: "PostgreSQL",
      emoji: "🐘",
      description: "Banco de dados relacional avançado",
      category: "database",
      color: "var(--cor-secundaria)"
    },

    // Tools
    {
      name: "VS Code",
      emoji: "💻",
      description: "Editor de código moderno",
      category: "tools",
      color: "var(--cor-info)"
    },
    {
      name: "Swagger",
      emoji: "📋",
      description: "Documentação de APIs",
      category: "tools",
      color: "var(--cor-primaria-hover)"
    },

    // Deployment
    {
      name: "Railway",
      emoji: "🚂",
      description: "Plataforma de deploy em nuvem",
      category: "deployment",
      color: "var(--cor-primaria)"
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
                  backgroundImage: `linear-gradient(135deg, var(--cor-primaria), var(--cor-secundaria))`
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
                  backgroundColor: "var(--cor-fundo-card)",
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both',
                  borderTop: `6px solid ${tech.color}`
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
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--cor-texto-secundario)" }}
                  >
                    {tech.description}
                  </p>
                </div>

                {/* Efeito de borda no hover */}
                <div
                  className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{
                  background: `linear-gradient(135deg, var(--cor-primaria)20, var(--cor-info)10)`
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
  // Add darkMode state and listener to the main component
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Initialize dark mode from localStorage to ensure consistency
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    // Listen for changes in localStorage 'theme' to update darkMode state
    // This allows other components (like Navbar) to trigger updates here
    const handleStorageChange = () => {
      setDarkMode(localStorage.getItem('theme') === 'dark');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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

  // Separando os membros: os primeiros 4 para a linha de cima, os 3 restantes para a linha de baixo
  const topRowMembers = teamMembers.slice(0, 4);
  const bottomRowMembers = teamMembers.slice(4, 7); // Pega os membros do índice 4, 5 e 6

  return (
    // Added 'pt-16' (padding-top: 4rem or 64px) to push content down,
    // assuming Navbar height is around 64px. Adjust 'pt-X' as needed.
    <div
      className="min-h-screen py-8 pt-16 text-gray-900 dark:text-gray-100"
      style={{ backgroundColor: "var(--cor-primaria-fundo)" }}
    >
      <div className="container mx-auto px-4 py-12">
        {/* About Kavio CRM - Redesigned */}
        <section id="sobre-kavio-crm" className="mb-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Section Header */}
            <div className="mb-12">
              <h1
                className="text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, var(--cor-primaria), var(--cor-secundaria))`
                }}
              >
                Sobre o Kavio CRM
              </h1>
            </div>

            {/* Main info card */}
            <div
              className="rounded-3xl shadow-2xl px-12 py-16 mb-12 relative overflow-hidden"
              style={{
                backgroundColor: "var(--cor-fundo-card)",
                borderTop: `8px solid var(--cor-primaria)`
              }}
            >
              {/* Decorative background */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  background: `linear-gradient(135deg, var(--cor-primaria)20, var(--cor-info)10)`
                }}
              ></div>

              {/* Conteúdo */}
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: "var(--cor-primaria)" }}
                  >
                    Sistema de Gestão de Relacionamento com Cliente
                  </h3>
                </div>

                <div className="space-y-6 text-lg leading-relaxed" style={{ color: "var(--cor-texto-principal)" }}>
                  <p className="text-xl">
                    O <span style={{ color: "var(--cor-primaria)", fontWeight: 'bold' }}>Kavio CRM</span> é uma plataforma moderna e intuitiva para gestão de relacionamento com clientes.
                  </p>
                  <p>
                    Funciona de forma <span style={{ color: "var(--cor-secundaria)", fontWeight: 'semibold' }}>rápida e clara</span>, com estrutura pronta para crescer junto com sua empresa.
                  </p>
                  <p>
                    Nosso projeto nasceu da necessidade de <span style={{ color: "var(--cor-primaria-hover)", fontWeight: 'semibold' }}>otimizar e modernizar</span> os processos de vendas e atendimento, colocando o cliente no centro da estratégia.
                  </p>
                </div>

                {/* Features destacadas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  {[
                    { icon: "⚡", title: "Rápido", desc: "Interface otimizada para produtividade", color: "var(--cor-primaria)" },
                    { icon: "📊", title: "Intuitivo", "desc": "Design focado na experiência do usuário", color: "var(--cor-secundaria)" },
                    { icon: "🚀", title: "Escalável", desc: "Cresce junto com sua empresa", color: "var(--cor-info)" }
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="text-center p-6 rounded-2xl"
                      style={{
                        backgroundColor: `${feature.color}10`,
                        border: `2px solid ${feature.color}`
                      }}
                    >
                      <div className="text-4xl mb-3">{feature.icon}</div>
                      <h4
                        className="text-lg font-bold mb-2"
                        style={{ color: feature.color }}
                      >
                        {feature.title}
                      </h4>
                      <p className="text-sm" style={{ color: "var(--cor-texto-secundario)" }}>{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipe de Desenvolvimento - Layout com 4 cards em cima e 3 em baixo */}
        <section id="equipe-desenvolvimento" className="mb-20">
          <div className="max-w-7xl mx-auto">
            {/* Header da seção */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div>
                  <h2
                    className="text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, var(--cor-primaria), var(--cor-secundaria))`
                    }}
                  >
                    Equipe de Desenvolvimento
                  </h2>
                  <p className="text-xl mt-2" style={{ color: "var(--cor-texto-secundario)" }}>
                    Profissionais dedicados ao seu sucesso
                  </p>
                </div>
              </div>

              {/* Linha decorativa */}
              <div
                className="w-40 h-1.5 mx-auto rounded-full"
                style={{
                  background: `linear-gradient(90deg, var(--cor-info), var(--cor-secundaria), var(--cor-primaria-hover))`
                }}
              ></div>
            </div>

            {/* Linha superior com 4 cards centralizados */}
            {/* >>> ALTERAÇÃO AQUI: 'gap-8' mudado para 'gap-1' <<< */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 max-w-screen-xl mx-auto mb-8 justify-items-center">
              {topRowMembers.map((member, index) => (
                <div
                  key={index}
                  className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden animate-fade-in-up"
                  style={{
                    backgroundColor: "var(--cor-fundo-card)",
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both',
                    width: '300px', // Fixed width for consistency
                    height: '420px', // Fixed height for consistency
                    borderTop: `6px solid ${
                        index % 3 === 0 ? 'var(--cor-primaria)' :
                        index % 3 === 1 ? 'var(--cor-secundaria)' :
                        'var(--cor-info)'
                    }`
                  }}
                >
                  {/* Background gradient */}
                  <div
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, var(--cor-primaria)20, var(--cor-info)10)`
                    }}
                  ></div>

                  {/* Conteúdo do card */}
                  <div className="relative p-8 text-center h-full flex flex-col justify-between">
                    <div>
                      {/* Avatar */}
                      <div className="relative mb-6">
                        <div
                          className="w-32 h-32 rounded-full mx-auto overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-500"
                          style={{ border: `4px solid var(--cor-info)30` }}
                        >
                          {member.avatar ? (
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "var(--cor-fundo-claro)" }}>
                              <svg className="w-16 h-16" fill="var(--cor-texto-secundario)" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Badge de status */}
                        <div
                          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4"
                          style={{
                            backgroundColor: "var(--cor-sucesso)",
                            borderColor: "var(--cor-fundo-card)"
                          }}
                        ></div>
                      </div>

                      {/* Informações */}
                      <h3
                        className="text-xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300"
                        style={{ color: "var(--cor-texto-principal)" }}
                      >
                        {member.name}
                      </h3>
                      <p
                        className="font-semibold mb-6 text-lg"
                        style={{ color: "var(--cor-secundaria)" }}
                      >
                        {member.role}
                      </p>
                    </div>

                    {/* Links sociais */}
                    <div className="flex justify-center space-x-4 mt-auto">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                          style={{
                            backgroundColor: "var(--cor-info)",
                            color: "var(--cor-texto-claro)"
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
                            backgroundColor: "var(--cor-fundo-escuro)",
                            color: "var(--cor-texto-claro)"
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

            {/* Linha inferior com 3 cards centralizados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-15 max-w-4xl mx-auto justify-items-center">
              {bottomRowMembers.map((member, index) => (
                <div
                  key={index}
                  className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden animate-fade-in-up"
                  style={{
                    backgroundColor: "var(--cor-fundo-card)",
                    animationDelay: `${(topRowMembers.length + index) * 0.1}s`, // Ajusta o delay para continuar após a primeira linha
                    animationFillMode: 'both',
                    width: '300px', // Fixed width for consistency
                    height: '420px', // Fixed height for consistency
                    borderTop: `6px solid ${
                        index % 3 === 0 ? 'var(--cor-primaria)' :
                        index % 3 === 1 ? 'var(--cor-secundaria)' :
                        'var(--cor-info)'
                    }`
                  }}
                >
                  {/* Background gradient */}
                  <div
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, var(--cor-primaria)20, var(--cor-info)10)`
                    }}
                  ></div>

                  {/* Conteúdo do card */}
                  <div className="relative p-8 text-center h-full flex flex-col justify-between">
                    <div>
                      {/* Avatar */}
                      <div className="relative mb-6">
                        <div
                          className="w-32 h-32 rounded-full mx-auto overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-500"
                          style={{ border: `4px solid var(--cor-info)30` }}
                        >
                          {member.avatar ? (
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "var(--cor-fundo-claro)" }}>
                              <svg className="w-16 h-16" fill="var(--cor-texto-secundario)" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Badge de status */}
                        <div
                          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4"
                          style={{
                            backgroundColor: "var(--cor-sucesso)",
                            borderColor: "var(--cor-fundo-card)"
                          }}
                        ></div>
                      </div>

                      {/* Informações */}
                      <h3
                        className="text-xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300"
                        style={{ color: "var(--cor-texto-principal)" }}
                      >
                        {member.name}
                      </h3>
                      <p
                        className="font-semibold mb-6 text-lg"
                        style={{ color: "var(--cor-secundaria)" }}
                      >
                        {member.role}
                      </p>
                    </div>

                    {/* Links sociais */}
                    <div className="flex justify-center space-x-4 mt-auto">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                          style={{
                            backgroundColor: "var(--cor-info)",
                            color: "var(--cor-texto-claro)"
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
                            backgroundColor: "var(--cor-fundo-escuro)",
                            color: "var(--cor-texto-claro)"
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

        {/* Modernized and Centralized Technologies Section */}
        <TechnologiesSection darkMode={darkMode} /> {/* Pass darkMode as a prop */}
      </div>

      {/* Inline CSS styles for animations */}
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
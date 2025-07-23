import { SignOut, User as UserIcon, List, Moon, Sun } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

// ... importações mantidas
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta("O usuário foi desconectado com sucesso!", 'info');
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div className="relative z-50 w-full py-4 bg-white dark:bg-[#0d0d0f] shadow-lg dark:shadow-[0_4px_16px_rgba(255,255,255,0.06)] border-b border-gray-100 dark:border-[#3b3b3b]">
        <div className="container flex flex-wrap items-center justify-between mx-auto px-6">
          {/* GRUPO ESQUERDO: Logo e Menu Mobile */}          
          <div className="flex items-center gap-4">
            <Link to="/home" className="flex items-center">
              <img
                src="https://ik.imagekit.io/v5ijt4s2j/projetos/logo_navbar.png?updatedAt=1752232304793"
                alt="Logo"
                className="h-12 w-auto"
              />
            </Link>
            <div className="md:hidden ml-auto">
              <button onClick={toggleMenu} className="text-[#005de3] focus:outline-none hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                <List size={32} />
              </button>
            </div>
          </div>

          {/* GRUPO DIREITO: Links + ícones + botão tema */}
          <div className="hidden md:flex items-center gap-6 text-[#1E9FFF] font-semibold">
            <Link to="/oportunidades" className="hover:text-[#003d9e] dark:hover:bg-[#0E0E11] px-3 py-2 rounded-lg transition-all duration-200 ease-in-out">
              Oportunidades
            </Link>
            <Link to="/clientes" className="hover:text-[#003d9e] dark:hover:bg-[#0E0E11] px-3 py-2 rounded-lg transition-all duration-200 ease-in-out">
              Clientes
            </Link>
            <Link to="/planos" className="hover:text-[#003d9e] dark:hover:bg-[#0E0E11] px-3 py-2 rounded-lg transition-all duration-200 ease-in-out">
              Planos
            </Link>
            <Link to="/sobre" className="hover:text-[#003d9e] dark:hover:bg-[#0E0E11] px-3 py-2 rounded-lg transition-all duration-200 ease-in-out">
              Sobre
            </Link>

            {/* Botão de tema escuro/claro */}
            <button
              onClick={toggleDarkMode}
              className="relative p-2 w-16 h-8 flex items-center justify-between rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none"
              title="Alternar tema"
            >
              {/* Ícone da lua (escuro) */}
              <Moon size={20} className={`absolute left-1 transition-all duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />

              {/* Ícone do sol (claro) */}
              <Sun size={20} className={`absolute right-1 transition-all duration-300 ${darkMode ? 'text-[#eaee13]' : 'text-gray-400'}`} />

              {/* Fundo que se move com a transição */}
              <div
                className={`absolute w-8 h-8 rounded-full bg-[#1E9FFF] transition-all duration-300 ease-in-out opacity-80 ${darkMode ? 'left-0' : 'right-0'}`}
              />
            </button>

            <Link to="/perfil" className="hover:text-[#003d9e] hover:bg-blue-50 p-2 rounded-lg transition-all duration-200 ease-in-out">
              <UserIcon size={24} />
            </Link>
            <button onClick={logout} className="hover:text-[#003d9e] hover:bg-blue-50 p-2 rounded-lg transition-all duration-200 ease-in-out">
              <SignOut size={24} />
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden w-full mt-4 px-6 pb-4 border-t border-gray-200 bg-white dark:bg-gray-900">
            <div className="flex flex-col gap-2 text-[#005de3] font-semibold">
              <Link to="/oportunidades" className="block py-3 px-3 hover:text-[#003d9e] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                Oportunidades
              </Link>
              <Link to="/clientes" className="block py-3 px-3 hover:text-[#003d9e] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                Clientes
              </Link>
              <Link to="/projetos" className="block py-3 px-3 hover:text-[#003d9e] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                Projetos
              </Link>
              <Link to="/sobre" className="block py-3 px-3 hover:text-[#003d9e] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                Sobre
              </Link>
              <Link to="/perfil" className="block py-3 px-3 hover:text-[#003d9e] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                Perfil
              </Link>
              <button onClick={logout} className="block text-left py-3 px-3 hover:text-[#003d9e] hover:bg-gray-50 rounded-lg transition-all duration-200">
                Sair
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <>{component}</>;
}

export default Navbar;

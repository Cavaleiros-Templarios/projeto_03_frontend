import { SignOut, User as UserIcon, List } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, type ReactNode } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigate = useNavigate()

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout(){
        handleLogout(),
        ToastAlerta("O usuário foi desconectado com sucesso!", 'info')
        navigate("/")
    }

    let component: ReactNode

    if (usuario.token !== "") {
        component = (
        <div className="w-full py-4 bg-white shadow-lg border-b border-gray-100">
            <div className="container flex flex-wrap items-center justify-between mx-auto px-6">
                <Link to="/home" className="flex items-center">
                    <img
                        src="https://ik.imagekit.io/v5ijt4s2j/projetos/logo_navbar.png?updatedAt=1752232304793"
                        alt="Logo"
                        className="h-12 w-auto"
                    />
                </Link>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-[#005de3] focus:outline-none hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                        <List size={32} />
                    </button>
                </div>

                <div className="hidden md:flex items-center gap-8 text-[#005de3] font-semibold">
                    <Link to="/oportunidades" className="hover:text-[#003d9e] hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out">
                        Oportunidades
                    </Link>
                    <Link to="/clientes" className="hover:text-[#003d9e] hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out">
                        Clientes
                    </Link>
                    <Link to="/planos" className="hover:text-[#003d9e] hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out">
                        Planos
                    </Link>
                    <Link to="/sobre" className="hover:text-[#003d9e] hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out">
                        Sobre
                    </Link>
                    <Link to="/perfil" className="hover:text-[#003d9e] hover:bg-blue-50 p-2 rounded-lg transition-all duration-200 ease-in-out">
                        <UserIcon size={24} />
                    </Link>
                    <Link to="" className="hover:text-[#003d9e] hover:bg-blue-50 p-2 rounded-lg transition-all duration-200 ease-in-out">
                        <SignOut size={24} onClick={logout}/>
                    </Link>
                </div>
            </div>
            
            {isMenuOpen && (
                <div className="md:hidden w-full mt-4 px-6 pb-4 border-t border-gray-200 bg-white">
                    <div className="flex flex-col gap-2 text-[#005de3] font-semibold">
                        <Link to="/oportunidades" className="block py-3 px-3 hover:text-[#003d9e] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                            Oportunidades
                        </Link>
                        <Link to="/clientes" className="block py-3 px-3 hover:text-[#003d9e] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                            Clientes
                        </Link>
                        <Link to="/projetos" className="block py-3 px-3 hover:text-[#003d9e] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                            Projeto
                        </Link>
                        <Link to="/sobre" className="block py-3 px-3 hover:text-[#003d9e] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                            Sobre
                        </Link>
                        <Link to="/perfil" className="block py-3 px-3 hover:text-[#003d9e] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                             Perfil
                        </Link>
                        <Link to="" className="block py-3 px-3 hover:text-[#003d9e] hover:bg-gray-50 rounded-lg transition-all duration-200" onClick={toggleMenu}>
                             Sair
                        </Link>
                    </div>
                </div>
            )}
        </div>
        )
    }

    return (
        <>
            { component }
        </>
    )
}

export default Navbar

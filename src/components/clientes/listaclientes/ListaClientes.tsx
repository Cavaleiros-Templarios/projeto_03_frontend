import { useNavigate } from "react-router-dom";
import CardClientes from "../cardclientes/CardClientes"
import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type Cliente from "../../../models/Cliente";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta"
import ModalCliente from "../modalcliente/ModalCliente";

function ListaClientes() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [clientes, setClientes] = useState<Cliente[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    // Local state to track dark mode, mirroring the global theme
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    // Effect to listen for changes in localStorage 'theme'
    useEffect(() => {
        const handleStorageChange = () => {
            setDarkMode(localStorage.getItem('theme') === 'dark');
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const buscarClientes = useCallback(async () => {
        try {
            setIsLoading(true)

            await buscar("/clientes", setClientes, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
                ToastAlerta("Sessão expirada! Por favor, faça login novamente.", 'info')
                navigate("/")
            } else {
                ToastAlerta("Erro ao buscar clientes.", 'erro')
                console.error(error)
            }
        } finally {
            setIsLoading(false)
        }
    }, [token, handleLogout, navigate]) // Added navigate to useCallback dependencies

    // Função para ser chamada quando um novo cliente é adicionado
    const handleClienteAdded = useCallback(() => {
        buscarClientes(); // Recarrega a lista de clientes
        ToastAlerta("Cliente cadastrado com sucesso!", 'sucesso');
    }, [buscarClientes]);

    useEffect(() => {
        buscarClientes()
    }, [buscarClientes])

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", 'info')
            navigate("/")
        }
    }, [token, navigate])

    return (
        // Main container background and text colors adapt to theme. Added pt-16 for Navbar clearance.
        <div className="min-h-screen pt-5"
             style={{ backgroundColor: "var(--cor-primaria-fundo)", color: "var(--cor-texto-principal)" }}>
            {/* Header Section */}
            <div className="shadow-sm border-b"
                 style={{ backgroundColor: "var(--cor-fundo-card)", borderColor: "var(--cor-borda)" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold"
                                style={{ color: "var(--cor-texto-principal)" }}>Clientes</h1>
                            <p className="mt-1"
                               style={{ color: "var(--cor-texto-secundario)" }}>Gerencie seus clientes de forma eficiente</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <ModalCliente onClienteAdded={handleClienteAdded} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Loading State */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center"
                             style={{ backgroundColor: "var(--cor-fundo-card)", boxShadow: "0 4px 6px var(--cor-sombra)" }}>
                            <DNA
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                            />
                            <p className="mt-4 font-medium"
                               style={{ color: "var(--cor-texto-secundario)" }}>Carregando clientes...</p>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {(!isLoading && clientes.length === 0) && (
                    <div className="text-center py-16">
                        <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6"
                             style={{ backgroundColor: "var(--cor-fundo-claro)", color: "var(--cor-texto-secundario)" }}>
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2"
                            style={{ color: "var(--cor-texto-principal)" }}>
                            Nenhum cliente encontrado
                        </h3>
                        <p className="mb-6 max-w-md mx-auto"
                           style={{ color: "var(--cor-texto-secundario)" }}>
                            Comece adicionando seu primeiro cliente para começar a gerenciar sua base de dados.
                        </p>
                        <ModalCliente onClienteAdded={handleClienteAdded} />
                    </div>
                )}

                {/* Clients Grid */}
                {(!isLoading && clientes.length > 0) && (
                    <div>
                        {/* Stats Bar */}
                        <div className="rounded-lg shadow-sm border p-6 mb-8"
                             style={{ backgroundColor: "var(--cor-fundo-card)", borderColor: "var(--cor-borda)" }}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold"
                                             style={{ color: "var(--cor-primaria)" }}> {/* Primary color for total */}
                                            {clientes.length}
                                        </div>
                                        <div className="text-sm"
                                             style={{ color: "var(--cor-texto-secundario)" }}>
                                            {clientes.length === 1 ? 'Cliente' : 'Clientes'}
                                        </div>
                                    </div>
                                    <div className="h-8 w-px" style={{ backgroundColor: "var(--cor-borda)" }}></div> {/* Border color adapts */}
                                    <div className="text-sm" style={{ color: "var(--cor-texto-secundario)" }}>
                                        Total de registros na base de dados
                                    </div>
                                </div>
                                <div className="text-sm" style={{ color: "var(--cor-texto-secundario)" }}>
                                    Atualizado agora
                                </div>
                            </div>
                        </div>

                        {/* Clients Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {clientes.map((cliente) => (
                                <div key={cliente.id}
                                     className="transform hover:scale-105 transition-transform duration-200">
                                    <CardClientes cliente={cliente} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListaClientes;
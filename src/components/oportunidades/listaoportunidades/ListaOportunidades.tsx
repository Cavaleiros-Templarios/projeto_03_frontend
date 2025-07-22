import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta"
import type Oportunidade from "../../../models/Oportunidade";
import CardOportunidades from "../cardoportunidades/CardOportunidades";
import ModalOportunidade from "../modaloportunidade/ModalOportunidade";

function ListaOportunidades() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [oportunidades, setOportunidades] = useState<Oportunidade[]>([])
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

    async function buscarOportunidades() {
        try {
            setIsLoading(true)
            await buscar("/oportunidades", setOportunidades, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
                ToastAlerta("Sessão expirada! Por favor, faça login novamente.", 'info');
                navigate("/");
            } else {
                ToastAlerta("Erro ao buscar oportunidades.", 'erro');
                console.error(error);
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleOportunidadeAtualizada = () => {
        buscarOportunidades();
    };

    useEffect(() => {
        buscarOportunidades()
    }, []) // Empty dependency array means this runs once on mount

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", 'info')
            navigate("/")
        }
    }, [token, navigate]) // Added navigate to dependency array

    return (
        // Main container background and text colors adapt to theme. Added pt-16 for Navbar clearance.
        <div className="min-h-screen pt-16"
             style={{ backgroundColor: "var(--cor-primaria-fundo)", color: "var(--cor-texto-principal)" }}>
            {/* Header Section */}
            <div className="shadow-sm border-b"
                 style={{ backgroundColor: "var(--cor-fundo-card)", borderColor: "var(--cor-borda)" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        {/* Title Section */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl shadow-lg"
                                 style={{ backgroundImage: `linear-gradient(to bottom, var(--cor-primaria), var(--cor-primaria-hover))` }}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     style={{ color: "var(--cor-texto-claro)" }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold"
                                    style={{ color: "var(--cor-texto-principal)" }}>KAVIO CRM</h1>
                                <p className="text-sm"
                                   style={{ color: "var(--cor-texto-secundario)" }}>Gestão de Oportunidades</p>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="hidden md:flex items-center space-x-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold"
                                     style={{ color: "var(--cor-primaria)" }}>{oportunidades.length}</div> {/* Primary color for total */}
                                <div className="text-xs uppercase tracking-wide"
                                     style={{ color: "var(--cor-texto-secundario)" }}>Total</div>
                            </div>
                            <div className="w-px h-8" style={{ backgroundColor: "var(--cor-borda)" }}></div> {/* Border color adapts */}
                            <div className="text-center">
                                <div className="text-2xl font-bold"
                                     style={{ color: "var(--cor-sucesso)" }}> {/* Success color for active */}
                                    {oportunidades.filter(op => op.status?.toLowerCase().includes('')).length}
                                </div>
                                <div className="text-xs uppercase tracking-wide"
                                     style={{ color: "var(--cor-texto-secundario)" }}>Ativas</div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex items-center space-x-4">
                            <ModalOportunidade
                                onOportunidadeAtualizada={handleOportunidadeAtualizada}
                                triggerButton={true}
                            />
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
                             style={{ backgroundColor: "var(--cor-fundo-card)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}>
                            <DNA
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                            />
                            <p className="mt-4 font-medium"
                               style={{ color: "var(--cor-texto-secundario)" }}>Carregando oportunidades...</p>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {(!isLoading && oportunidades.length === 0) && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="rounded-2xl shadow-lg p-12 text-center max-w-md mx-auto"
                             style={{ backgroundColor: "var(--cor-fundo-card)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}>
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                                 style={{ backgroundColor: "var(--cor-fundo-claro)" }}> {/* Background adapts */}
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     style={{ color: "var(--cor-texto-secundario)" }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2"
                                style={{ color: "var(--cor-texto-principal)" }}>Nenhuma oportunidade encontrada</h3>
                            <p className="mb-6"
                               style={{ color: "var(--cor-texto-secundario)" }}>Comece criando sua primeira oportunidade de negócio.</p>
                            <ModalOportunidade
                                onOportunidadeAtualizada={handleOportunidadeAtualizada}
                                triggerButton={true}
                            />
                        </div>
                    </div>
                )}

                {/* Opportunities Grid */}
                {(!isLoading && oportunidades.length > 0) && (
                    <div className="space-y-6">
                        {/* Filter/Sort Bar */}
                        <div className="rounded-xl shadow-sm border p-4"
                             style={{ backgroundColor: "var(--cor-fundo-card)", borderColor: "var(--cor-borda)" }}>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                                <div className="flex items-center space-x-4">
                                    <h2 className="text-lg font-semibold"
                                        style={{ color: "var(--cor-texto-principal)" }}>
                                        Suas Oportunidades ({oportunidades.length})
                                    </h2>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button className="inline-flex items-center px-3 py-2 border rounded-lg text-sm font-medium transition-colors"
                                            style={{
                                                borderColor: "var(--cor-borda)",
                                                backgroundColor: "var(--cor-fundo-claro)",
                                                color: "var(--cor-texto-principal)"
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--cor-borda)'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--cor-fundo-claro)'}>
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             style={{ color: "var(--cor-texto-principal)" }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                        </svg>
                                        Filtrar
                                    </button>
                                    <button className="inline-flex items-center px-3 py-2 border rounded-lg text-sm font-medium transition-colors"
                                            style={{
                                                borderColor: "var(--cor-borda)",
                                                backgroundColor: "var(--cor-fundo-claro)",
                                                color: "var(--cor-texto-principal)"
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--cor-borda)'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--cor-fundo-claro)'}>
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             style={{ color: "var(--cor-texto-principal)" }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                        Ordenar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {oportunidades.map((oportunidade) => (
                                <div key={oportunidade.id} className="transform transition-all duration-200 hover:scale-105">
                                    <CardOportunidades
                                        oportunidade={oportunidade}
                                        onOportunidadeAtualizada={handleOportunidadeAtualizada}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListaOportunidades;
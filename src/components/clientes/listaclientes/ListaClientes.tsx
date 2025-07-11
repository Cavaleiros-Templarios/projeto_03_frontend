import { useNavigate } from "react-router-dom";
import CardClientes from "../cardclientes/CardClientes"
import { useContext, useEffect, useState } from "react";
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

    async function buscarClientes() {
        try {
            setIsLoading(true)

            await buscar("/clientes", setClientes, {
                headers: { Authorization: token}
            })
        } catch (error: any) {
            if(error.toString().includes("401")){
                handleLogout()
            }
        } finally{
            setIsLoading(false)
        }
        
    }

    const handleClienteCadastrado = () => {
        buscarClientes();
    };

    useEffect(()=> {
        buscarClientes()
    }, [])

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", 'info')
            navigate("/")
        }
    }, [token])

    // Função para contar clientes com oportunidades
    const getClientesComOportunidades = () => {
        return clientes.filter(cliente => cliente.oportunidade && cliente.oportunidade.length > 0).length;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header Section */}        
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center py-6">
                        {/* Title Section */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                                
                            </div>

                        {/* Stats Section */}
                        <div className="hidden md:flex items-center space-x-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-indigo-600">{clientes.length}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wide">Total</div>
                            </div>
                            <div className="w-px h-8 bg-slate-200"></div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-600">
                                    {getClientesComOportunidades()}
                                </div>
                                <div className="text-xs text-slate-500 uppercase tracking-wide">Com Oportunidades</div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-end space-x-4">
                            <ModalCliente />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Loading State */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
                            <DNA
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                            />
                            <p className="mt-4 text-slate-600 font-medium">Carregando clientes...</p>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {(!isLoading && clientes.length === 0) && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md mx-auto">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Nenhum cliente encontrado</h3>
                            <p className="text-slate-600 mb-6">Comece criando seu primeiro cliente.</p>
                            <ModalCliente />
                        </div>
                    </div>
                )}

                {/* Clients Grid */}
                {(!isLoading && clientes.length > 0) && (
                    <div className="space-y-6">
                        {/* Filter/Sort Bar */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                                <div className="flex items-center space-x-4">
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Seus Clientes ({clientes.length})
                                    </h2>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button className="inline-flex items-center px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                        </svg>
                                        Filtrar
                                    </button>
                                    <button className="inline-flex items-center px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                        Ordenar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {clientes.map((cliente) => (
                                <div key={cliente.id} className="transform transition-all duration-200 hover:scale-105">
                                    <CardClientes cliente={cliente}/>
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


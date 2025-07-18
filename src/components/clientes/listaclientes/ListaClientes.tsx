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

    const buscarClientes = useCallback(async () => {
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
    }, [token, handleLogout])

    // Função para ser chamada quando um novo cliente é adicionado
    const handleClienteAdded = useCallback(() => {
        buscarClientes(); // Recarrega a lista de clientes
        ToastAlerta("Cliente cadastrado com sucesso!", 'sucesso');
    }, [buscarClientes]);

    useEffect(()=> {
        buscarClientes()
    }, [buscarClientes])

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", 'info')
            navigate("/")
        }
    }, [token, navigate])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
                            <p className="text-gray-600 mt-1">Gerencie seus clientes de forma eficiente</p>
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
                        <DNA
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                        <p className="text-gray-600 mt-4 font-medium">Carregando clientes...</p>
                    </div>
                )}

                {/* Empty State */}
                {(!isLoading && clientes.length === 0) && (
                    <div className="text-center py-16">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Nenhum cliente encontrado
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Comece adicionando seu primeiro cliente para começar a gerenciar sua base de dados.
                        </p>
                        <ModalCliente onClienteAdded={handleClienteAdded} />
                    </div>
                )}

                {/* Clients Grid */}
                {(!isLoading && clientes.length > 0) && (
                    <div>
                        {/* Stats Bar */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[#005de3]">
                                            {clientes.length}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {clientes.length === 1 ? 'Cliente' : 'Clientes'}
                                        </div>
                                    </div>
                                    <div className="h-8 w-px bg-gray-200"></div>
                                    <div className="text-sm text-gray-600">
                                        Total de registros na base de dados
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">
                                    Atualizado agora
                                </div>
                            </div>
                        </div>

                        {/* Clients Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {clientes.map((cliente) => (
                                <div key={cliente.id} 
                                     className="transform hover:scale-105 transition-transform duration-200">
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


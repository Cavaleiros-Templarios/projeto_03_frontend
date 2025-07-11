import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Cliente from "../../../models/Cliente"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { ToastAlerta } from "../../../utils/ToastAlerta"

interface FormClienteProps {
    onSuccess?: () => void; // Add onSuccess prop
}

function FormCliente({ onSuccess }: FormClienteProps) {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [cliente, setCliente] = useState<Cliente>({} as Cliente)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    
    const { id } = useParams<{ id: string }>()

    // Determina se é edição baseado no clienteParaEditar ou no id da URL
    const isEdicao = clienteParaEditar !== null || id !== undefined;

    async function buscarClientePorId(id: string) {
        try {
            await buscar(`/clientes/${id}`, setCliente, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        // Só verifica token se não for modal
        if (!isModal && token === "") {
            ToastAlerta("Você precisa estar logado!", 'info')
            navigate("/")
        }
    }, [token, isModal, navigate])

    useEffect(() => {
        if (clienteParaEditar) {
            console.log('Preenchendo formulário com cliente para editar:', clienteParaEditar);
            setCliente(clienteParaEditar)
        } else if (id !== undefined) {
            console.log('Buscando cliente por ID:', id);
            buscarClientePorId(id)
        } else {
            console.log('Novo cliente - limpando formulário');
            setCliente({
                id: undefined,
                nome: "",
                email: ""
            })
        }
    }, [id, clienteParaEditar])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovoCliente(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log('Iniciando cadastro/atualização de cliente');
        setIsLoading(true)

        try {
            if (isEdicao) {
                console.log('Atualizando cliente existente');
                const clienteId = clienteParaEditar?.id || id;
                await atualizar(`/clientes/${clienteId}`, cliente, setCliente, {
                    headers: { Authorization: token }
                })
                ToastAlerta("O Cliente foi atualizado com sucesso!", 'sucesso')
                
                // Call onSuccess callback after successful update
                if (onSuccess) {
                    onSuccess();
                }
            } catch (error: any) {
                if(error.toString().includes("401")){
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao atualizar o cliente!", 'erro')
                    console.error(error)
                }
            }
        } else {
            try {
                await cadastrar("/clientes", cliente, setCliente, {
                    headers: { Authorization: token }
                })
                ToastAlerta("O Cliente foi cadastrado com sucesso!", 'sucesso')
                
                // Call onSuccess callback after successful registration
                if (onSuccess) {
                    onSuccess();
                }
            } catch (error: any) {
                if(error.toString().includes("401")){
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao cadastrar o cliente!", 'erro')
                    console.error(error)
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar(){
        navigate("/clientes")
    }

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Título removido quando usado no modal */}
            {!onSuccess && (
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {id === undefined ? "Cadastrar Cliente" : "Editar Cliente"}
                    </h1>
                    <div className="w-16 h-1 bg-[#005de3] mx-auto rounded-full"></div>
                </div>
            )}

            <form className="space-y-6" onSubmit={gerarNovoCliente}>
                {/* Campo Nome */}
                <div className="space-y-2">
                    <label 
                        htmlFor="nome" 
                        className="block text-sm font-semibold text-gray-700"
                    >
                        Nome do Cliente
                    </label>
                    <input
                        type="text"
                        placeholder="Digite o nome completo"
                        name='nome'
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                                  focus:border-[#005de3] focus:ring-2 focus:ring-[#005de3] focus:ring-opacity-20
                                  transition-all duration-200 outline-none
                                  placeholder-gray-400 text-gray-700"
                        value={cliente.nome || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        required
                    />
                </div>

                {/* Campo Email */}
                <div className="space-y-2">
                    <label 
                        htmlFor="email" 
                        className="block text-sm font-semibold text-gray-700"
                    >
                        E-mail do Cliente
                    </label>
                    <input
                        type="email"
                        placeholder="Digite o e-mail"
                        name='email'
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                                  focus:border-[#005de3] focus:ring-2 focus:ring-[#005de3] focus:ring-opacity-20
                                  transition-all duration-200 outline-none
                                  placeholder-gray-400 text-gray-700"
                        value={cliente.email || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        required
                    />
                </div>

                {/* Botão Submit */}
                <button
                    className="w-full bg-[#005de3] text-white py-3 px-6 rounded-lg font-semibold
                              hover:bg-[#004bb8] hover:shadow-lg transform hover:scale-[1.02]
                              transition-all duration-200 ease-in-out
                              focus:outline-none focus:ring-2 focus:ring-[#005de3] focus:ring-opacity-50
                              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                              flex items-center justify-center min-h-[48px]"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center space-x-2">
                            <RotatingLines 
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> 
                            <span>Processando...</span>
                        </div>
                    ) : (
                        <span>{id === undefined ? "Cadastrar Cliente" : "Atualizar Cliente"}</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormCliente;


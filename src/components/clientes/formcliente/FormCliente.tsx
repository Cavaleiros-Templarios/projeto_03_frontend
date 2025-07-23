import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Cliente from "../../../models/Cliente"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { ToastAlerta } from "../../../utils/ToastAlerta"

interface FormClienteProps {
    onSuccess?: () => void; // Add onSuccess prop
    onCancel?: () => void; // Add onCancel prop for modal
    clienteParaEditar?: Cliente | null; // Prop for editing via props
    isModal?: boolean; // If it's used inside a modal
}

function FormCliente({
    onSuccess,
    onCancel,
    clienteParaEditar = null,
    isModal = false
}: FormClienteProps) {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [cliente, setCliente] = useState<Cliente>({} as Cliente)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    // Determine if it's an edit operation: via props (modal) or via URL (page)
    const isEdicao = clienteParaEditar !== null || id !== undefined;

    async function buscarClientePorId(clienteId: string | number) {
        try {
            await buscar(`/clientes/${clienteId}`, setCliente, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
                ToastAlerta("Sessão expirada! Por favor, faça login novamente.", 'info')
                navigate("/")
            } else {
                ToastAlerta("Erro ao buscar cliente.", 'erro')
                console.error(error)
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", 'info')
            navigate("/")
        }
    }, [token, navigate])

    useEffect(() => {
        // If editing via props (modal)
        if (clienteParaEditar) {
            setCliente(clienteParaEditar);
        }
        // If editing via URL (page)
        else if (id !== undefined) {
            buscarClientePorId(id)
        } else {
            setCliente({
                id: undefined,
                nome: "",
                email: ""
            })
        }
    }, [id, clienteParaEditar]) // Added clienteParaEditar to dependency array

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovoCliente(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (isEdicao) {
                await atualizar("/clientes", cliente, setCliente, {
                    headers: { Authorization: token }
                })
                ToastAlerta("O Cliente foi atualizado com sucesso!", 'sucesso')

                setTimeout(() => {
                    setIsLoading(false);
                    if (isModal && onSuccess) {
                        onSuccess(); // Call onSuccess callback after successful update
                    } else if (onSuccess) { // For non-modal, but still with callback
                        onSuccess();
                    } else {
                        navigate('/clientes'); // Fallback for standalone page
                    }
                }, 1500);

            } else {
                await cadastrar("/clientes", cliente, setCliente, {
                    headers: { Authorization: token }
                })
                ToastAlerta("O Cliente foi cadastrado com sucesso!", 'sucesso')

                setTimeout(() => {
                    setIsLoading(false);
                    if (onSuccess) {
                        onSuccess(); // Call onSuccess callback after successful registration
                    } else {
                        navigate('/clientes'); // Fallback for standalone page
                    }
                }, 1500);
            }
        } catch (error: any) {
            setIsLoading(false)
            if (error.toString().includes("401")) {
                handleLogout()
                ToastAlerta("Sessão expirada! Por favor, faça login novamente.", 'info')
                navigate("/")
            } else {
                ToastAlerta(isEdicao ? "Erro ao atualizar o cliente!" : "Erro ao cadastrar o cliente!", 'erro')
                console.error(error)
            }
        }
    }

    // Conditional styling based on whether it's a modal or a page
    const containerClass = isModal
        ? "p-6" // Modal: simple padding
        : "bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-md mx-auto my-8"; // Page: complete container

    const headerComponent = !isModal ? (
        // Header only for page (modal already has its own header)
        <div className="bg-gradient-to-b from-[#167cf1] to-[#005de3] px-8 py-6">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isEdicao ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        )}
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">
                        {isEdicao ? 'Editar Cliente' : 'Novo Cliente'}
                    </h2>
                    <p className="text-indigo-100 text-sm">
                        {isEdicao ? 'Atualize as informações do cliente' : 'Preencha os dados para criar um novo cliente'}
                    </p>
                </div>
            </div>
        </div>
    ) : null;


    return (
        <div className={containerClass}>
            {headerComponent}

            {/* Formulário */}
            <div className={isModal ? "" : "p-8"}>
                <form className="space-y-6" onSubmit={gerarNovoCliente}>
                    {/* Campo Nome */}
                    <div className="space-y-2">
                        <label
                            htmlFor="nome"
                            className="block text-sm font-bold text-slate-700"
                        >
                            Nome do Cliente *
                        </label>
                        <input
                            type="text"
                            placeholder="Digite o nome completo"
                            name='nome'
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 text-slate-900 font-medium"
                            value={cliente.nome || ""}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            required
                        />
                    </div>

                {/* Campo Email */}
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold"
                        style={{ color: "var(--cor-texto-principal)" }}
                    >
                        E-mail do Cliente
                    </label>
                    <input
                        type="email"
                        placeholder="Digite o e-mail"
                        name='email'
                        className="w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 outline-none font-medium
                                   placeholder-cor-texto-secundario text-cor-texto-principal
                                   focus:border-cor-primaria focus:ring-2 focus:ring-cor-primaria focus:ring-opacity-20" // Replaced custom props with direct Tailwind classes
                        style={{
                            borderColor: "var(--cor-borda)",
                            backgroundColor: "var(--cor-fundo-claro)",
                            color: "var(--cor-texto-preto)",
                        }}
                        value={cliente.email || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        required
                    />
                </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-slate-100">
                        <button
                            type='submit'
                            className='flex-1 inline-flex items-center justify-center px-8 py-4 bg-gradient-to-b from-[#167cf1] to-[#005de3] hover:from-indigo-700 hover:to-[#005de3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <RotatingLines
                                        strokeColor="white"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="24"
                                        visible={true}
                                    />
                                    <span className="ml-3">Processando...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {isEdicao ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
                                </>
                            )}
                        </button>

                        {onCancel && (
                            <button
                                type='button'
                                className='flex-1 inline-flex items-center justify-center px-8 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-slate-500 focus:ring-offset-2 text-lg'
                                onClick={onCancel}
                                disabled={isLoading}
                            >
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormCliente;
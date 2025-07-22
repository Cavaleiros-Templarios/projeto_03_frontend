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

    const { id } = useParams<{ id: string }>()

    async function buscarClientePorId(id: string) {
        try {
            await buscar(`/clientes/${id}`, setCliente, {
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
        if (id !== undefined) {
            buscarClientePorId(id)
        } else {
            setCliente({
                id: undefined,
                nome: "",
                email: ""
            })
        }
    }, [id, token])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovoCliente(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (id !== undefined) {
                await atualizar("/clientes", cliente, setCliente, {
                    headers: { Authorization: token }
                })
                ToastAlerta("O Cliente foi atualizado com sucesso!", 'sucesso')

                if (onSuccess) {
                    onSuccess(); // Call onSuccess callback after successful update
                }
            } else {
                await cadastrar("/clientes", cliente, setCliente, {
                    headers: { Authorization: token }
                })
                ToastAlerta("O Cliente foi cadastrado com sucesso!", 'sucesso')

                if (onSuccess) {
                    onSuccess(); // Call onSuccess callback after successful registration
                }
            }
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
                ToastAlerta("Sessão expirada! Por favor, faça login novamente.", 'info')
                navigate("/")
            } else {
                ToastAlerta(id !== undefined ? "Erro ao atualizar o cliente!" : "Erro ao cadastrar o cliente!", 'erro')
                console.error(error)
            }
        } finally {
            setIsLoading(false)
            retornar()
        }
    }

    function retornar() {
        navigate("/clientes")
    }

    return (
        // Main container uses global background color and dark mode text. Added pt-16 for Navbar clearance if not a modal.
        <div className={`w-full max-w-md mx-auto ${onSuccess ? '' : 'pt-16 min-h-screen flex items-center justify-center'}`}
             style={{ backgroundColor: onSuccess ? 'transparent' : 'var(--cor-primaria-fundo)', color: "var(--cor-texto-principal)" }}>
            {/* Título removido quando usado no modal (onSuccess prop implies modal usage) */}
            {!onSuccess && (
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--cor-texto-principal)" }}>
                        {id === undefined ? "Cadastrar Cliente" : "Editar Cliente"}
                    </h1>
                    <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: "var(--cor-primaria)" }}></div>
                </div>
            )}

            <form className="space-y-6 p-6 rounded-2xl shadow-xl border"
                  style={{
                      backgroundColor: "var(--cor-fundo-card)",
                      borderColor: "var(--cor-borda)",
                      boxShadow: "0 4px 6px var(--cor-sombra)"
                  }}
                  onSubmit={gerarNovoCliente}>
                {/* Campo Nome */}
                <div className="space-y-2">
                    <label
                        htmlFor="nome"
                        className="block text-sm font-semibold"
                        style={{ color: "var(--cor-texto-principal)" }}
                    >
                        Nome do Cliente
                    </label>
                    <input
                        type="text"
                        placeholder="Digite o nome completo"
                        name='nome'
                        className="w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 outline-none font-medium
                                   placeholder-cor-texto-secundario text-cor-texto-principal
                                   focus:border-cor-primaria focus:ring-2 focus:ring-cor-primaria focus:ring-opacity-20" // Replaced custom props with direct Tailwind classes
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
                            color: "var(--cor-texto-principal)",
                        }}
                        value={cliente.email || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        required
                    />
                </div>

                {/* Botão Submit */}
                <button
                    className="w-full text-white py-3 px-6 rounded-lg font-semibold
                                hover:shadow-lg transform hover:scale-[1.02]
                                transition-all duration-200 ease-in-out
                                focus:outline-none focus:ring-2 focus:ring-cor-primaria focus:ring-opacity-50 focus:ring-offset-2 // Replaced custom prop with direct Tailwind class
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                flex items-center justify-center min-h-[48px]"
                    style={{
                        backgroundColor: "var(--cor-primaria)", // Default button background
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--cor-primaria-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--cor-primaria)'}
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
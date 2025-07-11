import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Cliente from "../../../models/Cliente"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { ToastAlerta } from "../../../utils/ToastAlerta"

// Interface para as props do componente
interface FormClienteProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    clienteParaEditar?: Cliente | null;
    isModal?: boolean;
}

function FormCliente({ 
    onSuccess, 
    onCancel, 
    clienteParaEditar = null, 
    isModal = false 
}: FormClienteProps) {

    console.log('FormCliente renderizado com props:', { onSuccess: !!onSuccess, onCancel: !!onCancel, isModal });

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
            } else {
                console.log('Cadastrando novo cliente');
                await cadastrar("/clientes", cliente, setCliente, {
                    headers: { Authorization: token }
                })
                ToastAlerta("O Cliente foi cadastrado com sucesso!", 'sucesso')
            }

            console.log('Operação bem-sucedida. isModal:', isModal, 'onSuccess:', !!onSuccess);

            // Se for modal, sempre chama onSuccess
            if (isModal && onSuccess) {
                console.log('Chamando onSuccess');
                onSuccess();
                return; // Sai da função para não executar mais nada
            }
            
            // Se não for modal, navega normalmente
            if (!isModal) {
                console.log('Navegando para /clientes');
                navigate("/clientes");
            }

        } catch (error: any) {
            console.error('Erro ao salvar cliente:', error);
            if (error.toString().includes("401")) {
                handleLogout()
            } else {
                ToastAlerta(`Erro ao ${isEdicao ? 'atualizar' : 'cadastrar'} o cliente!`, 'erro')
            }
        } finally {
            setIsLoading(false)
        }
    }

    function handleCancelar() {
        console.log('Cancelando. isModal:', isModal, 'onCancel:', !!onCancel);
        if (isModal && onCancel) {
            console.log('Chamando onCancel');
            onCancel();
        } else if (!isModal) {
            console.log('Navegando para /clientes');
            navigate("/clientes");
        }
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {isEdicao ? "Editar Cliente" : "Cadastrar Cliente"}
            </h1>

            <form className="w-1/2 flex flex-col gap-4"
                onSubmit={gerarNovoCliente}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome">Nome do Cliente</label>
                    <input
                        type="text"
                        placeholder="Digite o nome do cliente"
                        name='nome'
                        className="border-2 border-slate-700 rounded p-2"
                        value={cliente.nome || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">E-mail do Cliente</label>
                    <input
                        type="email"
                        placeholder="Digite o e-mail do cliente"
                        name='email'
                        className="border-2 border-slate-700 rounded p-2"
                        value={cliente.email || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        required
                    />
                </div>
                
                <div className="flex gap-4 justify-center">
                    <button
                        className="rounded text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-800 w-1/2 py-2 flex justify-center"
                        type="submit"
                        disabled={isLoading}>
                        {
                            isLoading ? (
                                <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} />
                            ) : (
                                <span>{isEdicao ? "Atualizar" : "Cadastrar"}</span>
                            )
                        }
                    </button>

                    {/* Botão de cancelar - aparece no modal ou quando onCancel é fornecido */}
                    {(isModal || onCancel) && (
                        <button
                            type="button"
                            onClick={handleCancelar}
                            className="rounded text-slate-700 bg-gray-300 
                                       hover:bg-gray-400 w-1/2 py-2"
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default FormCliente;


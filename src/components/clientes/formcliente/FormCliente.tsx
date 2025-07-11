import { useContext, useEffect, useState, type ChangeEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Cliente from "../../../models/Cliente"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function FormCliente() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [cliente, setCliente] = useState<Cliente>({} as Cliente)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    
    const { id } = useParams<{ id: string }>()

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
            if (token === "") {
                ToastAlerta("Você precisa estar logado!", 'info')
                navigate("/")
            }
        },[token])

    useEffect(() => {
        if (id !== undefined) {
            buscarClientePorId(id)
        } else {
            setCliente({
                id: undefined,
                nome:"",
                email:""
            })
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovoCliente(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if(id !== undefined){
            try {
                await atualizar("/clientes", cliente, setCliente, {
                    headers: { Authorization: token }
                })
                ToastAlerta("O Cliente foi atualizado com sucesso!", 'sucesso')
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
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? "Cadastrar Cliente" : "Editar Cliente"}
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
                        value={cliente.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">E-mail do Cliente</label>
                    <input
                        type="text"
                        placeholder="Digite o e-mail do cliente"
                        name='email'
                        className="border-2 border-slate-700 rounded p-2"
                        value={cliente.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                        
                    {
                        isLoading ? (
                            <RotatingLines strokeColor="white"strokeWidth="5"animationDuration="0.75"width="24"visible={true}/> 
                        ) : (
                            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                        )
                    }
                </button>
            </form>
        </div>
    );
}

export default FormCliente;
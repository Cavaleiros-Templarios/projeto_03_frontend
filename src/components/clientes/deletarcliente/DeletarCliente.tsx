import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Cliente from "../../../models/Cliente"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarCliente() {

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
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarClientePorId(id)
        }
    }, [id])

    async function deletarCliente() {
        setIsLoading(true)

        try {
            await deletar(`/clientes/${id}`, {
                headers: { Authorization: token }
            })
            ToastAlerta("Cliente excluído com sucesso!", 'sucesso')

        } catch (error: any) {
            if(error.toString().includes("401")){
                handleLogout()
            } else {
                ToastAlerta("Erro ao excluir o cliente!", 'erro')
                console.error(error)
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar(){
        navigate("/clientes")
    }

    return (
        <div className= 'bg-[#0E0E11] h-svh'> 
            <div className=' container mx-auto p-4 md:p-8 max-w-lg'>
                <h1 className='text-4xl text-center font-bold mb-6 text-[#1E9FFF]'>Deletar Cliente</h1>
                <p className='text-center text-lg mb-6 text-gray-300'>
                    Você tem certeza de que deseja apagar o cliente a seguir?</p>
                <div className='border border-gray-700 rounded-xl overflow-hidden shadow-lg bg-[#18181B]'>
                    <header 
                        className='py-3 px-6 bg-gradient-to-r from-[#0f5bc7] to-[#0e53bb] text-white font-semibold text-2xl'>
                        Detalhes do Cliente
                    </header>
                    <p className='p-8 text-3xl font-medium text-gray-300 bg-[#18181B] h-full'>
                        <span className="font-bold">Nome:</span> {cliente.nome}
                    </p>
                    <div className="flex justify-evenly border-t border-gray-300">
                        <button 
                            className='w-full py-3 text-lg font-semibold text-red-700 bg-white 
                                    hover:bg-red-200 transition duration-300 ease-in-out'
                            onClick={retornar}
                        >
                            Não
                        </button>
                        <button 
                            className='w-full py-3 text-lg font-semibold text-white bg-[#005de3] 
                                    hover:bg-[#004ac9] transition duration-300 ease-in-out 
                                    flex items-center justify-center space-x-2'
                            onClick={deletarCliente}
                        >
                            {isLoading ? (
                                <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> 
                                ) : ( 
                                <span>Sim</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>    
    )
}
export default DeletarCliente
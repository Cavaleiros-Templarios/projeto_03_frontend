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

    useEffect(()=> {
        buscarClientes()
    }, [clientes.length])

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", 'info')
            navigate("/")
        }
    }, [token])

    return (
        <>
            <div className="container flex justify-end pt-4">
                            <div className="flex justify-around gap-4 text-white bg-indigo-900">
                                <ModalCliente />
                            </div>
            </div>
            {isLoading && (
                <DNA
                visible={true}
                height="200"
                width="200"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">

                    {
                        (!isLoading && clientes.length === 0) && (
                            <span className="text-3xl text-center my-8">
                                Nenhum Cliente foi encontrado!
                            </span>
                        )
                    }
                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                        {clientes.map((cliente) => (
                            <CardClientes key={cliente.id} cliente={cliente}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaClientes;
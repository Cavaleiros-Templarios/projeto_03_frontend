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

    async function buscarOportunidades() {
        try {
            setIsLoading(true)

            await buscar("/oportunidades", setOportunidades, {
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
        buscarOportunidades()
    }, [oportunidades.length])

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
                                <ModalOportunidade />
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
                        (!isLoading && oportunidades.length === 0) && (
                            <span className="text-3xl text-center my-8">
                                Nenhum Oportunidade foi encontrada!
                            </span>
                        )
                    }
                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                        {oportunidades.map((oportunidade) => (
                            <CardOportunidades key={oportunidade.id} oportunidade={oportunidade}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaOportunidades;
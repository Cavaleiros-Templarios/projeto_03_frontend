import { useState, useContext, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";


import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type Oportunidade from "../../../models/Oportunidade";
import type Cliente from "../../../models/Cliente";

function FormOportunidade() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [clientes, setClientes] = useState<Cliente[]>([])

    const [cliente, setCliente] = useState<Cliente>({ id: 0, nome: '', email: '' })
    const [oportunidade, setOportunidade] = useState<Oportunidade>({} as Oportunidade)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarOportunidadePorId(id: string) {
        try {
            await buscar(`/oportunidades/${id}`, setOportunidade, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

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

    async function buscarClientes() {
        try {
            await buscar('/clientes', setClientes, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "info");
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarClientes()

        if (id !== undefined) {
            buscarOportunidadePorId(id)
        }
    }, [id])

    useEffect(() => {
        setOportunidade({
            ...oportunidade,
            cliente: cliente,
        })
    }, [cliente])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setOportunidade({
            ...oportunidade,
            [e.target.name]: e.target.value,
            cliente: cliente,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/oportunidades');
    }

    async function gerarNovaOportunidade(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/oportunidades`, oportunidade, setOportunidade, {
                    headers: {
                        Authorization: token,
                    },
                });

                ToastAlerta('Oportunidade atualizada com sucesso', "sucesso")

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao atualizar a Oportunidade', "erro")
                }
            }

        } else {
            try {
                await cadastrar(`/oportunidades`, oportunidade, setOportunidade, {
                    headers: {
                        Authorization: token,
                    },
                })

                ToastAlerta('Oportunidade cadastrada com sucesso', "sucesso");

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao cadastrar a Oportunidade', "erro");
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoCliente = cliente.nome === '';

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Oportunidade' : 'Cadastrar Oportunidade'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaOportunidade}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Título da Oportunidade</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={oportunidade.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Status da Oportunidade</label>
                    <input
                        type="text"
                        placeholder="Status"
                        name="status"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={oportunidade.status}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Valor da Oportunidade</label>
                    <input
                        type="number"
                        placeholder="Valor"
                        name="valor"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={oportunidade.valor}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="data_abertura">Data de Abertura da Oportunidade</label>
                    <input
                        type="date"
                        name="data_abertura"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={oportunidade.data_abertura?.split('T')[0]}
                        onChange={(e) => {
                            const dataCompleta = e.target.value + 'T12:00:00.000000';
                            
                            atualizarEstado({
                                ...e,
                                target: { ...e.target, value: dataCompleta }
                            });
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="data_fechamento">Data de fechamento da Oportunidade</label>
                    <input
                        type="date"
                        name="data_fechamento"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={oportunidade.data_fechamento?.split('T')[0]}
                        onChange={(e) => {
                            const dataCompleta = e.target.value + 'T12:00:00.000000';
                            
                            atualizarEstado({
                                ...e,
                                target: { ...e.target, value: dataCompleta }
                            });
                        }}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p>Cliente da Oportunidade</p>
                    <select name="cliente" id="cliente" className='border p-2 border-slate-800 rounded'
                        onChange={(e) => buscarClientePorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione um Cliente</option>

                        {clientes.map((cliente) => (
                            <>
                                <option value={cliente.id} >{cliente.nome}</option>
                            </>
                        ))}

                    </select>
                </div>
                <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
                    disabled={carregandoCliente}
                >
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormOportunidade;
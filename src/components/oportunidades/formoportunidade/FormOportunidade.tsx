import { useState, useContext, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type Oportunidade from "../../../models/Oportunidade";
import type Cliente from "../../../models/Cliente";

// Interface corrigida com todas as propriedades necessárias
interface FormOportunidadeProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    oportunidadeParaEditar?: Oportunidade | null; // Propriedade para edição via props
    isModal?: boolean; // Se está sendo usado dentro de um modal
}

function FormOportunidade({ 
    onSuccess, 
    onCancel, 
    oportunidadeParaEditar = null,
    isModal = false 
}: FormOportunidadeProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [cliente, setCliente] = useState<Cliente>({ id: 0, nome: '', email: '' })
    const [oportunidade, setOportunidade] = useState<Oportunidade>({} as Oportunidade)

    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    // Determina se é edição: via props (modal) ou via URL (página)
    const isEdicao = oportunidadeParaEditar !== null || id !== undefined;

    async function buscarOportunidadePorId(oportunidadeId: string | number) {
        try {
            await buscar(`/oportunidades/${oportunidadeId}`, setOportunidade, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarClientePorId(clienteId: string) {
        try {
            await buscar(`/clientes/${clienteId}`, setCliente, {
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

    // Carrega dados iniciais
    useEffect(() => {
        buscarClientes()
        
        // Se tem oportunidade para editar via props (modal)
        if (oportunidadeParaEditar) {
            setOportunidade(oportunidadeParaEditar)
            if (oportunidadeParaEditar.cliente) {
                setCliente(oportunidadeParaEditar.cliente)
            }
        }
        // Se tem ID na URL (página)
        else if (id !== undefined) {
            buscarOportunidadePorId(id)
        }
    }, [id, oportunidadeParaEditar])

    useEffect(() => {
        setOportunidade(prev => ({
            ...prev,
            cliente: cliente,
        }))
    }, [cliente])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setOportunidade(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
            cliente: cliente,
            usuario: usuario,
        }));
    }

    function atualizarData(campo: string, valor: string) {
        const dataCompleta = valor + 'T12:00:00.000000';
        setOportunidade(prev => ({
            ...prev,
            [campo]: dataCompleta,
            cliente: cliente,
            usuario: usuario,
        }));
    }

    async function gerarNovaOportunidade(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (isEdicao) {
                // ATUALIZAÇÃO
                await atualizar(`/oportunidades`, oportunidade, setOportunidade, {
                    headers: { Authorization: token },
                });
                ToastAlerta('Oportunidade atualizada com sucesso', "sucesso")
                
                setTimeout(() => {
                    setIsLoading(false)
                    if (isModal && onSuccess) {
                        // Modal: usa callback
                        onSuccess();
                    } else {
                        // Página: navega de volta
                        navigate('/oportunidades')
                    }
                }, 1500)
                
            } else {
                // CADASTRO
                await cadastrar(`/oportunidades`, oportunidade, setOportunidade, {
                    headers: { Authorization: token },
                })
                ToastAlerta('Oportunidade cadastrada com sucesso', "sucesso");
                
                setTimeout(() => {
                    setIsLoading(false)
                    if (onSuccess) {
                        onSuccess();
                    } else {
                        navigate('/oportunidades')
                    }
                }, 1500)
            }

        } catch (error: any) {
            setIsLoading(false)
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta(isEdicao ? 'Erro ao atualizar a Oportunidade' : 'Erro ao cadastrar a Oportunidade', "erro")
            }
        }
    }

    const carregandoCliente = cliente.nome === '';

    // Estilo condicional baseado se é modal ou página
    const containerClass = isModal 
        ? "p-6" // Modal: padding simples
        : "bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto my-8"; // Página: container completo

    const headerComponent = !isModal ? (
        // Header apenas para página (modal já tem header próprio)
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
                        {isEdicao ? 'Editar Oportunidade' : 'Nova Oportunidade'}
                    </h2>
                    <p className="text-indigo-100 text-sm">
                        {isEdicao ? 'Atualize as informações da oportunidade' : 'Preencha os dados para criar uma nova oportunidade'}
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
                <form className="space-y-6" onSubmit={gerarNovaOportunidade}>
                    {/* Título */}
                    <div className="space-y-2">
                        <label htmlFor="titulo" className="block text-sm font-bold text-slate-700">
                            Título da Oportunidade *
                        </label>
                        <input
                            type="text"
                            placeholder="Ex: Venda de software para empresa X"
                            name="titulo"
                            required
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 text-slate-900 font-medium"
                            value={oportunidade.titulo || ''}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    {/* Status e Valor em Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Status */}
                        <div className="space-y-2">
                            <label htmlFor="status" className="block text-sm font-bold text-slate-700">
                                Status da Oportunidade *
                            </label>
                            <select
                                name="status"
                                required
                                className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-slate-900 font-medium"
                                value={oportunidade.status || ''}
                                onChange={(e) => atualizarEstado(e)}
                            >
                                <option value="">Selecione um status</option>
                                <option value="Prospecção">🔍 Prospecção</option>
                                <option value="Qualificação">✅ Qualificação</option>
                                <option value="Proposta">📋 Proposta</option>
                                <option value="Negociação">🤝 Negociação</option>
                                <option value="Fechamento">🎯 Fechamento</option>
                                <option value="Perdida">❌ Perdida</option>
                            </select>
                        </div>

                        {/* Valor */}
                        <div className="space-y-2">
                            <label htmlFor="valor" className="block text-sm font-bold text-slate-700">
                                Valor da Oportunidade *
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-600 font-bold text-lg">R$</span>
                                <input
                                    type="number"
                                    placeholder="0,00"
                                    name="valor"
                                    required
                                    step="0.01"
                                    min="0"
                                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-slate-400 text-slate-900 font-medium"
                                    value={oportunidade.valor || ''}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Datas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="data_abertura" className="block text-sm font-bold text-slate-700">
                                📅 Data de Abertura *
                            </label>
                            <input
                                type="date"
                                name="data_abertura"
                                required
                                className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-slate-900 font-medium"
                                value={oportunidade.data_abertura ? oportunidade.data_abertura.split('T')[0] : ''}
                                onChange={(e) => atualizarData('data_abertura', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="data_fechamento" className="block text-sm font-bold text-slate-700">
                                🎯 Data de Fechamento *
                            </label>
                            <input
                                type="date"
                                name="data_fechamento"
                                required
                                className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-slate-900 font-medium"
                                value={oportunidade.data_fechamento ? oportunidade.data_fechamento.split('T')[0] : ''}
                                onChange={(e) => atualizarData('data_fechamento', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Cliente */}
                    <div className="space-y-2">
                        <label htmlFor="cliente" className="block text-sm font-bold text-slate-700">
                            👤 Cliente da Oportunidade *
                        </label>
                        <select 
                            name="cliente" 
                            id="cliente" 
                            required
                            className='w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-slate-900 font-medium'
                            value={cliente.id || ''}
                            onChange={(e) => buscarClientePorId(e.currentTarget.value)}
                        >
                            <option value="" disabled>Selecione um Cliente</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-slate-100">
                        <button
                            type='submit'
                            className='flex-1 inline-flex items-center justify-center px-8 py-4 bg-gradient-to-b from-[#167cf1] to-[#005de3] hover:from-indigo-700 hover:to-[#005de3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg'
                            disabled={carregandoCliente || isLoading}
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
                                    {isEdicao ? ' Atualizar Oportunidade' : 'Cadastrar Oportunidade'}
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

export default FormOportunidade;

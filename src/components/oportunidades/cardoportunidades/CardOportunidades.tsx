import { useContext, useState, useEffect } from 'react'; // Added useEffect
import type Oportunidade from '../../../models/Oportunidade';
import { AuthContext } from '../../../contexts/AuthContext';
import { deletar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import ModalOportunidade from '../modaloportunidade/ModalOportunidade';

interface CardOportunidadesProps {
    oportunidade: Oportunidade;
    onOportunidadeAtualizada?: () => void;
}

function CardOportunidades({ oportunidade, onOportunidadeAtualizada }: CardOportunidadesProps) {
    const { usuario, handleLogout } = useContext(AuthContext);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // Added dark mode state and listener
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setDarkMode(localStorage.getItem('theme') === 'dark');
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Função para determinar a cor do status
    const getStatusColor = (status: string) => {
        const statusLower = status?.toLowerCase() || '';
        // Adjusted to include dark mode classes
        if (statusLower.includes('prospecção')) return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-700';
        if (statusLower.includes('qualificação')) return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-800 dark:text-yellow-100 dark:border-yellow-700';
        if (statusLower.includes('proposta')) return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-800 dark:text-purple-100 dark:border-purple-700';
        if (statusLower.includes('negociação')) return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-800 dark:text-orange-100 dark:border-orange-700';
        if (statusLower.includes('fechamento')) return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-800 dark:text-emerald-100 dark:border-emerald-700';
        if (statusLower.includes('perdida')) return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-800 dark:text-red-100 dark:border-red-700';
        return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600';
    };

    // Função para formatar valor
    const formatarValor = (valor: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor || 0);
    };

    // Função para formatar data
    const formatarData = (data: string) => {
        if (!data) return 'Não definida';
        return new Date(data).toLocaleDateString('pt-BR');
    };

    // Função para calcular dias restantes
    const calcularDiasRestantes = (dataFechamento: string) => {
        if (!dataFechamento) return null;
        const hoje = new Date();
        const fechamento = new Date(dataFechamento);
        const diffTime = fechamento.getTime() - hoje.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Função para deletar oportunidade
    const handleDeletar = async () => {
        setIsDeleting(true);
        try {
            await deletar(`/oportunidades/${oportunidade.id}`, {
                headers: { Authorization: usuario.token }
            });

            ToastAlerta('Oportunidade deletada com sucesso!', 'sucesso');

            if (onOportunidadeAtualizada) {
                onOportunidadeAtualizada();
            }
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            } else {
                ToastAlerta('Erro ao deletar oportunidade', 'erro');
            }
        } finally {
            setIsDeleting(false);
            setShowConfirmDelete(false);
        }
    };

    // Função para abrir modal de edição
    const handleEditar = () => {
        setShowEditModal(true);
    };

    // Função para fechar modal de edição
    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    // Função chamada quando oportunidade é atualizada
    const handleOportunidadeEditada = () => {
        setShowEditModal(false);
        if (onOportunidadeAtualizada) {
            onOportunidadeAtualizada();
        }
    };

    const diasRestantes = calcularDiasRestantes(oportunidade.data_fechamento);

    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-slate-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Header do Card */}
                <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {oportunidade.titulo}
                            </h3>
                            <div className="flex items-center space-x-2">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(oportunidade.status)}`}>
                                    {oportunidade.status}
                                </span>
                            </div>
                        </div>
                        <div className="ml-4">
                            <div className="w-12 h-12 bg-gradient-to-b from-[#167cf1] to-[#005de3] dark:from-blue-700 dark:to-blue-900 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Valor */}
                    <div className="mb-4">
                        <div className="text-2xl font-bold text-slate-900 dark:text-gray-100">
                            {formatarValor(oportunidade.valor)}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-gray-400">Valor da oportunidade</div>
                    </div>

                    {/* Cliente */}
                    {oportunidade.cliente && (
                        <div className="mb-4 p-3 bg-slate-50 dark:bg-gray-700 rounded-xl">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-800 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-semibold text-slate-900 dark:text-gray-100 truncate">
                                        {oportunidade.cliente.nome}
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-gray-400 truncate">
                                        {oportunidade.cliente.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Datas */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <div className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wide font-medium mb-1">Abertura</div>
                            <div className="text-sm font-semibold text-slate-700 dark:text-gray-200">
                                {formatarData(oportunidade.data_abertura)}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wide font-medium mb-1">Fechamento</div>
                            <div className="text-sm font-semibold text-slate-700 dark:text-gray-200">
                                {formatarData(oportunidade.data_fechamento)}
                            </div>
                        </div>
                    </div>

                    {/* Indicador de prazo */}
                    {diasRestantes !== null && (
                        <div className="mb-4">
                            {diasRestantes > 0 ? (
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                    diasRestantes <= 7 
                                        ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' 
                                        : diasRestantes <= 30 
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' 
                                            : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                }`}>
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {diasRestantes} dias restantes
                                </div>
                            ) : diasRestantes === 0 ? (
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    Vence hoje
                                </div>
                            ) : (
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    {Math.abs(diasRestantes)} dias em atraso
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer do Card */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-gray-700 border-t border-slate-100 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Por {usuario.nome}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            {/* Botão Editar */}
                            <button
                                onClick={handleEditar}
                                className="inline-flex items-center px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-xs font-semibold rounded-lg transition-colors
                                           dark:bg-indigo-800 dark:hover:bg-indigo-700 dark:text-indigo-100"
                            >
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Editar
                            </button>

                            {/* Botão Deletar com Confirmação */}
                            {!showConfirmDelete ? (
                                <button
                                    onClick={() => setShowConfirmDelete(true)}
                                    className="inline-flex items-center px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold rounded-lg transition-colors
                                               dark:bg-red-800 dark:hover:bg-red-700 dark:text-red-100"
                                    disabled={isDeleting}
                                >
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Deletar
                                </button>
                            ) : (
                                <div className="flex items-center space-x-1">
                                    <button
                                        onClick={handleDeletar}
                                        disabled={isDeleting}
                                        className="inline-flex items-center px-2 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50
                                                   dark:bg-red-700 dark:hover:bg-red-600 dark:text-red-100"
                                    >
                                        {isDeleting ? (
                                            <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setShowConfirmDelete(false)}
                                        disabled={isDeleting}
                                        className="inline-flex items-center px-2 py-1.5 bg-slate-300 hover:bg-slate-400 text-slate-700 text-xs font-semibold rounded-lg transition-colors
                                                   dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-slate-200"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Edição */}
            <ModalOportunidade
                isOpen={showEditModal}
                onClose={handleCloseEditModal}
                onOportunidadeAtualizada={handleOportunidadeEditada}
                oportunidadeParaEditar={oportunidade}
                triggerButton={false}
            />
        </>
    );
}

export default CardOportunidades;
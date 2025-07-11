import type Cliente from "../../../models/Cliente";

interface CardClientesProps {
    cliente: Cliente;
}

function CardClientes({ cliente }: CardClientesProps) {
    
    const handleEdit = () => {
        // Lógica para editar cliente
        console.log('Editando cliente:', cliente.id);
    };

    const handleDelete = () => {
        // Lógica para deletar cliente
        console.log('Deletando cliente:', cliente.id);
    };

    const handleViewOportunidades = () => {
        // Lógica para ver oportunidades do cliente
        console.log('Visualizando oportunidades do cliente:', cliente.id);
    };

    // Função para contar oportunidades do cliente
    const getOportunidadesCount = () => {
        if (!cliente.oportunidade) return 0;
        return cliente.oportunidade.length;
    };

    // Função para obter as iniciais do nome
    const getInitials = (nome: string) => {
        return nome
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            {/* Header do Card */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                                {getInitials(cliente.nome)}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-lg leading-tight">
                                {cliente.nome}
                            </h3>
                            <p className="text-indigo-100 text-sm">Cliente #{cliente.id}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-white font-bold text-lg">
                            {getOportunidadesCount()}
                        </div>
                        <div className="text-indigo-100 text-xs uppercase tracking-wide">
                            Oportunidades
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Conteúdo do Card */}
            <div className="p-6 space-y-4">
                {/* Email */}
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 text-slate-400 mt-0.5">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 break-all">
                            {cliente.email}
                        </p>
                        <p className="text-xs text-slate-500">E-mail de contato</p>
                    </div>
                </div>

                {/* Status das Oportunidades */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getOportunidadesCount() > 0 ? 'bg-emerald-400' : 'bg-slate-300'}`}></div>
                        <span className="text-sm text-slate-600">
                            {getOportunidadesCount() > 0 ? 'Com oportunidades ativas' : 'Sem oportunidades'}
                        </span>
                    </div>
                </div>

                {/* Oportunidades Preview */}
                {getOportunidadesCount() > 0 && (
                    <div className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">
                                {getOportunidadesCount()} oportunidade{getOportunidadesCount() !== 1 ? 's' : ''}
                            </span>
                            <button 
                                onClick={handleViewOportunidades}
                                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                            >
                                Ver todas →
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Botões de Ação */}
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
                <div className="flex space-x-3">
                    <button 
                        onClick={handleEdit}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                    </button>
                    <button 
                        onClick={handleDelete}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardClientes;


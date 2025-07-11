import { Link } from "react-router-dom";
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
        <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
                        border border-gray-100 overflow-hidden group hover:border-[#005de3]/20'>
            
            {/* Header do Card */}
            <header className='bg-gradient-to-r from-[#005de3] to-[#0066ff] px-6 py-4'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-white font-bold text-lg'>Cliente</h3>
                    <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                </div>
            </header>
            
            {/* Conteúdo do Card */}
            <div className='p-6 bg-white flex-1 space-y-4'>
                <div className='space-y-3'>
                    <div className='flex items-start space-x-3'>
                        <div className='w-2 h-2 bg-[#005de3] rounded-full mt-2 flex-shrink-0'></div>
                        <div className='flex-1'>
                            <p className='text-sm font-medium text-gray-500 uppercase tracking-wide'>Nome</p>
                            <p className='text-lg font-semibold text-gray-900 mt-1 break-words'>
                                {cliente.nome || 'Não informado'}
                            </p>
                        </div>
                    </div>
                    
                    <div className='flex items-start space-x-3'>
                        <div className='w-2 h-2 bg-[#005de3] rounded-full mt-2 flex-shrink-0'></div>
                        <div className='flex-1'>
                            <p className='text-sm font-medium text-gray-500 uppercase tracking-wide'>E-mail</p>
                            <p className='text-lg font-semibold text-gray-900 mt-1 break-words'>
                                {cliente.email || 'Não informado'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Botões de Ação */}
            <div className="flex border-t border-gray-100">
                <Link 
                    to={`/editarcliente/${cliente.id}`} 
                    className='flex-1 bg-[#005de3] hover:bg-[#004bb8] text-white 
                              transition-all duration-200 group/edit'
                >
                    <button className='w-full py-3 px-4 flex items-center justify-center space-x-2 
                                     font-medium text-sm'>
                        <svg className="w-4 h-4 group-hover/edit:scale-110 transition-transform duration-200" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Editar</span>
                    </button>
                </Link>

                <Link 
                    to={`/deletarcliente/${cliente.id}`} 
                    className='flex-1 bg-gray-100 hover:bg-red-600 text-black hover:text-white 
                              transition-all duration-200 group/delete'
                >
                    <button className='w-full py-3 px-4 flex items-center justify-center space-x-2 
                                     font-medium text-sm'>
                        <svg className="w-4 h-4 group-hover/delete:scale-110 transition-transform duration-200" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Deletar</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default CardClientes


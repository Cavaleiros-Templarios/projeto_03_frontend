import { Link } from "react-router-dom";
import type Cliente from "../../../models/Cliente";

interface CardClientesProps {
    cliente: Cliente;
}

function CardClientes({ cliente }: CardClientesProps) {

    return (
        // Main card container adapts background, border, and shadow using ONLY variables
        <div className='rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group'
             style={{
                 backgroundColor: "var(--cor-fundo-card)",
                 border: "1px solid var(--cor-borda)",
                 boxShadow: "0 4px 6px var(--cor-sombra)", // Use var(--cor-sombra) directly for box-shadow
             }}>

            {/* Header do Card */}
            <header className='px-6 py-4'
                    style={{ backgroundImage: `linear-gradient(to right, var(--cor-primaria), var(--cor-secundaria))` }}>
                <div className='flex items-center justify-between'>
                    <h3 className='font-bold text-lg' style={{ color: "var(--cor-texto-claro)" }}>Cliente</h3>
                    <div className='w-8 h-8 rounded-full flex items-center justify-center'
                         style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--cor-texto-claro)" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                </div>
            </header>

            {/* Conteúdo do Card */}
            <div className='p-6 flex-1 space-y-4' style={{ backgroundColor: "var(--cor-fundo-card)" }}>
                <div className='space-y-3'>
                    <div className='flex items-start space-x-3'>
                        <div className='w-2 h-2 rounded-full mt-2 flex-shrink-0' style={{ backgroundColor: "var(--cor-primaria)" }}></div>
                        <div className='flex-1'>
                            <p className='text-sm font-medium uppercase tracking-wide'
                               style={{ color: "var(--cor-texto-secundario)" }}>Nome</p>
                            <p className='text-lg font-semibold mt-1 break-words'
                               style={{ color: "var(--cor-texto-principal)" }}>
                                {cliente.nome || 'Não informado'}
                            </p>
                        </div>
                    </div>

                    <div className='flex items-start space-x-3'>
                        <div className='w-2 h-2 rounded-full mt-2 flex-shrink-0' style={{ backgroundColor: "var(--cor-primaria)" }}></div>
                        <div className='flex-1'>
                            <p className='text-sm font-medium uppercase tracking-wide'
                               style={{ color: "var(--cor-texto-secundario)" }}>E-mail</p>
                            <p className='text-lg font-semibold mt-1 break-words'
                               style={{ color: "var(--cor-texto-principal)" }}>
                                {cliente.email || 'Não informado'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex border-t" style={{ borderColor: "var(--cor-borda)" }}>
                <Link
                    to={`/editarcliente/${cliente.id}`}
                    className='flex-1 text-white transition-all duration-200 group/edit'
                    style={{
                        backgroundColor: "var(--cor-primaria)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--cor-primaria-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--cor-primaria)')}
                >
                    <button className='w-full py-3 px-4 flex items-center justify-center space-x-2 font-medium text-sm'>
                        <svg className="w-4 h-4 group-hover/edit:scale-110 transition-transform duration-200"
                             fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--cor-texto-claro)" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Editar</span>
                    </button>
                </Link>

                <Link
                    to={`/deletarcliente/${cliente.id}`}
                    className='flex-1 transition-all duration-200 group/delete'
                    style={{
                        backgroundColor: "var(--cor-fundo-claro)", // Use var for background
                        color: "var(--cor-texto-principal)" // Use var for text color
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--cor-erro)';
                        e.currentTarget.style.color = 'var(--cor-texto-claro)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--cor-fundo-claro)';
                        e.currentTarget.style.color = 'var(--cor-texto-principal)';
                    }}
                >
                    <button className='w-full py-3 px-4 flex items-center justify-center space-x-2 font-medium text-sm'>
                        <svg className="w-4 h-4 group-hover/delete:scale-110 transition-transform duration-200"
                             fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             style={{ color: "inherit" }}>
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

export default CardClientes;
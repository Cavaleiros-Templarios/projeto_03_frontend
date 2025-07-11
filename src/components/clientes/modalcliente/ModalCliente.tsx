import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import FormCliente from '../formcliente/FormCliente';

import 'reactjs-popup/dist/index.css';
import './ModalCliente.css'
import type Cliente from '../../../models/Cliente';

interface ModalClienteProps {
    onClienteAtualizado?: () => void;
    clienteParaEditar?: Cliente | null; // Cliente para editar (null = cadastrar)
    isOpen?: boolean; // Controle externo do modal
    onClose?: () => void; // Callback para fechar o modal
    triggerButton?: boolean; // Se deve mostrar o botão trigger (padrão: true)
}

function ModalCliente({ 
    onClienteAtualizado, 
    clienteParaEditar = null,
    isOpen: externalIsOpen,
    onClose,
    triggerButton = true
}: ModalClienteProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    
    // Usa controle externo se fornecido, senão usa interno
    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
    const setIsOpen = externalIsOpen !== undefined ? 
        (value: boolean) => {
            if (!value && onClose) onClose();
        } : 
        setInternalIsOpen;

    // Determina se é edição ou cadastro
    const isEdicao = clienteParaEditar !== null;

    const handleClienteAtualizado = () => {
        setIsOpen(false);
        if (onClienteAtualizado) {
            onClienteAtualizado();
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    // Limpa o estado quando o modal fecha
    useEffect(() => {
        if (!isOpen) {
            // Reset interno se necessário
        }
    }, [isOpen]);

    return (
        <>
            <Popup
                open={isOpen}
                onOpen={() => setIsOpen(true)}
                onClose={() => setIsOpen(false)}
                trigger={
                    triggerButton ? (
                        <button 
                            className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                            onClick={handleOpenModal}>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Novo Cliente
                        </button>
                    ) : undefined
                }
                modal
                closeOnDocumentClick={false}
                closeOnEscape={true}
                overlayStyle={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(4px)',
                }}
                contentStyle={{
                    background: 'transparent',
                    border: 'none',
                    padding: '0',
                    borderRadius: '0',
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    overflow: 'visible'
                }}
            >
                <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-auto my-8 overflow-hidden">
                    {/* Modal Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isEdicao ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    )}
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white">
                                    {isEdicao ? 'Editar Cliente' : 'Novo Cliente'}
                                </h2>
                                <p className="text-indigo-100 text-sm">
                                    {isEdicao ? 'Atualize as informações do cliente' : 'Preencha os dados para criar um novo cliente'}
                                </p>
                            </div>
                        </div>
                        <button 
                            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="max-h-[70vh] overflow-y-auto">
                        <FormCliente 
                            onSuccess={handleClienteAtualizado}
                            onCancel={handleCancel}
                            clienteParaEditar={clienteParaEditar}
                            isModal={true}
                        />
                    </div>
                </div>
            </Popup>
        </>
    );
}

export default ModalCliente;


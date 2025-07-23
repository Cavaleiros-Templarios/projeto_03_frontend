import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ModalCliente.css'
import FormCliente from '../formcliente/FormCliente';

interface ModalClienteProps {
    onClienteAdded?: () => void;
    isOpen?: boolean; // Controle externo opcional
    onClose?: () => void; // Callback fechamento
    triggerButton?: boolean; // Mostrar botão para abrir (default true)
    smallTriggerText?: string; // Optional text for a smaller trigger button
}

function ModalCliente({
    onClienteAdded,
    isOpen: externalIsOpen,
    onClose,
    triggerButton = true,
    smallTriggerText = "Adicionar Cliente" // Default text for the smaller button
}: ModalClienteProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    // Controle aberto: externo ou interno
    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
    const setIsOpen = externalIsOpen !== undefined
        ? (value: boolean) => {
            if (!value && onClose) onClose();
        }
        : setInternalIsOpen;

    const handleClienteAdded = () => {
        setIsOpen(false);
        if (onClienteAdded) onClienteAdded();
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        if (!isOpen) {
            // Reset ou limpeza se precisar
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
                            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={handleOpenModal}
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            {smallTriggerText}
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
                    overflow: 'visible',
                }}
            >
                <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-auto my-8 overflow-hidden">
                    {/* Cabeçalho */}
                    <div className="bg-gradient-to-b from-[#167cf1] to-[#005de3] px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                                </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white">Novo Cliente</h2>
                                <p className="text-indigo-100 text-sm">
                                    Preencha os dados para criar um novo cliente
                                </p>
                            </div>
                        </div>
                        <button
                            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Conteúdo */}
                    <div className="max-h-[70vh] overflow-y-auto p-6">
                        <FormCliente onSuccess={handleClienteAdded} onCancel={handleCancel} isModal={true} />
                    </div>
                </div>
            </Popup>
        </>
    );
}

export default ModalCliente;
import { useState } from 'react';
import Popup from 'reactjs-popup';
import FormCliente from '../formcliente/FormCliente';

import 'reactjs-popup/dist/index.css';
import './ModalCliente.css'

interface ModalClienteProps {
    onClienteAdded?: () => void;
}

function ModalCliente({ onClienteAdded }: ModalClienteProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClienteAdded = () => {
        setIsOpen(false); // Fecha o modal
        if (onClienteAdded) {
            onClienteAdded(); // Chama a função para atualizar a lista
        }
    };

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button 
                className='bg-[#005de3] text-white px-6 py-3 rounded-lg font-semibold 
                          hover:bg-[#004bb8] hover:shadow-lg transform hover:scale-105 
                          transition-all duration-200 ease-in-out shadow-md
                          focus:outline-none focus:ring-2 focus:ring-[#005de3] focus:ring-opacity-50'
                onClick={handleOpenModal}>
                + Novo Cliente
            </button>

            <Popup
                open={isOpen}
                onClose={handleCloseModal}
                modal
                closeOnDocumentClick={false}
                closeOnEscape={true}
            >
                <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 relative 
                               border border-gray-100 overflow-hidden">
                    {/* Header do Modal */}
                    <div className="bg-gradient-to-r from-[#005de3] to-[#0066ff] px-6 py-4">
                        <h2 className="text-xl font-bold text-white">Novo Cliente</h2>
                    </div>
                    
                    {/* Botão de Fechar */}
                    <button 
                        className="absolute top-4 right-4 text-white hover:text-gray-200 
                                  transition-colors duration-200 z-10"
                        onClick={handleCloseModal}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    {/* Conteúdo do Modal */}
                    <div className="p-6">
                        <FormCliente onSuccess={handleClienteAdded} />
                    </div>
                </div>
            </Popup>
        </>
    );
}

export default ModalCliente;


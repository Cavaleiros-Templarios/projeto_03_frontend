import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ModalOportunidade.css'
import FormOportunidade from '../formoportunidade/FormOportunidade';
import type Oportunidade from '../../../models/Oportunidade';

interface ModalOportunidadeProps {
    onOportunidadeAtualizada?: () => void;
    oportunidadeParaEditar?: Oportunidade | null; // Oportunidade para editar (null = cadastrar)
    isOpen?: boolean; // Controle externo do modal
    onClose?: () => void; // Callback para fechar o modal
    triggerButton?: boolean; // Se deve mostrar o botão trigger (padrão: true)
}

function ModalOportunidade({ 
    onOportunidadeAtualizada, 
    oportunidadeParaEditar = null,
    isOpen: externalIsOpen,
    onClose,
    triggerButton = true
}: ModalOportunidadeProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    
    // Usa controle externo se fornecido, senão usa interno
    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
    const setIsOpen = externalIsOpen !== undefined ? 
        (value: boolean) => {
            if (!value && onClose) onClose();
        } : 
        setInternalIsOpen;

    // Determina se é edição ou cadastro
    const isEdicao = oportunidadeParaEditar !== null;

    const handleOportunidadeAtualizada = () => {
        setIsOpen(false);
        if (onOportunidadeAtualizada) {
            onOportunidadeAtualizada();
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
                            className='inline-flex items-center px-6 py-3  bg-gradient-to-b from-[#167cf1] to-[#005de3] hover:from-indigo-700 to-[#005de3]  text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                            onClick={handleOpenModal}>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Nova Oportunidade
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
                    <div className="bg-gradient-to-b from-[#167cf1] to-[#005de3] px-6 py-4 flex items-center justify-between">
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
                                    {isEdicao ? 'Editar Oportunidade' : 'Nova Oportunidade'}
                                </h2>
                                <p className="text-indigo-100 text-sm">
                                    {isEdicao ? 'Atualize as informações da oportunidade' : 'Preencha os dados para criar uma nova oportunidade'}
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
                        <FormOportunidade 
                            onSuccess={handleOportunidadeAtualizada}
                            onCancel={handleCancel}
                            oportunidadeParaEditar={oportunidadeParaEditar}
                            isModal={true}
                        />
                    </div>
                </div>
            </Popup>
        </>
    );
}

export default ModalOportunidade;


import React, { useState, useRef, useCallback, useEffect } from 'react';
import { sendMessageToChatbot } from '../../services/ChatService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [size, setSize] = useState({ width: 340, height: 380 });
  const [isResizing, setIsResizing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Novo estado para controlar o carregamento
  
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });

  // Função para rolar para o final do chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // useEffect para rolar automaticamente quando novas mensagens ou o estado de carregamento mudam
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]); // Adicionado isLoading aqui para rolar quando o "digitando..." aparece/desaparece

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return; // Impede envios múltiplos e mensagens vazias

    const userMsg: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true); // Inicia o carregamento

    try {
      const reply = await sendMessageToChatbot(input);
      const botMsg: Message = { role: 'assistant', content: reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const errorMsg: Message = { role: 'assistant', content: 'Desculpe, houve um erro ao processar sua mensagem.' };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false); // Finaliza o carregamento, mesmo em caso de erro
    }
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    startSize.current = { width: size.width, height: size.height };
  }, [size]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;

    // Calcular novo tamanho com limites mínimos e máximos
    const newWidth = Math.max(340, Math.min(500, startSize.current.width - deltaX));
    const newHeight = Math.max(380, Math.min(540, startSize.current.height - deltaY));

    setSize({ width: newWidth, height: newHeight });
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  // useEffect para event listeners globais de redimensionamento
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'nw-resize';
    } else {
      document.body.style.cursor = 'default';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 font-sans">
        <div 
          ref={chatRef}
          className={`bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 relative transition-all duration-300 ease-in-out ${
            !open ? 'animate-pulse-wave' : ''
          }`}
          style={{ 
            width: open ? size.width : 80, 
            height: open ? size.height : 80,
            // Usar margin para "empurrar" o elemento para a esquerda e para cima conforme ele cresce
            marginLeft: open ? -(size.width - 340) : 0,
            marginTop: open ? -(size.height - 380) : 0
          }}
        >
          {/* Handle de redimensionamento invisível no canto superior esquerdo - só aparece quando o chat está aberto */}
          {open && (
            <div
              className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize bg-transparent z-10"
              onMouseDown={handleMouseDown}
              style={{ opacity: 0 }}
            />
          )}

          <div
            className={`bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center font-semibold cursor-pointer flex items-center justify-center transition-all duration-300 ${
              open ? 'py-3 text-lg space-x-2' : 'h-full text-2xl'
            }`}
            onClick={() => setOpen(!open)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {open && <span>Kavio Assistente</span>}
          </div>

          {open && (
            <div className="flex flex-col bg-gray-50" style={{ height: size.height - 60 }}>
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2 rounded-lg shadow-md ${m.role === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-300 text-gray-800 rounded-bl-none'}
                      `}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {/* Indicador de "digitando..." */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md rounded-bl-none flex items-center">
                      <span>Digitando</span>
                      <span className="typing-dots ml-1">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </span>
                    </div>
                  </div>
                )}
                {/* Elemento invisível para marcar o final das mensagens */}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-gray-200 p-3 flex items-center gap-2 bg-white">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  placeholder="Digite sua mensagem..."
                  disabled={isLoading} 
                />
                <button
                  onClick={sendMessage}
                  className="bg-indigo-600 text-white p-3 rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                  disabled={isLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Estilos CSS para a animação de onda e "digitando" */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse-wave {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(139, 69, 19, 0.3);
            }
            50% {
              transform: scale(1.02);
              box-shadow: 0 0 0 8px rgba(139, 69, 19, 0);
            }
          }
          
          .animate-pulse-wave {
            animation: pulse-wave 3s ease-in-out infinite;
          }

          /* Estilos para o indicador de "digitando..." */
          .typing-dots span {
            opacity: 0;
            animation: blink-dots 1.5s infinite linear;
          }

          .typing-dots span:nth-child(2) {
            animation-delay: 0.5s;
          }

          .typing-dots span:nth-child(3) {
            animation-delay: 1s;
          }

          @keyframes blink-dots {
            0%, 33% {
              opacity: 0;
            }
            50%, 100% {
              opacity: 1;
            }
          }
        `
      }} />
    </>
  );
}
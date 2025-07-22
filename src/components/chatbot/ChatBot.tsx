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
  const [isLoading, setIsLoading] = useState(false);

  // No need for a local darkMode state in this component if styling is purely via CSS variables and Tailwind classes.
  // The component will automatically react to the 'dark' class on the HTML root.

  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });

  // Pre-defined questions
  const predefinedQuestions = [
    "O que é o Kavio CRM?",
    "Como posso ver os planos?",
    "Quais são os principais recursos?",
    "Como entro em contato com o suporte?"
  ];

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // useEffect to auto-scroll when new messages or loading state change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (messageContent: string = input) => {
    if (!messageContent.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: messageContent };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await sendMessageToChatbot(messageContent);
      const botMsg: Message = { role: 'assistant', content: reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const errorMsg: Message = { role: 'assistant', content: 'Desculpe, houve um erro ao processar sua mensagem.' };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePredefinedQuestionClick = (question: string) => {
    sendMessage(question); // Send the pre-defined question
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

    const newWidth = Math.max(340, Math.min(500, startSize.current.width - deltaX));
    const newHeight = Math.max(380, Math.min(540, startSize.current.height - deltaY));

    setSize({ width: newWidth, height: newHeight });
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

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
          className={`rounded-lg shadow-lg overflow-hidden border relative transition-all duration-300 ease-in-out
                      bg-[var(--cor-primaria-fundo)] border-cor-borda shadow-cor-sombra ${ 
                        !open ? 'animate-pulse-wave' : ''
                      }`}
          style={{
            width: open ? size.width : 80,
            height: open ? size.height : 80,
            marginLeft: open ? -(size.width - 340) : 0,
            marginTop: open ? -(size.height - 380) : 0
          }}
        >
          {open && (
            <div
              className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize bg-transparent z-10"
              onMouseDown={handleMouseDown}
              style={{ opacity: 0 }}
            />
          )}

          <div
            className={`text-center font-semibold cursor-pointer flex items-center justify-center transition-all duration-300
                        text-cor-texto-claro ${ // Text color over gradient
                          open ? 'py-3 text-lg space-x-2' : 'h-full text-2xl'
                        }`}
            style={{ 
              backgroundImage: `linear-gradient(to right, var(--cor-primaria), var(--cor-secundaria))`,
              color: "var(--cor-texto-claro)" // Ensure text is clear over gradient
            }}
            onClick={() => setOpen(!open)}
          >
            {/* Robot Image Icon */}
            <img
              src="https://ik.imagekit.io/dmzx7is6a/image-removebg-preview%20(3).png?updatedAt=1752247690323"
              alt="Robot Icon"
              className="h-8 w-8"
            />
            {open && <span>Kavio Assistente</span>}
          </div>

          {open && (
            <div className="flex flex-col bg-cor-fundo-claro" style={{ height: size.height - 60 }}> {/* Background color */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm text-cor-texto-principal // Text color
                          scrollbar-thin scrollbar-thumb-cor-borda scrollbar-track-cor-fundo-claro"> {/* Custom scrollbar classes */}
                {/* Pre-defined questions displayed as clickable buttons */}
                {messages.length === 0 && ( // Only show if no messages exchanged yet
                  <div className="flex flex-col gap-2 mb-4">
                    <p className="text-center text-cor-texto-secundario">Perguntas Frequentes:</p>
                    {predefinedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handlePredefinedQuestionClick(question)}
                        className="border border-cor-info px-3 py-2 rounded-lg text-left transition-colors duration-200 text-sm
                                   bg-cor-info text-cor-texto-claro hover:opacity-80" // Use variables for button and hover
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}

                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2 rounded-lg shadow-md ${m.role === 'user'
                        ? 'rounded-br-none bg-cor-primaria text-cor-texto-claro' // User message colors
                        : 'rounded-bl-none bg-cor-fundo-card text-cor-texto-principal'} // Assistant message colors
                      `}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-lg shadow-md rounded-bl-none flex items-center
                                bg-cor-fundo-card text-cor-texto-principal"> {/* Typing indicator colors */}
                      <span>Digitando</span>
                      <span className="typing-dots ml-1">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-cor-borda p-3 flex items-center gap-2 bg-cor-fundo-card"> {/* Border and background colors */}
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 transition duration-200
                             border-cor-borda bg-cor-fundo-claro text-cor-texto-principal
                             focus:ring-cor-primaria" // Focus ring color
                  placeholder="Digite sua mensagem..."
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage()}
                  className="p-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200
                             bg-cor-primaria text-cor-texto-claro focus:ring-cor-primaria" // Button colors and focus ring
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--cor-primaria-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--cor-primaria)'}
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

      <style dangerouslySetInnerHTML={{
        __html: `
          /* Custom scrollbar styles using your variables */
          .scrollbar-thin::-webkit-scrollbar {
            width: 8px; /* For vertical scrollbar */
            height: 8px; /* For horizontal scrollbar */
          }

          .scrollbar-thin::-webkit-scrollbar-track {
            background: var(--scrollbar-track-color, var(--cor-fundo-claro)); /* Fallback to cor-fundo-claro */
            border-radius: 10px;
          }

          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: var(--scrollbar-thumb-color, var(--cor-borda)); /* Fallback to cor-borda */
            border-radius: 10px;
            border: 2px solid var(--scrollbar-track-color, var(--cor-fundo-claro)); /* Add border for better visibility */
          }

          .scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background: var(--cor-secundaria); /* Darker on hover */
          }
          /* End custom scrollbar styles */


          @keyframes pulse-wave {
            0%, 100% {
              transform: scale(1);
              /* Use CSS variable for color from index.css for the pulse */
              /* The opacity part (0.3) needs to be controlled by directly changing the rgba in index.css if you want less transparency */
              box-shadow: 0 0 0 0 rgba(var(--color-primary-accent), 0.3); 
            }
            50% {
              transform: scale(1.02);
              box-shadow: 0 0 0 8px rgba(var(--color-primary-accent), 0);
            }
          }
          
          .animate-pulse-wave {
            animation: pulse-wave 3s ease-in-out infinite;
          }

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
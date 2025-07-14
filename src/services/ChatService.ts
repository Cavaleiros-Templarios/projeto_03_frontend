const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "chat-bot-production-0ee9.up.railway.app";

export async function sendMessageToChatbot(message: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao se comunicar com o backend");
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Erro ao enviar mensagem para o chatbot:", error);
    throw error;
  }
}



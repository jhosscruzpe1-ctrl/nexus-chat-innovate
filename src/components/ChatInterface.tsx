import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Send, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  userId: string;
  userName: string;
}

export const ChatInterface = ({ userId, userName }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeConversation();
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const initializeConversation = async () => {
    try {
      // Crear nueva conversación
      const { data, error } = await supabase
        .from('conversaciones')
        .insert([{ usuario_id: userId }])
        .select()
        .single();

      if (error) throw error;

      setConversationId(data.id);

      // Mensaje de bienvenida
      const welcomeMessage: Message = {
        role: 'assistant',
        content: `¡Hola ${userName}! Soy el asistente virtual de la Municipalidad Provincial de Morropón - Chulucanas. Estoy aquí para ayudarte con información sobre trámites y servicios municipales. ¿En qué puedo ayudarte hoy?`,
        timestamp: new Date()
      };

      setMessages([welcomeMessage]);

      // Guardar mensaje de bienvenida
      await supabase.from('mensajes').insert({
        conversacion_id: data.id,
        rol: 'assistant',
        contenido: welcomeMessage.content,
      });

    } catch (error) {
      console.error('Error al inicializar conversación:', error);
      toast({
        title: "Error",
        description: "No se pudo inicializar la conversación",
        variant: "destructive",
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !conversationId) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Preparar historial para contexto
      const history = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const { data, error } = await supabase.functions.invoke('chatbot-nlp', {
        body: { 
          message: userMessage.content,
          conversationId,
          history
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Intenta nuevamente.",
        variant: "destructive",
      });

      const errorMessage: Message = {
        role: 'assistant',
        content: 'Lo siento, hubo un error procesando tu mensaje. Por favor, intenta nuevamente.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto bg-card/50 backdrop-blur-sm rounded-3xl shadow-elegant border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-primary-foreground">
        <h2 className="text-2xl font-bold">Chat de Atención</h2>
        <p className="text-sm opacity-90">Municipalidad de Morropón - Chulucanas</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="flex items-center justify-start">
              <div className="bg-card rounded-2xl px-4 py-3 shadow-md border border-border">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-6 bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu consulta aquí..."
            disabled={isLoading}
            className="flex-1 rounded-xl border-border focus:border-primary transition-colors duration-300"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-all duration-300 rounded-xl px-6"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Presiona Enter para enviar • Shift + Enter para nueva línea
        </p>
      </div>
    </div>
  );
};
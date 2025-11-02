import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Send, Loader2, Facebook, Youtube, Twitter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  userId?: string;
  userName?: string;
}

export const ChatInterface = ({ userId, userName = "Usuario" }: ChatInterfaceProps) => {
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
      // Solo crear conversación si hay userId
      if (userId) {
        const { data, error } = await supabase
          .from('conversaciones')
          .insert([{ usuario_id: userId }])
          .select()
          .single();

        if (error) throw error;
        setConversationId(data.id);
      }

      // Mensaje de bienvenida mejorado con emojis
      const welcomeMessage: Message = {
        role: 'assistant',
        content: `¡Hola! 👋 Soy tu asistente virtual de la **Municipalidad Provincial de Morropón - Chulucanas**. 

Estoy aquí para ayudarte con:
📄 Información sobre trámites y servicios
📍 Datos de contacto y ubicación
⏰ Horarios de atención
🔗 Enlaces útiles

¿En qué puedo ayudarte hoy? 😊`,
        timestamp: new Date()
      };

      setMessages([welcomeMessage]);

      // Guardar mensaje de bienvenida solo si hay conversación
      if (conversationId) {
        await supabase.from('mensajes').insert({
          conversacion_id: conversationId,
          rol: 'assistant',
          contenido: welcomeMessage.content,
        });
      }

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
    if (!input.trim()) return;

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
    <div className="flex flex-col h-full w-full bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 sm:p-6 text-primary-foreground pr-12 sm:pr-14">
        <h2 className="text-base sm:text-lg font-bold truncate">💬 Asistente Virtual</h2>
        <p className="text-xs opacity-90 truncate">Municipalidad de Morropón - Chulucanas</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3 sm:p-4" ref={scrollRef}>
        <div className="space-y-3 sm:space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="flex items-center justify-start mb-4 animate-in fade-in duration-300">
              <div className="bg-gradient-to-br from-card to-card/95 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-elegant border border-border/50 flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                </div>
                <span className="text-xs text-muted-foreground">Escribiendo...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-3 sm:p-4 bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu consulta..."
            disabled={isLoading}
            className="flex-1 rounded-xl border-border focus:border-primary transition-colors duration-300 text-sm h-9 sm:h-10"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-all duration-300 rounded-xl px-4 sm:px-6 h-9 sm:h-10 flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
            ) : (
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
        </div>
        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-2 text-center hidden sm:block">
          Presiona Enter para enviar
        </p>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-muted/50 to-muted/30 border-t border-border px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          {/* Redes Sociales */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://www.facebook.com/munichulucanas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href="https://www.youtube.com/@munichulucanas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110"
              aria-label="YouTube"
            >
              <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href="https://twitter.com/munichulucanas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>
          
          {/* Derechos */}
          <p className="text-[10px] sm:text-xs text-muted-foreground text-center leading-relaxed px-2">
            © {new Date().getFullYear()} Todos los derechos reservados
            <span className="hidden sm:inline"><br /></span>
            <span className="sm:hidden"> - </span>
            Municipalidad Provincial de Morropón - Chulucanas
          </p>
        </div>
      </div>
    </div>
  );
};
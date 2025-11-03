import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { ExternalLink, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const isUser = role === 'user';
  const [iframeError, setIframeError] = useState(false);
  
  // Detectar patrón [MODAL:url] en el contenido
  const modalMatch = content.match(/\[MODAL:(https?:\/\/[^\]]+)\]/);
  const displayContent = modalMatch ? content.replace(/\[MODAL:https?:\/\/[^\]]+\]/, '') : content;
  
  return (
    <>
      <div className={cn(
        "flex w-full mb-3 sm:mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500",
        isUser ? "justify-end" : "justify-start"
      )}>
        <div className={cn(
          "max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-elegant transition-all duration-300 break-words hover:shadow-lg",
          isUser 
            ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground ml-2 sm:ml-4" 
            : "bg-gradient-to-br from-card to-card/95 text-card-foreground border border-border/50 mr-2 sm:mr-4"
        )}>
          <div className="text-xs sm:text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert [&>*]:break-words">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-1 sm:mb-2 last:mb-0">{children}</p>,
                strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline break-all inline-flex items-center gap-1"
                  >
                    {children}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ),
                ul: ({ children }) => <ul className="list-disc ml-3 sm:ml-4 mb-1 sm:mb-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal ml-3 sm:ml-4 mb-1 sm:mb-2">{children}</ol>,
                li: ({ children }) => <li className="mb-0.5 sm:mb-1">{children}</li>,
              }}
            >
              {displayContent}
            </ReactMarkdown>
          </div>
          
          {modalMatch && (
            <div className="mt-3 sm:mt-4 rounded-lg overflow-hidden border border-border/50 bg-muted/30">
              {iframeError ? (
                <div className="p-4 sm:p-6 text-center space-y-3">
                  <AlertCircle className="h-8 w-8 sm:h-10 sm:w-10 mx-auto text-muted-foreground" />
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Este servicio no puede mostrarse aquí por restricciones de seguridad.
                  </p>
                  <Button
                    onClick={() => window.open(modalMatch[1], '_blank', 'noopener,noreferrer')}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    Abrir en nueva pestaña
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <iframe
                  src={modalMatch[1]}
                  className="w-full h-[300px] sm:h-[400px] border-0"
                  title="Servicio Municipal"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                  loading="lazy"
                  onError={() => setIframeError(true)}
                />
              )}
            </div>
          )}
          
          {timestamp && (
            <p className={cn(
              "text-[10px] sm:text-xs mt-1 sm:mt-1.5 opacity-70",
              isUser ? "text-right" : "text-left"
            )}>
              {timestamp.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const isUser = role === 'user';
  
  return (
    <div className={cn(
      "flex w-full mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 shadow-md transition-all duration-300",
        isUser 
          ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground ml-4" 
          : "bg-card text-card-foreground border border-border mr-4"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        {timestamp && (
          <p className={cn(
            "text-xs mt-1.5 opacity-70",
            isUser ? "text-right" : "text-left"
          )}>
            {timestamp.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
};
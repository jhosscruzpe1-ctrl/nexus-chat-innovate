import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const isUser = role === 'user';
  
  return (
    <div className={cn(
      "flex w-full mb-3 sm:mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-md transition-all duration-300 break-words",
        isUser 
          ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground ml-2 sm:ml-4" 
          : "bg-card text-card-foreground border border-border mr-2 sm:mr-4"
      )}>
        <div className="text-xs sm:text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert [&>*]:break-words [&_a]:break-all">
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
                  className="text-primary hover:underline break-all"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => <ul className="list-disc ml-3 sm:ml-4 mb-1 sm:mb-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal ml-3 sm:ml-4 mb-1 sm:mb-2">{children}</ol>,
              li: ({ children }) => <li className="mb-0.5 sm:mb-1">{children}</li>,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
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
  );
};

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import { cn } from "@/lib/utils";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-14 w-14 sm:h-16 sm:w-16 rounded-full",
            "bg-gradient-to-br from-primary via-primary-glow to-secondary",
            "hover:scale-110 hover:shadow-2xl transition-all duration-300",
            "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
            "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
            "z-50 group"
          )}
          size="icon"
        >
          <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 bg-green-500 rounded-full animate-pulse border-2 border-background shadow-lg" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={cn(
            "fixed shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden z-50 animate-in slide-in-from-bottom-4 fade-in duration-300",
            isMaximized 
              ? "inset-4 sm:inset-6 w-auto h-auto" 
              : "bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 w-auto sm:w-[400px] h-[calc(100vh-2rem)] sm:h-[600px] max-h-[600px]"
          )}
        >
          <div className="relative h-full bg-background border-2 border-primary/20">
            {/* Close Button */}
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 hover:bg-destructive/20 hover:text-destructive h-8 w-8 sm:h-10 sm:w-10 transition-colors duration-200"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Chat Interface */}
            <ChatInterface 
              isMaximized={isMaximized}
              onToggleMaximize={() => setIsMaximized(!isMaximized)}
            />
          </div>
        </div>
      )}
    </>
  );
};

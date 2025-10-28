import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import { cn } from "@/lib/utils";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-14 w-14 sm:h-16 sm:w-16 rounded-full shadow-elegant",
            "bg-gradient-to-br from-primary to-secondary",
            "hover:scale-110 transition-all duration-300",
            "animate-bounce hover:animate-none",
            "z-50"
          )}
          size="icon"
        >
          <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" />
          <span className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 bg-green-500 rounded-full animate-pulse" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 w-auto sm:w-[400px] h-[calc(100vh-2rem)] sm:h-[600px] max-h-[600px] shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="relative h-full bg-background border-2 border-border">
            {/* Close Button */}
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 hover:bg-destructive/10 h-8 w-8 sm:h-10 sm:w-10"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Chat Interface */}
            <ChatInterface />
          </div>
        </div>
      )}
    </>
  );
};

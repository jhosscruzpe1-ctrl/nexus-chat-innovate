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
            "fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-elegant",
            "bg-gradient-to-br from-primary to-secondary",
            "hover:scale-110 transition-all duration-300",
            "animate-bounce hover:animate-none",
            "z-50"
          )}
          size="icon"
        >
          <MessageCircle className="h-8 w-8" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] h-[600px] shadow-2xl rounded-3xl overflow-hidden z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="relative h-full bg-background border-2 border-border">
            {/* Close Button */}
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 hover:bg-destructive/10"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Chat Interface */}
            <ChatInterface />
          </div>
        </div>
      )}
    </>
  );
};

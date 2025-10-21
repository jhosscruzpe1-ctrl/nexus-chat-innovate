import { useState } from "react";
import { RegistrationForm } from "@/components/RegistrationForm";
import { ChatInterface } from "@/components/ChatInterface";
import municipalidadBg from "@/assets/municipalidad-bg.png";
import logoMunicipalidad from "@/assets/logo-municipalidad.png";

const Index = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');

  const handleRegistrationComplete = async (id: string) => {
    setUserId(id);
    
    // Obtener nombre del usuario
    const { supabase } = await import('@/integrations/supabase/client');
    const { data } = await supabase
      .from('chatbot_users')
      .select('nombre')
      .eq('id', id)
      .single();
    
    if (data) {
      setUserName(data.nombre);
    }
  };

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${municipalidadBg})` 
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background/70 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full py-6 px-4 bg-gradient-to-r from-primary/90 via-secondary/90 to-primary/90 backdrop-blur-md shadow-glow">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={logoMunicipalidad} 
                alt="Logo Municipalidad" 
                className="h-16 w-16 object-contain animate-in zoom-in duration-700"
              />
              <div className="text-primary-foreground">
                <h1 className="text-2xl md:text-3xl font-bold">
                  Municipalidad Provincial
                </h1>
                <p className="text-sm md:text-base opacity-90">
                  Morropón - Chulucanas
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full h-full max-w-7xl">
            {!userId ? (
              <div className="flex items-center justify-center h-full">
                <RegistrationForm onComplete={handleRegistrationComplete} />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="w-full h-[calc(100vh-200px)] max-h-[800px]">
                  <ChatInterface userId={userId} userName={userName} />
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-4 px-4 bg-gradient-to-r from-secondary/90 via-primary/90 to-secondary/90 backdrop-blur-md text-primary-foreground text-center">
          <p className="text-sm">
            © 2025 Municipalidad Provincial de Morropón - Chulucanas • Chatbot Inteligente
          </p>
          <p className="text-xs mt-1 opacity-80">
            Horario de atención: Lunes a Viernes 8:00-17:00 | Sábados 8:00-13:00
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import bgImage from "@/assets/municipalidad-building.png";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white animate-in fade-in slide-in-from-bottom duration-700 pt-8">
            Municipalidad Provincial de
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-2">
              Morropón - Chulucanas
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            Innovación en servicios públicos, cercanía con los ciudadanos y desarrollo sostenible 🌟
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <Button 
              size="lg"
              onClick={() => scrollToSection('servicios')}
              className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-all duration-300 text-lg px-8 py-6"
            >
              Conoce Nuestros Servicios
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contacto')}
              className="text-lg px-8 py-6 border-2"
            >
              Contáctanos
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 animate-in fade-in slide-in-from-bottom duration-700 delay-400">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">60K+</div>
              <div className="text-sm text-white/80 mt-1">Habitantes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary">24/7</div>
              <div className="text-sm text-white/80 mt-1">Atención Virtual</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400">100%</div>
              <div className="text-sm text-white/80 mt-1">Digital</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-municipalidad.png";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Servicios", href: "#servicios" },
    { label: "Contacto", href: "#contacto" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-primary via-primary-glow to-secondary backdrop-blur-md shadow-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-500">
            <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/20 shadow-xl">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </div>
            <div className="hidden md:block">
              <span className="font-bold text-lg text-white drop-shadow-lg">
                Municipalidad de Chulucanas
              </span>
              <p className="text-xs text-white/80">Morropón - Piura</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {menuItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="relative px-5 py-2.5 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-transparent hover:border-white/30 group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.5s ease-out forwards',
                }}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-3/4 rounded-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/20 hover:text-white transition-all duration-300 rounded-xl border border-white/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/20 animate-in slide-in-from-top-2 fade-in duration-300 bg-gradient-to-b from-transparent to-black/10">
            {menuItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-5 py-3.5 text-white font-semibold hover:bg-white/20 transition-all duration-300 rounded-lg my-1 backdrop-blur-sm border border-transparent hover:border-white/30 hover:shadow-lg"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInRight 0.4s ease-out forwards',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

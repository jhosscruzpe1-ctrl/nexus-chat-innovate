import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import logoMuni from "@/assets/logo-municipalidad.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary/5 to-secondary/5 border-t-2 border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="md:col-span-1">
            <img 
              src={logoMuni} 
              alt="Logo Municipalidad" 
              className="h-20 w-20 object-contain mb-4"
            />
            <p className="text-sm text-muted-foreground">
              Innovación en servicios públicos para el desarrollo sostenible de Morropón - Chulucanas
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#nosotros" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a 
                  href="https://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=11574" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Transparencia
                </a>
              </li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-bold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>📄 Trámites Documentarios</li>
              <li>👥 Registro Civil</li>
              <li>🏗️ Obras Públicas</li>
              <li>💰 Servicios Tributarios</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>📍 Jirón Cusco 421, Chulucanas</li>
              <li>📞 +51 965 468 438</li>
              <li>✉️ alcaldia@munichulucanas.gob.pe</li>
              <li>🌐 www.munichulucanas.gob.pe</li>
            </ul>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="flex justify-center gap-6">
            <a 
              href="#" 
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 text-primary" />
            </a>
            <a 
              href="#" 
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5 text-primary" />
            </a>
            <a 
              href="#" 
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-primary" />
            </a>
            <a 
              href="#" 
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5 text-primary" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© {currentYear} Municipalidad Provincial de Morropón - Chulucanas</p>
          <p className="mt-1">Todos los derechos reservados | Desarrollado con ❤️ para nuestros ciudadanos</p>
        </div>
      </div>
    </footer>
  );
};

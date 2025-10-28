import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Globe, ExternalLink } from "lucide-react";

export const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Dirección",
      content: "Jirón Cusco 421",
      subtitle: "Chulucanas 20301, Perú",
      link: null
    },
    {
      icon: Phone,
      title: "Teléfonos",
      content: "+51 965 468 438",
      subtitle: "073433192",
      link: "tel:+51965468438"
    },
    {
      icon: Mail,
      title: "Correos",
      content: "alcaldia@munichulucanas.gob.pe",
      subtitle: "procuraduria@munichulucanas.gob.pe",
      link: "mailto:alcaldia@munichulucanas.gob.pe"
    }
  ];

  const webLinks = [
    {
      title: "Portal Institucional",
      url: "http://www.munichulucanas.gob.pe/",
      icon: Globe
    },
    {
      title: "Mesa de Partes Virtual",
      url: "https://mesadepartesdigital.munichulucanas.gob.pe/virtual/inicio.do",
      icon: FileText
    },
    {
      title: "Portal de Transparencia",
      url: "https://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=11574",
      icon: ExternalLink
    },
    {
      title: "Sedes y Contactos",
      url: "https://www.gob.pe/institucion/munichulucanas/sedes",
      icon: MapPin
    }
  ];

  return (
    <section id="contacto" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Contáctanos 📞</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Estamos aquí para atenderte. Encuentra toda nuestra información de contacto
          </p>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="p-4 md:p-6 hover:shadow-elegant transition-all duration-300 border-2">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 md:p-3 rounded-full bg-primary/10 flex-shrink-0">
                        <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-sm md:text-base">{info.title}</h3>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs md:text-sm text-muted-foreground break-words">
                        {info.content}
                      </p>
                      {info.subtitle && (
                        <p className="text-xs md:text-sm text-muted-foreground break-words">
                          {info.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Web Links */}
          <Card className="p-4 md:p-8 border-2">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Enlaces Útiles 🔗</h3>
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {webLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg border-2 hover:border-primary hover:shadow-md transition-all duration-300 group"
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5 text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="font-medium group-hover:text-primary transition-colors text-xs md:text-sm flex-1 break-words">
                      {link.title}
                    </span>
                    <ExternalLink className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground group-hover:text-primary flex-shrink-0" />
                  </a>
                );
              })}
            </div>
          </Card>

          {/* Horarios */}
          <Card className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-2">
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold mb-2">⏰ Horario de Atención</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Lunes a Viernes: 8:00 AM - 4:30 PM
              </p>
              <p className="text-xs md:text-sm text-primary font-semibold mt-2">
                💬 Chatbot 24/7
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Import missing icon
import { FileText } from "lucide-react";

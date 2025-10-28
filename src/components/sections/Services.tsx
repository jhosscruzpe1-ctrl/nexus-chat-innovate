import { Card } from "@/components/ui/card";
import { FileText, Users, Building, Leaf, DollarSign, Car } from "lucide-react";

export const Services = () => {
  const services = [
    {
      icon: FileText,
      title: "Trámites Documentarios",
      description: "Licencias de funcionamiento, certificados, permisos y más 📄",
      color: "primary"
    },
    {
      icon: Users,
      title: "Registro Civil",
      description: "Matrimonios, nacimientos, defunciones y otros registros 👥",
      color: "secondary"
    },
    {
      icon: Building,
      title: "Obras y Desarrollo Urbano",
      description: "Permisos de construcción y desarrollo territorial 🏗️",
      color: "primary"
    },
    {
      icon: DollarSign,
      title: "Servicios Tributarios",
      description: "Pago de impuestos prediales y arbitrios municipales 💰",
      color: "secondary"
    },
    {
      icon: Car,
      title: "Tránsito y Transporte",
      description: "Licencias de conducir y trámites vehiculares 🚗",
      color: "primary"
    },
    {
      icon: Leaf,
      title: "Medio Ambiente",
      description: "Gestión ambiental y programas de sostenibilidad 🌱",
      color: "secondary"
    }
  ];

  return (
    <section id="servicios" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Nuestros Servicios</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios públicos para atender las necesidades de nuestra comunidad 🎯
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 hover:shadow-elegant transition-all duration-300 hover:scale-105 border-2 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-full bg-${service.color}/10 flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 text-${service.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground">
              💬 <strong>¿Necesitas ayuda?</strong> Nuestro chatbot inteligente está disponible 24/7 para asistirte
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

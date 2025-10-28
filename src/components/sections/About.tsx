import { Card } from "@/components/ui/card";
import { Target, Eye, Heart } from "lucide-react";

export const About = () => {
  return (
    <section id="nosotros" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Sobre Nosotros</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Conoce nuestra misión, visión y valores institucionales
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Misión */}
            <Card className="p-8 hover:shadow-elegant transition-all duration-300 border-2">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Nuestra Misión 🎯</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Liderar y promover como gobierno local a las diferentes instituciones públicas y privadas en la búsqueda del desarrollo armónico de la provincia, mediante una gestión eficiente, transparente y participativa que fomente el bienestar social, económico y ambiental de la población.
                  </p>
                </div>
              </div>
            </Card>

            {/* Visión */}
            <Card className="p-8 hover:shadow-elegant transition-all duration-300 border-2">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-secondary/10">
                  <Eye className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Nuestra Visión 👁️</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ser una municipalidad modelo en el norte del Perú, reconocida por su innovación en servicios públicos, cercanía con los ciudadanos y contribución al desarrollo sostenible, posicionando a Chulucanas como centro de turismo y artesanía.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Valores */}
          <Card className="p-8 border-2">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Nuestros Valores 💚</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="font-semibold text-primary">✨ Integridad</div>
                    <p className="text-sm text-muted-foreground">Ética y compromiso con la verdad</p>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-primary">🤝 Servicio</div>
                    <p className="text-sm text-muted-foreground">Priorizamos el bienestar ciudadano</p>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-primary">💡 Innovación</div>
                    <p className="text-sm text-muted-foreground">Soluciones creativas y modernas</p>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-secondary">💪 Compromiso</div>
                    <p className="text-sm text-muted-foreground">Dedicación por el desarrollo</p>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-secondary">🔍 Transparencia</div>
                    <p className="text-sm text-muted-foreground">Gestión clara y accesible</p>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-secondary">⚖️ Equidad</div>
                    <p className="text-sm text-muted-foreground">Igualdad de oportunidades</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface RegistrationFormProps {
  onComplete: (userId: string) => void;
}

export const RegistrationForm = ({ onComplete }: RegistrationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    dni: '',
    telefono: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validar DNI
      if (formData.dni.length !== 8 || !/^\d+$/.test(formData.dni)) {
        toast({
          title: "DNI inválido",
          description: "El DNI debe tener 8 dígitos numéricos",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Verificar si el usuario ya existe
      const { data: existingUser } = await supabase
        .from('chatbot_users')
        .select('id')
        .eq('dni', formData.dni)
        .single();

      if (existingUser) {
        onComplete(existingUser.id);
        toast({
          title: "Bienvenido de nuevo",
          description: `Hola ${formData.nombre}, ya estás registrado.`,
        });
        return;
      }

      // Registrar nuevo usuario
      const { data, error } = await supabase
        .from('chatbot_users')
        .insert([formData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Registro exitoso",
        description: `Bienvenido ${formData.nombre}. Ahora puedes hacer tus consultas.`,
      });

      onComplete(data.id);
    } catch (error) {
      console.error('Error al registrar:', error);
      toast({
        title: "Error",
        description: "No se pudo completar el registro. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-2xl shadow-elegant border border-border animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Bienvenido
        </h2>
        <p className="text-muted-foreground text-sm">
          Por favor, regístrate para continuar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            placeholder="Ingresa tu nombre"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apellidos">Apellidos</Label>
          <Input
            id="apellidos"
            value={formData.apellidos}
            onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
            placeholder="Ingresa tus apellidos"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dni">DNI</Label>
          <Input
            id="dni"
            value={formData.dni}
            onChange={(e) => setFormData({ ...formData, dni: e.target.value.replace(/\D/g, '').slice(0, 8) })}
            placeholder="12345678"
            maxLength={8}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono (opcional)</Label>
          <Input
            id="telefono"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            placeholder="987654321"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email (opcional)</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="correo@ejemplo.com"
            disabled={isLoading}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registrando...
            </>
          ) : (
            'Continuar'
          )}
        </Button>
      </form>
    </div>
  );
};
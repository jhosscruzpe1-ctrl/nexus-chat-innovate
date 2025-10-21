-- Crear tabla de usuarios registrados del chatbot
CREATE TABLE public.chatbot_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  dni TEXT NOT NULL UNIQUE,
  telefono TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.chatbot_users ENABLE ROW LEVEL SECURITY;

-- Política para que todos puedan insertar (registro público)
CREATE POLICY "Permitir registro público" 
ON public.chatbot_users 
FOR INSERT 
WITH CHECK (true);

-- Política para que usuarios vean solo su información
CREATE POLICY "Usuarios ven su propia información" 
ON public.chatbot_users 
FOR SELECT 
USING (true);

-- Crear tabla de conversaciones
CREATE TABLE public.conversaciones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID NOT NULL REFERENCES public.chatbot_users(id) ON DELETE CASCADE,
  estado TEXT NOT NULL DEFAULT 'activa',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.conversaciones ENABLE ROW LEVEL SECURITY;

-- Políticas para conversaciones
CREATE POLICY "Usuarios gestionan sus conversaciones" 
ON public.conversaciones 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Crear tabla de mensajes
CREATE TABLE public.mensajes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversacion_id UUID NOT NULL REFERENCES public.conversaciones(id) ON DELETE CASCADE,
  rol TEXT NOT NULL CHECK (rol IN ('user', 'assistant', 'system')),
  contenido TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.mensajes ENABLE ROW LEVEL SECURITY;

-- Políticas para mensajes
CREATE POLICY "Acceso público a mensajes" 
ON public.mensajes 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Crear tabla de intenciones y consultas comunes
CREATE TABLE public.intenciones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  categoria TEXT NOT NULL,
  intent TEXT NOT NULL,
  ejemplos TEXT[],
  respuesta_template TEXT NOT NULL,
  keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.intenciones ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública de intenciones
CREATE POLICY "Lectura pública de intenciones" 
ON public.intenciones 
FOR SELECT 
USING (true);

-- Insertar intenciones comunes para trámites municipales
INSERT INTO public.intenciones (categoria, intent, ejemplos, respuesta_template, keywords) VALUES
('tramites', 'consulta_licencia_funcionamiento', ARRAY['licencia de funcionamiento', 'permiso para negocio', 'como abrir negocio'], 'Para obtener una licencia de funcionamiento, necesitas: 1) Solicitud dirigida al alcalde, 2) Copia de DNI, 3) Certificado de compatibilidad de uso, 4) Pago de tasas. El trámite toma aproximadamente 7 días hábiles.', ARRAY['licencia', 'funcionamiento', 'negocio', 'permiso']),
('tramites', 'consulta_partida_nacimiento', ARRAY['partida de nacimiento', 'certificado de nacimiento', 'acta de nacimiento'], 'Para obtener una partida de nacimiento: 1) Acércate a la oficina de registro civil, 2) Presenta tu DNI, 3) Indica el nombre completo y fecha de nacimiento, 4) Paga la tasa correspondiente. Emisión inmediata.', ARRAY['partida', 'nacimiento', 'certificado', 'acta']),
('tramites', 'pago_predial', ARRAY['impuesto predial', 'pagar predio', 'contribución predial'], 'El impuesto predial se puede pagar: 1) En caja de la municipalidad, 2) En bancos autorizados, 3) Por transferencia bancaria. Recuerda que el pago anticipado en febrero tiene descuento del 10%.', ARRAY['predial', 'impuesto', 'pago', 'predio']),
('tramites', 'licencia_construccion', ARRAY['permiso de construcción', 'licencia para construir', 'autorización de obra'], 'Para la licencia de construcción necesitas: 1) Planos arquitectónicos, 2) Memoria descriptiva, 3) Estudio de suelos, 4) Certificado de parámetros urbanísticos. El tiempo de evaluación es de 15 días hábiles.', ARRAY['construcción', 'construir', 'edificar', 'obra']),
('informacion', 'horario_atencion', ARRAY['horario', 'hora de atención', 'cuando atienden'], 'Horario de atención: Lunes a Viernes de 8:00 AM a 5:00 PM. Sábados de 8:00 AM a 1:00 PM. La atención en caja cierra 30 minutos antes.', ARRAY['horario', 'atención', 'hora']),
('informacion', 'ubicacion', ARRAY['donde quedan', 'dirección', 'como llegar'], 'La Municipalidad Provincial de Morropón está ubicada en la Plaza de Armas de Chulucanas. Puede comunicarse al teléfono (073) 123456.', ARRAY['ubicación', 'dirección', 'donde', 'llegar']);

-- Crear función para actualizar updated_at
CREATE OR REPLACE FUNCTION public.actualizar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at en conversaciones
CREATE TRIGGER actualizar_conversaciones_updated_at
BEFORE UPDATE ON public.conversaciones
FOR EACH ROW
EXECUTE FUNCTION public.actualizar_updated_at();

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_conversaciones_usuario ON public.conversaciones(usuario_id);
CREATE INDEX idx_mensajes_conversacion ON public.mensajes(conversacion_id);
CREATE INDEX idx_mensajes_created_at ON public.mensajes(created_at);
CREATE INDEX idx_intenciones_keywords ON public.intenciones USING GIN(keywords);
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Función de tokenización simple
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2); // Filtrar tokens muy cortos
}

// Función de lematización simple (stemming básico)
function lemmatize(word: string): string {
  // Reglas básicas de lematización para español
  const rules = [
    { suffix: 'ando', replacement: 'ar' },
    { suffix: 'iendo', replacement: 'ir' },
    { suffix: 'mente', replacement: '' },
    { suffix: 'ción', replacement: 'r' },
    { suffix: 'sión', replacement: 'r' },
    { suffix: 'ador', replacement: 'ar' },
    { suffix: 'ante', replacement: 'ar' },
    { suffix: 'ente', replacement: 'er' },
    { suffix: 'ible', replacement: 'er' },
    { suffix: 'able', replacement: 'ar' },
    { suffix: 'idad', replacement: '' },
    { suffix: 'anza', replacement: 'ar' },
    { suffix: 'encia', replacement: 'er' },
    { suffix: 'ando', replacement: 'ar' },
    { suffix: 'iendo', replacement: 'ir' },
    { suffix: 'eron', replacement: 'er' },
    { suffix: 'aron', replacement: 'ar' },
    { suffix: 'ados', replacement: 'ar' },
    { suffix: 'idos', replacement: 'ir' },
  ];

  for (const rule of rules) {
    if (word.endsWith(rule.suffix) && word.length > rule.suffix.length + 2) {
      return word.slice(0, -rule.suffix.length) + rule.replacement;
    }
  }
  
  return word;
}

// Función para encontrar la mejor intención basada en keywords
async function findIntent(message: string, supabase: any) {
  const tokens = tokenize(message);
  const lemmas = tokens.map(lemmatize);
  
  console.log('Tokens:', tokens);
  console.log('Lemmas:', lemmas);
  
  // Obtener todas las intenciones
  const { data: intenciones, error } = await supabase
    .from('intenciones')
    .select('*');
    
  if (error) {
    console.error('Error fetching intenciones:', error);
    return null;
  }
  
  // Calcular score para cada intención
  let bestMatch = null;
  let bestScore = 0;
  
  for (const intencion of intenciones || []) {
    let score = 0;
    const keywords = intencion.keywords || [];
    
    // Comparar con keywords
    for (const keyword of keywords) {
      const keywordTokens = tokenize(keyword);
      const keywordLemmas = keywordTokens.map(lemmatize);
      
      for (const lemma of lemmas) {
        if (keywordLemmas.includes(lemma)) {
          score += 2;
        }
      }
      
      for (const token of tokens) {
        if (keywordTokens.includes(token)) {
          score += 1;
        }
      }
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = intencion;
    }
  }
  
  console.log('Best match:', bestMatch, 'Score:', bestScore);
  
  // Umbral mínimo de confianza
  if (bestScore >= 2) {
    return bestMatch;
  }
  
  return null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationId, history } = await req.json();
    
    console.log('Processing message:', message);
    console.log('Conversation ID:', conversationId);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Buscar intención en la base de datos
    const intent = await findIntent(message, supabase);
    
    let response = '';
    let useAI = false;
    
    if (intent) {
      // Responder con template de intención
      response = intent.respuesta_template;
      console.log('Using intent template:', intent.intent);
    } else {
      // Usar AI para respuesta personalizada
      useAI = true;
      console.log('Using AI for response');
      
      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
      if (!LOVABLE_API_KEY) {
        throw new Error('LOVABLE_API_KEY not configured');
      }
      
      const systemPrompt = `Eres un asistente virtual amigable de la Municipalidad Provincial de Morropón - Chulucanas.

📍 Dirección: Jirón Cusco 421, Chulucanas 20301
📞 Central: +51 965 468 438
✉️ alcaldia@munichulucanas.gob.pe
🌐 www.munichulucanas.gob.pe
⏰ Lunes-Viernes 8:00-16:30

Usa emojis y **negritas** para resaltar. Responde brevemente.`;

      const messages = [
        { role: 'system', content: systemPrompt },
        ...(history || []).slice(-5),
        { role: 'user', content: message }
      ];
      
      const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages,
          temperature: 0.7,
          max_tokens: 500,
        }),
      });
      
      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error('AI API error:', aiResponse.status, errorText);
        throw new Error('Error al procesar con IA');
      }
      
      const aiData = await aiResponse.json();
      response = aiData.choices[0].message.content;
    }
    
    // Guardar mensaje del usuario
    if (conversationId) {
      await supabase.from('mensajes').insert({
        conversacion_id: conversationId,
        rol: 'user',
        contenido: message,
      });
      
      // Guardar respuesta del asistente
      await supabase.from('mensajes').insert({
        conversacion_id: conversationId,
        rol: 'assistant',
        contenido: response,
        metadata: { 
          intent: intent?.intent || 'ai_generated',
          used_ai: useAI 
        }
      });
    }
    
    return new Response(
      JSON.stringify({ 
        response,
        intent: intent?.intent || null,
        usedAI: useAI
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
    
  } catch (error) {
    console.error('Error in chatbot-nlp:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Error desconocido',
        response: 'Lo siento, hubo un error procesando tu mensaje. Por favor, intenta nuevamente.'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
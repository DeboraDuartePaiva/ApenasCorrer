// Configuração do Cliente Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Chaves reais do projeto ApenasCorrer da Débora
export const SUPABASE_URL = "https://lzjtafwbvkjxcvlotwhj.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6anRhZndidmtqeGN2bG90d2hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NDA2OTYsImV4cCI6MjA5NzQxNjY5Nn0.IElfC7e-jG-vtBqJm8jIMkXiLKUb_IcYEXn3niGmX2I";

let supabaseInstance = null;
let isConfigured = false;

if (SUPABASE_URL && SUPABASE_ANON_KEY && 
    SUPABASE_URL !== "SUA_SUPABASE_URL_AQUI" && 
    SUPABASE_ANON_KEY !== "SUA_SUPABASE_ANON_KEY_AQUI") {
  try {
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    isConfigured = true;
    console.log("[Supabase] Cliente inicializado com sucesso na nuvem.");
  } catch (e) {
    console.error("[Supabase] Erro ao inicializar o Supabase:", e);
  }
} else {
  console.warn(
    "[Supabase] Aviso: Chaves padrão detectadas. O aplicativo funcionará " +
    "temporariamente em modo local (Visitante)."
  );
}

export const supabase = supabaseInstance;
export const isSupabaseConfigured = isConfigured;

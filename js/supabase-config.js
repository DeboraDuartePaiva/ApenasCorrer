// Configuração do Cliente Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// =========================================================================
// INSTRUÇÕES: Substitua os valores abaixo pelas chaves do seu projeto
// obtidas em: Settings -> API no painel do seu Supabase.
// =========================================================================
export const SUPABASE_URL = "SUA_SUPABASE_URL_AQUI";
export const SUPABASE_ANON_KEY = "SUA_SUPABASE_ANON_KEY_AQUI";

let supabaseInstance = null;
let isConfigured = false;

// Verifica se o usuário inseriu as chaves reais
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
    "temporariamente em modo local (Visitante). Para ativar o login e salvamento " +
    "em nuvem, configure suas credenciais no arquivo: js/supabase-config.js"
  );
}

export const supabase = supabaseInstance;
export const isSupabaseConfigured = isConfigured;

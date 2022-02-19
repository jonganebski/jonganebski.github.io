function assertEnvVariableVite(key: string) {
  const variable = import.meta.env[key];
  if (variable === undefined) {
    console.error(`Environment variable missing: ${key}`);
    process.exit(1);
  }

  if (typeof variable !== 'string') {
    console.error(`Wrong environment variable type: ${key}`);
    process.exit(1);
  }

  return variable;
}

export function envVariables() {
  const supabaseUrl = assertEnvVariableVite('VITE_SUPABASE_URL');
  const supabaseAnonKey = assertEnvVariableVite('VITE_SUPABASE_ANON_KEY');
  return { supabaseUrl, supabaseAnonKey };
}

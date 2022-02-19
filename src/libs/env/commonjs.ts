import dotenv from 'dotenv';

dotenv.config();

function assertEnvVariableCommonJs(key: string) {
  const variable = process.env[key];
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
  const supabaseUrl = assertEnvVariableCommonJs('VITE_SUPABASE_URL');
  const supabaseAnonKey = assertEnvVariableCommonJs('VITE_SUPABASE_ANON_KEY');
  return { supabaseUrl, supabaseAnonKey };
}

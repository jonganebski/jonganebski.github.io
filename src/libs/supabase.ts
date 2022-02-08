import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (supabaseUrl === undefined) {
	console.error('Environment variable missing: VITE_SUPABASE_URL');
	process.exit(1);
}
if (supabaseAnonKey === undefined) {
	console.error('Environment variable missing: VITE_SUPABASE_ANON_KEY');
	process.exit(1);
}
if (typeof supabaseUrl !== 'string') {
	console.error('Wrong environment variable tpye: VITE_SUPABASE_URL');
	process.exit(1);
}
if (typeof supabaseAnonKey !== 'string') {
	console.error('Wrong environment variable tpye: VITE_SUPABASE_ANON_KEY');
	process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

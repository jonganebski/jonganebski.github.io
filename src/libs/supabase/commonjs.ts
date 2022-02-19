import { createClient } from '@supabase/supabase-js';
import { envVariables } from '../env/commonjs';

const { supabaseAnonKey, supabaseUrl } = envVariables();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

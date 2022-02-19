import { createClient } from '@supabase/supabase-js';
import { envVariables } from '../env/jsmodule';

const { supabaseAnonKey, supabaseUrl } = envVariables();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

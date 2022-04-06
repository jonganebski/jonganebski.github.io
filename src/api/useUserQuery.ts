import { User } from '@supabase/supabase-js';
import { useQuery } from 'vue-query';
import { supabase } from '~/libs/supabase';

export function useUserQuery() {
  return useQuery<User | null>('user', async () => await supabase.auth.user());
}

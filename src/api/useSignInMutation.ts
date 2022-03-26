import { Provider, User } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from 'vue-query';
import { supabase } from '~/libs/supabase';

type AllowedProvider = Extract<Provider, 'facebook' | 'github' | 'google'>;

interface UseAuthMutationVariables {
  provider: AllowedProvider;
}

export function useSignInMutation() {
  const queryClient = useQueryClient();

  return useMutation<User | null, unknown, UseAuthMutationVariables>(
    async ({ provider }) => (await supabase.auth.signIn({ provider })).user,
    {
      onSuccess: (data) => {
        queryClient.setQueryData<User | null>('user', () => data);
      },
    },
  );
}

import { useMutation, useQueryClient } from 'vue-query';
import { useUserQuery } from '~/api/useUserQuery';
import { supabase } from '~/libs/supabase';
import type { TetrisRecord } from '~/libs/supabase';
import type { UseRecordsQueryData } from './useRecordsQuery';

interface UseCreateRecordMutationVariables {
  score: number;
}

export function useCreateRecordMutation() {
  const queryClient = useQueryClient();

  const { data: user } = useUserQuery();

  return useMutation<TetrisRecord | null, unknown, UseCreateRecordMutationVariables>(
    async ({ score }) => {
      if (!user.value) return null;

      const { data } = await supabase
        .from<TetrisRecord>('tetris-records')
        .select('*')
        .eq('user_id', user.value.id)
        .order('score', { ascending: false });

      if (!data) return null;

      switch (data.length <= 10) {
        case true: {
          return (
            await supabase
              .from<TetrisRecord>('tetris-records')
              .insert({ score, user_id: user.value.id })
              .single()
          ).data;
        }

        case false: {
          const worstRecord = data[data.length - 1];
          if (worstRecord.score > score) return null;
          return (
            await supabase
              .from<TetrisRecord>('tetris-records')
              .update({ id: worstRecord.id, score })
              .single()
          ).data;
        }
      }
    },
    {
      onSuccess: (resData) => {
        if (!user.value) return;
        const { user_name = user.value.email, avatar_url = '' } = user.value.user_metadata;
        if (!resData) return;
        const prevData = queryClient.getQueryData<UseRecordsQueryData[]>('tetris-records');
        if (!prevData) return;
        queryClient.setQueryData<UseRecordsQueryData[]>('tetris-records', () =>
          [...prevData, { ...resData, user: { user_name, avatar_url } }].sort(
            (a, b) => b.score - a.score,
          ),
        );
      },
    },
  );
}

import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useUserQuery } from '~/api/useUserQuery';
import { SlidingPuzzleRecord, supabase } from '~/libs/supabase';
import { UseRecordsQueryData } from './useRecordsQuery';

interface UseCreateRecordMutationVariables {
  score: number;
}

export function useCreateRecordMutation() {
  const queryClient = useQueryClient();

  const { data: user } = useUserQuery();

  return useMutation<SlidingPuzzleRecord | null, unknown, UseCreateRecordMutationVariables>(
    async ({ score }) => {
      if (!user.value) return null;

      const { data } = await supabase
        .from<SlidingPuzzleRecord>('sliding-puzzle-records')
        .select('*')
        .eq('user_id', user.value.id)
        .order('score', { ascending: true });

      if (!data) return null;

      switch (data.length <= 10) {
        case true: {
          return (
            await supabase
              .from<SlidingPuzzleRecord>('sliding-puzzle-records')
              .insert({ score, user_id: user.value.id })
              .single()
          ).data;
        }

        case false: {
          const worstRecord = data[data.length - 1];
          if (worstRecord.score < score) return null;
          return (
            await supabase
              .from<SlidingPuzzleRecord>('sliding-puzzle-records')
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
        const prevData = queryClient.getQueryData<UseRecordsQueryData[]>([
          'sliding-puzzle-records',
        ]);
        if (!prevData) return;
        queryClient.setQueryData<UseRecordsQueryData[]>(['sliding-puzzle-records'], () =>
          [...prevData, { ...resData, user: { user_name, avatar_url } }].sort(
            (a, b) => a.score - b.score,
          ),
        );
      },
    },
  );
}

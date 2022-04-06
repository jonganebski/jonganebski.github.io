import { useMutation, useQueryClient } from 'vue-query';
import { useUserQuery } from '~/api/useUserQuery';
import { MineSweeperRecord, supabase } from '~/libs/supabase';
import { UseRecordsQueryData } from './useRecordsQuery';

interface UseCreateRecordMutationVariables {
  modeId: number;
  score: number;
}

export function useCreateRecordMutation() {
  const queryClient = useQueryClient();

  const { data: user } = useUserQuery();

  return useMutation<MineSweeperRecord | null, unknown, UseCreateRecordMutationVariables>(
    async ({ modeId, score }) => {
      if (!user.value) return null;

      const { data } = await supabase
        .from<MineSweeperRecord>('mine-sweeper-records')
        .select('*')
        .eq('user_id', user.value.id)
        .eq('mode_id', modeId)
        .order('score', { ascending: true });

      if (!data) return null;

      switch (data.length <= 10) {
        case true: {
          return (
            await supabase
              .from<MineSweeperRecord>('mine-sweeper-records')
              .insert({ mode_id: modeId, score, user_id: user.value.id })
              .single()
          ).data;
        }
        case false: {
          const worstRecord = data[data.length - 1];
          if (worstRecord.score < score) return null;
          return (
            await supabase
              .from<MineSweeperRecord>('mine-sweeper-records')
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
          'mine-sweeper-records',
          resData.mode_id,
        ]);
        if (!prevData) return;
        queryClient.setQueryData<UseRecordsQueryData[]>(
          ['mine-sweeper-records', resData.mode_id],
          () =>
            [...prevData, { ...resData, user: { user_name, avatar_url } }].sort(
              (a, b) => a.score - b.score,
            ),
        );
      },
    },
  );
}

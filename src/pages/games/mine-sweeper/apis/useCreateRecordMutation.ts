import { useMutation } from 'vue-query';
import { MineSweeperRecord, supabase } from '~/libs/supabase';

interface UseCreateRecordMutationVariables {
  modeId: number;
  userId: string;
  time: number;
}

export function useCreateRecordMutation() {
  return useMutation<any, unknown, UseCreateRecordMutationVariables>(
    async ({ modeId, userId, time }) => {
      const { data } = await supabase
        .from<MineSweeperRecord>('mine-sweeper-records')
        .select('*')
        .eq('user_id', userId)
        .eq('mode_id', modeId)
        .order('time', { ascending: true });

      if (!data) return null;

      switch (data.length <= 10) {
        case true: {
          const { data: resData } = await supabase
            .from<MineSweeperRecord>('mine-sweeper-records')
            .insert({ mode_id: modeId, time, user_id: userId });
          console.log(resData);
          return resData;
        }
        case false: {
          const worstRecord = data[data.length - 1];
          if (worstRecord.time < time) return null;
          const { data: resData } = await supabase
            .from<MineSweeperRecord>('mine-sweeper-records')
            .update({ id: worstRecord.id, time });
          return resData;
        }
      }
    },
    { onSuccess: () => {} },
  );
}

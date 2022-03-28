import { useMutation } from 'vue-query';
import { MineSweeperRecord, supabase } from '~/libs/supabase';

export function useCreateRecordMutation() {
  return useMutation<any, unknown, { modeId: number; userId: string; time: number }>(
    async ({ modeId, userId, time }) => {
      const { data } = await supabase
        .from<MineSweeperRecord>('mine-sweeper-records')
        .select('*')
        .eq('user_id', userId)
        .eq('mode_id', modeId)
        .order('time', { ascending: true });

      if (!data) return null;

      if (data.length <= 10) {
        const { data: resData } = await supabase
          .from<MineSweeperRecord>('mine-sweeper-records')
          .insert({ mode_id: modeId, time, user_id: userId });
        console.log(resData);
        return resData;
      } else {
        const latestRecord = data[data.length - 1];
        if (latestRecord.time < time) return null;
        const { data: resData } = await supabase
          .from<MineSweeperRecord>('mine-sweeper-records')
          .update({ id: latestRecord.id, time });
        return resData;
      }
    },
    { onSuccess: () => {} },
  );
}

import { useMutation } from 'vue-query';
import { SlidingPuzzleRecord, supabase } from '~/libs/supabase';

interface UseCreateRecordMutationVariables {
  userId: string;
  score: number;
}

export function useCreateRecordMutation() {
  return useMutation<unknown, unknown, UseCreateRecordMutationVariables>(
    async ({ userId, score }) => {
      const { data } = await supabase
        .from<SlidingPuzzleRecord>('sliding-puzzle-records')
        .select('*')
        .eq('user_id', userId)
        .order('score', { ascending: true });

      if (!data) return null;

      switch (data.length <= 10) {
        case true: {
          const { data: resData } = await supabase
            .from<SlidingPuzzleRecord>('mine-sweeper-records')
            .insert({ score, user_id: userId });
          console.log(resData);
          return resData;
        }

        case false: {
          const worstRecord = data[data.length - 1];
          if (worstRecord.score < score) return null;
          const { data: resData } = await supabase
            .from<SlidingPuzzleRecord>('mine-sweeper-records')
            .update({ id: worstRecord.id, score });
          return resData;
        }
      }
    },
  );
}

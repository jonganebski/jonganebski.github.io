<script setup lang="ts">
import { useMyI18n } from '~/plugins/i18n';
import { useRecordsQuery } from '../apis/useRecordsQuery';

const { t } = useMyI18n();

const { isLoading, data } = useRecordsQuery();

const topRecords = computed(computeTopRecords);

function computeTopRecords() {
  const topRecords: number[] = [];
  if (!data.value) return topRecords;
  for (let i = 0; i < data.value?.length; i++) {
    const { score } = data.value[i];
    if (topRecords.length === 0) {
      topRecords.push(score);
      continue;
    }
    if (topRecords[topRecords.length - 1] === score) continue;
    topRecords.push(score);
    if (topRecords.length === 3) break;
  }
  return topRecords;
}
</script>

<template>
  <div class="mt-30 p-4 mx-auto max-w-xl rounded shadow-lg">
    <table class="mx-auto w-full text-sm table-fixed">
      <thead>
        <tr>
          <th class="pb-5"><carbon-list-numbered /></th>
          <th class="pb-5 w-[80%]"><carbon-user class="mx-auto" /></th>
          <th class="pb-5"><carbon-scatter-matrix class="ml-auto" /></th>
        </tr>
      </thead>
      <tbody class="w-full">
        <tr v-if="isLoading">
          <td colspan="3" class="py-10 text-center">Loading...</td>
        </tr>
        <tr v-else-if="!data || data.length === 0">
          <td colspan="3" class="py-10 text-center">No Data</td>
        </tr>
        <tr v-else v-for="(record, index) in data" :key="record.id" class="w-full">
          <td class="py-2">
            {{ index + 1 }}
          </td>
          <td class="py-2 px-4">
            <div class="w-full flex items-center justify-start gap-3">
              <div class="relative">
                <ui-avatar
                  :src="record.user.avatar_url"
                  :width="40"
                  :height="40"
                  :alt="t('the_avatar_of', { user_name: record.user.user_name })"
                />
                <span class="absolute top-0 right-0 text-xl pointer-events-none">
                  {{
                    record.score === topRecords[0]
                      ? '🥇'
                      : record.score === topRecords[1]
                      ? '🥈'
                      : record.score === topRecords[2]
                      ? '🥉'
                      : ''
                  }}
                </span>
              </div>
              <span class="overflow-ellipsis overflow-hidden whitespace-nowrap">
                {{ record.user.user_name }}
              </span>
            </div>
          </td>
          <td class="py-2 text-right">{{ record.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

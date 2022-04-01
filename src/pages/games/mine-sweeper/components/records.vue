<script setup lang="ts">
import { useRecordsQuery } from '../apis/useRecordsQuery';

const props = defineProps<{
  selectedMode?: number;
}>();

const { data, isLoading } = useRecordsQuery(computed(() => props.selectedMode));

const topRecords = computed(computeTopRecords);

function computeTopRecords() {
  const topRecords: number[] = [];
  if (!data.value) return topRecords;
  for (let i = 0; i < data.value?.length; i++) {
    const { time } = data.value[i];
    if (topRecords.length === 0) {
      topRecords.push(time);
      continue;
    }
    if (topRecords[topRecords.length - 1] === time) continue;
    topRecords.push(time);
    if (topRecords.length === 3) break;
  }
  return topRecords;
}
</script>

<template>
  <div class="mt-10 p-10 rounded shadow-lg">
    <table class="mx-auto text-sm">
      <thead>
        <tr>
          <th class="pb-5 pr-10"><carbon-list-numbered class="mx-auto" /></th>
          <th class="pb-5 px-10 w-48"><carbon-user class="mx-auto" /></th>
          <th class="pb-5 pl-10"><carbon-time class="mx-auto" /></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td colspan="3" class="py-10 text-center">Loading...</td>
        </tr>
        <tr v-else-if="!data || data.length === 0">
          <td colspan="3" class="py-10 text-center">No Data</td>
        </tr>
        <tr v-else v-for="(record, index) in data" :key="record.id">
          <td class="py-2 pr-10 text-center">
            {{ index + 1 }}
          </td>
          <td class="py-2">
            <div class="flex items-center gap-3">
              <div class="relative">
                <ui-lazy-image
                  :src="record.user.avatar_url ?? ''"
                  :width="40"
                  :height="40"
                  class="rounded-full"
                />
                <span class="absolute top-0 right-0 text-xl">
                  {{
                    topRecords[0] === record.time
                      ? '🥇'
                      : topRecords[1] === record.time
                      ? '🥈'
                      : topRecords[2] === record.time
                      ? '🥉'
                      : ''
                  }}
                </span>
              </div>
              <span class="w-48 truncate">{{ record.user.user_name }}</span>
            </div>
          </td>
          <td class="py-2 text-right">{{ (record.time / 1000).toFixed(2) }}`s</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useMyI18n } from '~/plugins/i18n';
import { useModes } from '../composables/useModes';

const { t } = useMyI18n();

const router = useRouter();
const route = useRoute();

const { modeId, modes } = useModes();

function pushWithModeQuery(value: string | number) {
  router.push({ path: route.path, query: { mode: value } });
}
</script>

<template>
  <ui-select :model-value="modeId" :label="t('mode')" @update:model-value="pushWithModeQuery">
    <ui-option
      v-for="mode in modes"
      :key="mode.id"
      :value="mode.id"
      :label="mode.mode.toUpperCase()"
    />
  </ui-select>
</template>

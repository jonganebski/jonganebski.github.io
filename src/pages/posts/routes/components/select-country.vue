<script setup lang="ts">
import { useCountryNames } from '~/composables/useCountryNames';
import { getRoutePosts } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';
import { useSearchParams } from '../composables/useSearchParams';

const { t } = useMyI18n();

const { countryParam, changeParam } = useSearchParams();

const { countryName } = useCountryNames();

const countryOptions = computed(() =>
  Array.from(new Set(getRoutePosts()?.flatMap(({ countries }) => countries)))
    .map((code) => ({
      label: countryName.value[code],
      value: code,
    }))
    .sort((a, b) => a.label.localeCompare(b.label)),
);
</script>

<template>
  <ui-select
    :modelValue="countryParam"
    :label="t('country')"
    size="xs"
    @update:modelValue="changeParam($event.toString())"
  >
    <ui-option value="all" :label="t('countries.all')" class="text-xs" />
    <ui-option
      v-for="{ label, value } in countryOptions"
      :key="value"
      :value="value"
      :label="label"
      class="text-xs"
    />
  </ui-select>
</template>

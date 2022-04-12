<script setup lang="ts">
import { useCountryNames } from '~/composables/useCountryNames';
import { getRoutePosts } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';
import { CountryParam } from '../composables/useSearchParams';

interface Props {
  countryParam: CountryParam;
}

const props = defineProps<Props>();
const emits = defineEmits<{ (event: 'select-country', code: string): void }>();

const { t } = useMyI18n();

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
    :modelValue="props.countryParam"
    @update:modelValue="emits('select-country', $event.toString())"
    :label="t('country')"
    class=""
  >
    <ui-option value="all" :label="t('countries.all')" />
    <ui-option
      v-for="{ label, value } in countryOptions"
      :key="value"
      :value="value"
      :label="label"
    />
  </ui-select>
</template>

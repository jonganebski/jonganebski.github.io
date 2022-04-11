<script setup lang="ts">
import { useCountryNames } from '~/composables/useCountryNames';
import { getRoutePosts } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';

const props = defineProps<{ DEFAULT_VALUE: string; countryQuery: string }>();

const { t } = useMyI18n();
const router = useRouter();
const route = useRoute();

const { countryName } = useCountryNames();

const countryOptions = computed(() =>
  Array.from(new Set(getRoutePosts()?.flatMap(({ countries }) => countries)))
    .map((code) => ({
      label: countryName.value[code],
      value: code,
    }))
    .sort((a, b) => a.label.localeCompare(b.label)),
);

function onCountrySelect(value: string | number) {
  router.replace({ path: route.path, query: { country: value.toString() } });
}
</script>

<template>
  <ui-select
    :modelValue="props.countryQuery"
    @update:modelValue="onCountrySelect"
    :label="t('country')"
    class=""
  >
    <ui-option :value="props.DEFAULT_VALUE" :label="t('countries.all')" />
    <ui-option
      v-for="{ label, value } in countryOptions"
      :key="value"
      :value="value"
      :label="label"
    />
  </ui-select>
</template>

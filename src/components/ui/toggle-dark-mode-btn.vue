<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { useMyI18n } from '~/plugins/i18n';

const { t } = useMyI18n();

const isDark = useDark();
const toggleDarkMode = useToggle(isDark);
</script>

<template>
  <button
    @click="toggleDarkMode()"
    :aria-label="
      isDark ? t('click_to_change_to_the_light_mode') : t('click_to_change_to_the_dark_mode')
    "
  >
    <carbon-moon v-if="isDark" />
    <carbon-sun v-else />
  </button>
</template>

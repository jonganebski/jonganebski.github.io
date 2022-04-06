<script setup lang="ts">
import { isDark, toggleDarkMode } from '~/composables/useDarkMode';
import { useMyI18n } from '~/plugins/i18n';

const { t } = useMyI18n();
</script>

<template>
  <button
    :aria-label="
      isDark ? t('click_to_change_to_the_light_mode') : t('click_to_change_to_the_dark_mode')
    "
    @click="toggleDarkMode()"
  >
    <carbon-moon v-if="isDark" />
    <carbon-sun v-else />
  </button>
</template>

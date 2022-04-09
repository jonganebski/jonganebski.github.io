<script setup lang="ts">
import { useUserQuery } from '~/api/useUserQuery';
import { useMyI18n } from '~/plugins/i18n';

const { data: user } = useUserQuery();

const { t } = useMyI18n();
</script>

<template>
  <p v-if="!user" class="text-rose-500 text-sm">
    {{ t('games_auth_warning') }}
  </p>
</template>

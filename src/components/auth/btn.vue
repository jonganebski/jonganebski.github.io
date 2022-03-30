<script setup lang="ts">
import { useSignInMutation } from '~/api/useSignInMutation';
import type { AllowedProvider } from '~/api/useSignInMutation';
import { supabase } from '~/libs/supabase';
import { useMyI18n } from '~/plugins/i18n';

interface Props {
  provider?: AllowedProvider;
  signOut?: boolean;
}

const props = defineProps<Props>();

const { t } = useMyI18n();

const { mutate: signIn } = useSignInMutation();

function onClick() {
  if (props.signOut) return supabase.auth.signOut();
  if (props.provider) return signIn({ provider: props.provider });
}
</script>

<template>
  <button
    class="relative h-12 px-3 flex items-center bg-dark-500 text-light-500 overflow-hidden group"
    @click="onClick"
  >
    <template v-if="props.provider === 'github'">
      <icon-github class="icon text-purple-700" />
      <span class="z-10 ml-12">
        {{ t('sign_in_with_github') }}
      </span>
    </template>
    <template v-else-if="props.provider === 'google'">
      <icon-google class="icon text-red-700" />
      <span class="z-10 ml-12">
        {{ t('sign_in_with_google') }}
      </span>
    </template>
    <template v-else-if="props.provider === 'facebook'">
      <icon-facebook class="icon text-blue-700" />
      <span class="z-10 ml-12">
        {{ t('sign_in_with_facebook') }}
      </span>
    </template>
    <template v-else-if="!props.provider && props.signOut">
      <carbon-logout class="icon" />
      <span class="z-10 ml-12">
        {{ t('sign_out') }}
      </span>
    </template>
  </button>
</template>

<style scoped lang="css">
.icon {
  @apply absolute left-3 w-8 h-8 transition-all duration-200 transform scale-500 group-hover:scale-100 group-hover:text-light-500 group-hover:text-light-500;
}
</style>

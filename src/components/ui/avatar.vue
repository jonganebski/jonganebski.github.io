<script setup lang="ts">
import { User } from '@supabase/supabase-js';
import { onClickOutside } from '@vueuse/core';
import { useQueryClient } from 'vue-query';
import { useSignInMutation } from '~/api/useSignInMutation';
import { useUserQuery } from '~/api/useUserQuery';
import { supabase } from '~/libs/supabase';
import { useMyI18n } from '~/plugins/i18n';

const { t } = useMyI18n();

const queryClient = useQueryClient();

const { mutate: signIn } = useSignInMutation();
const { data: user } = useUserQuery();

const isAuthContainerOpen = ref(false);

const authContainer = ref<HTMLDivElement | null>(null);
onClickOutside(authContainer, closeAuthContainer);

function closeAuthContainer() {
  isAuthContainerOpen.value = false;
}

function toggleAuthContainer() {
  isAuthContainerOpen.value = !isAuthContainerOpen.value;
}

function signOut() {
  supabase.auth.signOut();
}

onMounted(() => {
  supabase.auth.onAuthStateChange((_, session) => {
    queryClient.setQueryData<User | null>('user', () => session?.user ?? null);
  });
});
</script>

<template>
  <div class="relative mb-10" ref="authContainer">
    <button
      class="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-gray-100 dark:bg-dark-800 transform active:scale-90"
      @click="toggleAuthContainer"
    >
      <img
        v-if="user?.user_metadata.avatar_url"
        :src="user?.user_metadata.avatar_url"
        alt="The avatar of the user"
      />
      <carbon-user v-else class="text-lg" />
    </button>
    <div class="absolute top-1/2 transform -translate-y-1/2 left-14">
      <div v-if="isAuthContainerOpen && user" class="auth-container">
        <div class="text-dark-500">
          <span>Email: {{ user.email }}</span>
          <span>Provider: {{ user.app_metadata.provider }}</span>
        </div>
        <button class="auth-btn group" @click="signOut">
          <carbon-logout class="icon text-teal-700" />
          <span class="z-10 ml-12">{{ t('sign_out') }}</span>
        </button>
      </div>
      <div v-if="isAuthContainerOpen && !user" class="auth-container">
        <h6 class="text-dark-500">{{ t('sign_up_or_sign_in') }}</h6>
        <div class="grid gap-3">
          <button class="auth-btn group" @click="signIn({ provider: 'github' })">
            <icon-github class="icon text-purple-700" />
            <span class="z-10 ml-12">{{ t('sign_in_with_github') }}</span>
          </button>
          <button class="auth-btn group">
            <icon-google class="icon text-red-700" @click="signIn({ provider: 'google' })" />
            <span class="z-10 ml-12">{{ t('sign_in_with_google') }}</span>
          </button>
          <button class="auth-btn group">
            <icon-facebook class="icon text-blue-700" @click="signIn({ provider: 'facebook' })" />
            <span class="z-10 ml-12">{{ t('sign_in_with_facebook') }}</span>
          </button>
        </div>
        <p class="text-xs text-gray-500">
          {{ t('sign_up_notice') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.btn {
  @apply flex items-center justify-start gap-3 rounded text-light-500 transition-all shadow hover:shadow-lg;
}

.auth-btn {
  @apply relative h-12 px-3 flex items-center bg-dark-500 text-light-500 overflow-hidden;
}

.icon {
  @apply absolute left-3 w-8 h-8 transition-all duration-200 transform scale-500 group-hover:scale-100 group-hover:text-light-500 group-hover:text-light-500;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
.auth-container {
  @apply min-w-sm p-4 grid gap-6 bg-white rounded shadow-xl;
  animation: slide-in linear 0.3s;
}
</style>

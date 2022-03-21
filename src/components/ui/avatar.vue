<script setup lang="ts">
import { User } from '@supabase/supabase-js';
import { useQueryClient } from 'vue-query';
import { useSignInMutation } from '~/api/useSignInMutation';
import { useUserQuery } from '~/api/useUserQuery';
import { supabase } from '~/libs/supabase';

const queryClient = useQueryClient();

const { mutate: signIn } = useSignInMutation();
const { data: user } = useUserQuery();

const isSignInOptionOpen = ref(false);

function toggleSignInOption(forceTo?: boolean) {
  isSignInOptionOpen.value = forceTo ?? !isSignInOptionOpen.value;
}

function onClickAvatar() {
  toggleSignInOption();
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
  <div class="relative">
    <button class="btn mb-10" @click="onClickAvatar">
      <img
        v-if="user?.user_metadata.avatar_url"
        :src="user?.user_metadata.avatar_url"
        alt="The avatar of the user"
      />
      <carbon-user v-else class="text-lg" />
    </button>
    <div v-if="isSignInOptionOpen && user" class="absolute top-0 left-14">
      <button class="btn" @click="signOut">
        <carbon-logout />
      </button>
    </div>
    <div v-if="isSignInOptionOpen && !user" class="absolute top-0 left-14 grid gap-2">
      <button
        class="btn anim p-2 transition-shadow hover:shadow-lg"
        @click="signIn({ provider: 'github' })"
      >
        <icon-github />
      </button>
      <button class="btn anim-2 p-2 transition-shadow hover:shadow-lg">
        <icon-apple />
      </button>
      <button class="btn anim-3 p-2 transition-shadow hover:shadow-lg">
        <icon-google />
      </button>
    </div>
  </div>
</template>

<style scoped lang="css">
.btn {
  @apply w-10 h-10 flex items-center justify-center rounded-full overflow-hidden text-dark-500 dark:text-light-500 bg-gray-100 dark:bg-gray-800;
}
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
.anim {
  animation: slide-in linear 0.1s;
}
.anim-2 {
  animation: slide-in linear 0.15s;
}
.anim-3 {
  animation: slide-in linear 0.2s;
}
</style>

<script setup lang="ts">
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { useMyI18n } from '~/plugins/i18n';
import type { IssueModalOptions } from './@types';

const { t } = useMyI18n();

const isOpen = ref(false);

const opts = ref<IssueModalOptions | null>(null);

function open(options: IssueModalOptions) {
  opts.value = options;
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

provide('OPEN_ISSUE_MODAL', open);
</script>

<template>
  <slot />
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="close">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black bg-opacity-50" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true"> &#8203; </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-red-700">
                {{ opts?.title }}
              </DialogTitle>
              <div>
                <p class="mt-5 text-sm text-gray-600">
                  {{ opts?.content }}
                </p>
              </div>
              <div class="mt-5">
                <p class="text-sm text-gray-500">
                  {{ t('please_let_this_humble_developer_know_this_issue') }}
                </p>
                <div class="mt-3">
                  <a
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md cursor-pointer hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    href="https://github.com/jonganebski/jonganebski.github.io/issues/new?template=bugs.yaml&labels=bug&title=[BUG]:"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {{ t('write_an_issue') }}
                  </a>
                  <span class="mx-3 text-xs text-gray-500">{{ t('or').toLowerCase() }}</span>
                  <a
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md cursor-pointer hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    href="mailto:jon.ganebski@gmail.com"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {{ t('send_email') }}
                  </a>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

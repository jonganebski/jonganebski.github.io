import { breakpointsTailwind } from '@vueuse/core';

const { sm, md } = useBreakpoints(breakpointsTailwind);

const nodeSize = computed(() => (md.value ? 32 : sm.value ? 24 : 20));

export function useStyles() {
  return { nodeSize };
}

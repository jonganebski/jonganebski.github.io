export interface Highlight {
  fileName: string;
  from: 'map' | 'swiper' | 'list';
}

const highlight = ref<Highlight | null>(null);

export function useHighlight() {
  return { highlight };
}

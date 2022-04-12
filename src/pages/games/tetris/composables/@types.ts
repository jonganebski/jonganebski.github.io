import { ComputedRef, Ref } from 'vue';

export enum NODE {
  WALL = 0,
  BIRTH,
  VOID,
  FOSSIL_I,
  FOSSIL_J,
  FOSSIL_L,
  FOSSIL_O,
  FOSSIL_S,
  FOSSIL_T,
  FOSSIL_Z,
  I,
  J,
  L,
  O,
  S,
  T,
  Z,
}

export interface UseTetrominoResult {
  defaultPosition: readonly number[][];
  nextPosition: ComputedRef<number[][]>;
  endPosition: ComputedRef<number[][]>;
  position: Ref<number[][]>;
  shape: Ref<0 | 1 | 2 | 3>;
  id: NODE;
  changeShape: () => void;
  moveRight: () => void;
  moveLeft: () => void;
  prepare: () => void;
  fall: () => boolean;
}

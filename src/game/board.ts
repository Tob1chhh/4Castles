import type { Cell, CellType } from './types';

const cellTypes: CellType[] = [
  'start',                  // 0
  'normal', 'normal', 'trap', 'enemy', 'normal', 'normal',
  'treasure', 'normal', 'normal', 'event', 'normal', 'normal',
  'boost', 'heal', 'normal',  'enemy', 'normal', 'normal', 'treasure',
  'event', 'normal', 'normal', 'trap', 'heal', 'normal', 'boost',
  'boss'        // 27
];

/** Создание игровой доски */
export function createBoard(): Cell[] {
  return cellTypes.map((type, index) => ({
    index,
    type,
    label: `${type}_${index}`,
  }));
}
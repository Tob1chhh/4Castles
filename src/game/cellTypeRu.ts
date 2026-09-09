import type { CellType, CellTypeRu } from "./types";

export const cellTypeRu: Record<CellType, CellTypeRu> = {
  start: 'Старт',
  normal: 'Обычная',
  trap: 'Ловушка',
  treasure: 'Сокровище',
  event: 'Событие',
  boost: 'Улучшение',
  heal: 'Лечение',
  enemy: 'Враг',
  boss: 'Босс',
}
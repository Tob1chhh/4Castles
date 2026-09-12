import type { CastleCharacteristic } from './types';

export const CASTLES: Record<string, CastleCharacteristic> = {
  redCastle: {
    id: 'redCastle',
    name: 'Рубиновая Башня',
    description: 'Храбрецы и воины. Бонус к атаке и инициативе.',
    baseStats: { hp: 30, mana: 20, attack: 6, shield: 10, initiative: 3 },
    passiveAbility: 'rage',
  },
  greenCastle: {
    id: 'greenCastle',
    name: 'Изумрудная Башня',
    description: 'Хитрецы и стратеги. Бонус к мане и защите.',
    baseStats: { hp: 25, mana: 25, attack: 5, shield: 15, initiative: 2 },
    passiveAbility: 'cunning',
  },
  blueCastle: {
    id: 'blueCastle',
    name: 'Сапфировая Башня',
    description: 'Мудрецы и учёные. Большой запас маны, мощные заклинания.',
    baseStats: { hp: 20, mana: 30, attack: 7, shield: 10, initiative: 2 },
    passiveAbility: 'insight',
  },
  yellowCastle: {
    id: 'yellowCastle',
    name: 'Янтарная Башня',
    description: 'Верные и стойкие. Высокое HP и выживаемость.',
    baseStats: { hp: 35, mana: 18, attack: 5, shield: 18, initiative: 2 },
    passiveAbility: 'resistance',
  },
};
/** Идентификаторы башен */
export type CastleID = 'redCastle' | 'greenCastle' | 'blueCastle' | 'yellowCastle';
export type MagicElementsID = 'fire' | 'ground' | 'darkness' | 'water' | 'wind' | 'light' | 'electro' | 'frost';
export type PassiveAbilityID = 
  | 'rage'             // Ярость: +2 к атаке и +5 к защите при HP ниже 50%
  | 'cunning'          // Коварство: -1 HP всем активным игрокам, +2 к защите и +1 к мане за каждого активного игрока 
  | 'insight'          // Прозорливость: видит содержимое соседних клеток, +5 к мане на 3 хода
  | 'resistance';      // Стойкость: восстанавливает 3 HP каждый ход (в течение 3 ходов), +5 к защите на 3 хода

export interface CastleCharacteristic {
  id: CastleID;
  name: string;
  description: string;
  baseStats: {
    hp: number; // 20-50
    mana: number; // 20-50
    attack: number; // 3-10
    shield: number; // 0-30
    initiative: number; // 2-4
  };
  passiveAbility: PassiveAbilityID;
}

export interface Player {
  id: string;
  name: string;
  castleID: CastleID;
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  attack: number;
  maxAttack: number;
  shield: number;
  maxShield: number;
  initiative: number;
  magicElement: MagicElementsID;
  passiveAbility: PassiveAbilityID;
  position: number;
  effects: string[];
  isAlive: boolean;
}

export type CellType = 'start' | 'normal' | 'trap' | 'treasure' | 'event' | 'boost' | 'heal' | 'enemy' | 'boss';
export type CellTypeRu = 'Старт' | 'Обычная' | 'Ловушка' | 'Сокровище' | 'Событие' | 'Улучшение' | 'Лечение' | 'Враг' | 'Босс';
export interface Cell {
  index: number;
  type: CellType;
  label?: string;
}

export interface GameState {
  board: Cell[];
  players: Player[];
  currentPlayerIndex: number; // 0 | 1 | 2 | 3
  turn: number;
  phase: 'roll' | 'move' | 'action' | 'end';
  log: string[];
  currentPlayerSteps: number | null; 
}

export type GameAction =
  | { type: 'ROLL_DICE' }
  | { type: 'MOVE_PLAYER'; steps: number };

export interface GameStore {
  state: GameState;
  rollDice: () => void;
  movePlayer: (steps: number) => void;
  resetGame: () => void;
}

export interface GameControlsProps {
  isVisible?: boolean;
}
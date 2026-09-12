import { CASTLES } from './castles';
import { createBoard } from './board';
import type { CastleID, GameState, Player } from './types';

export const initialState = (): GameState => {
  const castleID: CastleID = 'redCastle'; // для прототипа
  const cls = CASTLES[castleID];

  const player: Player = {
    id: 'player-1',
    name: 'Ученик',
    castleID,
    hp: cls.baseStats.hp,
    maxHp: cls.baseStats.hp,
    mana: cls.baseStats.mana,
    maxMana: cls.baseStats.mana,
    attack: cls.baseStats.attack,
    maxAttack: cls.baseStats.attack,
    shield: cls.baseStats.shield,
    maxShield: cls.baseStats.shield,
    initiative: cls.baseStats.initiative,
    magicElement: 'fire',
    passiveAbility: cls.passiveAbility,
    position: 0,
    effects: [],
    isAlive: true,
  };

  return {
    board: createBoard(),
    players: [player],
    currentPlayerIndex: 0,
    turn: 1,
    phase: 'roll',
    log: ['Игра началась. Бросьте кубик.'],
    currentPlayerSteps: null,
  };
}
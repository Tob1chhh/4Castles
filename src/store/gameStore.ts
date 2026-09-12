import { create } from 'zustand';
import { gameReducer } from '../game/engine';
import type { GameAction, GameStore } from '../game/types';
import { initialState } from '../game/initialState';

export const useGameStore = create<GameStore>((set) => ({
  state: initialState(),
  rollDice: () => {
    const action: GameAction = { type: 'ROLL_DICE' };
    set((store) => ({ state: gameReducer(store.state, action) }));
  },
  movePlayer: (steps) => {
    const action: GameAction = { type: 'MOVE_PLAYER', steps };
    set((store) => ({ state: gameReducer(store.state, action) }));
  },
  resetGame: () => set({ state: initialState() }),
}));
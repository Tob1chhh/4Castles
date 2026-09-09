import { cellTypeRu } from './cellTypeRu';
import { getCurrentPosition } from './optional.functions';
import type { GameAction, GameState } from './types';

export function gameReducer(state: GameState, action: GameAction): GameState {
  const players = state.players;
  const currentPlayer = players[state.currentPlayerIndex];

  switch (action.type) {
    case 'ROLL_DICE': {
      const dice = Math.floor(Math.random() * 6) + 1;
      state.log.push(`Вы бросили кубик на "${dice}" ходов.`);

      return {
        ...state,
        phase: 'move',
        log: [...state.log],
      };
    }

    case 'MOVE_PLAYER': {
      if (!currentPlayer.isAlive) return state;

      const newPosition = getCurrentPosition(currentPlayer.position + action.steps, state.board.length - 1);
      currentPlayer.position = newPosition;

      const cell = state.board[newPosition];
      let message = `Вы переместились на клетку "${newPosition}" (Тип клетки: ${cellTypeRu[cell.type]})`;

      /** Ловушка */
      if (cell.type === 'trap') {
        const damage = 3;
        currentPlayer.hp = Math.max(0, currentPlayer.hp - damage);
        message += `! Ловушка! Получено ${damage} урона. Текущее HP: ${currentPlayer.hp}`;
        if (currentPlayer.hp === 0) {
          currentPlayer.isAlive = false;
          message += ' — Вы погибли!';
        }
      /** Сокровище */
      } else if (cell.type === 'treasure') {
        // Для прототипа -> далее, рандомный бафф
        message += '! Вы нашли сокровище! +5 маны.';
        currentPlayer.mana = Math.min(currentPlayer.maxMana, currentPlayer.mana + 5);
      /** Событие */
      } else if (cell.type === 'event') {
        const playerLuck = Math.floor(Math.random() * 10) + 1;

        if (playerLuck > 5) {
          message += '! Сегодня тебе сулит удача!';
          message += '! Вы нашли сокровище! +5 HP.';
          currentPlayer.hp = Math.min(currentPlayer.maxHp, currentPlayer.hp + 5);
        } else {
          message += '! Ты попал в Запретный лес. Неудача.'; 
          message += '! Впереди Враг! Бой начнётся на следующем ходу.';
        }
      /** Улучшение */
      } else if (cell.type === 'boost') {
        message += '! Это же "Бузиновая палочка"! +5 к атаке.';
        currentPlayer.attack = Math.min(currentPlayer.maxAttack, currentPlayer.attack + 5);
      /** Лечение */
      } else if (cell.type === 'heal') {
        message += '! Сегодня пир горой, налетай! Восстанавлено 5 HP.';
      /** Враг */
      } else if (cell.type === 'enemy') {
        message += '! Впереди Враг! Бой начнётся на следующем ходу.';
      /** Босс */
      } else if (cell.type === 'boss') {
        message += '! Впереди Босс! Бой начнётся на следующем ходу.';
      }

      state.log.push(message);

      // Конец хода — переключаем на следующего игрока или завершаем фазу
      let nextPlayerIndex = state.currentPlayerIndex + 1;
      if (nextPlayerIndex >= players.length) {
        nextPlayerIndex = 0;
        // Новый раунд
        state.turn += 1;
      }

      return {
        ...state,
        currentPlayerIndex: nextPlayerIndex,
        phase: 'roll',
        log: [...state.log],
        players: [...players],
      };
    }

    default:
      return state;
  }
}
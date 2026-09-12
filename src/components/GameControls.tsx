import { CASTLES } from '../game/castles';
import type { GameControlsProps } from '../game/types';
import { useGameStore } from '../store/gameStore';
import { EventLog } from './EventLog';

export const GameControls = ({ isVisible }: GameControlsProps) => {
  const state = useGameStore((s) => s.state);
  const rollDice = useGameStore((s) => s.rollDice);
  const movePlayer = useGameStore((s) => s.movePlayer);
  const resetGame = useGameStore((s) => s.resetGame);

  const currentPlayer = state.players[state.currentPlayerIndex];
  const canMove = state.phase === 'move';

  const transformStyle = isVisible
    ? 'translateX(0)'
    : 'translateX(100%)';
  
  return (
    <>
      {/** Полный (развернутый) режим */}
      <div 
        style={{
          transform: transformStyle,
          transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="fixed right-0 top-0 h-screen w-85 bg-gray-900 border-l border-gray-800 shadow-2xl z-40 flex flex-col"
      >
        <div className="h-13 shrink-0" />

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Карточка игрока */}
          <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
            <div>
              <h2 className="text-lg font-bold text-white">{currentPlayer.name}</h2>
              <p className="text-sm text-gray-400">{CASTLES[currentPlayer.castleID].name}</p>
            </div>
            <div className="text-right">
              <h2 className="text-base font-bold text-white">Показатели</h2>
              <p className="font-mono text-sm text-gray-400">
                Здоровье: {currentPlayer.hp}/{currentPlayer.maxHp}
              </p>
              <p className="font-mono text-sm text-gray-400">
                Мана: {currentPlayer.mana}/{currentPlayer.maxMana}
              </p>
              <p className="font-mono text-sm text-gray-400">
                Атака: {currentPlayer.attack}/{currentPlayer.maxAttack}
              </p>
              <p className="font-mono text-sm text-gray-400">
                Защита: {currentPlayer.shield}/{currentPlayer.maxShield}
              </p>
            </div>
          </div>

          {/* Кнопки действий */}
          {!canMove && (
            <button
              onClick={rollDice}
              disabled={state.phase !== 'roll'}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg font-bold hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              {state.phase === 'roll' ? '🎲 Бросить кубик' : 'Кубик уже брошен'}
            </button>
          )}

          {canMove && (
            <button
              onClick={() => movePlayer(state.currentPlayerSteps!)}
              className="w-full bg-purple-700 text-white px-4 py-3 rounded-lg font-bold hover:bg-purple-600 transition-colors"
            >
              ➡️ Сделать ход
            </button>
          )}

          {/* Лог */}
          <EventLog />

          {/* Сброс */}
          <button
            onClick={resetGame}
            className="w-full text-red-400 bg-red-900/20 border border-red-800 px-4 py-2 rounded-lg font-medium hover:bg-red-900/40 transition-colors"
          >
            🔄 Начать заново
          </button>
        </div>
      </div>

      {/** Свернутый режим */}
      <div
        style={{
          transform: isVisible ? 'translateX(100%)' : 'translateX(0)',
          transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="fixed right-0 top-0 h-screen w-16 bg-gray-900 border-l border-gray-800 shadow-2xl z-40 flex flex-col items-center py-4 gap-3 overflow-hidden"
      >
        <div className="h-13 shrink-0" />

        {/* Имя игрока + кубик */}
        <div className="flex flex-col items-center gap-1 w-full px-1">
          <div className={`
            w-10 h-10 flex items-center justify-center text-2xl
            bg-purple-900/40 border-purple-500 rounded-lg border-2 
          `}>
            {currentPlayer.name.slice(0, 1)}
          </div>
          <span className="text-[9px] text-gray-300 text-center font-mono leading-tight wrap-break-word w-full">
            {currentPlayer.name}
          </span>
        </div>

        {/* Кнопки */}
        <button
          onClick={rollDice}
          disabled={state.phase !== 'roll'}
          title="Бросить кубик"
          className="w-10 h-10 bg-gray-800 rounded-md hover:bg-gray-700 disabled:opacity-50 flex items-center justify-center transition-colors text-lg"
        >
          🎲
        </button>

        {canMove && (
          <button
            onClick={() => movePlayer(state.currentPlayerSteps!)}
            title="Сделать ход"
            className="w-10 h-10 bg-purple-700 rounded-md hover:bg-purple-600 flex items-center justify-center transition-colors"
          >
            ➡️
          </button>
        )}

        <button
          onClick={resetGame}
          title="Начать заново"
          className="w-10 h-10 bg-red-900/20 border border-red-800 rounded-md hover:bg-red-900/40 flex items-center justify-center transition-colors"
        >
          🔄
        </button>
      </div>
    </>
  );
}
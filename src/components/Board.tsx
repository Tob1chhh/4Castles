import { useGameStore } from "../store/gameStore"

export const Board = () => {
  const board = useGameStore((store) => store.state.board);
  const players = useGameStore((store) => store.state.players);
  const currentPlayerPosition = useGameStore((s) =>
    s.state.players[s.state.currentPlayerIndex].position
  );

  /** Функция поиска игрока */
  const playerOnCell = (index: number) =>
    players.find((p) => p.position === index);

  return (
    <div className="grid grid-cols-5 gap-8 p-5 max-w-150 mx-auto">
      {board.map((cell) => {
        const isCurrent = cell.index === currentPlayerPosition;
        const hasPlayer = !!playerOnCell(cell.index);
        const typeClassMap: Record<string, string> = {
          start: 'bg-green-900/50 border-green-500',
          normal: 'bg-gray-800/30 border-gray-700',
          trap: 'bg-red-900/30 border-red-200 animate-pulse',
          treasure: 'bg-yellow-900/40 border-yellow-500',
          event: 'bg-purple-900/40 border-purple-500',
          boost: 'bg-teal-900/60 border-teal-500 cell-bouncing',
          heal: 'bg-lime-900/20 border-lime-500 cell-bouncing',
          enemy: 'bg-gray-800/30 border-red-600',
          boss: 'bg-red-900 border-red-600',
        };

        return (
          <div
            key={cell.index}
            className={`
              aspect-square rounded-lg border-2
              flex items-center justify-center text-sm font-mono
              ${typeClassMap[cell.type] || ''}
              ${isCurrent ? 'ring-2 ring-blue-500' : ''}
              transition-all duration-200 relative
            `}
          >
            {hasPlayer && (
              <span className="text-white font-bold bg-blue-600 px-1.5 my-2 rounded-xl">P</span>
            )}
            <span
              className={`
                absolute bottom-8 right-8
                p-0.5 text-[12px] font-mono 
                tracking-wide 
              `}
              style={{
                color: '#fbbf24',
                textShadow: '0 1px 1px rgba(0,0,0,0.7)',
                zIndex: 10,
              }}
            >
              {cell.index}
            </span>
          </div>
        );
      })}
    </div>
  );
}
import { useState } from 'react';
import { Board } from '../components/Board';
import { GameControls } from '../components/GameControls';

export const GameScreen = () => {
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  
  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-100">
      {/* Header — fixed, поверх всего */}
      <header className={`
        fixed top-0 left-0 right-0 z-50 
        flex justify-between items-center px-2 py-3 
        bg-gray-950/80 backdrop-blur-sm 
        border-b border-gray-800/50
      `}>
        <h1 className="text-2xl font-bold text-purple-400 tracking-wide">
          Четыре Башни
        </h1>
        <button
          onClick={() => setIsControlsVisible((v) => !v)}
          className={`
            bg-gray-900 border border-gray-800 text-gray-200 
            px-3 py-2 rounded-lg hover:bg-gray-800 
            transition-colors text-sm font-medium
          `}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`
              transition-transform duration-300 ease-out 
              ${isControlsVisible ? 'rotate-0' : 'rotate-180'}
            `}
            style={{ color: '#9d4edd' }}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </header>

      {/* Доска — по центру и не зависит от header и панели */}
      <div className="min-h-screen flex justify-center items-center p-4 pt-16">
        <Board />
      </div>

      {/* Панель — fixed справа, на всю высоту, поверх доски */}
      <GameControls isVisible={isControlsVisible} />
    </div>
  );
}
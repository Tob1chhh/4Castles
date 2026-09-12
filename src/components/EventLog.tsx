import { useRef, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export const EventLog = () => {
  const log = useGameStore((s) => s.state.log);
  const logRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  return (
    <div className="h-[60%] bg-gray-950 p-3 rounded-lg text-sm text-gray-300 border border-gray-800">
      <h3 className="font-bold mb-2">Лог событий</h3>
      <ul 
        ref={logRef} 
        className={`
          space-y-1 overflow-y-auto max-h-[92%] 
          scroll-smooth custom-log-scroll
        `}
      >
        {log.slice(-20).map((msg, i) => (
          <li key={i} className="whitespace-pre-wrap">{msg}</li>
        ))}
      </ul>
    </div>
  );
}
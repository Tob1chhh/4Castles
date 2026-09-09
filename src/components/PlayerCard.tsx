// Test Card
export function PlayerCard() {
  return (
    <div className="card-magic p-6 max-w-xs mx-auto">
      <h2 className="text-xl font-bold mb-3">Алый Дом</h2>
      <div className="flex justify-between mb-4">
        <span>HP: 28/30</span>
        <span>Mana: 14/15</span>
      </div>
      <div className="space-y-2 mb-4">
        <div className="bg-amber-900/20 p-2 rounded text-sm">
          Эффект: Ярость (+2 к атаке)
        </div>
        <div className="bg-emerald-900/20 p-2 rounded text-sm">
          Эффект: Щит (до конца боя)
        </div>
      </div>
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded">
        Бросить кубик
      </button>
    </div>
  );
}
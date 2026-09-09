import { PlayerCard } from './components/PlayerCard'

function App() {
  return (
    <>
      {/** Test Tailwind Work */} 
      <div className="bg-purple-600 text-white p-4 rounded-lg shadow-xl">
        Tailwind работает!
      </div>

      <PlayerCard />
    </>
  )
}

export default App

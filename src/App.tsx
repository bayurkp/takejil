import TakjilCard from '@/components/TakjilCard'

function App() {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center gap-4">
        <TakjilCard />
        <TakjilCard rarity="rare" />
        <TakjilCard rarity="epic" />
        <TakjilCard rarity="legendary" />
      </div>
    </>
  )
}

export default App

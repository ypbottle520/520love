import HandPuzzleGame from './games/HandPuzzleGame'
import LoveFlipGame from './games/LoveFlipGame'
import MemoryBeatGame from './games/MemoryBeatGame'
import PasswordFinalGame from './games/PasswordFinalGame'
import ShoeJourneyGame from './games/ShoeJourneyGame'

function LevelGameRouter({ isCompleted, level, onComplete }) {
  const props = { isCompleted, level, onComplete }

  if (level.id === 'level-1') return <ShoeJourneyGame {...props} />
  if (level.id === 'level-2') return <MemoryBeatGame {...props} />
  if (level.id === 'level-3') return <HandPuzzleGame {...props} />
  if (level.id === 'level-4') return <LoveFlipGame {...props} />
  if (level.id === 'level-5') return <PasswordFinalGame {...props} />

  return null
}

export default LevelGameRouter

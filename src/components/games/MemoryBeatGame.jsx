import { useCallback, useEffect, useState } from 'react'
import { loveData, punishments } from '../../data/loveData' // 引入惩罚券数据
import GameModal from '../GameModal'

function createSequence(length) {
  const words = loveData.games.memory.words
  return Array.from({ length }, () => words[Math.floor(Math.random() * words.length)])
}

function MemoryBeatGame({ isCompleted, onComplete }) {
  const copy = loveData.games.memory
  const [roundIndex, setRoundIndex] = useState(0)
  const [sequence, setSequence] = useState(() => createSequence(copy.rounds[0]))
  const [phase, setPhase] = useState('showing')
  const [activeWord, setActiveWord] = useState('')
  const [inputIndex, setInputIndex] = useState(0)
  const [lives, setLives] = useState(3)
  const [message, setMessage] = useState(copy.ready)
  const [modal, setModal] = useState(null)
  
  // 新增：保存当前抽到的惩罚券状态
  const [currentPunishment, setCurrentPunishment] = useState(null)

  const resetGame = useCallback(() => {
    setRoundIndex(0)
    setSequence(createSequence(copy.rounds[0]))
    setPhase('showing')
    setActiveWord('')
    setInputIndex(0)
    setLives(3)
    setMessage(copy.ready)
    setModal(null)
    setCurrentPunishment(null) // 重置关卡时清空当前的惩罚券
  }, [copy.ready, copy.rounds])

  useEffect(() => {
    if (phase !== 'showing' || modal) return undefined

    let cancelled = false
    const sleep = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration))

    const playSequence = async () => {
      setInputIndex(0)
      setMessage(`${copy.roundPrefix} ${roundIndex + 1} ${copy.roundMiddle} ${sequence.length} ${copy.roundSuffix}`)
      await sleep(430)

      for (const word of sequence) {
        if (cancelled) return
        setActiveWord(word)
        await sleep(560)
        if (cancelled) return
        setActiveWord('')
        await sleep(220)
      }

      if (!cancelled) {
        setMessage(copy.input)
        setPhase('input')
      }
    }

    playSequence()
    return () => {
      cancelled = true
    }
  }, [copy.input, modal, phase, roundIndex, sequence])

  const handleClick = (word) => {
    if (phase !== 'input' || modal) return

    setActiveWord(word)
    window.setTimeout(() => setActiveWord(''), 180)

    if (word !== sequence[inputIndex]) {
      const nextLives = lives - 1
      setLives(Math.max(nextLives, 0))
      setInputIndex(0)
      setMessage(copy.wrong)

      if (nextLives <= 0) {
        // 生命值归零时，随机抽取一张惩罚券
        const randomTicket = punishments[Math.floor(Math.random() * punishments.length)]
        setCurrentPunishment(randomTicket)
        setPhase('failed')
        setModal('fail')
        return
      }

      setPhase('pause')
      window.setTimeout(() => setPhase('showing'), 920)
      return
    }

    if (inputIndex < sequence.length - 1) {
      setInputIndex((current) => current + 1)
      setMessage(`${copy.correctPrefix} ${sequence.length - inputIndex - 1} ${copy.correctSuffix}`)
      return
    }

    if (roundIndex === copy.rounds.length - 1) {
      setPhase('success')
      setModal('success')
      return
    }

    const nextRound = roundIndex + 1
    setPhase('pause')
    setMessage(copy.nextRound)
    window.setTimeout(() => {
      setRoundIndex(nextRound)
      setSequence(createSequence(copy.rounds[nextRound]))
      setPhase('showing')
    }, 760)
  }

  return (
    <article className="game-page glass-card page-enter">
      <header className="game-header">
        <div>
          <p className="eyebrow">{isCompleted ? loveData.games.common.completed : `${copy.eyebrow} ${roundIndex + 1}`}</p>
          <h2>{copy.title}</h2>
          <p>{message}</p>
        </div>
        <div className="game-status">
          <span>{'♥'.repeat(lives)}{'♡'.repeat(3 - lives)}</span>
          <strong>
            {roundIndex + 1} / {copy.rounds.length}
          </strong>
        </div>
      </header>

      <div className="memory-grid">
        {copy.words.map((word) => (
          <button
            className={`memory-choice ${activeWord === word ? 'is-active' : ''}`}
            disabled={phase !== 'input'}
            key={word}
            onClick={() => handleClick(word)}
            type="button"
          >
            {word}
          </button>
        ))}
      </div>

      {/* 修改失败弹窗，展示抽到的惩罚券 */}
      {modal === 'fail' && currentPunishment && (
        <GameModal 
          actionLabel={currentPunishment.button || loveData.games.common.retry} 
          onAction={resetGame} 
          title={`甜蜜惩罚：${currentPunishment.title}`}
        >
          <p>{currentPunishment.content}</p>
        </GameModal>
      )}

      {modal === 'success' && (
        <GameModal
          actionLabel={loveData.games.common.continueToLottery}
          onAction={onComplete}
          title={loveData.map.completed}
        >
          <p>{copy.successCopy}</p>
        </GameModal>
      )}
    </article>
  )
}

export default MemoryBeatGame
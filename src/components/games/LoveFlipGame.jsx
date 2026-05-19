import { useState } from 'react'
import { loveData, punishments } from '../../data/loveData'
import GameModal from '../GameModal'

function shuffleCards() {
  const cards = loveData.games.flip.pairs.flatMap((pair) => [
    { ...pair, id: `${pair.key}-a` },
    { ...pair, id: `${pair.key}-b` },
  ])

  for (let index = cards.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[cards[index], cards[swapIndex]] = [cards[swapIndex], cards[index]]
  }

  return cards
}

function LoveFlipGame({ isCompleted, onComplete }) {
  const copy = loveData.games.flip
  const [cards, setCards] = useState(shuffleCards)
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [locked, setLocked] = useState(false)
  const [solved, setSolved] = useState(false)

  // 新增：6次翻错的机会与惩罚机制
  const [lives, setLives] = useState(6)
  const [modal, setModal] = useState(null)
  const [currentPunishment, setCurrentPunishment] = useState(null)

  const resetGame = () => {
    setLives(6)
    setCards(shuffleCards())
    setFlipped([])
    setMatched([])
    setLocked(false)
    setModal(null)
    setCurrentPunishment(null)
  }

  const handleFlip = (card) => {
    if (locked || matched.includes(card.key) || flipped.some((item) => item.id === card.id) || modal) return

    const nextFlipped = [...flipped, card]
    setFlipped(nextFlipped)

    if (nextFlipped.length < 2) return

    setLocked(true)
    if (nextFlipped[0].key === nextFlipped[1].key) {
      const nextMatched = [...matched, card.key]
      window.setTimeout(() => {
        setMatched(nextMatched)
        setFlipped([])
        setLocked(false)
        if (nextMatched.length === copy.pairs.length) {
          setSolved(true)
        }
      }, 420)
      return
    }

    // 两张不匹配，扣除一颗爱心
    window.setTimeout(() => {
      setFlipped([])
      setLocked(false)
      const nextLives = lives - 1
      setLives(nextLives)

      if (nextLives <= 0) {
        const randomTicket = punishments[Math.floor(Math.random() * punishments.length)]
        setCurrentPunishment(randomTicket)
        setModal('fail')
      }
    }, 760)
  }

  return (
    <article className="game-page glass-card page-enter">
      <header className="game-header">
        <div>
          <p className="eyebrow">{isCompleted ? loveData.games.common.completed : copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <p>{copy.hint}</p>
        </div>
        <div className="game-status">
          <span>{'♥'.repeat(lives)}{'♡'.repeat(6 - lives)}</span>
          <strong>
            {matched.length} / {copy.pairs.length}
          </strong>
        </div>
      </header>

      <div className="flip-grid">
        {cards.map((card) => {
          const open = matched.includes(card.key) || flipped.some((item) => item.id === card.id)

          return (
            <button
              className={`flip-card ${open ? 'is-open' : ''} ${matched.includes(card.key) ? 'is-matched' : ''}`}
              key={card.id}
              onClick={() => handleFlip(card)}
              type="button"
            >
              <span className="flip-card-back">?</span>
              <span className="flip-card-front">
                <strong>{card.symbol}</strong>
                <small>{card.label}</small>
              </span>
            </button>
          )
        })}
      </div>

      {/* 失败惩罚弹窗 */}
      {modal === 'fail' && currentPunishment && (
        <GameModal 
          actionLabel={currentPunishment.button || loveData.games.common.retry} 
          onAction={resetGame} 
          title={`甜蜜惩罚：${currentPunishment.title}`}
        >
          <p>{currentPunishment.content}</p>
        </GameModal>
      )}

      {solved && (
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

export default LoveFlipGame
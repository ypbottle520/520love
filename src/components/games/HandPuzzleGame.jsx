import { useMemo, useState } from 'react'
import { loveData, punishments } from '../../data/loveData'
import GameModal from '../GameModal'
import SafeImage from '../SafeImage'

function shufflePieces() {
  const pieces = Array.from({ length: 9 }, (_, index) => index)

  for (let index = pieces.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[pieces[index], pieces[swapIndex]] = [pieces[swapIndex], pieces[index]]
  }

  if (pieces.every((piece, index) => piece === index)) {
    ;[pieces[0], pieces[1]] = [pieces[1], pieces[0]]
  }

  return pieces
}

function HandPuzzleGame({ isCompleted, onComplete }) {
  const copy = loveData.games.puzzle
  const [pieces, setPieces] = useState(shufflePieces)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [solved, setSolved] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  
  // 新增：25步限制与惩罚机制
  const [lives, setLives] = useState(25)
  const [modal, setModal] = useState(null)
  const [currentPunishment, setCurrentPunishment] = useState(null)

  const selectedPiece = selectedIndex === null ? null : pieces[selectedIndex]

  const resetGame = () => {
    setLives(25)
    setPieces(shufflePieces())
    setSelectedIndex(null)
    setModal(null)
    setCurrentPunishment(null)
  }

  const handleTileClick = (index) => {
    if (solved || modal) return

    if (selectedIndex === null) {
      setSelectedIndex(index)
      return
    }

    if (selectedIndex === index) {
      setSelectedIndex(null)
      return
    }

    const nextPieces = [...pieces]
    ;[nextPieces[selectedIndex], nextPieces[index]] = [nextPieces[index], nextPieces[selectedIndex]]
    setPieces(nextPieces)
    setSelectedIndex(null)
    
    // 每次交换扣除一步
    const nextLives = lives - 1
    setLives(nextLives)

    if (nextPieces.every((piece, tileIndex) => piece === tileIndex)) {
      setSolved(true)
    } else if (nextLives <= 0) {
      // 步数耗尽，触发惩罚
      const randomTicket = punishments[Math.floor(Math.random() * punishments.length)]
      setCurrentPunishment(randomTicket)
      setModal('fail')
    }
  }

  const previewStyle = useMemo(
    () =>
      imageFailed
        ? {}
        : {
            backgroundImage: `linear-gradient(135deg, rgba(255, 244, 250, 0.55), rgba(238, 232, 255, 0.52)), url(${copy.image})`,
          },
    [copy.image, imageFailed],
  )

  return (
    <article className="game-page glass-card page-enter">
      <header className="game-header">
        <div>
          <p className="eyebrow">{isCompleted ? loveData.games.common.completed : copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <p>{imageFailed ? copy.fallbackHint : copy.hint}</p>
        </div>
        <div className="game-status">
          <strong>剩余交换步数: {lives}</strong>
        </div>
      </header>

      <SafeImage alt="" className="hidden-preload" onError={() => setImageFailed(true)} src={copy.image} />

      <div className={`puzzle-board ${solved ? 'is-solved' : ''}`}>
        {pieces.map((piece, tileIndex) => {
          const row = Math.floor(piece / 3)
          const col = piece % 3

          return (
            <button
              aria-label={`${copy.tileAriaPrefix}${tileIndex + 1}${copy.tileAriaSuffix}`}
              className={`puzzle-tile ${selectedIndex === tileIndex ? 'is-selected' : ''}`}
              data-piece={piece + 1}
              key={`${piece}-${tileIndex}`}
              onClick={() => handleTileClick(tileIndex)}
              style={
                imageFailed
                  ? {}
                  : {
                      backgroundImage: `linear-gradient(135deg, rgba(255, 244, 250, 0.2), rgba(238, 232, 255, 0.2)), url(${copy.image})`,
                      backgroundPosition: `${col * 50}% ${row * 50}%`,
                    }
              }
              type="button"
            >
              {imageFailed && <span>{piece + 1}</span>}
            </button>
          )
        })}
      </div>

      <div className="puzzle-hint">
        {selectedPiece === null
          ? copy.selectFirst
          : `${copy.selectedPrefix} ${selectedPiece + 1} ${copy.selectedSuffix}`}
      </div>

      {solved && (
        <div className="puzzle-preview" style={previewStyle}>
          <span>{copy.previewLabel}</span>
        </div>
      )}

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
          image={imageFailed ? null : copy.image}
          onAction={onComplete}
          title={loveData.map.completed}
        >
          <p>{copy.successCopy}</p>
        </GameModal>
      )}
    </article>
  )
}

export default HandPuzzleGame
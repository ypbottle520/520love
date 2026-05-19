import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { loveData, punishments } from '../../data/loveData' // 引入惩罚券数据
import GameModal from '../GameModal'
import SafeImage from '../SafeImage'

const START = { x: 8, y: 50 }
const FINISH = { x: 92, y: 50 }
const STEP = 6
const HEARTS = [
  { id: 'h1', x: 24, y: 26 },
  { id: 'h2', x: 35, y: 72 },
  { id: 'h3', x: 52, y: 42 },
  { id: 'h4', x: 66, y: 22 },
  { id: 'h5', x: 75, y: 70 },
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function getObstacles(time, words) {
  const t = time / 1000
  return [
    { label: words[0], x: 30 + Math.sin(t * 1.1) * 8, y: 20, width: 13, height: 9 },
    { label: words[1], x: 43, y: 34 + Math.sin(t * 1.15 + 1) * 12, width: 13, height: 9 },
    { label: words[2], x: 59 + Math.sin(t * 1.3 + 2) * 8, y: 52, width: 13, height: 9 },
    { label: words[3], x: 44 + Math.sin(t * 0.95 + 0.5) * 10, y: 76, width: 15, height: 9 },
    { label: words[4], x: 74, y: 68 + Math.sin(t * 1.05 + 2.7) * 12, width: 25, height: 9 },
  ]
}

function isObstacleHit(player, obstacles) {
  return obstacles.some((obstacle) => {
    const hitX = Math.abs(player.x - obstacle.x) < obstacle.width / 2 + 3.8
    const hitY = Math.abs(player.y - obstacle.y) < obstacle.height / 2 + 3.8
    return hitX && hitY
  })
}

function ShoeJourneyGame({ isCompleted, onComplete }) {
  const copy = loveData.games.shoe
  const [player, setPlayer] = useState(START)
  const [lives, setLives] = useState(3)
  const [collected, setCollected] = useState([])
  const [time, setTime] = useState(0)
  const [hint, setHint] = useState(copy.hint)
  const [modal, setModal] = useState(null)
  
  // 新增：保存当前抽到的惩罚券状态
  const [currentPunishment, setCurrentPunishment] = useState(null) 
  
  const safeUntil = useRef(0)

  const obstacles = useMemo(() => getObstacles(time, copy.obstacles), [copy.obstacles, time])

  const resetRound = useCallback(() => {
    safeUntil.current = Date.now() + 700
    setPlayer(START)
    setLives(3)
    setCollected([])
    setHint(copy.hint)
    setModal(null)
    setCurrentPunishment(null) // 重置关卡时清空当前的惩罚券
  }, [copy.hint])

  const handleHit = useCallback(() => {
    if (modal || Date.now() < safeUntil.current) return

    safeUntil.current = Date.now() + 900
    const nextLives = lives - 1
    setLives(Math.max(nextLives, 0))
    setPlayer(START)
    setHint(copy.hitHint)

    if (nextLives <= 0) {
      // 生命值归零时，随机抽取一张惩罚券
      const randomTicket = punishments[Math.floor(Math.random() * punishments.length)]
      setCurrentPunishment(randomTicket)
      setModal('fail')
    }
  }, [copy.hitHint, lives, modal])

  const move = useCallback(
    (direction) => {
      if (modal) return

      const delta = {
        up: { x: 0, y: -STEP },
        down: { x: 0, y: STEP },
        left: { x: -STEP, y: 0 },
        right: { x: STEP, y: 0 },
      }[direction]

      const nextPlayer = {
        x: clamp(player.x + delta.x, 5, 95),
        y: clamp(player.y + delta.y, 9, 91),
      }

      const newHearts = HEARTS.filter(
        (heart) => !collected.includes(heart.id) && distance(nextPlayer, heart) < 7,
      ).map((heart) => heart.id)
      const nextCollected = newHearts.length ? [...collected, ...newHearts] : collected

      setPlayer(nextPlayer)
      if (newHearts.length) {
        setCollected(nextCollected)
        setHint(`${loveData.games.common.collectedLabel} ${nextCollected.length} / ${HEARTS.length}`)
      }

      if (isObstacleHit(nextPlayer, obstacles)) {
        handleHit()
        return
      }

      if (distance(nextPlayer, FINISH) < 8) {
        if (nextCollected.length === HEARTS.length) {
          setModal('success')
        } else {
          setHint(copy.blockedByGoal)
        }
      }
    },
    [collected, copy.blockedByGoal, handleHit, modal, obstacles, player],
  )

  useEffect(() => {
    let frame = 0
    const animate = (nextTime) => {
      setTime(nextTime)
      frame = window.requestAnimationFrame(animate)
    }

    frame = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!modal && Date.now() >= safeUntil.current && isObstacleHit(player, obstacles)) {
      handleHit()
    }
  }, [handleHit, modal, obstacles, player])

  useEffect(() => {
    const onKeyDown = (event) => {
      const key = event.key.toLowerCase()
      const direction =
        key === 'arrowup' || key === 'w'
          ? 'up'
          : key === 'arrowdown' || key === 's'
            ? 'down'
            : key === 'arrowleft' || key === 'a'
              ? 'left'
              : key === 'arrowright' || key === 'd'
                ? 'right'
                : ''

      if (!direction) return
      event.preventDefault()
      move(direction)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [move])

  return (
    <article className="game-page glass-card page-enter">
      <GameHeader
        hint={hint}
        isCompleted={isCompleted}
        lives={lives}
        progress={`${collected.length} / ${HEARTS.length}`}
        title={copy.title}
      />

      <div className="shoe-board" aria-label={copy.title}>
        <span className="shoe-endpoint shoe-start">{copy.endpointLeft}</span>
        <span className="shoe-endpoint shoe-finish">{copy.endpointRight}</span>

        {HEARTS.map((heart) => (
          <span
            className={`shoe-heart ${collected.includes(heart.id) ? 'is-collected' : ''}`}
            key={heart.id}
            style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
          >
            ♥
          </span>
        ))}

        {obstacles.map((obstacle) => (
          <span
            className="shoe-obstacle"
            key={obstacle.label}
            style={{ left: `${obstacle.x}%`, top: `${obstacle.y}%` }}
          >
            {obstacle.label}
          </span>
        ))}

        <span
          aria-label={copy.playerLabel}
          className="shoe-player"
          style={{ left: `${player.x}%`, top: `${player.y}%` }}
        >
          <SafeImage
            alt=""
            className="shoe-player-image"
            fallback={<span className="shoe-player-fallback">鞋</span>}
            src={copy.playerImage}
          />
        </span>
      </div>

      <div className="direction-pad">
        <button aria-label={copy.controls.up} onClick={() => move('up')} type="button">
          ↑
        </button>
        <button aria-label={copy.controls.left} onClick={() => move('left')} type="button">
          ←
        </button>
        <button aria-label={copy.controls.down} onClick={() => move('down')} type="button">
          ↓
        </button>
        <button aria-label={copy.controls.right} onClick={() => move('right')} type="button">
          →
        </button>
      </div>

      {/* 修改失败弹窗，展示抽到的惩罚券 */}
      {modal === 'fail' && currentPunishment && (
        <GameModal 
          actionLabel={currentPunishment.button || loveData.games.common.retry} 
          onAction={resetRound} 
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

function GameHeader({ hint, isCompleted, lives, progress, title }) {
  return (
    <header className="game-header">
      <div>
        <p className="eyebrow">{isCompleted ? loveData.games.common.completed : loveData.games.common.heartsLabel}</p>
        <h2>{title}</h2>
        <p>{hint}</p>
      </div>
      <div className="game-status">
        <span>{'♥'.repeat(lives)}{'♡'.repeat(3 - lives)}</span>
        <strong>{progress}</strong>
      </div>
    </header>
  )
}

export default ShoeJourneyGame
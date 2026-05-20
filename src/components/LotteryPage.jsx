import { useEffect, useMemo, useState } from 'react'
import { loveData } from '../data/loveData'
import AlbumRewardExperience from './AlbumRewardExperience'
import LotteryScene from './LotteryScenes'

const EXHAUSTED_PRIZE = {
  id: 'all-claimed',
  type: 'system',
  scene: 'comfort',
  title: '奖励已经全部抽完啦',
  copy: '小昕已经把这次520的奖励都收进心里了。后面的每一次见面，小杰再慢慢补新的惊喜。',
  actionText: loveData.lottery.finishButton,
}

const FIFTH_LEVEL_FALLBACK_IDS = ['cash100', 'album']

function isLosePrize(value) {
  return (
    value?.type === 'lose' ||
    value?.prizeType === 'lose' ||
    value?.id === 'sorry' ||
    value?.prizeId === 'sorry' ||
    value?.prizeId === 'none'
  )
}

function getDrawnRewardIds(records, drawnRewardIds = []) {
  return new Set([
    ...drawnRewardIds,
    ...records
      .filter((record) => record?.prizeId && !record?.isSystemRecord)
      .map((record) => record.prizeId),
  ].filter(Boolean))
}

function getRecentNoPrizeCount(records) {
  let count = 0

  for (const record of records) {
    if (isLosePrize(record)) {
      count += 1
    } else {
      break
    }
  }

  return count
}

function weightedPick(pool) {
  const total = pool.reduce((sum, prize) => sum + prize.probability, 0)
  let roll = Math.random() * total

  for (const prize of pool) {
    roll -= prize.probability
    if (roll <= 0) return prize
  }

  return pool[pool.length - 1]
}

function getFifthLevelFallback(drawnIds) {
  const preferred = FIFTH_LEVEL_FALLBACK_IDS
    .map((id) => loveData.lottery.prizePool.find((prize) => prize.id === id))
    .filter(Boolean)

  return preferred.find((prize) => !drawnIds.has(prize.id)) || preferred[0] || EXHAUSTED_PRIZE
}

function pickPrize({ drawnRewardIds = [], records, sourceLevel }) {
  const isFifthLevel = sourceLevel?.id === 'level-5'
  const drawnIds = getDrawnRewardIds(records, drawnRewardIds)
  const availablePool = loveData.lottery.prizePool.filter((prize) => !drawnIds.has(prize.id))
  const mustWin = getRecentNoPrizeCount(records) >= 2 || isFifthLevel
  const pool = mustWin ? availablePool.filter((prize) => !isLosePrize(prize)) : availablePool

  if (pool.length > 0) {
    return weightedPick(pool)
  }

  if (isFifthLevel) {
    return getFifthLevelFallback(drawnIds)
  }

  return availablePool[0] || EXHAUSTED_PRIZE
}

function LotteryPage({ drawnRewardIds, records, sourceLevel, onFinish, onRecord }) {
  const [sceneReady, setSceneReady] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [saved, setSaved] = useState(false)
  const [selectedPrize] = useState(() => pickPrize({ drawnRewardIds, records, sourceLevel }))
  const isAlbumPrize = selectedPrize.id === 'album'

  const sourceLabel = sourceLevel
    ? `${loveData.lottery.fromLevelPrefix}「${sourceLevel.title}」`
    : loveData.lottery.sideQuestLabel

  const recentRecords = useMemo(() => records.slice(0, 4), [records])

  useEffect(() => {
    const timer = window.setTimeout(() => setSceneReady(true), 2000)
    return () => window.clearTimeout(timer)
  }, [])

  const revealPrize = () => {
    setFlipped(true)
    if (saved) return

    onRecord({
      levelId: sourceLevel?.id || 'free',
      levelTitle: sourceLevel?.title || loveData.lottery.sideQuestLabel,
      prizeCopy: selectedPrize.copy,
      prizeId: selectedPrize.id,
      prizeTitle: selectedPrize.title,
      prizeType: selectedPrize.type,
      isSystemRecord: selectedPrize.id === EXHAUSTED_PRIZE.id,
    })
    setSaved(true)
  }

  if (flipped && isAlbumPrize) {
    return <AlbumRewardExperience onFinish={onFinish} />
  }

  return (
    <article className="utility-page lottery-page glass-card page-enter">
      <p className="eyebrow">{loveData.lottery.eyebrow}</p>
      <h2>{loveData.lottery.title}</h2>
      <p>{loveData.lottery.copy}</p>

      <div className={`reward-card-shell ${flipped ? 'is-flipped' : ''}`}>
        <div className="reward-card">
          <section className="reward-card-face reward-card-front">
            <div className="reward-source">{sourceLabel}</div>
            <LotteryScene scene={selectedPrize.scene} />
            <p>{sceneReady ? loveData.lottery.revealButton : loveData.lottery.scenePreparing}</p>
          </section>

          <section className="reward-card-face reward-card-back">
            <p className="eyebrow">Reward</p>
            <h3>{selectedPrize.title}</h3>
            <p>{selectedPrize.copy}</p>
          </section>
        </div>
      </div>

      {!flipped && sceneReady ? (
        <button className="primary-button" disabled={!sceneReady} onClick={revealPrize} type="button">
          {loveData.lottery.revealButton}
        </button>
      ) : null}

      {flipped ? (
        <button className="primary-button" onClick={onFinish} type="button">
          {selectedPrize.actionText || loveData.lottery.finishButton}
        </button>
      ) : null}

      <div className="record-list">
        {recentRecords.length === 0 ? (
          <span>{loveData.lottery.empty}</span>
        ) : (
          recentRecords.map((record) => (
            <span key={record.id}>
              {record.levelTitle}：{record.prizeTitle || record.prize}
            </span>
          ))
        )}
      </div>
    </article>
  )
}

export default LotteryPage

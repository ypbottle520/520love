import { useEffect, useMemo, useState } from 'react'
import { loveData } from '../data/loveData'
import LotteryScene from './LotteryScenes'

function isLosePrize(value) {
  return (
    value?.type === 'lose' ||
    value?.prizeType === 'lose' ||
    value?.id === 'sorry' ||
    value?.prizeId === 'sorry' ||
    value?.prizeId === 'none'
  )
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

function pickPrize(records, sourceLevel) {
  // 1. 提取所有已经抽中过的奖品 ID
  const wonPrizeIds = records.map(record => record.prizeId);

  // 2. 过滤奖池：如果奖品已经被抽中过，并且不是"未中奖"，则从奖池中剔除
  let pool = loveData.lottery.prizePool.filter(prize => {
    // 如果想要"未中奖(sorry)"可以作为日常重复刷出的状态，保留此行；
    // 如果连"未中奖"也只允许出现一次，可以将此行删除。
    if (isLosePrize(prize)) return true; 
    return !wonPrizeIds.includes(prize.id);
  });

  // 3. 必中保底逻辑：连续两次没中，或者是第五关通关
  const mustWin = getRecentNoPrizeCount(records) >= 2 || sourceLevel?.id === 'level-5';
  if (mustWin) {
    pool = pool.filter((prize) => !isLosePrize(prize));
  }

  // 4. 兜底逻辑：如果所有真实奖品都已经被抽完了，给一个默认提示防止报错
  if (pool.length === 0) {
    return loveData.lottery.prizePool.find(p => isLosePrize(p)) || loveData.lottery.prizePool[0];
  }

  return weightedPick(pool);
}

function LotteryPage({ records, sourceLevel, onFinish, onRecord }) {
  const [sceneReady, setSceneReady] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [saved, setSaved] = useState(false)
  const [selectedPrize] = useState(() => pickPrize(records, sourceLevel))

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
    })
    setSaved(true)
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

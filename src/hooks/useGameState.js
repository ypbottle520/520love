import { useEffect, useMemo, useState } from 'react'
import { initialGameState, loveData } from '../data/loveData'

function normalizeState(value) {
  const merged = {
    ...initialGameState,
    ...value,
    levels: {
      ...initialGameState.levels,
      ...(value?.levels || {}),
    },
    easterEggs: {
      ...initialGameState.easterEggs,
      ...(value?.easterEggs || {}),
    },
    lotteryRecords: Array.isArray(value?.lotteryRecords) ? value.lotteryRecords : [],
    easterEggRecords: Array.isArray(value?.easterEggRecords) ? value.easterEggRecords : [],
  }

  merged.currentProgress = Object.values(merged.levels).filter(Boolean).length
  return merged
}

function readStoredState() {
  if (typeof window === 'undefined') {
    return initialGameState
  }

  try {
    const stored = window.localStorage.getItem(loveData.storage.key)
    return stored ? normalizeState(JSON.parse(stored)) : initialGameState
  } catch {
    return initialGameState
  }
}

export function useGameState() {
  const [gameState, setGameState] = useState(readStoredState)

  useEffect(() => {
    window.localStorage.setItem(loveData.storage.key, JSON.stringify(gameState))
  }, [gameState])

  const completedCount = useMemo(
    () => Object.values(gameState.levels).filter(Boolean).length,
    [gameState.levels],
  )

  const allLevelsCompleted = completedCount === loveData.levels.length

  const passPassword = () => {
    setGameState((current) => normalizeState({ ...current, passwordPassed: true }))
  }

  const completeLevel = (levelId) => {
    setGameState((current) =>
      normalizeState({
        ...current,
        levels: {
          ...current.levels,
          [levelId]: true,
        },
      }),
    )
  }

  const addLotteryRecord = ({
    levelId = 'free',
    levelTitle = loveData.lottery.sideQuestLabel,
    prizeCopy,
    prizeId,
    prizeTitle,
    prizeType,
  }) => {
    setGameState((current) => {
      const record = {
        id: `lottery-${Date.now()}`,
        createdAt: new Date().toISOString(),
        levelId,
        levelTitle,
        prize: prizeTitle,
        prizeCopy,
        prizeId,
        prizeTitle,
        prizeType,
      }

      return normalizeState({
        ...current,
        lotteryRecords: [record, ...current.lotteryRecords],
      })
    })
  }

  const unlockEasterEgg = (egg) => {
    if (!egg) return

    const record = {
      id: `egg-${egg.id}-${Date.now()}`,
      createdAt: new Date().toISOString(),
      eggId: egg.id,
      label: egg.title,
    }

    setGameState((current) =>
      normalizeState({
        ...current,
        easterEggUnlocked: true,
        easterEggs: {
          ...current.easterEggs,
          [egg.id]: true,
        },
        easterEggRecords: current.easterEggs?.[egg.id]
          ? current.easterEggRecords
          : [record, ...current.easterEggRecords],
      }),
    )
  }

  const openFinalGift = () => {
    setGameState((current) => normalizeState({ ...current, finalGiftOpened: true }))
  }

  const acceptFinalConfession = () => {
    setGameState((current) => normalizeState({ ...current, finalConfessionAccepted: true }))
  }

  const resetGameState = () => {
    setGameState(initialGameState)
  }

  return {
    addLotteryRecord,
    acceptFinalConfession,
    allLevelsCompleted,
    completedCount,
    completeLevel,
    gameState,
    openFinalGift,
    passPassword,
    resetGameState,
    unlockEasterEgg,
  }
}

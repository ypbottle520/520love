import { useEffect, useMemo, useState } from 'react'
import AmbientBackground from './components/AmbientBackground'
import AlbumPage from './components/AlbumPage'
import ConfessionPage from './components/ConfessionPage'
import EasterEggPage from './components/EasterEggPage'
import EntryPage from './components/EntryPage'
import FinalGiftPage from './components/FinalGiftPage'
import LevelGameRouter from './components/LevelGameRouter'
import LotteryPage from './components/LotteryPage'
import MainMapPage from './components/MainMapPage'
import PageFrame from './components/PageFrame'
import Toast from './components/Toast'
import { loveData } from './data/loveData'
import { useGameState } from './hooks/useGameState'

function App() {
  const {
    addLotteryRecord,
    acceptFinalConfession,
    allLevelsCompleted,
    completedCount,
    completeLevel,
    gameState,
    openFinalGift,
    passPassword,
    resetLotteryRecords,
    resetGameState,
    unlockEasterEgg,
  } = useGameState()
  const [route, setRoute] = useState(gameState.passwordPassed ? 'map' : 'entry')
  const [lotteryContext, setLotteryContext] = useState(null)
  const [toast, setToast] = useState('')

  const activeLevel = useMemo(
    () => loveData.levels.find((level) => level.id === route),
    [route],
  )
  const finalGiftUnlocked =
    allLevelsCompleted && gameState.lotteryRecords.some((record) => record.levelId === 'level-5')

  const pageTitle = useMemo(() => {
    if (activeLevel) return activeLevel.title
    if (route === 'lottery') return loveData.lottery.title
    if (route === 'album') return loveData.album.title
    if (route === 'egg') return loveData.egg.title
    if (route === 'gift') return loveData.gift.title
    if (route === 'confession') return loveData.confession.title
    return loveData.map.title
  }, [activeLevel, route])

  const pageSkin = useMemo(() => {
    if (!gameState.passwordPassed) return 'skin-entry'
    if (activeLevel?.id === 'level-5') return 'skin-code'
    if (activeLevel) return `skin-game skin-${activeLevel.id}`
    if (route === 'lottery') return 'skin-reward'
    if (route === 'album') return 'skin-album'
    if (route === 'egg') return 'skin-egg'
    if (route === 'gift' || route === 'confession') return 'skin-letter'
    return 'skin-map'
  }, [activeLevel, gameState.passwordPassed, route])

  useEffect(() => {
    document.title = loveData.meta.title
  }, [])

  useEffect(() => {
    if (!gameState.passwordPassed && route !== 'entry') {
      setRoute('entry')
    }
  }, [gameState.passwordPassed, route])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2400)
    return () => window.clearTimeout(timer)
  }, [toast])

  const handleEntrySuccess = () => {
    passPassword()
    setRoute('map')
  }

  const getLevelUnlocked = (index) => {
    if (index === 0) return true
    return Boolean(gameState.levels[loveData.levels[index - 1].id])
  }

  const openLevel = (level, index) => {
    if (!getLevelUnlocked(index)) {
      setToast(loveData.map.lockedTip)
      return
    }

    setRoute(level.id)
  }

  const markLevelComplete = (level) => {
    completeLevel(level.id)
    setLotteryContext(level)
    setRoute('lottery')
  }

  const openGift = () => {
    setRoute('gift')
  }

  const openConfession = () => {
    openFinalGift()
    setRoute('confession')
  }

  const resetAll = () => {
    resetGameState()
    setLotteryContext(null)
    setRoute('entry')
    setToast(loveData.actions.confirmReset)
  }

  const resetLotteryOnly = () => {
    resetLotteryRecords()
    setLotteryContext(null)
    setToast('抽奖记录已重置。')
  }

  const openSideQuest = (questId) => {
    if (questId === 'lottery') {
      setLotteryContext(null)
    }
    setRoute(questId)
  }

  const openHiddenCommand = () => {
    setRoute('egg')
  }

  const finishLottery = () => {
    setLotteryContext(null)
    setRoute('map')
  }

  const content = !gameState.passwordPassed ? (
    <EntryPage onSuccess={handleEntrySuccess} />
  ) : activeLevel ? (
    <LevelGameRouter
      isCompleted={Boolean(gameState.levels[activeLevel.id])}
      level={activeLevel}
      onComplete={() => markLevelComplete(activeLevel)}
    />
  ) : route === 'lottery' ? (
    <LotteryPage
      sourceLevel={lotteryContext}
      drawnRewardIds={gameState.drawnRewardIds}
      records={gameState.lotteryRecords}
      onFinish={finishLottery}
      onRecord={addLotteryRecord}
    />
  ) : route === 'album' ? (
    <AlbumPage />
  ) : route === 'egg' ? (
    <EasterEggPage
      easterEggs={gameState.easterEggs}
      records={gameState.easterEggRecords}
      unlocked={gameState.easterEggUnlocked}
      onUnlock={unlockEasterEgg}
    />
  ) : route === 'gift' ? (
    <FinalGiftPage
      finalGiftUnlocked={finalGiftUnlocked}
      finalGiftOpened={gameState.finalGiftOpened}
      onOpenConfession={openConfession}
    />
  ) : route === 'confession' ? (
    <ConfessionPage
      accepted={gameState.finalConfessionAccepted}
      onAccept={acceptFinalConfession}
      onBack={() => setRoute('map')}
    />
  ) : (
    <MainMapPage
      allLevelsCompleted={allLevelsCompleted}
      completedCount={completedCount}
      finalGiftUnlocked={finalGiftUnlocked}
      gameState={gameState}
      getLevelUnlocked={getLevelUnlocked}
      onOpenGift={openGift}
      onOpenHiddenCommand={openHiddenCommand}
      onOpenLevel={openLevel}
      onOpenSideQuest={openSideQuest}
      onReset={resetAll}
      onResetLotteryRecords={resetLotteryOnly}
    />
  )

  return (
    <main className="site-root">
      <AmbientBackground />
      <PageFrame
        completedCount={completedCount}
        pageSkin={pageSkin}
        pageTitle={pageTitle}
        showHeader={gameState.passwordPassed}
        showMapButton={gameState.passwordPassed && route !== 'map' && !(route === 'lottery' && lotteryContext)}
        onBackToMap={() => setRoute('map')}
      >
        {content}
      </PageFrame>
      {toast && <Toast message={toast} />}
    </main>
  )
}

export default App

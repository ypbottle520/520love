import { loveData } from '../data/loveData'

function MainMapPage({
  allLevelsCompleted,
  completedCount,
  finalGiftUnlocked,
  gameState,
  getLevelUnlocked,
  onOpenGift,
  onOpenHiddenCommand,
  onOpenLevel,
  onOpenSideQuest,
  onReset,
}) {
  return (
    <div className="map-layout">
      <section className="map-hero glass-card">
        <div>
          <p className="eyebrow">{loveData.map.eyebrow}</p>
          <h2>{loveData.map.title}</h2>
          <p>{loveData.map.subtitle}</p>
          <button className="hidden-command-button" onClick={onOpenHiddenCommand} type="button">
            {loveData.map.hiddenCommand}
          </button>
        </div>
        <div className="progress-orb">
          <span>{completedCount}</span>
          <small>
            / {loveData.levels.length} {loveData.map.progressSuffix}
          </small>
        </div>
      </section>

      <section className="level-grid" aria-label={loveData.map.title}>
        {loveData.levels.map((level, index) => {
          const unlocked = getLevelUnlocked(index)
          const completed = Boolean(gameState.levels[level.id])

          return (
            <button
              className={`level-card glass-card ${completed ? 'is-complete' : ''} ${
                unlocked ? 'is-unlocked' : 'is-locked'
              }`}
              key={level.id}
              onClick={() => onOpenLevel(level, index)}
              type="button"
            >
              <span className="level-number">{level.number}</span>
              <span className="level-card-copy">
                <span className="eyebrow">{level.kicker}</span>
                <strong>{level.title}</strong>
                <span>{level.summary}</span>
              </span>
              <span className="status-chip">
                {completed
                  ? loveData.map.completed
                  : unlocked
                    ? loveData.map.unlocked
                    : loveData.map.locked}
              </span>
            </button>
          )
        })}
      </section>

      <section className="side-panel">
        <div className="section-heading">
          <p className="eyebrow">{loveData.map.sideQuestTitle}</p>
        </div>
        <div className="side-grid">
          {loveData.sideQuests.map((quest) => (
            <button
              className="side-card"
              key={quest.id}
              onClick={() => onOpenSideQuest(quest.id)}
              type="button"
            >
              <span className="eyebrow">{quest.kicker}</span>
              <strong>{quest.title}</strong>
              <span>{quest.summary}</span>
              <em>{quest.actionLabel}</em>
            </button>
          ))}
        </div>
      </section>

      <section className="final-panel glass-card">
        <div>
          <p className="eyebrow">{loveData.map.finalGiftTitle}</p>
          <h3>{finalGiftUnlocked ? loveData.map.finalGiftOpen : loveData.map.finalGiftLocked}</h3>
          {allLevelsCompleted && !finalGiftUnlocked && (
            <p className="final-hint">{loveData.map.finalLotteryHint}</p>
          )}
        </div>
        <button className="primary-button" onClick={onOpenGift} type="button">
          {finalGiftUnlocked ? loveData.map.finalGiftOpen : loveData.map.finalGiftLocked}
        </button>
      </section>

      <button className="text-button" onClick={onReset} type="button">
        {loveData.actions.reset}
      </button>
    </div>
  )
}

export default MainMapPage

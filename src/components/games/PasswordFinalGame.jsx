import { useState } from 'react'
import { loveData } from '../../data/loveData'
import GameModal from '../GameModal'

function PasswordFinalGame({ isCompleted, onComplete }) {
  const copy = loveData.games.code
  const [openedLayers, setOpenedLayers] = useState(0)
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(copy.hint)
  const [shake, setShake] = useState(false)
  const [solved, setSolved] = useState(false)

  const currentLayer = copy.layers[openedLayers]

  const submitPassword = (event) => {
    event.preventDefault()
    if (!currentLayer) return

    if (password.trim() !== currentLayer.code) {
      setMessage(copy.wrong)
      setShake(true)
      window.setTimeout(() => setShake(false), 360)
      return
    }

    const nextOpened = openedLayers + 1
    setOpenedLayers(nextOpened)
    setPassword('')
    setMessage(currentLayer.copy)

    if (nextOpened === copy.layers.length) {
      window.setTimeout(() => setSolved(true), 520)
    }
  }

  return (
    <article className="game-page glass-card page-enter">
      <header className="game-header">
        <div>
          <p className="eyebrow">{isCompleted ? loveData.games.common.completed : `${openedLayers} / ${copy.layers.length}`}</p>
          <h2>{copy.title}</h2>
          <p>{message}</p>
        </div>
      </header>

      <div className="code-box-stack">
        {copy.layers.map((layer, index) => (
          <div
            className={`code-layer ${index < openedLayers ? 'is-open' : ''} ${index === openedLayers ? 'is-current' : ''}`}
            key={layer.title}
            style={{ '--layer-index': index }}
          >
            <span>{layer.title}</span>
            <strong>
              {index < openedLayers
                ? copy.statusOpened
                : index === openedLayers
                  ? copy.statusCurrent
                  : copy.statusLocked}
            </strong>
          </div>
        ))}
      </div>

      <form className={`code-form ${shake ? 'is-shaking' : ''}`} onSubmit={submitPassword}>
        <input
          aria-label={copy.inputLabel}
          disabled={solved}
          inputMode="numeric"
          onChange={(event) => setPassword(event.target.value)}
          placeholder={copy.inputPlaceholder}
          value={password}
        />
        <button className="primary-button" disabled={solved} type="submit">
          {copy.submit}
        </button>
      </form>

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

export default PasswordFinalGame

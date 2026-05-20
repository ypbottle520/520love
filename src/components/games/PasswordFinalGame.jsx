import { useState } from 'react'
import { loveData } from '../../data/loveData'

function PasswordFinalGame({ isCompleted, onComplete }) {
  const copy = loveData.games.code
  const [openedLayers, setOpenedLayers] = useState(0)
  const [password, setPassword] = useState('')
  const [wrongCount, setWrongCount] = useState(0)
  const [shake, setShake] = useState(false)
  const [revealedNote, setRevealedNote] = useState(null)
  const [solved, setSolved] = useState(false)

  const currentLayer = copy.layers[openedLayers]
  const currentStep = Math.min(openedLayers + 1, copy.layers.length)
  const errorText = wrongCount === 0 ? '' : wrongCount === 1 ? copy.wrong : copy.softWrong

  const submitPassword = (event) => {
    event.preventDefault()
    if (!currentLayer || revealedNote || solved) return

    if (password.trim() !== currentLayer.code) {
      setWrongCount((count) => Math.min(count + 1, 3))
      setShake(true)
      window.setTimeout(() => setShake(false), 360)
      return
    }

    setRevealedNote(currentLayer)
    setPassword('')
    setWrongCount(0)
  }

  const openNextLayer = () => {
    const nextOpened = openedLayers + 1
    setOpenedLayers(nextOpened)
    setRevealedNote(null)

    if (nextOpened === copy.layers.length) {
      setSolved(true)
    }
  }

  return (
    <article className="code-game-page page-enter">
      <header className="code-game-header">
        <p className="eyebrow">{isCompleted ? loveData.games.common.completed : copy.title}</p>
        <h2>{copy.title}</h2>
        <p className="code-game-subtitle">{copy.subtitle}</p>
        <p className="code-game-intro">{copy.intro}</p>
      </header>

      <section className="code-progress" aria-label="密码层进度">
        <span>
          第 {currentStep} / {copy.layers.length} 层
        </span>
        <div className="code-progress-dots">
          {copy.layers.map((layer, index) => (
            <i
              className={`${index < openedLayers ? 'is-open' : ''} ${index === openedLayers && !solved ? 'is-current' : ''}`}
              key={layer.title}
            />
          ))}
        </div>
      </section>

      {!solved && currentLayer && (
        <section className={`code-envelope-card ${revealedNote ? 'is-opened' : ''}`}>
          <div className="code-envelope-line" />
          <div className="code-lock" aria-hidden="true">
            <span />
          </div>
          <p className="eyebrow">Password Letter</p>
          <h3>{currentLayer.title}</h3>

          <div className="code-layer-hints">
            <p>{currentLayer.hint}</p>
            <small className={wrongCount >= 2 || revealedNote ? 'is-emphasized' : ''}>{currentLayer.softHint}</small>
          </div>

          {wrongCount > 0 && !revealedNote && <div className="code-error-message">{errorText}</div>}

          {wrongCount >= 3 && !revealedNote && (
            <div className="code-secret-hint">
              {copy.secretPrefix}
              {currentLayer.secretHint}
            </div>
          )}

          {!revealedNote ? (
            <form className={`code-letter-form ${shake ? 'is-shaking' : ''}`} onSubmit={submitPassword}>
              <input
                aria-label={copy.inputLabel}
                inputMode="numeric"
                onChange={(event) => setPassword(event.target.value)}
                placeholder={copy.inputPlaceholder}
                value={password}
              />
              <button className="primary-button" type="submit">
                {copy.submit}
              </button>
            </form>
          ) : (
            <div className="code-success-note">
              <div className="code-note-paper">
                <span>Opened</span>
                <p>{revealedNote.success}</p>
              </div>
              <button className="primary-button" onClick={openNextLayer} type="button">
                {openedLayers + 1 === copy.layers.length ? '查看最后的话' : '进入下一层'}
              </button>
            </div>
          )}
        </section>
      )}

      {solved && (
        <section className="code-complete-card">
          <span>05</span>
          <h3>你解开的不是密码，是我藏起来的一层层喜欢。</h3>
          <button className="primary-button" onClick={onComplete} type="button">
            {copy.finalFragment}
          </button>
        </section>
      )}
    </article>
  )
}

export default PasswordFinalGame

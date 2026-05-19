import { useState } from 'react'
import { loveData } from '../data/loveData'
import { ChibiXiaojie, ChibiXiaoxin } from './ChibiCharacters'
import SafeImage from './SafeImage'

function FinalGiftPage({ finalGiftUnlocked, finalGiftOpened, onOpenConfession }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [opening, setOpening] = useState(false)

  const submitPassword = (event) => {
    event.preventDefault()
    if (!finalGiftUnlocked || opening) return

    if (password.trim() !== loveData.gift.password) {
      setError(loveData.gift.wrong)
      return
    }

    setError('')
    setOpening(true)
    window.setTimeout(onOpenConfession, 2400)
  }

  return (
    <article className={`gift-page glass-card page-enter ${opening ? 'is-opening' : ''}`}>
      <div className={`final-gift-stage ${finalGiftUnlocked ? 'is-ready' : ''} ${opening ? 'is-open' : ''}`}>
        <div className="gift-ribbons" />
        <div className="gift-particles" />
        <div className="gift-heart-fireworks" />
        <div className="gift-chibis">
          <SafeImage
            alt="小杰和小昕Q版"
            className="gift-chibi-image"
            fallback={
              <div className="gift-chibi-fallback">
                <ChibiXiaojie emotion="happy" outfit="formal" pose="cheer" size={122} />
                <ChibiXiaoxin emotion="happy" outfit="formal" pose="cheer" size={122} />
              </div>
            }
            src={loveData.gift.chibiImage}
          />
        </div>
        <SafeImage
          alt="鞋子礼物"
          className="gift-shoe-token"
          fallback={<span className="gift-shoe-token is-placeholder">鞋</span>}
          src={loveData.gift.shoeImage}
        />
        <div className="final-glow-gift">
          <span />
          <span />
          <span />
        </div>
      </div>

      <p className="eyebrow">{loveData.gift.eyebrow}</p>
      <h2>{finalGiftUnlocked ? loveData.gift.title : loveData.gift.lockedTitle}</h2>
      <p>{opening ? loveData.gift.opening : finalGiftUnlocked ? loveData.gift.readyCopy : loveData.gift.lockedCopy}</p>

      {finalGiftOpened && !opening && <div className="gift-opened">{loveData.gift.openedLabel}</div>}

      <form className="gift-password-form" onSubmit={submitPassword}>
        <input
          aria-label={loveData.gift.inputLabel}
          disabled={!finalGiftUnlocked || opening}
          inputMode="numeric"
          maxLength={3}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={loveData.gift.inputPlaceholder}
          value={password}
        />
        {error && <p className="form-error">{error}</p>}
        <button className="primary-button" disabled={!finalGiftUnlocked || opening} type="submit">
          {loveData.gift.openButton}
        </button>
      </form>
    </article>
  )
}

export default FinalGiftPage

import { useMemo, useState } from 'react'
import { loveData } from '../data/loveData'
import { ChibiXiaojie, ChibiXiaoxin } from './ChibiCharacters'
import SafeImage from './SafeImage'

function EggAsset({ asset }) {
  if (!asset) return null

  if (asset.kind === 'people') {
    return (
      <div className="egg-photo-row">
        {asset.items.map((item) => (
          <div className="egg-photo-card" key={item.label}>
            <SafeImage alt={item.label} fallback={<span>{item.label}</span>} src={item.src} />
          </div>
        ))}
      </div>
    )
  }

  if (asset.kind === 'portrait') {
    return (
      <div className="egg-photo-row is-single">
        <div className="egg-photo-card">
          <SafeImage alt={asset.label} fallback={<span>{asset.label}</span>} src={asset.src} />
        </div>
      </div>
    )
  }

  return (
    <SafeImage
      alt={asset.label}
      className="egg-chibi-image"
      fallback={
        <div className="egg-chibi-fallback">
          <ChibiXiaojie emotion="happy" outfit="home" pose="cheer" size={118} />
          <ChibiXiaoxin emotion="happy" outfit="pinkDate" pose="cheer" size={118} />
        </div>
      }
      src={asset.src}
    />
  )
}

function EasterEggPage({ easterEggs = {}, onUnlock }) {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [activeEggId, setActiveEggId] = useState(() => loveData.egg.codes[0]?.id)

  const unlockedEggs = useMemo(
    () => loveData.egg.codes.filter((egg) => easterEggs?.[egg.id]),
    [easterEggs],
  )
  const activeEgg = loveData.egg.codes.find((egg) => egg.id === activeEggId) || unlockedEggs[0]

  const submitCode = (event) => {
    event.preventDefault()
    const egg = loveData.egg.codes.find((item) => item.code === code.trim())

    if (!egg) {
      setMessage(loveData.egg.wrong)
      return
    }

    onUnlock(egg)
    setActiveEggId(egg.id)
    setCode('')
    setMessage(loveData.egg.unlockedToast)
  }

  return (
    <article className="egg-page glass-card page-enter">
      <p className="eyebrow">{loveData.egg.eyebrow}</p>
      <h2>{loveData.egg.title}</h2>
      <p>{loveData.egg.copy}</p>

      <form className="egg-code-form" onSubmit={submitCode}>
        <input
          aria-label={loveData.egg.inputLabel}
          inputMode="numeric"
          onChange={(event) => setCode(event.target.value)}
          placeholder={loveData.egg.inputPlaceholder}
          value={code}
        />
        <button className="primary-button" type="submit">
          {loveData.egg.unlockButton}
        </button>
      </form>
      {message && <div className="egg-message">{message}</div>}

      <section className="egg-unlocked-list">
        <h3>{loveData.egg.unlockedTitle}</h3>
        {unlockedEggs.length === 0 ? (
          <p>{loveData.egg.empty}</p>
        ) : (
          <div className="egg-tabs">
            {unlockedEggs.map((egg) => (
              <button
                className={activeEgg?.id === egg.id ? 'is-active' : ''}
                key={egg.id}
                onClick={() => setActiveEggId(egg.id)}
                type="button"
              >
                {egg.title}
              </button>
            ))}
          </div>
        )}
      </section>

      {activeEgg && easterEggs?.[activeEgg.id] && (
        <section className={`egg-secret-card egg-${activeEgg.id}`}>
          <div className="egg-secret-art">
            <EggAsset asset={activeEgg.asset} />
            {activeEgg.asset?.kind === 'firework' && <div className="mini-fireworks" />}
          </div>
          <p className="eyebrow">{activeEgg.kicker}</p>
          <h3>{activeEgg.title}</h3>
          <p>{activeEgg.copy}</p>
        </section>
      )}
    </article>
  )
}

export default EasterEggPage

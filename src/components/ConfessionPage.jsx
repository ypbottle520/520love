import { useEffect, useMemo, useState } from 'react'
import { loveData } from '../data/loveData'
import { ChibiXiaojie, ChibiXiaoxin } from './ChibiCharacters'
import SafeImage from './SafeImage'

const CONFETTI_SRC = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js'

function localConfettiFallback(options = {}) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const colors = options.colors || ['#f3d9a7', '#f6bfd4', '#fff7ed']
  const origin = options.origin || { x: 0.5, y: 1 }
  const particleCount = options.particleCount || 70
  const angle = ((options.angle || 90) * Math.PI) / 180
  const spread = ((options.spread || 55) * Math.PI) / 180
  const particles = Array.from({ length: particleCount }, () => {
    const velocity = 7 + Math.random() * 7
    const theta = angle + (Math.random() - 0.5) * spread

    return {
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 95 + Math.random() * 35,
      rotation: Math.random() * Math.PI,
      size: 5 + Math.random() * 6,
      vx: Math.cos(theta) * velocity,
      vy: -Math.sin(theta) * velocity,
      x: window.innerWidth * origin.x,
      y: window.innerHeight * origin.y,
    }
  })

  canvas.className = 'confetti-canvas'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)

  let frame = 0
  const animate = () => {
    frame += 1
    context.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.vy += 0.12
      particle.rotation += 0.08
      particle.life -= 1

      context.save()
      context.globalAlpha = Math.max(particle.life / 120, 0)
      context.translate(particle.x, particle.y)
      context.rotate(particle.rotation)
      context.fillStyle = particle.color
      context.fillRect(-particle.size / 2, -particle.size / 3, particle.size, particle.size * 0.66)
      context.restore()
    })

    if (frame < 130) {
      window.requestAnimationFrame(animate)
      return
    }

    canvas.remove()
  }

  animate()
}

function loadConfetti() {
  if (window.confetti) return Promise.resolve(window.confetti)

  return new Promise((resolve) => {
    const existingScript = document.querySelector(`script[src="${CONFETTI_SRC}"]`)

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.confetti || localConfettiFallback), { once: true })
      existingScript.addEventListener('error', () => resolve(localConfettiFallback), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = CONFETTI_SRC
    script.async = true
    script.onload = () => resolve(window.confetti || localConfettiFallback)
    script.onerror = () => resolve(localConfettiFallback)
    document.head.appendChild(script)
  })
}

function launchAcceptanceConfetti() {
  const palette = ['#f2d8a7', '#f6bfd4', '#fff8ed', '#e9dff8']

  loadConfetti().then((confetti) => {
    const common = {
      colors: palette,
      disableForReducedMotion: true,
      particleCount: 92,
      scalar: 0.92,
      spread: 58,
      startVelocity: 42,
      ticks: 210,
      zIndex: 30,
    }

    confetti({
      ...common,
      angle: 58,
      origin: { x: 0.06, y: 1 },
    })
    confetti({
      ...common,
      angle: 122,
      origin: { x: 0.94, y: 1 },
    })
  })
}

function ConfessionPage({ accepted, onAccept, onBack }) {
  const [typedCopy, setTypedCopy] = useState('')
  const fullCopy = loveData.confession.copy
  const isTyping = typedCopy.length < fullCopy.length

  const hearts = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        id: `confession-heart-${index}`,
        left: `${(index * 17 + 9) % 100}%`,
        delay: `${(index % 8) * 0.22}s`,
        drift: `${(index % 2 === 0 ? 1 : -1) * (12 + (index % 4) * 8)}px`,
      })),
    [],
  )

  useEffect(() => {
    setTypedCopy('')
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setTypedCopy(fullCopy.slice(0, index))

      if (index >= fullCopy.length) {
        window.clearInterval(timer)
      }
    }, 32)

    return () => window.clearInterval(timer)
  }, [fullCopy])

  const handleAccept = () => {
    launchAcceptanceConfetti()
    onAccept()
  }

  return (
    <article className={`confession-page glass-card page-enter ${accepted ? 'is-accepted' : ''}`}>
      {accepted && (
        <div className="confession-celebration" aria-hidden="true">
          {hearts.map((heart) => (
            <span
              className="confession-heart"
              key={heart.id}
              style={{ '--drift': heart.drift, animationDelay: heart.delay, left: heart.left }}
            />
          ))}
          <div className="confession-fireworks" />
        </div>
      )}

      <div className="confession-chibis">
        <SafeImage
          alt="小杰和小昕拥抱"
          className="confession-chibi-image"
          fallback={
            <div className="confession-chibi-fallback">
              <ChibiXiaojie emotion="comfort" outfit="whiteJacket" pose="hug" size={136} />
              <ChibiXiaoxin emotion="comfort" outfit="creamKnit" pose="hugged" size={136} />
            </div>
          }
          src={loveData.confession.chibiImage}
        />
      </div>

      <p className="eyebrow">{loveData.confession.eyebrow}</p>
      <h2>{loveData.confession.title}</h2>
      <div className="confession-letter" aria-label={fullCopy}>
        {typedCopy}
        {isTyping && <span className="typing-caret" aria-hidden="true" />}
      </div>

      {!accepted ? (
        <button className="primary-button" onClick={handleAccept} type="button">
          {loveData.confession.acceptButton}
        </button>
      ) : (
        <>
          <div className="accepted-message">{loveData.confession.acceptedMessage}</div>
          <button className="ghost-button" onClick={onBack} type="button">
            {loveData.confession.backButton}
          </button>
        </>
      )}
    </article>
  )
}

export default ConfessionPage

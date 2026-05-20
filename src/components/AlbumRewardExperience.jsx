import { useEffect, useState } from 'react'
import { loveData } from '../data/loveData'
import SafeImage from './SafeImage'

const PHOTO_DELAY = 400
const PHOTO_ROTATIONS = [-5, 3, -2, 5, -4, 2]

function AlbumRewardPhoto({ index, onOpen, photo, visible }) {
  return (
    <button
      aria-label={`查看${photo.title}`}
      className={`album-reward-polaroid ${visible ? 'is-visible' : ''}`}
      onClick={() => onOpen(photo)}
      style={{ '--photo-delay': `${index * PHOTO_DELAY}ms`, '--photo-rotate': `${PHOTO_ROTATIONS[index]}deg` }}
      type="button"
    >
      <div className="album-reward-photo-frame">
        <SafeImage
          alt={photo.title}
          fallback={
            <div className="album-reward-placeholder">
              <span>{photo.id}</span>
              <strong>{photo.title}</strong>
            </div>
          }
          src={photo.src}
        />
      </div>
      <strong>{photo.title}</strong>
      <span>{photo.note}</span>
    </button>
  )
}

function AlbumRewardExperience({ onFinish }) {
  const [opened, setOpened] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const [allSettled, setAllSettled] = useState(false)
  const [activePhoto, setActivePhoto] = useState(null)
  const photos = loveData.album.photos

  useEffect(() => {
    if (!opened) return undefined

    setVisibleCount(0)
    setAllSettled(false)
    const timers = photos.map((_, index) =>
      window.setTimeout(() => {
        setVisibleCount((current) => Math.max(current, index + 1))
      }, index * PHOTO_DELAY),
    )
    timers.push(window.setTimeout(() => setAllSettled(true), (photos.length - 1) * PHOTO_DELAY + 700))

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [opened, photos])

  return (
    <article className={`album-reward-page glass-card page-enter ${opened ? 'is-opened' : ''}`}>
      <div className="album-reward-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      {!opened ? (
        <section className="album-cover-stage">
          <div className="glow-album-cover">
            <span />
            <span />
            <span />
          </div>
          <p className="eyebrow">Surprise Album</p>
          <h2>小杰偷偷收藏的见面瞬间</h2>
          <button className="primary-button" onClick={() => setOpened(true)} type="button">
            打开相册
          </button>
        </section>
      ) : (
        <>
          <section className="album-reward-header">
            <p className="eyebrow">Surprise Album</p>
            <h2>小杰偷偷收藏的见面瞬间</h2>
          </section>

          <section className="album-reward-table" aria-label="惊喜相册照片">
            {photos.map((photo, index) => (
              <AlbumRewardPhoto
                index={index}
                key={photo.id}
                onOpen={setActivePhoto}
                photo={photo}
                visible={index < visibleCount}
              />
            ))}
          </section>

          {allSettled && (
            <section className="album-reward-finale">
              <p>这些瞬间，我想收藏很久。</p>
              <button className="primary-button" onClick={onFinish} type="button">
                收下这本相册
              </button>
            </section>
          )}
        </>
      )}

      {activePhoto && (
        <div className="album-preview-backdrop" onClick={() => setActivePhoto(null)} role="presentation">
          <button className="album-preview-card" onClick={(event) => event.stopPropagation()} type="button">
            <div className="album-preview-image">
              <SafeImage
                alt={activePhoto.title}
                fallback={
                  <div className="album-reward-placeholder">
                    <span>{activePhoto.id}</span>
                    <strong>{activePhoto.title}</strong>
                  </div>
                }
                src={activePhoto.src}
              />
            </div>
            <strong>{activePhoto.title}</strong>
            <span>{activePhoto.note}</span>
            <em>点击空白处关闭</em>
          </button>
        </div>
      )}
    </article>
  )
}

export default AlbumRewardExperience

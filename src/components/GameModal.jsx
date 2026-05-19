import SafeImage from './SafeImage'

function GameModal({ actionLabel, children, image, onAction, title }) {
  return (
    <div className="game-modal-backdrop">
      <article className="game-modal glass-card">
        {image && (
          <SafeImage
            alt=""
            className="game-modal-image"
            fallback={<div className="game-modal-image game-modal-image-placeholder" />}
            src={image}
          />
        )}
        <p className="eyebrow">{title}</p>
        <div className="game-modal-copy">{children}</div>
        <button className="primary-button" onClick={onAction} type="button">
          {actionLabel}
        </button>
      </article>
    </div>
  )
}

export default GameModal

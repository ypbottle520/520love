import { loveData } from '../data/loveData'

function PageFrame({ children, completedCount, pageSkin = 'skin-map', pageTitle, showHeader, showMapButton, onBackToMap }) {
  return (
    <div className={`page-frame ${pageSkin}`}>
      {showHeader && (
        <header className="top-bar">
          <div className="top-bar-copy">
            <span className="eyebrow">{loveData.shell.progressLabel}</span>
            <strong>
              {completedCount} / {loveData.levels.length}
            </strong>
          </div>
          <h1>{pageTitle}</h1>
          {showMapButton && (
            <button className="ghost-button top-bar-button" onClick={onBackToMap} type="button">
              {loveData.shell.backToMap}
            </button>
          )}
        </header>
      )}

      <section className="page-content">{children}</section>

      <footer className="site-footer">{loveData.meta.madeWithLove}</footer>
    </div>
  )
}

export default PageFrame

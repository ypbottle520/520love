import { useState } from 'react'
import { loveData } from '../data/loveData'

function EntryPage({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()

    if (password.trim() !== loveData.storage.password) {
      setError(loveData.entry.error)
      return
    }

    setError('')
    onSuccess()
  }

  return (
    <div className="entry-card glass-card">
      <div className="entry-mark">
        <span>{loveData.entry.eyebrow}</span>
      </div>
      <p className="eyebrow">{loveData.entry.eyebrow}</p>
      <h1>{loveData.entry.title}</h1>
      <p className="entry-subtitle">{loveData.entry.subtitle}</p>

      <form className="entry-form" onSubmit={submit}>
        <input
          aria-label={loveData.entry.inputLabel}
          inputMode="numeric"
          maxLength={3}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={loveData.entry.inputPlaceholder}
          value={password}
        />
        {error && <p className="form-error">{error}</p>}
        <button className="primary-button" type="submit">
          {loveData.entry.submitLabel}
        </button>
      </form>
    </div>
  )
}

export default EntryPage

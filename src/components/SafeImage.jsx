import { useEffect, useState } from 'react'

function SafeImage({ alt = '', className = '', fallback = null, onError, src, ...props }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [src])

  if (!src || failed) {
    return fallback
  }

  return (
    <img
      alt={alt}
      className={`safe-image ${className}`.trim()}
      onError={(event) => {
        setFailed(true)
        onError?.(event)
      }}
      src={src}
      {...props}
    />
  )
}

export default SafeImage

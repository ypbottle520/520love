import { loveData } from '../data/loveData'
import SafeImage from './SafeImage'

function AlbumPhoto({ photo, index }) {
  return (
    <article className="polaroid-card" style={{ '--drop-index': index }}>
      <div className="polaroid-image">
        <SafeImage
          alt={`${loveData.album.imageAlt}：${photo.title}`}
          fallback={
            <div className="polaroid-placeholder">
              <span>{photo.id}</span>
              <strong>{photo.title}</strong>
            </div>
          }
          src={photo.src}
        />
      </div>
      <h3>{photo.title}</h3>
      <p>{photo.note}</p>
    </article>
  )
}

function AlbumPeoplePreview() {
  const people = [
    { label: '小杰', src: loveData.assets.photos.me },
    { label: '小昕', src: loveData.assets.photos.her },
  ]

  return (
    <div className="album-people-preview" aria-label="人物照片">
      {people.map((person) => (
        <div className="album-person-card" key={person.label}>
          <SafeImage alt={person.label} fallback={<span>{person.label}</span>} src={person.src} />
        </div>
      ))}
    </div>
  )
}

function AlbumPage() {
  return (
    <article className="album-page glass-card page-enter">
      <p className="eyebrow">{loveData.album.eyebrow}</p>
      <h2>{loveData.album.title}</h2>
      <p>{loveData.album.copy}</p>
      <AlbumPeoplePreview />

      <div className="polaroid-collage">
        {loveData.album.photos.map((photo, index) => (
          <AlbumPhoto index={index} key={photo.src} photo={photo} />
        ))}
      </div>
    </article>
  )
}

export default AlbumPage

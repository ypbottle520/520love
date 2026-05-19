import { imageAssets } from '../data/assets'
import { loveData } from '../data/loveData'
import { ChibiXiaojie, ChibiXiaoxin } from './ChibiCharacters'
import SafeImage from './SafeImage'

function SceneImage({ alt, children, className = '', src }) {
  return (
    <SafeImage
      alt={alt}
      className={`chibi-scene-image ${className}`}
      fallback={<div className="chibi-scene-fallback">{children}</div>}
      src={src}
    />
  )
}

function Polaroids() {
  return (
    <div className="polaroid-burst" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  )
}

function MilkTeaFallback() {
  return (
    <>
      <ChibiXiaojie emotion="happy" outfit="grayHoodie" pose="holdMilkTea" size={128} />
      <div className="milk-tea-cups">
        <span />
        <span />
      </div>
      <ChibiXiaoxin emotion="happy" outfit="pinkDate" pose="drinkMilkTea" size={128} />
    </>
  )
}

function MilkTeaScene() {
  return (
    <div className="lottery-scene scene-milk-tea">
      <SceneImage alt="小杰和小昕一起喝奶茶" src={imageAssets.chibi.drinkTea}>
        <MilkTeaFallback />
      </SceneImage>
    </div>
  )
}

function ShoeFallback() {
  return (
    <>
      <ChibiXiaojie emotion="happy" outfit="whiteJacket" pose="giveShoe" size={128} />
      <div className="shoe-gift-box">
        <SafeImage
          alt="鞋子礼物"
          fallback={<span>SHOE</span>}
          src={imageAssets.shoe}
        />
      </div>
      <ChibiXiaoxin emotion="surprised" outfit="creamKnit" pose="receiveGift" size={128} />
    </>
  )
}

function ShoeScene() {
  return (
    <div className="lottery-scene scene-shoe">
      <SceneImage alt="小杰把鞋盒递给小昕" src={imageAssets.chibi.giveShoe}>
        <ShoeFallback />
      </SceneImage>
      <SafeImage
        alt="鞋子"
        className="scene-shoe-token"
        fallback={<span className="scene-shoe-token is-placeholder">SHOE</span>}
        src={imageAssets.shoe}
      />
    </div>
  )
}

function AlbumFallback() {
  return (
    <>
      <Polaroids />
      <ChibiXiaojie emotion="happy" outfit="home" pose="openAlbum" size={124} />
      <div className="mini-album">Album</div>
      <ChibiXiaoxin emotion="happy" outfit="home" pose="lookAlbum" size={124} />
    </>
  )
}

function AlbumScene() {
  return (
    <div className="lottery-scene scene-album">
      <SceneImage alt="小杰和小昕一起打开相册" src={imageAssets.chibi.album}>
        <AlbumFallback />
      </SceneImage>
    </div>
  )
}

function CashFallback() {
  return (
    <>
      <ChibiXiaojie emotion="happy" outfit="formal" pose="holdCash" size={132} />
      <div className="cash-board">100</div>
      <ChibiXiaoxin emotion="surprised" outfit="pinkDate" pose="surprised" size={132} />
    </>
  )
}

function CashScene() {
  return (
    <div className="lottery-scene scene-cash">
      <SceneImage alt="小杰举着100元奖励牌" src={imageAssets.chibi.cash100}>
        <CashFallback />
      </SceneImage>
    </div>
  )
}

function ComfortFallback() {
  return (
    <>
      <ChibiXiaojie emotion="comfort" outfit="home" pose="hug" size={134} />
      <ChibiXiaoxin emotion="comfort" outfit="creamKnit" pose="hugged" size={134} />
      <div className="comfort-text">{loveData.lottery.noPrizeComfort}</div>
    </>
  )
}

function ComfortScene() {
  return (
    <div className="lottery-scene scene-comfort">
      <SceneImage alt="小杰抱着小昕安慰" src={imageAssets.chibi.hug}>
        <ComfortFallback />
      </SceneImage>
    </div>
  )
}

function LotteryScene({ scene }) {
  if (scene === 'milkTea') return <MilkTeaScene />
  if (scene === 'shoe') return <ShoeScene />
  if (scene === 'album') return <AlbumScene />
  if (scene === 'cash') return <CashScene />
  return <ComfortScene />
}

export default LotteryScene

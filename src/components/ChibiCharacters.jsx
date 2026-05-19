function getOutfitColors(character, outfit) {
  const palettes = {
    xiaojie: {
      'white-jacket': { top: '#f8fafc', inner: '#d9dde6', accent: '#96a0b7' },
      whiteJacket: { top: '#f8fafc', inner: '#d9dde6', accent: '#96a0b7' },
      白色运动外套: { top: '#f8fafc', inner: '#d9dde6', accent: '#96a0b7' },
      hoodie: { top: '#cfd3dc', inner: '#eef0f6', accent: '#8d96a8' },
      grayHoodie: { top: '#cfd3dc', inner: '#eef0f6', accent: '#8d96a8' },
      灰色卫衣: { top: '#cfd3dc', inner: '#eef0f6', accent: '#8d96a8' },
      suit: { top: '#2f2b3a', inner: '#ffffff', accent: '#d6b76d' },
      formal: { top: '#2f2b3a', inner: '#ffffff', accent: '#d6b76d' },
      礼服: { top: '#2f2b3a', inner: '#ffffff', accent: '#d6b76d' },
      home: { top: '#d8e7f0', inner: '#fff7ef', accent: '#9bb4c5' },
      居家装: { top: '#d8e7f0', inner: '#fff7ef', accent: '#9bb4c5' },
    },
    xiaoxin: {
      knit: { top: '#f4eadc', inner: '#fffaf2', accent: '#d8b98d' },
      creamKnit: { top: '#f4eadc', inner: '#fffaf2', accent: '#d8b98d' },
      米白针织: { top: '#f4eadc', inner: '#fffaf2', accent: '#d8b98d' },
      date: { top: '#ffdce9', inner: '#fff8fb', accent: '#df8fb0' },
      pinkDate: { top: '#ffdce9', inner: '#fff8fb', accent: '#df8fb0' },
      粉白约会装: { top: '#ffdce9', inner: '#fff8fb', accent: '#df8fb0' },
      dress: { top: '#e7d8ff', inner: '#fff8fb', accent: '#d6b76d' },
      formal: { top: '#e7d8ff', inner: '#fff8fb', accent: '#d6b76d' },
      礼服: { top: '#e7d8ff', inner: '#fff8fb', accent: '#d6b76d' },
      home: { top: '#f5dfe7', inner: '#fff8f0', accent: '#d7a7b9' },
      居家装: { top: '#f5dfe7', inner: '#fff8f0', accent: '#d7a7b9' },
    },
  }

  return palettes[character][outfit] || Object.values(palettes[character])[0]
}

function normalizePose(pose) {
  const holdingPoses = new Set([
    'drinkMilkTea',
    'giveShoe',
    'holdMilkTea',
    'lookAlbum',
    'openAlbum',
    'receiveGift',
  ])
  const cheerPoses = new Set(['guardGift', 'heart', 'holdCash', 'openGift', 'shy', 'surprised', 'wave'])
  const hugPoses = new Set(['hug', 'hugged'])

  if (holdingPoses.has(pose)) return 'holding'
  if (cheerPoses.has(pose)) return 'cheer'
  if (hugPoses.has(pose)) return 'hug'
  return pose
}

function getEmotionMouth(emotion) {
  if (emotion === 'surprised') return 'M43 58 Q50 66 57 58'
  if (emotion === 'comfort') return 'M42 58 Q50 63 58 58'
  return 'M41 58 Q50 67 59 58'
}

function Arm({ side, pose, skin }) {
  const isLeft = side === 'left'
  const baseX = isLeft ? 28 : 72
  const handX =
    pose === 'holding' ? 50 : pose === 'cheer' ? (isLeft ? 17 : 83) : pose === 'hug' ? (isLeft ? 62 : 38) : baseX
  const handY = pose === 'cheer' ? 54 : pose === 'hug' ? 76 : pose === 'holding' ? 77 : 82

  return (
    <g>
      <path
        d={`M${baseX} 74 Q${(baseX + handX) / 2} ${handY - 12} ${handX} ${handY}`}
        fill="none"
        stroke={skin}
        strokeLinecap="round"
        strokeWidth="8"
      />
      <circle cx={handX} cy={handY} fill={skin} r="5" />
    </g>
  )
}

function ChibiBase({
  character,
  emotion = 'happy',
  hairPath,
  outfit = 'home',
  pose = 'idle',
  size = 150,
  hairColor,
}) {
  const colors = getOutfitColors(character, outfit)
  const normalizedPose = normalizePose(pose)
  const skin = '#ffd8c7'

  return (
    <svg
      className={`chibi chibi-${character} pose-${normalizedPose} emotion-${emotion}`}
      height={size}
      viewBox="0 0 100 132"
      width={size}
      role="img"
      aria-label={character === 'xiaojie' ? 'Q版小杰' : 'Q版小昕'}
    >
      <ellipse cx="50" cy="121" fill="rgba(105, 75, 120, 0.16)" rx="30" ry="7" />
      <path
        d="M30 82 Q50 70 70 82 L76 116 Q50 126 24 116 Z"
        fill={colors.top}
        stroke="rgba(91, 65, 101, 0.14)"
        strokeWidth="2"
      />
      <path d="M42 82 Q50 92 58 82 L62 116 L38 116 Z" fill={colors.inner} />
      <path d="M35 95 Q50 104 65 95" fill="none" stroke={colors.accent} strokeLinecap="round" strokeWidth="4" />
      <Arm pose={normalizedPose} side="left" skin={skin} />
      <Arm pose={normalizedPose} side="right" skin={skin} />
      <circle cx="50" cy="50" fill={skin} r="31" />
      <path d={hairPath} fill={hairColor} />
      <circle cx="38" cy="50" fill="#2f2a36" r="3.4" />
      <circle cx="62" cy="50" fill="#2f2a36" r="3.4" />
      <circle cx="36" cy="54" fill="#ef9eb7" opacity="0.45" r="4" />
      <circle cx="64" cy="54" fill="#ef9eb7" opacity="0.45" r="4" />
      <path d={getEmotionMouth(emotion)} fill="none" stroke="#8a536c" strokeLinecap="round" strokeWidth="2.4" />
    </svg>
  )
}

export function ChibiXiaojie({ emotion = 'happy', outfit = 'white-jacket', pose = 'idle', size = 150 }) {
  return (
    <ChibiBase
      character="xiaojie"
      emotion={emotion}
      hairColor="#24202a"
      hairPath="M20 45 Q24 18 50 17 Q76 18 82 45 Q70 30 56 33 Q43 24 30 36 Q26 42 20 45 Z"
      outfit={outfit}
      pose={pose}
      size={size}
    />
  )
}

export function ChibiXiaoxin({ emotion = 'happy', outfit = 'knit', pose = 'idle', size = 150 }) {
  return (
    <ChibiBase
      character="xiaoxin"
      emotion={emotion}
      hairColor="#2b2330"
      hairPath="M18 51 Q18 17 50 15 Q82 17 82 53 Q78 84 67 96 Q72 66 68 42 Q58 30 48 34 Q39 27 29 40 Q26 67 33 96 Q20 82 18 51 Z M33 31 Q50 26 67 31 Q58 39 50 39 Q42 39 33 31 Z"
      outfit={outfit}
      pose={pose}
      size={size}
    />
  )
}

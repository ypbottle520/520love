import { imageAssets } from './assets.js'

export const siteInfo = {
  title: '小昕的520心动闯关局',
  subtitle: '通关之后，领取属于你的小杰专属奖励',
  footer: 'Made with love for 小昕。',
  mainPassword: '212',
  finalPassword: '520',
}

export const passwordHints = {
  main: '这是一段从10月20日走到5月20日的距离。',
  wrongMain: '不对哦，再想想。这是我们从10月20日走到5月20日的距离。',
  successMain: '密码正确。小昕，欢迎进入你的520心动闯关局。',
  finalHint: '最后一层密码，是今天最适合说喜欢你的数字。',
}

export const easterEggs = [
  {
    code: '1020',
    title: '我们开始的那一天',
    subtitle: '恋爱纪念页',
    content: '10月20日不是一个普通日期。是我开始把“小昕”这个名字，认真放进生活里的那一天。',
  },
  {
    code: '0212',
    title: '小杰说明书',
    subtitle: '小杰专属页',
    content:
      '姓名：小杰。生日：2月12日。隐藏属性：嘴上不说，但其实很想小昕。使用说明：多夸夸，多抱抱，会自动变开心。',
  },
  {
    code: '0716',
    title: '小昕专属档案',
    subtitle: '小昕专属页',
    content: '姓名：小昕。生日：7月16日。珍贵程度：无法估价。小杰备注：要好好喜欢，要认真照顾。',
  },
  {
    code: '02120716',
    title: '双人隐藏壁纸',
    subtitle: '两个生日，一起变成我们',
    content: '一个2月12日，一个7月16日。两个日期凑在一起，就变成了我很喜欢的我们。',
  },
  {
    code: '1020520',
    title: '从那天到今天',
    subtitle: '隐藏烟花页',
    content: '从10月20日到5月20日，距离有时候很远，但喜欢一直没有走散。',
  },
]

export const levels = [
  {
    id: 1,
    key: 'distance-shoe',
    title: '异地穿越',
    subtitle: '鞋子去见小昕',
    lockedText: '这一关还被想念锁住了，先完成前面的吧。',
    intro: '这双鞋已经先到了你身边。现在，小昕要帮它穿过异地的距离。',
    success: '那双鞋已经替我先走到你身边了。我也会继续朝你走过去。',
    fail: '异地有点难，但我们再试一次就好。',
    fragmentName: '第一枚心动碎片',
  },
  {
    id: 2,
    key: 'memory',
    title: '心动记忆挑战',
    subtitle: '记住我的心动频率',
    lockedText: '这一关还被想念锁住了，先完成前面的吧。',
    intro: '有些话我说过很多次，有些喜欢我藏在心里。小昕，记住它们的顺序吧。',
    success: '恭喜小昕记住了我的心动频率。其实顺序一直都很简单：想你，见你，喜欢你。',
    fail: '差一点点。男朋友再偷偷给你一次机会。',
    fragmentName: '第二枚心动碎片',
  },
  {
    id: 3,
    key: 'hand-puzzle',
    title: '牵手拼图',
    subtitle: '拼好想牵你的瞬间',
    lockedText: '这一关还被想念锁住了，先完成前面的吧。',
    intro: '这一关要拼好的不是照片，是我想牵住你的每一次。',
    success: '原来最想拼好的，不是照片，是以后每一次真正牵住你的机会。',
    fail: '差一点点，照片还在等小昕把它拼完整。',
    fragmentName: '第三枚心动碎片',
  },
  {
    id: 4,
    key: 'match-card',
    title: '恋爱翻翻乐',
    subtitle: '找到我们的隐藏小细节',
    lockedText: '这一关还被想念锁住了，先完成前面的吧。',
    intro: '小杰偷偷把和小昕有关的小细节藏进了卡片里。找到它们，就能继续靠近最终礼物。',
    success: '原来我偷偷记住的，不只是日期，还有和你有关的很多小细节。',
    fail: '没关系，再翻一次。喜欢本来就是慢慢记住对方。',
    fragmentName: '第四枚心动碎片',
  },
  {
    id: 5,
    key: 'password-box',
    title: '密码终章',
    subtitle: '解开一层层喜欢',
    lockedText: '这一关还被想念锁住了，先完成前面的吧。',
    intro: '最后一关，是小杰认真藏起来的一层层密码。',
    success: '你解开的不是密码，是我认真藏起来的一层层喜欢。',
    fail: '还差一点点。再想想那些只属于我们的数字。',
    fragmentName: '第五枚心动碎片',
  },
]

export const passwordLayers = [
  {
    code: '5',
    title: '第一层',
    hint: '见了几次面。',
    success: '以后一定要天天见。',
  },
  {
    code: '1128',
    title: '第二层',
    hint: '我们哪月那日认识的。',
    success: '这是我们开始认识的的第一天。',
  },
  {
    code: '1039',
    title: '第三层',
    hint: '距离。',
    success: '什么时候才能变成0呢。',
  },
  {
    code: '13798762255',
    title: '第四层',
    hint: '我的手机号',
    success: '嘿 不亏是我的宝宝 记住了。',
  },
  {
    code: '828',
    title: '第五层',
    hint: '见面那天。',
    success: '好像和我的宝宝见面呀。',
  },
]

export const punishments = [
  {
    id: 'sajiao',
    title: '撒娇券',
    content: '请对小杰说一句：“你最好啦，再给我一次机会嘛。”',
    button: '小昕已领取撒娇任务',
  },
  {
    id: 'heart',
    title: '比心券',
    content: '下次视频通话时，要给小杰比一个爱心。',
    button: '小昕已领取比心任务',
  },
  {
    id: 'kiss',
    title: '亲亲券',
    content: '给小杰发一个“啵啵”语音，或者一个亲亲表情包。',
    button: '小昕已领取亲亲任务',
  },
  {
    id: 'gift',
    title: '礼物加码券',
    content: '允许小杰以后再送你一个小礼物。不能拒收。',
    button: '小昕已领取礼物任务',
  },
  {
    id: 'miss',
    title: '想你券',
    content: '请对小杰说一句：“我想你了。”',
    button: '小昕已领取想你任务',
  },
  {
    id: 'hug',
    title: '抱抱预约券',
    content: '下次见面，请先抱小杰10秒。',
    button: '小昕已领取抱抱任务',
  },
  {
    id: 'praise',
    title: '夸夸券',
    content: '请夸小杰一句：“你今天特别可爱。”',
    button: '小昕已领取夸夸任务',
  },
  {
    id: 'nickname',
    title: '专属称呼券',
    content: '用一个甜一点的称呼叫小杰一次，比如：宝宝、小杰同学、笨蛋男朋友。',
    button: '小昕已领取称呼任务',
  },
]

export const rewards = [
  {
    id: 'milk-tea',
    title: '奶茶一杯',
    type: 'win',
    weight: 25,
    frontScene: 'Q版小杰和小昕一起喝奶茶，桌子上冒出小爱心。',
    backTitle: '恭喜抽中：奶茶一杯',
    backContent: '奶茶券已发放。找小杰兑奖即可。备注：小昕可以选择自己喜欢的口味。',
    actionText: '收下奶茶券',
  },
  {
    id: 'shoe',
    title: '鞋子礼物（已兑）',
    type: 'win',
    weight: 15,
    frontScene: 'Q版小杰把鞋盒递给Q版小昕，旁边展示那双黑白鞋。',
    backTitle: '恭喜抽中：鞋子礼物（已兑）',
    backContent: '这份奖励已经提前送达啦。那双鞋先替小杰陪你走一段路，等见面后，小杰再亲自陪你走。',
    actionText: '收下已兑礼物',
  },
  {
    id: 'album',
    title: '惊喜相册',
    type: 'win',
    weight: 20,
    frontScene: 'Q版小杰和小昕一起打开一本发光相册，相册里飞出拍立得照片。',
    backTitle: '恭喜抽中：惊喜相册',
    backContent: '已解锁小杰偷偷收藏的见面瞬间。点击进入相册。',
    actionText: '打开惊喜相册',
  },
  {
    id: 'cash100',
    title: '找小杰兑奖100元',
    type: 'win',
    weight: 10,
    frontScene: 'Q版小杰举着写有100的小牌子，小昕站在旁边惊喜地看着。',
    backTitle: '恭喜抽中：找小杰兑奖100元',
    backContent: '此奖励需找小杰本人兑奖。不支持代领。不支持过期。小昕拥有最终解释权。',
    actionText: '收下100元兑奖券',
  },
  {
    id: 'sorry',
    title: '很抱歉没中奖呢',
    type: 'lose',
    weight: 30,
    frontScene: 'Q版小杰抱着Q版小昕安慰她，旁边写着：没事宝宝。',
    backTitle: '很抱歉，没中奖呢',
    backContent: '没事宝宝，还有机会。就算没抽到奖励，小杰也会偷偷给你开后门。',
    actionText: '被小杰安慰一下',
  },
]

export const albumPhotos = [
  {
    id: 'hand1',
    src: imageAssets.photos.album.hand1,
    title: '指尖碰指尖',
    caption: '隔着很多事情，还是想碰到你。',
  },
  {
    id: 'hand2',
    src: imageAssets.photos.album.hand2,
    title: '把手给我',
    caption: '如果可以，以后都想这样牵着你。',
  },
  {
    id: 'hand3',
    src: imageAssets.photos.album.hand3,
    title: '你负责可爱',
    caption: '你负责可爱，我负责偏爱。',
  },
  {
    id: 'hand4',
    src: imageAssets.photos.album.hand4,
    title: '靠近一点',
    caption: '喜欢是藏不住的，连手都想靠近。',
  },
  {
    id: 'hand5',
    src: imageAssets.photos.album.hand5,
    title: '最想收藏的瞬间',
    caption: '最想收藏的，是和你有关的每个瞬间。',
  },
  {
    id: 'hand6',
    src: imageAssets.photos.album.hand6,
    title: '见面限定',
    caption: '这些照片不算完美，但每一张都有我很想你的证据。',
  },
]

export const memoryGameWords = ['想你', '见面', '抱抱', '小昕']

export const obstacleWords = ['距离', '忙碌', '误会', '想太多', '没及时回消息']

export const matchCards = [
  {
    id: 'shoe',
    label: '鞋子',
    icon: '👟',
  },
  {
    id: 'milk-tea',
    label: '奶茶',
    icon: '🧋',
  },
  {
    id: 'heart',
    label: '爱心',
    icon: '💗',
  },
  {
    id: 'album',
    label: '相册',
    icon: '📷',
  },
  {
    id: 'xiaojie',
    label: '小杰Q版',
    icon: '🧑🏻‍💻',
  },
  {
    id: 'xiaoxin',
    label: '小昕Q版',
    icon: '👧🏻',
  },
]

export const chibiPresets = {
  xiaojie: {
    name: '小杰',
    traits: ['黑色短发', '圆眼睛', '温柔认真'],
    outfits: ['whiteJacket', 'grayHoodie', 'formal', 'home'],
    poses: ['giveShoe', 'holdMilkTea', 'heart', 'wave', 'hug', 'holdCash', 'openAlbum', 'guardGift'],
  },
  xiaoxin: {
    name: '小昕',
    traits: ['深色长发', '刘海', '温柔可爱'],
    outfits: ['creamKnit', 'pinkDate', 'formal', 'home'],
    poses: ['receiveGift', 'drinkMilkTea', 'shy', 'heart', 'hugged', 'lookAlbum', 'surprised', 'openGift'],
  },
}

export const finalLetter = {
  title: '小昕，520快乐',
  paragraphs: [
    '鞋你已经收到了，\n但我总觉得还差一点什么。',
    '因为我想送你的，\n不只是一个礼物，\n而是一点被我认真准备过的心意。',
    '异地有时候真的挺烦的。\n想见你的时候见不到，\n想抱你的时候只能隔着屏幕说想你。',
    '但我没有因为距离，\n就把喜欢你这件事变得随便。',
    '那双鞋先替我陪你走一段路。\n等我见到你，\n我再亲自陪你走。',
    '小昕，520快乐。\n我喜欢你，不止今天。',
  ],
  button: '收下我的520',
  acceptedText: '已收到小昕的心动确认。小杰开心值 +520。',
}

export const uiText = {
  start: '开始闯关',
  continue: '继续',
  backToMap: '返回地图',
  drawReward: '进入抽奖',
  flipReward: '点击翻开奖励',
  claimReward: '收下奖励',
  retry: '再试一次',
  unlockFinal: '打开最终520礼物',
  enterEggCode: '输入隐藏口令',
  eggWrong: '这个口令还没有打开小杰藏起来的秘密。',
  levelLocked: '这一关还被想念锁住了，先完成前面的吧。',
}

const sceneByReward = {
  'milk-tea': 'milkTea',
  shoe: 'shoe',
  album: 'album',
  cash100: 'cash',
  sorry: 'comfort',
}

const eggAssetsByCode = {
  1020: {
    kind: 'people',
    items: [
      { label: '小杰', src: imageAssets.photos.me },
      { label: '小昕', src: imageAssets.photos.her },
    ],
  },
  '0212': {
    kind: 'portrait',
    label: '小杰',
    src: imageAssets.photos.me,
  },
  '0716': {
    kind: 'portrait',
    label: '小昕',
    src: imageAssets.photos.her,
  },
  '02120716': {
    kind: 'chibi',
    label: '双人Q版',
    src: imageAssets.chibi.finalHug,
  },
  1020520: {
    kind: 'firework',
    label: '隐藏烟花',
    src: imageAssets.chibi.finalHug,
  },
}

export const loveData = {
  assets: imageAssets,
  meta: {
    title: siteInfo.title,
    madeWithLove: siteInfo.footer,
  },
  storage: {
    key: 'xinxin-520-heart-game-v2',
    password: siteInfo.mainPassword,
  },
  entry: {
    eyebrow: 'October 20 → May 20',
    title: siteInfo.title,
    subtitle: passwordHints.main,
    inputLabel: '输入入口密码',
    inputPlaceholder: '输入密码',
    submitLabel: uiText.start,
    error: passwordHints.wrongMain,
  },
  shell: {
    progressLabel: '当前进度',
    backToMap: uiText.backToMap,
  },
  map: {
    eyebrow: 'Heart Map',
    title: '主地图',
    subtitle: siteInfo.subtitle,
    progressSuffix: '关已点亮',
    lockedTip: uiText.levelLocked,
    completed: '已通关',
    locked: '未解锁',
    unlocked: '已解锁',
    sideQuestTitle: '心动支线',
    finalGiftTitle: '最终礼盒',
    finalGiftLocked: '完成五关并抽完最后一次奖后开启',
    finalGiftOpen: uiText.unlockFinal,
    finalLotteryHint: '还差最后一关的抽奖记录。',
    hiddenCommand: '隐藏口令',
  },
  levels: levels.map((level) => ({
    ...level,
    id: `level-${level.id}`,
    rawId: level.id,
    number: String(level.id).padStart(2, '0'),
    title: `${level.title}·${level.subtitle}`,
    kicker: level.key,
    summary: level.intro,
  })),
  games: {
    common: {
      heartsLabel: '心',
      collectedLabel: '已收集',
      continueToLottery: uiText.drawReward,
      retry: uiText.retry,
      completed: '已完成',
    },
    shoe: {
      title: `${levels[0].title}·${levels[0].subtitle}`,
      hint: levels[0].intro,
      endpointLeft: '我',
      endpointRight: '小昕',
      playerLabel: '鞋子',
      playerImage: imageAssets.shoe,
      obstacles: obstacleWords,
      blockedByGoal: '还差一点爱心，先把散落的喜欢都带上。',
      hitHint: levels[0].fail,
      failTitle: '甜蜜惩罚卡',
      failCopy: levels[0].fail,
      successCopy: levels[0].success,
      controls: {
        up: '上',
        down: '下',
        left: '左',
        right: '右',
      },
    },
    memory: {
      title: levels[1].title,
      eyebrow: 'Round',
      words: memoryGameWords,
      rounds: [2, 3, 4, 5, 6],
      ready: levels[1].intro,
      input: '轮到小昕复现这段心动频率。',
      roundPrefix: '第',
      roundMiddle: '轮：记住',
      roundSuffix: '个词。',
      correctPrefix: '对啦，还差',
      correctSuffix: '下。',
      failTitle: '再试一次',
      wrong: levels[1].fail,
      nextRound: '这一轮对啦，下一段心跳马上来。',
      failCopy: levels[1].fail,
      successCopy: levels[1].success,
    },
    puzzle: {
      title: levels[2].title,
      eyebrow: '3 x 3 Puzzle',
      image: imageAssets.photos.album.hand1,
      hint: levels[2].intro,
      fallbackHint: '如果照片还没放进相册资源目录，会先用编号和柔光底图让拼图可玩。',
      tileAriaPrefix: '拼图第',
      tileAriaSuffix: '块',
      selectFirst: '先选一块拼图。',
      selectedPrefix: '已选第',
      selectedSuffix: '块，再点另一块交换。',
      previewLabel: '原图已拼好',
      successCopy: levels[2].success,
    },
    flip: {
      title: levels[3].title,
      eyebrow: 'Match 6 Pairs',
      hint: levels[3].intro,
      successCopy: levels[3].success,
      pairs: matchCards.map((card) => ({
        key: card.id,
        label: card.label,
        symbol: card.icon,
      })),
    },
    code: {
      title: levels[4].title,
      hint: levels[4].intro,
      inputLabel: '输入当前密码',
      inputPlaceholder: '输入密码',
      submit: '打开这一层',
      wrong: levels[4].fail,
      successCopy: levels[4].success,
      statusOpened: '已打开',
      statusCurrent: '等待密码',
      statusLocked: '锁住',
      layers: passwordLayers.map((layer) => ({
        ...layer,
        copy: layer.success,
      })),
    },
  },
  sideQuests: [
    {
      id: 'lottery',
      title: '抽奖页',
      kicker: 'Lucky Draw',
      summary: '每通关一次，就来这里抽走一个心动奖励。',
      actionLabel: '去抽奖页',
    },
    {
      id: 'album',
      title: '相册页',
      kicker: 'Album',
      summary: '留给照片、截图、时间线和小纸条。',
      actionLabel: '去相册页',
    },
    {
      id: 'egg',
      title: '彩蛋页',
      kicker: 'Secret',
      summary: '藏一个只有小昕会发现的小秘密。',
      actionLabel: '去彩蛋页',
    },
  ],
  lottery: {
    eyebrow: 'Lucky Draw',
    title: '心动抽奖',
    copy: '通关奖励不能少。先看一段小剧场，再翻开属于这一关的奖励。',
    scenePreparing: 'Q版小剧场加载中',
    revealButton: uiText.flipReward,
    finishButton: uiText.claimReward,
    empty: '还没有抽奖记录。',
    sideQuestLabel: '自由抽奖',
    fromLevelPrefix: '来自',
    noPrizeComfort: '没事宝宝，还有机会。',
    prizePool: rewards.map((reward) => ({
      ...reward,
      probability: reward.weight,
      copy: reward.backContent,
      scene: sceneByReward[reward.id],
      image: reward.id === 'shoe' ? imageAssets.shoe : null,
      title: reward.backTitle,
    })),
  },
  album: {
    eyebrow: 'Album',
    title: '小昕的拍立得相册',
    copy: '把想见你的证据，一张一张轻轻放进相册里。',
    imageAlt: '相册照片',
    photos: albumPhotos.map((photo) => ({
      ...photo,
      note: photo.caption,
    })),
  },
  egg: {
    eyebrow: 'Secret',
    title: '隐藏口令',
    copy: '输入只有小昕会注意到的数字，打开不同的小彩蛋。',
    inputLabel: uiText.enterEggCode,
    inputPlaceholder: uiText.enterEggCode,
    unlockButton: '解锁彩蛋',
    wrong: uiText.eggWrong,
    unlockedToast: '彩蛋已解锁。',
    empty: '还没有解锁彩蛋。',
    unlockedTitle: '已解锁彩蛋',
    codes: easterEggs.map((egg) => ({
      code: egg.code,
      id: egg.code,
      title: egg.title,
      kicker: egg.subtitle,
      copy: egg.content,
      asset: eggAssetsByCode[egg.code],
    })),
  },
  gift: {
    eyebrow: 'Final Gift',
    title: '最终礼盒页',
    lockedTitle: '礼盒还差一点点心动能量',
    lockedCopy: '完成五个关卡，并抽完最后一关奖励后，最终礼盒会在这里打开。',
    readyCopy: passwordHints.finalHint,
    password: siteInfo.finalPassword,
    inputLabel: '输入最终密码',
    inputPlaceholder: '最终密码',
    openButton: '打开礼盒',
    wrong: '密码还差一点点，今天最适合说喜欢你的数字是什么？',
    opening: '礼盒打开中，正在把喜欢送出来。',
    openedLabel: '礼盒已开启',
    shoeImage: imageAssets.shoe,
    chibiImage: imageAssets.chibi.finalHug,
  },
  confession: {
    eyebrow: 'Final Letter',
    title: finalLetter.title,
    copy: finalLetter.paragraphs.join('\n\n'),
    acceptButton: finalLetter.button,
    acceptedMessage: finalLetter.acceptedText,
    backButton: uiText.backToMap,
    chibiImage: imageAssets.chibi.finalHug,
  },
  actions: {
    reset: '重置本地进度',
    confirmReset: '本地进度已重置。',
  },
}

export const initialGameState = {
  passwordPassed: false,
  currentProgress: 0,
  levels: {
    'level-1': false,
    'level-2': false,
    'level-3': false,
    'level-4': false,
    'level-5': false,
  },
  lotteryRecords: [],
  easterEggUnlocked: false,
  easterEggRecords: [],
  easterEggs: {},
  finalGiftOpened: false,
  finalConfessionAccepted: false,
}

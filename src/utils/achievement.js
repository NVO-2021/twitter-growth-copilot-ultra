export function getAchievementInfo(followersCount) {
  // 假设 ACHIEVEMENT 是你提供的数据结构
  const levels = ACHIEVEMENT.levels

  // 查找当前级别和步骤
  let currentLevel = null
  let currentStep = null
  let nextStep = null
  let nextLevel = null

  for (let i = 0; i < levels.length; i++) {
    const steps = levels[i].steps
    for (let j = 0; j < steps.length; j++) {
      const step = steps[j]
      if (followersCount >= step.followers) {
        currentLevel = levels[i]
        currentStep = step
      } else {
        nextStep = step
        nextLevel = levels[i]
        break
      }
    }
    if (nextStep) {
      break
    }
  }

  return {
    currentLevel, currentStep, nextLevel,nextStep
  }
}


export function getAchievementByLevelStep(level, step) {
  // 假设 ACHIEVEMENT 是你提供的数据结构
  const levels = ACHIEVEMENT.levels

  // 查找对应的级别和步骤信息
  let achievementInfo = null
  let levelInfo = null

  for (let i = 0; i < levels.length; i++) {
    if (levels[i].level === level) {
      levelInfo = levels[i]
      const steps = levels[i].steps
      for (let j = 0; j < steps.length; j++) {
        if (steps[j].step === step) {
          achievementInfo = steps[j]
          break
        }
      }
      if (achievementInfo) {
        break
      }
    }
  }

  if (achievementInfo) {
    return { achievementInfo, levelInfo }
  }
}




const ACHIEVEMENT = {
  'languages': ['zh', 'en'], 'levels': [{
    'level': 1, 'description': {
      'zh': '从0到10,000粉丝', 'en': 'From 0 to 10,000 followers',
    }, 'emoji': '🌱', 'steps': [{
      'step': 0, 'followers': 0, 'description': {
        'zh': 'twitter/X萌新::破壳起点', 'en': 'Less than 100 followers::New starting point',
      }, 'reward': {
        'zh': '破壳徽章', 'en': 'Egg Badge',
      }, 'emoji': '🐣',
    },{
      'step': 1, 'followers': 100, 'description': {
        'zh': '达到100粉丝::初步认识', 'en': 'Reach 100 followers::Initial recognition',
      }, 'reward': {
        'zh': '初级徽章', 'en': 'Beginner Badge',
      }, 'emoji': '🎉',
    }, {
      'step': 2, 'followers': 500, 'description': {
        'zh': '达到500粉丝::逐渐崭露头角', 'en': 'Reach 500 followers::Emerging',
      }, 'reward': {
        'zh': '中级徽章', 'en': 'Intermediate Badge',
      }, 'emoji': '🚀',
    }, {
      'step': 3, 'followers': 1000, 'description': {
        'zh': '达到1000粉丝::小有成就', 'en': 'Reach 1000 followers::Minor achievement',
      }, 'reward': {
        'zh': '高级徽章', 'en': 'Advanced Badge',
      }, 'emoji': '🌟',
    }, {
      'step': 4, 'followers': 5000, 'description': {
        'zh': '达到5000粉丝::逐渐受到关注', 'en': 'Reach 5000 followers::Gaining attention',
      }, 'reward': {
        'zh': '特级徽章', 'en': 'Special Badge',
      }, 'emoji': '🔥',
    }, {
      'step': 5, 'followers': 10000, 'description': {
        'zh': '达到10000粉丝::成为小网红', 'en': 'Reach 10000 followers::Minor influencer',
      }, 'reward': {
        'zh': 'VIP徽章', 'en': 'VIP Badge',
      }, 'emoji': '💎',
    }],
  }, {
    'level': 2, 'description': {
      'zh': '从10,000到50,000粉丝', 'en': 'From 10,000 to 50,000 followers',
    }, 'emoji': '🌿', 'steps': [{
      'step': 1, 'followers': 15000, 'description': {
        'zh': '达到15000粉丝::稳步增长', 'en': 'Reach 15000 followers::Steady growth',
      }, 'reward': {
        'zh': '钻石徽章', 'en': 'Diamond Badge',
      }, 'emoji': '💎',
    }, {
      'step': 2, 'followers': 20000, 'description': {
        'zh': '达到20000粉丝::影响力逐渐扩大', 'en': 'Reach 20000 followers::Expanding influence',
      }, 'reward': {
        'zh': '黄金徽章', 'en': 'Gold Badge',
      }, 'emoji': '🏅',
    }, {
      'step': 3, 'followers': 30000, 'description': {
        'zh': '达到30000粉丝::小有名气', 'en': 'Reach 30000 followers::Gaining fame',
      }, 'reward': {
        'zh': '白金徽章', 'en': 'Platinum Badge',
      }, 'emoji': '🏆',
    }, {
      'step': 4, 'followers': 40000, 'description': {
        'zh': '达到40000粉丝::受众广泛', 'en': 'Reach 40000 followers::Wide audience',
      }, 'reward': {
        'zh': '铂金徽章', 'en': 'Platinum Badge',
      }, 'emoji': '🥇',
    }, {
      'step': 5, 'followers': 50000, 'description': {
        'zh': '达到50000粉丝::意见领袖', 'en': 'Reach 50000 followers::Opinion leader',
      }, 'reward': {
        'zh': '至尊徽章', 'en': 'Supreme Badge',
      }, 'emoji': '👑',
    }],
  }, {
    'level': 3, 'description': {
      'zh': '从50,000到100,000粉丝', 'en': 'From 50,000 to 100,000 followers',
    }, 'emoji': '🌲', 'steps': [{
      'step': 1, 'followers': 60000, 'description': {
        'zh': '达到60000粉丝::稳步前进', 'en': 'Reach 60000 followers::Moving steadily',
      }, 'reward': {
        'zh': '星级徽章', 'en': 'Star Badge',
      }, 'emoji': '⭐',
    }, {
      'step': 2, 'followers': 70000, 'description': {
        'zh': '达到70000粉丝::扩展影响', 'en': 'Reach 70000 followers::Extending influence',
      }, 'reward': {
        'zh': '传奇徽章', 'en': 'Legend Badge',
      }, 'emoji': '🎖',
    }, {
      'step': 3, 'followers': 80000, 'description': {
        'zh': '达到80000粉丝::逐渐成为热点', 'en': 'Reach 80000 followers::Becoming a trend',
      }, 'reward': {
        'zh': '史诗徽章', 'en': 'Epic Badge',
      }, 'emoji': '🏅',
    }, {
      'step': 4, 'followers': 90000, 'description': {
        'zh': '达到90000粉丝::接近巅峰', 'en': 'Reach 90000 followers::Nearing the peak',
      }, 'reward': {
        'zh': '神话徽章', 'en': 'Mythic Badge',
      }, 'emoji': '🏆',
    }, {
      'step': 5, 'followers': 100000, 'description': {
        'zh': '达到100000粉丝::百万之路的开始', 'en': 'Reach 100000 followers::Beginning of the million journey',
      }, 'reward': {
        'zh': '传说徽章', 'en': 'Legendary Badge',
      }, 'emoji': '🌟',
    }],
  }, {
    'level': 4, 'description': {
      'zh': '从100,000到500,000粉丝', 'en': 'From 100,000 to 500,000 followers',
    }, 'emoji': '🌳', 'steps': [{
      'step': 1, 'followers': 150000, 'description': {
        'zh': '达到150000粉丝::高速增长', 'en': 'Reach 150000 followers::Rapid growth',
      }, 'reward': {
        'zh': '超级明星徽章', 'en': 'Superstar Badge',
      }, 'emoji': '🌠',
    }, {
      'step': 2, 'followers': 200000, 'description': {
        'zh': '达到200000粉丝::社交名人', 'en': 'Reach 200000 followers::Social celebrity',
      }, 'reward': {
        'zh': '社交王者徽章', 'en': 'Social King Badge',
      }, 'emoji': '👑',
    }, {
      'step': 3, 'followers': 300000, 'description': {
        'zh': '达到300000粉丝::网络红人', 'en': 'Reach 300000 followers::Internet celebrity',
      }, 'reward': {
        'zh': '网络王者徽章', 'en': 'Internet King Badge',
      }, 'emoji': '🌟',
    }, {
      'step': 4, 'followers': 400000, 'description': {
        'zh': '达到400000粉丝::近在咫尺', 'en': 'Reach 400000 followers::Almost there',
      }, 'reward': {
        'zh': '顶级网红徽章', 'en': 'Top Influencer Badge',
      }, 'emoji': '🏅',
    }, {
      'step': 5, 'followers': 500000, 'description': {
        'zh': '达到500000粉丝::半百万徽章', 'en': 'Reach 500000 followers::Half-million badge',
      }, 'reward': {
        'zh': '半百万徽章', 'en': 'Half-Million Badge',
      }, 'emoji': '🏅',
    }],
  }, {
    'level': 5, 'description': {
      'zh': '从500,000到1,000,000粉丝', 'en': 'From 500,000 to 1,000,000 followers',
    }, 'emoji': '🌴', 'steps': [{
      'step': 1, 'followers': 600000, 'description': {
        'zh': '达到600000粉丝::稳中有进', 'en': 'Reach 600000 followers::Steady progress',
      }, 'reward': {
        'zh': '钻石巨星徽章', 'en': 'Diamond Superstar Badge',
      }, 'emoji': '💎',
    }, {
      'step': 2, 'followers': 700000, 'description': {
        'zh': '达到700000粉丝::广受欢迎', 'en': 'Reach 700000 followers::Widely popular',
      }, 'reward': {
        'zh': '黄金巨星徽章', 'en': 'Gold Superstar Badge',
      }, 'emoji': '🏅',
    }, {
      'step': 3, 'followers': 800000, 'description': {
        'zh': '达到800000粉丝::巨大影响', 'en': 'Reach 800000 followers::Great influence',
      }, 'reward': {
        'zh': '白金巨星徽章', 'en': 'Platinum Superstar Badge',
      }, 'emoji': '🏆',
    }, {
      'step': 4, 'followers': 900000, 'description': {
        'zh': '达到900000粉丝::近在眼前', 'en': 'Reach 900000 followers::Almost there',
      }, 'reward': {
        'zh': '铂金巨星徽章', 'en': 'Platinum Superstar Badge',
      }, 'emoji': '🥇',
    }, {
      'step': 5, 'followers': 1000000, 'description': {
        'zh': '达到1000000粉丝::百万网红', 'en': 'Reach 1000000 followers::Million influencer',
      }, 'reward': {
        'zh': '百万巨星徽章', 'en': 'Million Superstar Badge',
      }, 'emoji': '🌟',
    }, {
        'step': 6, 'followers': 9999999999, 'description': {
          'zh': '达到9999999999粉丝::飞翔小鸟', 'en': 'Reach 9999999999 followers::Million influencer',
        }, 'reward': {
          'zh': '飞翔小鸟徽章', 'en': 'Billion Superstar Badge',
        }, 'emoji': '🪽',
      }],
  }],
}

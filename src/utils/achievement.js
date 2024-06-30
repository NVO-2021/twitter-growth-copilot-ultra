import MountainSnow from 'lucide-vue-next/dist/esm/icons/mountain-snow.js'

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
    currentLevel, currentStep, nextLevel, nextStep,
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

export function extractSteps() {
  let steps = [];

  ACHIEVEMENT.levels.forEach(level => {
    level.steps.forEach(step => {
      // 深拷贝 step 对象，避免对原数据进行修改
      let stepWithLevel = { ...step, level: level.level };
      steps.push(stepWithLevel);
    });
  });

  return steps;
}

const ACHIEVEMENT = {
  'languages': ['zh', 'en'],
  'levels': [
    {
      'level': 1,
      'description': {
        'zh': '萌芽期：从0到10,000粉丝',
        'en': 'Seedling Stage: From 0 to 10,000 followers',
      },
      'emoji': '🌱',
      'icon': 'Sprout',
      'bgColorClass': 'bg-green-100',
      'iconColorClass': 'text-green-600',
      'steps': [
        {
          'step': 0,
          'followers': 0,
          'description': {
            'zh': 'Twitter萌新::破壳而出',
            'en': 'Twitter Newbie::Fresh out of the shell',
          },
          'reward': {
            'zh': '初生小鸟徽章',
            'en': 'Hatchling Badge',
          },
          'emoji': '🐣',
          'icon': 'Egg',
          'bgColorClass': 'bg-yellow-100',
          'iconColorClass': 'text-yellow-600',
          'growthTips': {
            'zh': ['定期发布原创内容', '关注并互动相关领域的用户', '利用热门话题增加曝光'],
            'en': ['Post original content regularly', 'Follow and interact with users in your niche', 'Use trending hashtags to increase visibility'],
          },
        },
        {
          'step': 1,
          'followers': 100,
          'description': {
            'zh': '百粉达成::初露锋芒',
            'en': 'Century Mark::First breakthrough',
          },
          'reward': {
            'zh': '百粉先锋徽章',
            'en': 'Century Pioneer Badge',
          },
          'emoji': '🎊',
          'icon': 'PartyPopper',
          'bgColorClass': 'bg-purple-100',
          'iconColorClass': 'text-purple-600',
          'growthTips': {
            'zh': ['与粉丝互动，回复评论', '分享有价值的行业信息', '参与社区讨论'],
            'en': ['Engage with followers, reply to comments', 'Share valuable industry insights', 'Participate in community discussions'],
          },
        },
        {
          'step': 2,
          'followers': 500,
          'description': {
            'zh': '五百粉丝::小有名气',
            'en': '500 Club::Rising star',
          },
          'reward': {
            'zh': '新星徽章',
            'en': 'Rising Star Badge',
          },
          'emoji': '⭐',
          'icon': 'Star',
          'bgColorClass': 'bg-yellow-100',
          'iconColorClass': 'text-yellow-600',
          'growthTips': {
            'zh': ['举办小型抽奖活动', '发布多媒体内容如图片和视频', '定期分析数据调整策略'],
            'en': ['Host small giveaways', 'Post multimedia content like images and videos', 'Regularly analyze data to adjust strategy'],
          },
        },
        {
          'step': 3,
          'followers': 1000,
          'description': {
            'zh': '千粉突破::冉冉升起',
            'en': 'Milestone 1K::On the rise',
          },
          'reward': {
            'zh': '千粉俱乐部徽章',
            'en': '1K Club Badge',
          },
          'emoji': '🍺',
          'icon': 'Beer',
          'bgColorClass': 'bg-blue-100',
          'iconColorClass': 'text-blue-600',
          'growthTips': {
            'zh': ['与其他博主合作', '定期发起话题讨论', '创建粉丝专属内容'],
            'en': ['Collaborate with other bloggers', 'Regularly initiate topic discussions', 'Create exclusive content for followers'],
          },
        },
        {
          'step': 4,
          'followers': 5000,
          'description': {
            'zh': '五千粉丝::声名鹊起',
            'en': '5K Achievement::Making waves',
          },
          'reward': {
            'zh': '引领潮流徽章',
            'en': 'Trendsetter Badge',
          },
          'emoji': '🎸',
          'icon': 'Guitar',
          'bgColorClass': 'bg-blue-100',
          'iconColorClass': 'text-blue-600',
          'growthTips': {
            'zh': ['利用数据工具优化发布', '举办线上活动', '建立品牌形象'],
            'en': ['Use data tools to optimize posting', 'Host online events', 'Build a strong brand identity'],
          },
        },
        {
          'step': 5,
          'followers': 10000,
          'description': {
            'zh': '万粉达成::小有影响力',
            'en': '10K Milestone::Micro-influencer',
          },
          'reward': {
            'zh': '影响力先锋徽章',
            'en': 'Influencer Pioneer Badge',
          },
          'emoji': '💫',
          'icon': 'Sparkle',
          'bgColorClass': 'bg-indigo-100',
          'iconColorClass': 'text-indigo-600',
          'growthTips': {
            'zh': ['推出有深度的内容', '参与行业线下活动', '建立粉丝社群'],
            'en': ['Launch in-depth content', 'Participate in industry offline events', 'Build a community for followers'],
          },
        },
      ],
    },
    {
      'level': 2,
      'description': {
        'zh': '成长期：从10,000到50,000粉丝',
        'en': 'Growth Stage: From 10,000 to 50,000 followers',
      },
      'emoji': '🌿',
      'icon': 'Leaf',
      'bgColorClass': 'bg-green-200',
      'iconColorClass': 'text-green-700',
      'steps': [
        {
          'step': 1,
          'followers': 15000,
          'description': {
            'zh': '1.5万粉丝::稳步上升',
            'en': '15K Followers::Steady climb',
          },
          'reward': {
            'zh': '稳健成长徽章',
            'en': 'Steady Growth Badge',
          },
          'emoji': '📈',
          'icon': 'TrendingUp',
          'bgColorClass': 'bg-green-100',
          'iconColorClass': 'text-green-600',
          'growthTips': {
            'zh': ['定期举办问答环节', '提升视觉内容质量', '与微影响力者合作'],
            'en': ['Regularly host Q&A sessions', 'Enhance the quality of visual content', 'Collaborate with micro-influencers'],
          },
        },
        {
          'step': 2,
          'followers': 20000,
          'description': {
            'zh': '2万粉丝::影响力扩大',
            'en': '20K Followers::Expanding reach',
          },
          'reward': {
            'zh': '影响力扩散徽章',
            'en': 'Expanding Influence Badge',
          },
          'emoji': '🎺',
          'icon': 'ShipWheel',
          'bgColorClass': 'bg-blue-100',
          'iconColorClass': 'text-blue-600',
          'growthTips': {
            'zh': ['分析粉丝互动数据', '优化内容发布时间', '提供独家内容'],
            'en': ['Analyze follower engagement data', 'Optimize content posting times', 'Offer exclusive content'],
          },
        },
        {
          'step': 3,
          'followers': 30000,
          'description': {
            'zh': '3万粉丝::社交名人',
            'en': '30K Followers::Social celebrity',
          },
          'reward': {
            'zh': '社交名人徽章',
            'en': 'Social Celebrity Badge',
          },
          'emoji': '🎭',
          'icon': 'Wine',
          'bgColorClass': 'bg-purple-100',
          'iconColorClass': 'text-purple-600',
          'growthTips': {
            'zh': ['开展联合营销活动', '使用多平台推广策略', '提升互动内容的频率'],
            'en': ['Conduct joint marketing campaigns', 'Use multi-platform promotion strategies', 'Increase the frequency of interactive content'],
          },
        },
        {
          'step': 4,
          'followers': 40000,
          'description': {
            'zh': '4万粉丝::广受关注',
            'en': '40K Followers::Widely followed',
          },
          'reward': {
            'zh': '焦点人物徽章',
            'en': 'Spotlight Badge',
          },
          'emoji': '🔦',
          'icon': 'Cone',
          'bgColorClass': 'bg-yellow-100',
          'iconColorClass': 'text-yellow-600',
          'growthTips': {
            'zh': ['举办线下见面会', '增强品牌故事性', '定期与粉丝互动'],
            'en': ['Host offline meetups', 'Enhance brand storytelling', 'Regularly engage with followers'],
          },
        },
        {
          'step': 5,
          'followers': 50000,
          'description': {
            'zh': '5万粉丝::意见领袖',
            'en': '50K Followers::Opinion leader',
          },
          'reward': {
            'zh': '思想引领徽章',
            'en': 'Thought Leader Badge',
          },
          'emoji': '💡',
          'icon': 'Lightbulb',
          'bgColorClass': 'bg-pink-100',
          'iconColorClass': 'text-pink-600',
          'growthTips': {
            'zh': ['建立定期发布日程', '发布长篇深度内容', '参与高影响力合作'],
            'en': ['Establish a regular posting schedule', 'Publish long-form in-depth content', 'Engage in high-impact collaborations'],
          },
        },
      ],
    },
    {
      'level': 3,
      'description': {
        'zh': '茁壮期：从50,000到100,000粉丝',
        'en': 'Thriving Stage: From 50,000 to 100,000 followers',
      },
      'emoji': '🌳',
      'icon': 'Tree',
      'bgColorClass': 'bg-green-300',
      'iconColorClass': 'text-green-800',
      'steps': [
        {
          'step': 1,
          'followers': 60000,
          'description': {
            'zh': '6万粉丝::持续发光',
            'en': '60K Followers::Sustained brilliance',
          },
          'reward': {
            'zh': '恒星徽章',
            'en': 'Constant Star Badge',
          },
          'emoji': '✨',
          'icon': 'Sparkles',
          'bgColorClass': 'bg-yellow-100',
          'iconColorClass': 'text-yellow-600',
          'growthTips': {
            'zh': ['加强内容多样性', '发布粉丝生成内容', '举办粉丝专属活动'],
            'en': ['Enhance content diversity', 'Share user-generated content', 'Host exclusive fan events'],
          },
        },
        {
          'step': 2,
          'followers': 70000,
          'description': {
            'zh': '7万粉丝::影响力扩张',
            'en': '70K Followers::Influence expansion',
          },
          'reward': {
            'zh': '影响力巨匠徽章',
            'en': 'Influence Maestro Badge',
          },
          'emoji': '🌠',
          'icon': 'Podcast',
          'bgColorClass': 'bg-blue-100',
          'iconColorClass': 'text-blue-600',
          'growthTips': {
            'zh': ['分析受众行为模式', '定期调整内容策略', '与行业领袖互动'],
            'en': ['Analyze audience behavior patterns', 'Regularly adjust content strategy', 'Engage with industry leaders'],
          },
        },
        {
          'step': 3,
          'followers': 80000,
          'description': {
            'zh': '8万粉丝::热点人物',
            'en': '80K Followers::Trending figure',
          },
          'reward': {
            'zh': '热点引爆徽章',
            'en': 'Trend Igniter Badge',
          },
          'emoji': '🔥',
          'icon': 'Flame',
          'bgColorClass': 'bg-red-100',
          'iconColorClass': 'text-red-600',
          'growthTips': {
            'zh': ['创建病毒性内容', '利用社交媒体广告', '参与实时热点话题'],
            'en': ['Create viral content', 'Utilize social media ads', 'Engage in real-time trending topics'],
          },
        },
        {
          'step': 4,
          'followers': 90000,
          'description': {
            'zh': '9万粉丝::巅峰在望',
            'en': '90K Followers::Peak in sight',
          },
          'reward': {
            'zh': '巅峰挑战徽章',
            'en': 'Peak Challenger Badge',
          },
          'emoji': '🏔️',
          'icon': 'Mountain',
          'bgColorClass': 'bg-gray-100',
          'iconColorClass': 'text-gray-600',
          'growthTips': {
            'zh': ['优化品牌形象', '与知名品牌合作', '建立长期内容计划'],
            'en': ['Optimize brand image', 'Collaborate with well-known brands', 'Develop a long-term content plan'],
          },
        },
        {
          'step': 5,
          'followers': 100000,
          'description': {
            'zh': '10万粉丝::十万大关',
            'en': '100K Followers::Six-figure milestone',
          },
          'reward': {
            'zh': '十万里程碑徽章',
            'en': '100K Milestone Badge',
          },
          'emoji': '🏆',
          'icon': 'Award',
          'bgColorClass': 'bg-yellow-100',
          'iconColorClass': 'text-yellow-600',
          'growthTips': {
            'zh': ['举办大型粉丝活动', '发布独家新闻和内容', '加强品牌与粉丝的联系'],
            'en': ['Host large-scale fan events', 'Release exclusive news and content', 'Strengthen brand-follower connection'],
          },
        },
      ],
    },
    {
      'level': 4,
      'description': {
        'zh': '繁荣期：从100,000到500,000粉丝',
        'en': 'Flourishing Stage: From 100,000 to 500,000 followers',
      },
      'emoji': '🌳',
      'icon': 'PalmTree',
      'bgColorClass': 'bg-green-400',
      'iconColorClass': 'text-green-900',
      'steps': [
        {
          'step': 1,
          'followers': 150000,
          'description': {
            'zh': '15万粉丝::势如破竹',
            'en': '150K Followers::Unstoppable force',
          },
          'reward': {
            'zh': '势不可挡徽章',
            'en': 'Unstoppable Badge',
          },
          'emoji': '💪',
          'icon': 'PlaneTakeoff',
          'bgColorClass': 'bg-orange-100',
          'iconColorClass': 'text-orange-600',
          'growthTips': {
            'zh': ['利用数据分析提升内容', '定期与粉丝互动', '增强品牌的专业性'],
            'en': ['Use data analytics to enhance content', 'Regularly engage with followers', 'Enhance brand professionalism'],
          },
        },
        {
          'step': 2,
          'followers': 200000,
          'description': {
            'zh': '20万粉丝::网络红人',
            'en': '200K Followers::Internet sensation',
          },
          'reward': {
            'zh': '网红之王徽章',
            'en': 'Viral Sensation Badge',
          },
          'emoji': '💎',
          'icon': 'Gem',
          'bgColorClass': 'bg-yellow-100',
          'iconColorClass': 'text-yellow-600',
          'growthTips': {
            'zh': ['与媒体建立合作关系', '参加重要行业活动', '发布高质量的原创内容'],
            'en': ['Establish media partnerships', 'Participate in key industry events', 'Publish high-quality original content'],
          },
        },
        {
          'step': 3,
          'followers': 300000,
          'description': {
            'zh': '30万粉丝::影响力巨擘',
            'en': '300K Followers::Influence titan',
          },
          'reward': {
            'zh': '影响力巨擘徽章',
            'en': 'Influence Titan Badge',
          },
          'emoji': '🏛️',
          'icon': 'Ship',
          'bgColorClass': 'bg-gray-100',
          'iconColorClass': 'text-gray-600',
          'growthTips': {
            'zh': ['扩大品牌故事', '发布用户见证', '与其他大号合作'],
            'en': ['Expand brand storytelling', 'Publish user testimonials', 'Collaborate with other major accounts'],
          },
        },
        {
          'step': 4,
          'followers': 400000,
          'description': {
            'zh': '40万粉丝::声望巅峰',
            'en': '400K Followers::Prestige peak',
          },
          'reward': {
            'zh': '声望巅峰徽章',
            'en': 'Prestige Peak Badge',
          },
          'emoji': '🗻',
          'icon': 'MountainSnow',
          'bgColorClass': 'bg-blue-100',
          'iconColorClass': 'text-blue-600',
          'growthTips': {
            'zh': ['定期推出创新内容', '与全球品牌合作', '建立品牌大使计划'],
            'en': ['Regularly launch innovative content', 'Collaborate with global brands', 'Establish a brand ambassador program'],
          },
        },
        {
          'step': 5,
          'followers': 500000,
          'description': {
            'zh': '50万粉丝::半百万成就',
            'en': '500K Followers::Half-million achievement',
          },
          'reward': {
            'zh': '半百万成就徽章',
            'en': 'Half-Million Achievement Badge',
          },
          'emoji': '🌟',
          'icon': 'Cake',
          'bgColorClass': 'bg-yellow-100',
          'iconColorClass': 'text-yellow-600',
          'growthTips': {
            'zh': ['发布国际化内容', '参与社会公益活动', '定期与粉丝见面'],
            'en': ['Publish international content', 'Participate in social good initiatives', 'Regularly meet with followers'],
          },
        },
      ],
    },
    {
      'level': 5,
      'description': {
        'zh': '巅峰期：从500,000到1,000,000+粉丝',
        'en': 'Peak Stage: From 500,000 to 1,000,000+ followers',
      },
      'emoji': '🏔️',
      'icon': 'MountainSnow',
      'bgColorClass': 'bg-blue-500',
      'iconColorClass': 'text-white',
      'steps': [
        {
          'step': 1,
          'followers': 600000,
          'description': {
            'zh': '60万粉丝::闪耀群星',
            'en': '600K Followers::Shining among stars',
          },
          'reward': {
            'zh': '群星闪耀徽章',
            'en': 'Stellar Radiance Badge',
          },
          'emoji': '✨',
          'icon': 'SunDim',
          'bgColorClass': 'bg-purple-100',
          'iconColorClass': 'text-purple-600',
          'growthTips': {
            'zh': ['优化粉丝互动机制', '利用大数据提升内容', '参与全球活动'],
            'en': ['Optimize follower engagement mechanisms', 'Use big data to enhance content', 'Participate in global events'],
          },
        },
        {
          'step': 2,
          'followers': 700000,
          'description': {
            'zh': '70万粉丝::媒体宠儿',
            'en': '700K Followers::Media darling',
          },
          'reward': {
            'zh': '媒体宠儿徽章',
            'en': 'Media Darling Badge',
          },
          'emoji': '📸',
          'icon': 'MicVocal',
          'bgColorClass': 'bg-pink-100',
          'iconColorClass': 'text-pink-600',
          'growthTips': {
            'zh': ['发布独家采访和内容', '提升品牌可信度', '与跨行业领袖合作'],
            'en': ['Release exclusive interviews and content', 'Enhance brand credibility', 'Collaborate with cross-industry leaders'],
          },
        },
        {
          'step': 3,
          'followers': 800000,
          'description': {
            'zh': '80万粉丝::巨大影响力',
            'en': '800K Followers::Massive influence',
          },
          'reward': {
            'zh': '影响力巨人徽章',
            'en': 'Influence Giant Badge',
          },
          'emoji': '🌋',
          'icon': 'Zap',
          'bgColorClass': 'bg-red-100',
          'iconColorClass': 'text-red-600',
          'growthTips': {
            'zh': ['拓展国际粉丝群体', '发布多语言内容', '增强品牌的全球影响力'],
            'en': ['Expand international follower base', 'Publish multilingual content', 'Enhance global brand influence'],
          },
        },
        {
          'step': 4,
          'followers': 900000,
          'description': {
            'zh': '90万粉丝::百万在望',
            'en': '900K Followers::Million in sight',
          },
          'reward': {
            'zh': '百万先驱徽章',
            'en': 'Million Pioneer Badge',
          },
          'emoji': '💰',
          'icon': 'BadgeDollarSign',
          'bgColorClass': 'bg-indigo-100',
          'iconColorClass': 'text-indigo-600',
          'growthTips': {
            'zh': ['举办全球性活动', '与国际品牌合作', '发布创新互动内容'],
            'en': ['Host global events', 'Collaborate with international brands', 'Release innovative interactive content'],
          },
        },
        {
          'step': 5,
          'followers': 1000000,
          'description': {
            'zh': '100万粉丝::百万成就',
            'en': '1M Followers::Million milestone',
          },
          'reward': {
            'zh': '百万成就徽章',
            'en': 'Million Milestone Badge',
          },
          'emoji': '👑',
          'icon': 'Crown',
          'bgColorClass': 'bg-blue-100',
          'iconColorClass': 'text-blue-600',
          'growthTips': {
            'zh': ['创建品牌联盟', '发布高质量的合作内容', '制定长远的品牌发展计划'],
            'en': ['Create brand alliances', 'Publish high-quality collaborative content', 'Develop long-term brand growth plans'],
          },
        },
        {
          'step': 6,
          'followers': 999999999,
          'description': {
            'zh': '飞跃巅峰::传奇人物',
            'en': 'Beyond the Peak::Living Legend',
          },
          'reward': {
            'zh': '传奇巨星徽章',
            'en': 'Legendary Superstar Badge',
          },
          'emoji': '🦅',
          'icon': 'Trophy',
          'bgColorClass': 'bg-gradient-to-r from-yellow-400 to-pink-500',
          'iconColorClass': 'text-white',
          'growthTips': {
            'zh': ['维护全球粉丝关系', '持续创新内容形式', '保持品牌的领先地位'],
            'en': ['Maintain global follower relations', 'Continuously innovate content formats', 'Keep the brand in a leading position'],
          },
        },
      ],
    },
  ],
}

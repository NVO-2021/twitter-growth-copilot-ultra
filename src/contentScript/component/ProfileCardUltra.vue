<template>
  <div class="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg mx-auto w-[99%] mt-3">
    <div class="flex items-center mb-4">
      <component :is="rocketIcon" class="text-white mr-2" :size="24" />
      <h1 class="text-2xl font-bold text-white">Twitter Growth Copilot</h1>
    </div>

    <div class="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
      <div class="flex justify-between items-center mb-4">
        <div class="text-white">
          <p class="text-sm opacity-80">Current Step</p>
          <p class="text-xl font-bold flex items-center">
            <Star class="mr-1" size="20" />
            Level {{ achievement?.currentLevelInfo?.level }}: {{ achievement?.currentStepInfo?.reward?.en }}
          </p>
        </div>
        <div class="text-white text-right">
          <p class="text-sm opacity-80">Next Step</p>
          <p class="text-xl font-bold flex items-center justify-end">
            Level {{ achievement?.nextLevelInfo?.level }}: {{ achievement?.nextStepInfo?.reward?.en }}
            <Star class="ml-1" size="20" />
          </p>
        </div>
      </div>

      <div class="flex justify-between items-center mb-4">
        <div :class="[achievement?.currentStepInfo?.bgColorClass , 'rounded-full' ,'p-2']">
          <component :is="currentIcon" :class="achievement?.currentStepInfo?.iconColorClass" :size="32" />
        </div>
        <div class="text-center flex-grow mx-4">
          <p class="text-white font-bold text-lg">{{ followsCountCache?.toLocaleString() }} /
            {{ achievement?.nextStepInfo?.followers?.toLocaleString() }}</p>
          <p class="text-white text-sm">Followers</p>
        </div>
        <div :class="[achievement?.nextStepInfo?.bgColorClass , 'rounded-full' ,'p-2']">
          <component :is="nextIcon" :class="achievement?.nextStepInfo?.iconColorClass" :size="32" />
        </div>
      </div>

      <div class="mb-2">
        <div class="flex justify-between text-white text-sm mb-1">
          <span>{{ achievement?.currentStepInfo?.reward?.en }}</span>
          <span>{{ achievement?.nextStepInfo?.reward?.en }}</span>
        </div>
        <div class="bg-white bg-opacity-30 rounded-full h-4">
          <div
            class="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full"
            :style="{ width: currentProcessView }"
          ></div>
        </div>
      </div>

      <div class="flex justify-between items-center text-white">
        <p class="text-sm">Progress</p>
        <p class="font-bold">{{ currentProcessView }}</p>
      </div>
    </div>

    <div class="mt-4 bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
      <h2 class="text-white font-bold mb-2 flex items-center">
        <component :is="tipsIcon" class="mr-2" size="20"  />
        Growth Tips
      </h2>
      <ul class="text-white text-sm list-disc list-inside">
        <li v-for="(tip, index) in achievement?.currentStepInfo?.growthTips?.en" :key="index">
          {{ tip }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
//third party
import { computed, onMounted, ref } from 'vue'

//custom
import confetti from 'canvas-confetti'
import { getFollowersCount, observeUsername } from '../../utils/twitterUtils'
import { getAchievementInfo } from '/src/utils/achievement'
import * as lucideIcons from 'lucide-vue-next'


const currentProcessView = ref('0.00%')


let followsCountCache = 0
let currentNumber = 0

const rocketIcon = ref(lucideIcons['Rocket'])
const tipsIcon = ref(lucideIcons['TrendingUp'])
const currentIcon = ref(null)
const nextIcon = ref(null)



const process = computed(() => {
  let nextStepFollowers = achievement.value.nextStepInfo?.followers ?? 99999999
  let percentage = (100 * followsCountCache / nextStepFollowers).toFixed(2)
  return percentage
})

const targetFollowers = computed(() => {
  return achievement.value.nextStepInfo?.followers?.toLocaleString()
})


const achievement = ref({

  currentLevelInfo: {},
  nextLevelInfo: {},
  currentStepInfo: {},
  nextStepInfo: {},

})


const observeChanged = async () => {

  await observeUsername((flag) => {
    if (flag === true) {
      console.debug('observeUsername', flag)

      freshData(showCurrentAchievement)

    }
  })


}


const freshData = async (callback) => {


  let followersCount = await getFollowersCount()

  console.debug('getFollowersCount >>>>>>> ', followersCount)

  if (!followersCount || followersCount === followsCountCache) {
    console.debug('freshData >>>>>>> ', 'return')
    return
  }


  followsCountCache = followersCount


  let { currentLevel, currentStep, nextLevel, nextStep } = getAchievementInfo(followsCountCache)

  console.debug('getAchievementInfo >>>>>>> ', { currentLevel, currentStep, nextLevel, nextStep })

  achievement.value.currentLevelInfo = currentLevel
  achievement.value.nextLevelInfo = nextLevel
  achievement.value.currentStepInfo = currentStep
  achievement.value.nextStepInfo = nextStep


  currentIcon.value = lucideIcons[achievement.value.currentStepInfo?.icon]
  nextIcon.value = lucideIcons[achievement.value.nextStepInfo?.icon]


  let _process = process.value

  console.log('current.process >>>>>>> ', _process)
  console.debug('current.followsCountCache >>>>>>> ', followsCountCache)
  console.debug('current.achievement >>>>>>> ', achievement)

  processShow(_process)

  // 调用函数执行操作
  updateAchievementStorage().then(changed => {

    if (changed) {

      console.debug('Achievement data updated in storage.')
      callback()

    } else {

      console.debug('Achievement data is up to date. No changes made.')

    }

  })


}

  const processShow = (targetProgress) => {

    let currentProgress = 0

    console.debug('processShow')

    function updateProgress() {

      if (currentProgress < targetProgress) {
        currentProgress = Math.min(++currentProgress, targetProgress)

        currentProcessView.value = currentProgress + '%'
        requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
  }

// 使用async/await获取存储的成就数据
  const updateAchievementStorage = async () => {

    //存储followers数据
    await chrome.storage.sync.set({ followers: followsCountCache })


    console.debug('[updateAchievementStorage] achievement >>>>>>> ', achievement.value)

    const result = await chrome.storage.sync.get(['achievement'])

    console.debug('chrome.storage.sync.get([\'achievement\'])', result)
    console.debug('result::', result.achievement)

    let achievementCache = result.achievement || {} // 如果结果为空，则初始化为空对象


    let changed = false // 初始化数据变化标志为false

    // 检查存储的成就数据是否存在并且需要更新
    if (!achievementCache.currentLevelInfo ||
      !achievementCache.currentStepInfo ||
      achievementCache.currentLevelInfo.level !== achievement.value.currentLevelInfo.level ||
      achievementCache.currentStepInfo.step !== achievement.value.currentStepInfo.step) {

      // 数据有变化，更新storage
      achievementCache = achievement.value // 赋予新的成就数据
      await chrome.storage.sync.set({ achievement: achievementCache })
      changed = true
    } else {
      // 数据无变化，无需操作
    }

    console.debug('Data changed:', changed)
    return changed
  }


  const showCurrentAchievement = () => {

    //撒花🎉
    doAnimation()

    //展示徽章
    showBadge()

  }


  const doAnimation = () => {
    async function confettiAnimationAsync(endTime) {
      const confettiFrame = async () => {
        if (Date.now() > endTime) {
          return
        }

        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        })
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        })

        // 使用requestAnimationFrame进行下一帧的调度
        requestAnimationFrame(confettiFrame)
      }

      // 启动动画循环
      await confettiFrame()
    }

// 调用异步动画函数，传入结束时间
    confettiAnimationAsync(Date.now() + 1 * 1000)
      .then(() => console.debug('Confetti animation ended.', '[TwitterUltra]'))

    setTimeout(() => {
      // 调用异步动画函数，传入结束时间
      confettiAnimationAsync(Date.now() + 1 * 1000)
        .then(() => console.debug('Confetti animation ended.', '[TwitterUltra]'))
    }, 3000)
  }

  const showBadge = () => {

  }


  onMounted(async () => {
    // await chrome.storage.sync.set({ achievement: null })
    await observeChanged()
  })


</script>

<style scoped>
@import '/src/assets/tailwind.css';
</style>

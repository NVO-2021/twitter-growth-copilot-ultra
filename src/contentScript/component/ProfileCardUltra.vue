<script setup>
//third party
import { ElMessage } from 'element-plus'
import html2canvas from 'html2canvas'
import { onMounted, ref } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'

//custom
import { observeUsername, getFollowersCount } from '../../utils/twitterUtils'
import confetti from 'canvas-confetti'
import { getAchievementInfo, getAchievementByLevelStep } from '/src/utils/achievement'

console.debug('ProfileCardUltra.vue is running', '[Vue]')


const captureArea = ref(null)
const screenshot = ref(null)

const activeNames = ref(['copilot']) // 设置默认展开的项

const copilot = ref({
  name: '🚀 Twitter Growth Booster',
  icon: 'el-icon-s-operation',
  process: 0,
})


const achievement = ref({

  currentLevelInfo: {},
  nextLevelInfo: {},
  currentStepInfo: {},
  nextStepInfo: {},

})


const capture = () => {
  /* if (captureArea.value) {
     html2canvas(captureArea.value).then(canvas => {
       screenshot.value = canvas.toDataURL('image/png')
       const link = document.createElement('a')
       link.download = `twitter-growth-booster-${Date.now()}.png`
       link.href = canvas.toDataURL('image/png')
       link.click();
       // copyToClipboard(canvas)
     })
   }*/

  chrome.runtime.sendMessage({ action: 'capture' }, (response) => {
    if (response.success) {
      // 处理截取到的图片
      console.debug(response.dataUrl)
      // 可以将截图显示在新的标签页中
      chrome.tabs.create({ url: response.dataUrl })
    } else {
      console.error('Error capturing screenshot:', response.error)
    }
  })

}

const canvasToBlob = (canvas) => {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob)
    }, 'image/png')
  })
}

const copyToClipboard = async (canvas) => {
  if (screenshot.value) {
    const blob = await canvasToBlob(canvas)
    const item = new ClipboardItem({ 'image/png': blob })
    navigator.clipboard.write([item]).then(() => {
      ElMessage({
        message: 'Screenshot captured successfully and copied to the clipboard. \nPlease paste it into the Twitter input box right away to share the joy!',
        type: 'success',
      })
    }, (error) => {
      console.debug('复制失败: ', error)
    })
  } else {
    console.debug('请先捕获截图')
  }
}


function onTitleChanged() {

  observeUsername((flag) => {
    if (flag === true) {
      console.debug('observeUsername', flag)

      freshData(showCurrentAchievement)

    }
  })


}


async function freshData(callback) {

  let followersCount = await getFollowersCount()
  console.debug('getFollowersCount >>>>>>> ', followersCount)

  let { currentLevel, currentStep, nextLevel, nextStep } = getAchievementInfo(followersCount)

  console.debug('getAchievementInfo >>>>>>> ', { currentLevel, currentStep, nextLevel, nextStep })

  achievement.value = {
    currentLevelInfo: currentLevel,
    nextLevelInfo: nextLevel,
    currentStepInfo: currentStep,
    nextStepInfo: nextStep,
  }

  copilot.value.process = Number(followersCount / achievement.value.nextStepInfo.followers) * 100
  console.debug('copilot.value.process >>>>>>> ', copilot.value.process)

  processShow(copilot.value.process)

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

function processShow(targetProgress) {

  const progress = document.querySelector('.progress')
  const percentage = document.querySelector('.percentage')
  let currentProgress = 0

  console.debug('processShow')

  function updateProgress() {
    if (!progress || !percentage) {
      return
    }
    if (currentProgress < targetProgress) {
      currentProgress++
      progress.style.width = currentProgress + '%'
      percentage.textContent = currentProgress + '%'
      requestAnimationFrame(updateProgress)
    }
  }

  updateProgress()
}

// 使用async/await获取存储的成就数据
async function updateAchievementStorage() {

  console.debug('[achievement] >>>>>>> ', achievement.value)

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


function showCurrentAchievement() {

  //撒花🎉
  doAnimation()

  //展示徽章
  showBadge()

}


function doAnimation() {
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

function showBadge() {

}


onMounted(async () => {
  // await chrome.storage.sync.set({ achievement: null })
  onTitleChanged()
})

</script>

<template>
  <div class="container">
    <div ref="captureArea" class="twitter-growth-copilot">
      <h2 class="title">
        <span class="emoji">🚀</span>
        Twitter Growth Copilot
      </h2>
      <div class="content">
        <div class="stages">
          <div class="stage">
            <div class="icon-wrapper yellow">
              {{ achievement?.currentStepInfo?.emoji }}
            </div>
            <p>{{ achievement?.currentStepInfo?.reward?.en }}</p>
          </div>
          <div class="stage">
            <div class="icon-wrapper pink">
              {{ achievement?.nextStepInfo?.emoji }}
            </div>
            <p>{{ achievement?.nextStepInfo?.reward?.en }}</p>
          </div>
        </div>
        <div class="progress-wrapper">
          <div class="progress-label">
            <span class="label">进度</span>
            <span class="percentage">0%</span>
          </div>
          <div class="progress-bar">
            <div class="progress"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


.container {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.twitter-growth-copilot {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  width: 90%;
  color: white;
}

.title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.title .emoji {
  margin-right: 0.5rem;
  font-size: 1.8rem;
  animation: rocket 2s ease-in-out infinite;
}

@keyframes rocket {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-5px) rotate(5deg);
  }
}

.content {
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.stages {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.stage {
  text-align: center;
}

.icon-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.icon-wrapper:hover {
  animation: bounce 0.6s ease infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.yellow {
  background-color: #fde68a;
  animation: pulse-yellow 2s infinite;
}

.pink {
  background-color: #fbcfe8;
  animation: pulse-pink 2s infinite;
}

@keyframes pulse-yellow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(253, 230, 138, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(253, 230, 138, 0);
  }
}

@keyframes pulse-pink {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(251, 207, 232, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(251, 207, 232, 0);
  }
}

.stage p {
  margin: 0.5rem 0 0;
  font-weight: 500;
}

.progress-wrapper {
  position: relative;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: #10b981;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
}

.percentage {
  font-size: 0.75rem;
  font-weight: 600;
}

.progress-bar {
  height: 0.5rem;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #10b981;
  width: 0;
  transition: width 0.5s ease-in-out;
}
</style>

<script setup>
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'

import { observeUsername } from '/src/utils/twitterUtils'

console.debug('TwitterUltra.vue is running', '[Vue]')


let currentUserFlag = false


/************************************************/
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

/************************************************/


function onTitleChanged() {
  observeUsername((flag) => {
    if (!currentUserFlag && flag === true) {
      console.log("observeUsername",flag)
      currentUserFlag = true
      doAnimation()
    }
  })


}


onMounted(() => {
  onTitleChanged()


})

</script>

<template>

</template>

<style scoped>

</style>

<script setup>
import { ref, onMounted } from 'vue'
import confetti from 'canvas-confetti'
import { TwitterSelectors } from '/src/utils/twitterSelectors'
import { twitterEvents } from '/src/utils/twitterEvents'
import {
  isUrlPathMatching,
  getElement,
  getAndObserveElement,
  extractFromAvatarButton,
  titleUsername,
} from '/src/utils/twitterUtils'

console.debug('TwitterUltra.vue is running', '[Vue]')


let curTitleUser = ''


/************************************************/

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
    .then(() => console.log('Confetti animation ended.', '[TwitterUltra]'))

  setTimeout(() => {
    // 调用异步动画函数，传入结束时间
    confettiAnimationAsync(Date.now() + 1 * 1000)
      .then(() => console.log('Confetti animation ended.', '[TwitterUltra]'))
  },3000)

}


function onTitleChanged($title) {

  let titleUser = titleUsername($title.innerText)

  if (curTitleUser !== titleUser) {

    curTitleUser = titleUser
    getElement(TwitterSelectors.SideNav_AccountSwitcher_Button).then($html => {

      let userName = extractFromAvatarButton($html.innerText)

      console.debug('SideNav_AccountSwitcher_Button', userName)

      // let curUserProfile = isUrlPathMatching(`^/${userName}$`)

      if (titleUser && userName && titleUser === userName) {
        console.log('play animation', '[TwitterUltra]')
        doAnimation()
      }
    })

  }


}


onMounted(() => {

  getAndObserveElement(`title`, ($title) => {

    console.debug('getAndObserveElement', $title)
    onTitleChanged($title)

  })


})

</script>

<template>

</template>

<style scoped>

</style>

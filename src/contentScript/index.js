// content.js
console.debug('twitter-growth-copilot bootstrap loaded!!!')
console.debug('content.script!!!')
import { createApp } from 'vue'
import { TwitterSelectors } from '/src/utils/twitterSelectors'
import { checkUsername, getAndObserveElement, getElement } from '/src/utils/twitterUtils.js'

import TwitterUltra from './component/TwitterUltra.vue'
import ProfileCard from './component/ProfileCard.vue'

initVueApp()
observeCreateProfileCard()


function initVueApp() {

  // Vue.js 已加载，可以初始化Vue应用
  let appContainer = document.createElement('div')
  appContainer.id = 'vue-content-container'
  document.body.appendChild(appContainer)
  createApp(TwitterUltra).mount('#vue-content-container')
}


function observeCreateProfileCard() {
  // observeElement(TwitterSelectors.PROFILE_PRIMARY_COLUMN, $profile => {
  getAndObserveElement(TwitterSelectors.TWITTER_TITLE, $profile => {

    console.info('TwitterSelectors.TWITTER_TITLE', $profile)

    onProfileChanged($profile)

  })
}


async function onProfileChanged($profile) {

  let _id = 'inject-profile-card'

  if (document.getElementById(_id)) {
    console.debug('profile card already exist')
    return
  }

  console.debug('onProfileChanged >>>>>>>>>')

  let result = await checkUsername()
  console.debug('checkUsername()', result)
  if (result === true) {
    getElement(TwitterSelectors.PROFILE_USER_NAME).then($html => {
      console.debug(`create _id :: ${_id} starting ...`)

      let appContainer = document.createElement('div')
      appContainer.id = _id
      $html.parentElement.appendChild(appContainer)
      createApp(ProfileCard).mount(`#${_id}`)

      console.debug(`create _id :: ${_id} success!`)
    })
  }


}



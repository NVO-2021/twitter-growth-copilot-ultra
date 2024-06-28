// content.js
import { createApp, onMounted } from 'vue'
import ElementPlus from 'element-plus'
import { TwitterSelectors } from '/src/utils/twitterSelectors'


//page
import TwitterUltra from './component/TwitterUltra.vue'
import ProfileCardUltra from './component/ProfileCardUltra.vue'

//js
import { checkUsername, getAndObserveElement, getElement } from '/src/utils/twitterUtils.js'

// css
import 'element-plus/dist/index.css'


//code start
console.log('twitter-growth-copilot bootstrap loaded!!!')
console.log('content.script!!!')


createObserver(() => {
    return document.getElementById('vue-content-container')
  },
  () => {
    initVueApp()
  })

createObserver(() => {
    return document.getElementById('inject-profile-card')
  },
  () => {
    onProfileChanged()
  })

function createObserver(condition, callback) {
  const intervalId = setInterval(function() {
    // 检查条件是否满足，这里假设条件为某个变量或者函数返回值
    if (condition()) {
      console.log('条件已满足，清除定时器')
      clearInterval(intervalId) // 清除定时器
    } else {
      console.log('继续轮询...')
      callback()
    }
  }, 500)
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'urlChanged') {
    console.log('URL changed to:', message.url)

    // 在此处理 URL 变化的逻辑
    // 例如：显示通知、修改页面内容等
    onProfileChanged()

    sendResponse({ status: 'URL change processed' })
  }
})


function initVueApp() {

  // Vue.js 已加载，可以初始化Vue应用
  const _id = 'vue-content-container'
  if (document.getElementById(_id)) {
    return
  }

  let appContainer = document.createElement('div')
  appContainer.id = 'vue-content-container'
  document.body.appendChild(appContainer)
  createApp(TwitterUltra)
    .use(ElementPlus)
    .mount('#vue-content-container')
}


/*function observeCreateProfileCard() {
  // observeElement(TwitterSelectors.PROFILE_PRIMARY_COLUMN, $profile => {
  getAndObserveElement(TwitterSelectors.TWITTER_TITLE, $profile => {

    console.log('TwitterSelectors.TWITTER_TITLE', $profile)

    // onProfileChanged()

  })
}*/


async function onProfileChanged() {

  let _id = 'inject-profile-card'

  if (document.getElementById(_id)) {
    console.log('profile card already exist')
    return
  }

  console.log('onProfileChanged >>>>>>>>>')

  let result = await checkUsername()
  console.log('checkUsername()', result)
  if (result === true) {
    getElement(TwitterSelectors.PROFILE_USER_NAME).then($html => {
      console.log(`create _id :: ${_id} starting ...`)

      let appContainer = document.createElement('div')
      appContainer.id = _id
      $html.parentElement.appendChild(appContainer)
      createApp(ProfileCardUltra)
        .use(ElementPlus)
        .mount(`#${_id}`)

      console.log(`create _id :: ${_id} success!`)
    })
  }


}



// content.js
console.log('content.script!!!')
import { createApp, onMounted } from 'vue'
import TwitterUltra from './component/TwitterUltra.vue'
import ProfileCard from './component/ProfileCard.vue'
import { TwitterSelectors } from '/src/utils/twitterSelectors'



initVueApp()
observeDomChange()


function initVueApp() {

  // Vue.js 已加载，可以初始化Vue应用
  let appContainer = document.createElement('div')
  appContainer.id = 'vue-content-container'
  document.body.appendChild(appContainer)
  createApp(TwitterUltra).mount('#vue-content-container')
}


function injectProfileCard(usernameDom) {
  if (document.getElementById('profile-card-container')) {
    console.debug('profile-card-container has existed!', 999)
    return
  }

  let profileCardContainer = document.createElement('div')
  profileCardContainer.id = 'profile-card-container'
  console.debug(usernameDom, 'usernameDom')
  usernameDom.append(profileCardContainer)
  createApp(ProfileCard).mount('#profile-card-container')
}

/************ observer *************/


function observeDomChange() {

// 使用MutationObserver监测DOM变化
  const observer = new MutationObserver((mutations) => {

    for (const mutation of mutations) {
      let target = mutation.target
      if (mutation.type === 'childList' && target) {

        console.debug('observer.target...')

        // 检查是否加载了新的UserName元素
        let usernameDom = target.querySelector(TwitterSelectors.SideNav_AccountSwitcher_Button)
        if (usernameDom) {
          console.debug('UserName元素已加载：', target)
          injectProfileCard(usernameDom)
        }
      }
    }
  })

// 配置MutationObserver监测选项
  const config = {
    childList: true, // 监测直接子节点的变化
    subtree: true,    // 监测整个子树的变化
  }


// 开始监测
  observer.observe(document, config)
}




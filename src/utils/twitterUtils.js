import { TwitterSelectors } from './twitterSelectors.js'

export async function getFollowersCount() {

  const $html = await getElement(TwitterSelectors.VERIFIED_FOLLOWERS)
  const followersText = $html ? $html.innerText : ''

  return parseFollowersCount(followersText.replaceAll('Followers| ', ''))


}

export function parseFollowersCount(followers) {
  if (typeof followers !== 'string') return null

  let multiplier = 1

  if (followers.endsWith('K')) {
    multiplier = 1000
    followers = followers.slice(0, -1)
  } else if (followers.endsWith('M')) {
    multiplier = 1000000
    followers = followers.slice(0, -1)
  } else if (followers.endsWith('B')) {
    multiplier = 1000000000
    followers = followers.slice(0, -1)
  }

  return parseFloat(followers) * multiplier
}

export function isUrlPathMatching(pattern) {
  // 获取当前浏览器的URL路径
  const urlPath = window.location.pathname

  console.debug(urlPath, 'urlPath')

  // 创建正则表达式对象
  const regex = new RegExp(pattern)

  // 测试URL路径是否匹配正则表达式
  return regex.test(urlPath)
}

export function titleUsername(inputString) {
  const regex = /\(@(\w+)\)/
  const match = inputString.match(regex)
  return match ? match[1] : null
}

export function extractFromAvatarButton(str) {
  // 使用正则表达式匹配 @ 后面的字符直到空格或字符串末尾
  const regex = /@(\w+)/
  const match = str.match(regex)
  return match ? match[1] : null
}

export function extractFromUserProfileUsername(str) {
  // 使用正则表达式匹配 @ 后面的字符直到空格或字符串末尾
  return (str ?? '').replace('/', '')
}

/**
 * Convenience wrapper for the MutationObserver API - the callback is called
 * immediately to support using an observer and its options as a trigger for any
 * change, without looking at MutationRecords.
 * @param {Node} $element
 * @param {MutationCallback} callback
 * @param {string} name
 * @param {MutationObserverInit} options
 * @return {import('./types').NamedMutationObserver}
 */
export function observeElement($element, callback, name, options = { childList: true }, log = false) {
  if (name) {
    if (options.childList && callback.length > 0) {
      console.debug(`observing ${name}`, $element)
    } else {
      console.debug(`observing ${name}`)
    }
  }

  let observer = new MutationObserver(callback)
  callback([], observer)
  observer.observe($element, options)
  observer['name'] = name
  return observer
}


/**
 * @param {string} selector
 * @param {{
 *   name?: string
 *   stopIf?: () => boolean
 *   timeout?: number
 *   context?: Document | HTMLElement
 * }?} options
 * @returns {Promise<HTMLElement | null>}
 */
export function getElement(selector, {
  name = null, stopIf = null, timeout = Infinity, context = document,
} = {}) {
  return new Promise((resolve) => {
    let startTime = Date.now()
    let rafId
    let timeoutId

    function stop($element, reason) {
      if ($element == null) {
        console.warn(`stopped waiting for ${name || selector} after ${reason}`)
      } else if (Date.now() > startTime) {
        console.debug(`${name || selector} appeared after ${Date.now() - startTime}ms`)
      }
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      resolve($element)
    }

    if (timeout !== Infinity) {
      timeoutId = setTimeout(stop, timeout, null, `${timeout}ms timeout`)
    }

    function queryElement() {
      let $element = context.querySelector(selector)
      if ($element) {
        stop($element)
      } else if (stopIf?.() === true) {
        stop(null, 'stopIf condition met')
      } else {
        rafId = requestAnimationFrame(queryElement)
      }
    }

    queryElement()
  })
}


export async function getAndObserveElement(selector, callback) {
  let $element = await getElement(selector,
    { name: `${selector}` })
  observeElement($element, (records) => {

    console.debug(selector, records)

    if (callback) {
      callback($element)
    }
  }, `${selector}`)
}


export function observeUsername(callback) {

  getAndObserveElement('title', $title => {

    let titleUser = titleUsername($title.innerText)

    getElement(TwitterSelectors.APPTABBAR_PROFILE_LINK).then($html => {

      let userName = extractFromUserProfileUsername($html.getAttribute('href'))

      console.debug('TwitterSelectors.APPTABBAR_PROFILE_LINK', userName)
      console.debug('titleUser', titleUser)
      if (titleUser && userName && titleUser === userName) {
        callback(true)
      }
      {
        callback(false)
      }
    })

  })


}


export async function checkUsername() {

  let $title = await getElement('title')
  let titleUser = titleUsername($title.innerText)

  let $html = await getElement(TwitterSelectors.APPTABBAR_PROFILE_LINK)


  let userName = extractFromUserProfileUsername($html.getAttribute('href'))

  console.debug('$title', $title?.innerText)
  console.debug('TwitterSelectors.APPTABBAR_PROFILE_LINK', userName)
  console.debug('titleUser', titleUser)

  return titleUser
    && userName
    && titleUser === userName


}

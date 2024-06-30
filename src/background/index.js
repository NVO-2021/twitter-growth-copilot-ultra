console.debug('background is running')

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'COUNT') {
    console.debug('background has received a message from popup, and count is ', request?.count)
  }
})





function isMatchingUrl(url) {
  const patterns = [
    /^http:\/\/x\.com\/.*/,
    /^https:\/\/x\.com\/.*/,
    /^http:\/\/twitter\.com\/.*/,
    /^https:\/\/twitter\.com\/.*/
  ];

  return patterns.some(pattern => pattern.test(url));
}
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {

    if(!isMatchingUrl(changeInfo.url)){
      return
    }

    console.log('Tab URL changed to: ' + changeInfo.url);

    // 发送消息给内容脚本
    chrome.tabs.sendMessage(tabId, { action: 'urlChanged', url: changeInfo.url }, (response) => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      } else {
        console.debug('Response from content script:', response);
      }
    });
  }
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

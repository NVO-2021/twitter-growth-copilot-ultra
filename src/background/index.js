console.debug('background is running')

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'COUNT') {
    console.debug('background has received a message from popup, and count is ', request?.count)
  }
})





chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
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

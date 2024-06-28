console.debug('background is running')

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'COUNT') {
    console.debug('background has received a message from popup, and count is ', request?.count)
  }
})



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'capture') {
    chrome.tabs.captureVisibleTab(null, {}, (dataUrl) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
        return;
      }
      sendResponse({ success: true, dataUrl: dataUrl });
    });
    return true; // 保持消息通道打开以异步响应
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    console.debug('Tab URL changed to: ' + changeInfo.url);

    // 发送消息给内容脚本
    chrome.tabs.sendMessage(tabId, { action: 'urlChanged', url: changeInfo.url }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        console.debug('Response from content script:', response);
      }
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url) {
      chrome.tabs.sendMessage(tabId);
    }
  });
// Chrome extension background script
chrome.runtime.onInstalled.addListener(() => {
  console.log('DeepGuard extension installed');
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeMedia') {
    // In a real implementation, this would call your API
    // For demo purposes, we'll simulate a response
    setTimeout(() => {
      const fakeResult = {
        isDeepfake: Math.random() > 0.5,
        confidence: Math.random() * 100
      };
      sendResponse(fakeResult);
    }, 2000);
    
    // Return true to indicate we'll respond asynchronously
    return true;
  }
});
document.getElementById("scrapeButton").addEventListener("click", () => {
  // Get the current active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0].id;

    // Inject and execute content script in the active tab to scrape data
    chrome.scripting.executeScript({
      target: { tabId: activeTab },
      files: ["content.js"],
    });
  });
});

// Listen for the scraped data and display it
chrome.runtime.onMessage.addListener((message) => {
  if (message.data) {
    document.getElementById("data").textContent = JSON.stringify(
      message.data,
      null,
      2
    );
  }
});

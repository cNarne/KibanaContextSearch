//Executes content script (6-30)
debugger;
window.onload = function () {
  chrome.tabs.executeScript(null, {
      file: 'content_script.js'
  });
}

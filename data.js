//Executes content script
debugger;
window.onload = function () {
  chrome.tabs.executeScript(null, {
      file: 'content_script.js'
  });
}

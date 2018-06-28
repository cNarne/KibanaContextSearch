'use strict';
var data;
// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
const kMatchRule = {
    // Declare the rule conditions.
    conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'alerts.newrelic.com' },
    })],
    // Shows the page action when the condition is met.
    actions: [new chrome.declarativeContent.ShowPageAction()]
}
chrome.runtime.onInstalled.addListener(function (details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([kMatchRule]);
    });
});

chrome.contextMenus.onClicked.addListener(function(item, tab) {   
    let url = 'https://localhost:'+data.items['env']+'/app/kibana#/discover?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-'+ item.menuItemId + ',mode:quick,to:now))&_a=(columns:!(_source),index:\'logstash-*\',interval:auto,query:(query_string:(analyze_wildcard:!t,query:%22' + item.selectionText + '%22)),sort:!(\'@timestamp\',desc))';
    chrome.tabs.create({ url: url }, function (tab) {
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, details) {
    if (changeInfo.status == 'complete' && details.active && details.url.includes("alerts.newrelic.com")) {
        //Tried everything to perform below operation on dom load but only top frame loads and readyState doesn't work. 
        //Hard sleep for 2s before showing insights button.
        sleep(2);
            chrome.tabs.executeScript(tabId, {
                file: 'new_relic.js'
            });
        
    }
});

// Gets two types of messages. One for context data to set port and another for insights hyperlink button
chrome.runtime.onMessage.addListener(function (msg, _, sendResponse) {
    if(msg.type === "url")
    {
        chrome.tabs.create({ url: msg.url }, function (tab) {
        });
    }
    // Else set data for chrome to use port
    else
    data = msg;
});

function sleep(seconds){
    var waitUntil = new Date().getTime() + seconds*1000;
    while(new Date().getTime() < waitUntil) true;
}



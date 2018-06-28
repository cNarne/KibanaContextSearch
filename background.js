// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
        sleep(2);
            chrome.tabs.executeScript(tabId, {
                file: 'new_relic.js'
            });
        
    }
});

chrome.runtime.onMessage.addListener(function (msg, _, sendResponse) {
    if(msg.type === "url")
    {
        chrome.tabs.create({ url: msg.url }, function (tab) {
        });
    }
    else
    data = msg;
});

function sleep(seconds){
    var waitUntil = new Date().getTime() + seconds*1000;
    while(new Date().getTime() < waitUntil) true;
}

// function initializeContextMenu() {
//     let added = [];
//     for (let key of Object.keys(kSearchTimes)) {
//         added.push(kSearchTimes[key]);
//         chrome.contextMenus.create({
//             id: key,
//             title: kSearchTimes[key],
//             type: 'normal',
//             contexts: ['selection'],
//         });
//     }
//     var port = Object.keys(kEnvironments)[0];
//     var params = {
//         port:port,
//         interval:added
//     };
//     chrome.storage.sync.set({removedContextMenu: params});
// }
//
// chrome.runtime.onInstalled.addListener(function (details) {
//     initializeContextMenu();
// });
//
//
// chrome.storage.onChanged.addListener(function(list, sync) {
//     let newlyDisabled = [];
//     let newlyEnabled = [];
//     let currentSelection = list.removedContextMenu.newValue.interval;
//     chrome.contextMenus.removeAll() ;
//     for (let key of Object.keys(kSearchTimes)) {
//         if (currentSelection.includes(key)) {
//             newlyEnabled.push({
//                 id: key,
//                 title: kSearchTimes[key]
//             });
//         }
//     }
//
//     for (let searchtime of newlyEnabled) {
//         chrome.contextMenus.create({
//             id: searchtime.id,
//             title: searchtime.title,
//             type: 'normal',
//             contexts: ['selection'],
//         });
//     }
// })



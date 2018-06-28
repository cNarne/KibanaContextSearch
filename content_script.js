// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function init() {
    if (document.readyState === "interactive") {
  var d = document;
  const styles = d.createElement('style');
  styles.innerHTML = '#newRelicDuhh{display:flex;flex-direction:column;left:5px;font-size:10px;box-shadow:0 2px 1px rgba(0,0,0,0.2)}#newRelicDuhh div{margin:0 auto}#stravaKudos p{margin:0;font-size:14px}#stravaKudos.hidden,#stravaKudos.lockout p{display:none !important;visibility:hidden !important}#stravaKudosCount{margin:0 3px;font-weight:bold}';
  d.head.prepend(styles);
  let elements2 = Array.from(d.querySelectorAll("code"));
  //let elements2 = Array.from(document.querySelectorAll("div.title > div.number-block > p.value.ng-binding"));
  btn = d.createElement('button');
  console.log("Button New Relic");
  btn.id = 'newRelicDuhh';
  btn.innerHTML = '<div>Insights</div>';
  btn.addEventListener('click', giveKudos);
  elements2[0].appendChild(btn);
  console.log(btn);
  console.log(elements2[0]);
    }
}
// Init on page load
window.onload = function () {
init();
}

function giveKudos() {
var queryInitial = grabNrql();
var toFromDates = grabDates();
var queryFinalWithDates = generateQuery(queryInitial, toFromDates);
var url = extractInitialUrl() + encodeURI(queryFinalWithDates);
chrome.runtime.sendMessage({ type:"url", url: url}, function (response) {
});
}

function grabNrql() {
    let elements2 = Array.from(document.querySelectorAll("code"));
    for (let elementQuery of elements2) {
        return elementQuery.innerText;
    }
}

function grabDates() {
    var datesOrdered = [];
    let regExp = new RegExp(":");
    let elements = Array.from(document.querySelectorAll("div.number-block > p.value.ng-binding"));
    for (let element of elements) {
        if (regExp.test(element.title)) {
            var str = element.title;
            var res = str.match(/\w{3}\s\d{2}/);
            var newRes = str.substr(str.search(res), str.length);
            datesOrdered.push(parseDateToRelicFormat(newRes));
        }
    }
    return datesOrdered;
}


function extractInitialUrl() {
    var url = document.URL;
    return url.substr(0, url.indexOf("incidents")).replace("alert", "insight") + "query?query=";
}

function parseDateToRelicFormat(dateStr) {

    var d = new Date(dateStr);
    if (d.getMonth() < 10)
        var mm = "0" + (d.getMonth() + 1);
    var hhNew = d.getHours();
    if (parseInt(hhNew) < 10)
        hhNew = "0" + (hhNew);
    var minNew = d.getMinutes();
    if (minNew < 10)
        minNew = "0" + (minNew);
    var secNew = d.getSeconds();
    if (parseInt(secNew) < 10)
        secNew = "0" + (secNew);

    return d.getFullYear() + "-" + mm + "-" + d.getDate() + " " + hhNew + ":" + minNew + ":" + secNew + " " + dateStr.substr(dateStr.length - 3);
}

function generateQuery(query, datesOrdered) {

    var res = query.match(/[0-9]+\sminutes ago/);
    var res2 = query.replace(res, "'" + datesOrdered[0] + "'");
    res = res2.match(/[0-9]+\sminutes ago/);
    var res3 = res2.replace(res, "'" + datesOrdered[1] + "'");
    console.log("Replaced with dates Ordered " + query);
    return res3.replace("count(*)", "*");

}
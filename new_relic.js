function init() {
  var d = document;
  const styles = d.createElement('style');
  // Button position is set by pixels
  //TODO figure out a better place for the button referenced by element.
  styles.innerHTML = '#newRelicDuhh{display:flex;flex-direction:column;left:5px;font-size:10px;box-shadow:0 2px 1px rgba(0,0,0,0.2);z-index:1;position:fixed;top:100px;left:300px;right:400px}#newRelicDuhh div{margin:0 auto}#newRelicDuhh p{margin:0;font-size:14px}#newRelicDuhh.hidden,#newRe.lockout p{display:none !important;visibility:hidden !important}';
  d.head.prepend(styles);
  //let elements2 = Array.from(document.querySelectorAll("code.value.ng-binding"));
  console.log(d.querySelectorAll('div.IncidentTimeline'));
  let elements2 = d.querySelectorAll('div.IncidentTimeline');
  btn = d.createElement('button');
  console.log("Button New Relic");
  btn.id = 'newRelicDuhh';
  btn.innerHTML = '<div>Insights</div>';
  // Don't process dom and generate url until user clicks.
  btn.addEventListener('click', getInsight);
  var element =  d.getElementById('newRelicDuhh');
  //Not sure if below works
  if (typeof(element) == 'undefined' || element == null)
    elements2[0].parentNode.insertBefore(btn, elements2[0].nextSibling);
  console.log(btn);
  console.log(elements2[0]);
    
}

init();
    

function getInsight() {
var queryInitial = grabNrql();
var toFromDates = grabDates();
var queryFinalWithDates = generateQuery(queryInitial, toFromDates);
var url = extractInitialUrl() + encodeURI(queryFinalWithDates);
//Send message to background with the new url.
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
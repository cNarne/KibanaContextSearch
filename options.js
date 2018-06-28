// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
debugger;
function createForm() {
  //need a get for env options
  chrome.storage.sync.get('removedContextMenu', function(list) {
      var noContextYet = false;
    if(list === undefined)
      var noContextYet = true;
    var added = [] ;
    var port = "";
    if(list.removedContextMenu){
      if(list.removedContextMenu.port)
        port = list.removedContextMenu.port;

      if (list.removedContextMenu.interval)
        added = list.removedContextMenu.interval || [];
    }
    let form = document.getElementById('form');

    let envHeader = document.createElement('h3');
    let envHeaderText = document.createTextNode("Environment");
    envHeader.appendChild(envHeaderText);
    form.appendChild(envHeader);

    let div = document.createElement('div');
    let dropdown = document.createElement('select');
    dropdown.setAttribute("id", "env");

    for (let key of Object.keys(kEnvironments)){
        if(port === key)
          dropdown.appendChild(new Option(kEnvironments[key],key, false, true));
        else
          dropdown.appendChild(new Option(kEnvironments[key],key, false, false));
    }
    div.appendChild(dropdown);
    form.appendChild(div);


    let timeHeader = document.createElement('h3');
    let timeHeaderText = document.createTextNode("Time Options");
    timeHeader.appendChild(timeHeaderText);
    form.appendChild(timeHeader);

    for (let key of Object.keys(kSearchTimes)) {
      let div = document.createElement('div');
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'timeOption';
      if (added.includes(kSearchTimes[key])) {
          checkbox.checked = true;
      }
      checkbox.name = key;
      checkbox.value = kSearchTimes[key];
      let span = document.createElement('span');
      span.textContent = kSearchTimes[key];
      div.appendChild(checkbox);
      div.appendChild(span);
      form.appendChild(div);
    }
  });
}

function initializeContextMenu() {
    let added = [];
    for (let key of Object.keys(kSearchTimes)) {
        added.push(kSearchTimes[key]);
        chrome.contextMenus.create({
            id: key,
            title: kSearchTimes[key],
            type: 'normal',
            contexts: ['selection'],
        });
    }
    var port = Object.keys(kEnvironments)[0];
    var params = {
        port:port,
        interval:added
    };
    chrome.storage.sync.set({removedContextMenu: params});
}

//initializeContextMenu();
createForm();


document.getElementById('optionsSubmit').onclick = function() {
  //let checkboxes = document.getElementsByTagName('input');
  let checkboxes = document.getElementsByClassName('timeOption');
    var e = document.getElementById("env");
    var strUser = e.options[e.selectedIndex].value;

  let added = [];
  for (i=0; i<checkboxes.length; i++) {
    if (checkboxes[i].checked == true) {
        added.push(checkboxes[i].name);
    }
  }
    var e = document.getElementById("env");
    var port = e.options[e.selectedIndex].value;

  chrome.storage.sync.set({removedContextMenu: params = {
          port:port,
          interval:added
      }});
  window.close();
}

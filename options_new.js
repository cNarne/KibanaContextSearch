debugger;
function initialize() {
    chrome.storage.sync.get(null, function (formValues) {

        if (formValues['env'] && formValues['env'] != null) {
            var element = document.getElementById('env');
            element.value = formValues['env'];            
        }
            var envValue = document.getElementById('env').value;
            formValues['env'] = envValue;
        

            if (formValues['fifteenMins'] && formValues['fifteenMins'] === 'true') {
                document.getElementById('fifteenMins').checked = true;
                createContext(document.getElementById('fifteenMins').name, document.getElementById('fifteenMins').value);
            }
            else
                removeContext(document.getElementById('fifteenMins').name)
    
            if (formValues['thirtyMins'] && formValues['thirtyMins'] === 'true') {
                document.getElementById('thirtyMins').checked = true;
                createContext(document.getElementById('thirtyMins').name, document.getElementById('thirtyMins').value);
            }
            else
                removeContext(document.getElementById('thirtyMins').name)
            
            if (formValues['oneHours'] && formValues['oneHours'] === 'true') {
                document.getElementById('oneHours').checked = true;
                createContext(document.getElementById('oneHours').name, document.getElementById('oneHours').value);
            }
            else
                removeContext(document.getElementById('oneHours').name)
    
            if (formValues['fourHours'] && formValues['fourHours'] === 'true') {
                document.getElementById('fourHours').checked = true;
                createContext(document.getElementById('fourHours').name, document.getElementById('fourHours').value);
            }
            else
                removeContext(document.getElementById('fourHours').name)
    
            if (formValues['twelveHours'] && formValues['twelveHours'] === 'true') {
                document.getElementById('twelveHours').checked = true;
                createContext(document.getElementById('twelveHours').name, document.getElementById('twelveHours').value);
            }
            else
                removeContext(document.getElementById('twelveHours').name)
    
            if (formValues['twentyFourHours'] && formValues['twentyFourHours'] === 'true') {
                document.getElementById('twentyFourHours').checked = true;
                createContext(document.getElementById('twentyFourHours').name, document.getElementById('twentyFourHours').value);
            }
            else
                removeContext(document.getElementById('twentyFourHours').name)
            
            if (formValues['sevenDays'] && formValues['sevenDays'] === 'true') {
                document.getElementById('sevenDays').checked = true;
                createContext(document.getElementById('sevenDays').name, document.getElementById('sevenDays').value);
            }
            else
                removeContext(document.getElementById('sevenDays').name)
            
            if (formValues['thirtyDays'] && formValues['thirtyDays'] === 'true') {
                document.getElementById('thirtyDays').checked = true;
                createContext(document.getElementById('thirtyDays').name, document.getElementById('thirtyDays').value);
            }
            else
                removeContext(document.getElementById('thirtyDays').name)

         chrome.runtime.sendMessage({type:"data", items: formValues}, function (response) {
        });
    });

    
}




function createContext(id, title) {

    chrome.contextMenus.remove(id);
    chrome.contextMenus.create({
        id: id,
        title: title,
        type: 'normal',
        contexts: ['selection'],
    });
}

function removeContext(id) {
    chrome.contextMenus.remove(id);
}

initialize();

document.getElementById('env').onchange = function () {
    this.disabled = true;

    chrome.storage.sync.set({
        env: this.value
    }, function () {
        document.getElementById('env').disabled = false;
        initialize();
    });
};

document.getElementById('fifteenMins').onchange = function () {

    chrome.storage.sync.set({
        fifteenMins: this.checked === true ? 'true' : 'false'
    }, function () {
        initialize();
    });
};

document.getElementById('thirtyMins').onchange = function () {

    chrome.storage.sync.set({
        thirtyMins: this.checked === true ? 'true' : 'false'
    }, function () {
        initialize();
    });
};

document.getElementById('oneHours').onchange = function () {

    chrome.storage.sync.set({
        oneHours: this.checked === true ? 'true' : 'false'
    }, function () {
        initialize();
    });
};

document.getElementById('fourHours').onchange = function () {

    chrome.storage.sync.set({
        fourHours: this.checked === true ? 'true' : 'false'
    }, function () {
        initialize();
    });
};

document.getElementById('twelveHours').onchange = function () {

    chrome.storage.sync.set({
        twelveHours: this.checked === true ? 'true' : 'false'
    }, function () {
        initialize();
    });
};

document.getElementById('twentyFourHours').onchange = function () {

    chrome.storage.sync.set({
        twentyFourHours: this.checked === true ? 'true' : 'false'
    }, function () {
        initialize();
    });
};

document.getElementById('sevenDays').onchange = function () {

    chrome.storage.sync.set({
        sevenDays: this.checked === true ? 'true' : 'false'
    }, function () {
        initialize();
    });
};

document.getElementById('thirtyDays').onchange = function () {

    chrome.storage.sync.set({
        thirtyDays: this.checked === true ? 'true' : 'false'
    }, function () {
        initialize();
    });
};
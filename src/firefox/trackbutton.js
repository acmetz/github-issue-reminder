const untrackedText = "Track Issues";
const trackedText = "Stop Tracking";

function createButton() {
    var btn = containsButton();
    if (!btn) {      
        console.log(window.location);
        let storedVal = browser.storage.local.get(window.location.href)
        .then((value) => {    
            console.log(value);       
            var loc = document.querySelector("div.subnav>div.subnav-links");
            btn = loc.querySelector("a.subnav-item").cloneNode();           
            btn.setAttribute("href", "");           
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                toggleTracking(this);             
            });
            btn.removeAttribute("data-selected-links");
            var valExists = value.searches !== undefined;
            btn.innerText = !valExists ? untrackedText : trackedText;
            if(valExists){
                btn.classList.toggle("selected");
            }
            loc.appendChild(btn);        
        }, storageError);       
    }
    return btn;
}

function storageError(message) {
    console.log("storage error: " + message);
}

function addSearch(uri, query) {
    var obj = {name: uri};
    var searches = decodeURIComponent(query).replace("?q=", "");
    var search = searches.split("+")
    var vals = [];
    for (var i = 0; i < search.length; i++) {
        //var cur = search[i].split(":");
        // vals.push({
        //     key: cur[0],
        //     value: cur[1]
        // });
        vals.push(search[i]);
    }
    obj.searches = vals;
    console.log(obj);
    let settingValue = browser.storage.local.set()
        .then((val) => { console.log(val)}, storageError);
}

function toggleTracking(link) {
    var notTracking = link.innerText === untrackedText;
    var uri = link.baseURI;
    console.log(uri);
    if (notTracking) {        
        console.log("adding search value");
        addSearch(uri, window.location.search);
    }else{
        console.log("removing search value");
        browser.storage.local.set({name: uri});
    }
    link.classList.toggle("selected");
    link.innerText = notTracking ? trackedText : untrackedText;
}

function containsButton() {
    var loc = document.querySelector("div.subnav > div.subnav-links").children;
    for (var i = 0; i < loc.length; i++) {
        element = loc[i];
        if (element.innerText === untrackedText ||
            element.innerText === trackedText) {
            return element;
        }
    }
    return null;
}

createButton();
const untrackedText = "Track Issues";
const trackedText = "Stop Tracking";

function getStoredValue(uri){
    
}

function createButton() {
    var btn = containsButton();
    if (!btn) {      
        let storedVal = browser.storage.local.get(window.location.href)
        .then((value) => {    
            try {   
                
                var loc = document.querySelector("div.subnav>div.subnav-links");
                btn = loc.querySelector("a.subnav-item").cloneNode();           
                btn.setAttribute("href", "");           
                btn.addEventListener("click", function (e) {
                    e.preventDefault();
                    toggleTracking(this);             
                });
                btn.removeAttribute("data-selected-links");
                console.log(Object.keys(value).length === 0);
                var valExists = value !== undefined && value !== {}
                    && Object.keys(value).length !== 0;
                btn.innerText = !valExists ? untrackedText : trackedText;
                if(valExists){
                    btn.classList.toggle("selected");
                }
                loc.appendChild(btn);  
            } catch (error) {
                console.log("problem with loading button");
                console.log(error);
            }       
        }, storageError);       
    }
    return btn;
}

function storageError(message) {
    console.log("storage error: " + message);
}

function addSearch(uri, query) {
    var obj = {};
    var data = {};
    var searches = decodeURIComponent(query).replace("?q=", "");
    var search = searches.split("+")
    var vals = [];
    for (var i = 0; i < search.length; i++) {
        var cur = search[i].split(":");
        var tmp = {};
        tmp[cur[0]] = cur[1];
        vals.push(tmp);
    }
    data["searches"] = vals;
    obj[uri] = data;
    browser.storage.local.set(obj);
}

function toggleTracking(link) {
    var notTracking = link.innerText === untrackedText;
    var uri = link.baseURI;
    console.log(uri);
    if (notTracking) {        
        addSearch(uri, window.location.search);
    }else{
        var obj = {};
        obj[uri] = undefined;
        browser.storage.local.set(obj);
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
window.addEventListener("load",createButton);
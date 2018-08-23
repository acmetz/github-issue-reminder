const untrackedText = "Track Issues";
const trackedText = "Stop Tracking";

function createButton()
{
    var btn = containsButton();
    if(!btn){
        var loc = document.querySelector("div.subnav>div.subnav-links");
        btn = loc.querySelector("a.subnav-item").cloneNode();
        btn.setAttribute("href","");
        btn.innerText = untrackedText;
        btn.addEventListener("click", function(e){       
            setTracked(this);
            e.preventDefault();
        });
        btn.removeAttribute("data-selected-links");
        btn.setAttribute("id","issuetracker");
        if(loc.querySelector("a[name=issuetracker]") == null)
        {
            loc.appendChild(btn);
        }
    }
    return btn;
}

function setTracked(link){
    var notTracking = link.innerText === untrackedText;
    var uri = link.baseURI;
    var obj = { name: uri, willTrack: notTracking};
    var searches = decodeURIComponent(window.location.search).replace("?q=","");
    var search = searches.split("+")
    var vals = [];
    for(var i=0;i < search.length;i++){
        var cur = search[i].split(":");
        vals.push({key: cur[0], value: cur[1]});
    }
    obj.vals = vals;
    console.log(obj);
    link.classList.toggle("selected");
    link.innerText = notTracking ? trackedText : untrackedText;          
}

function containsButton(){
    var loc = document.querySelector("div.subnav > div.subnav-links").children;
    for(var i=0;i<loc.length;i++){
        element = loc[i];
        if(element.innerText === untrackedText 
            || element.innerText === trackedText){
                return element;
            }
    }
    return null;
}

createButton();

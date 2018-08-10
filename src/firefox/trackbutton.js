function loadUp(){
    var loc = document.querySelector("div.subnav>div.subnav-links");
    console.log("loading here");
    var link = loc.querySelector("a.subnav-item").cloneNode();
    link.innerText = "Track Issues";
    link.setAttribute("href","");
    link.addEventListener("click",function(){console.log("clicked here")});
    link.removeAttribute("data-selected-links");
    link.setAttribute("id","issuetracker");
    console.log(loc.querySelector("a#issuetracker"));
    if(loc.querySelector("a[name=issuetracker]") == null)
    {
        loc.appendChild(link);
    }
}
loadUp();

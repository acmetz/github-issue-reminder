console.log("running in the background");

function handleMessage(request, sender, sendResponse) {
    console.log("Message from the content script: ");
    console.log(request);
    sendResponse({response: "Response from background script"});
}
  
//browser.runtime.onMessage.addListener(handleMessage);
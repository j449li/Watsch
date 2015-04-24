chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.showPageAction) {
        chrome.tabs.query(
            {currentWindow: true, active : true},
            function(tabArray) {
            	chrome.pageAction.show(tabArray[0].id);
            }
        );
    } else if (request.hidePageAction) {
        chrome.tabs.query(
            {currentWindow: true, active : true},
            function(tabArray) {
                chrome.pageAction.hide(tabArray[0].id);
            }
        );
    } 
});

// Apparently 'NO-BREAK SPACE'(U+00A0) can mess up API's regex checks
function removeU00A0(str) {
    return str.replace(/\u00A0/g, String.fromCharCode(32));
}


API_URL = "http://schedule.wattools.com/";

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
    } else if (request.exportSchedule) {
        //console.log(request.mData);
        var text = removeU00A0(request.mData);
        //console.log(text);
        $.post(API_URL, {data: text})
            .done(function(data) {
                console.log(data);
            });
    }
});
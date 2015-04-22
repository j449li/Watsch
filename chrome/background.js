chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	sendResponse({msg: "received"});
    if (request.showPageAction ) {
    	chrome.tabs.query(
	        {currentWindow: true, active : true},
	        function(tabArray) {
	    		chrome.pageAction.show(tabArray[0].id);
	    	}
	    ); 
    } 
});
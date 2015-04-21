
chrome.runtime.onInstalled.addListener(function() {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		sendResponse({msg: "received"});
	    if (request.command == "show-page-action") {
	    	chrome.tabs.query(
		        {currentWindow: true, active : true},
		        function(tabArray) {
		    		chrome.pageAction.show(tabArray[0].id);
		    	}
		    ); 
	    } 
	});
});
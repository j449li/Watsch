function isOnScheduleList() {
	console.log("polling");
	var titleEle = document.getElementById("DERIVED_REGFRM1_SS_TRANSACT_TITLE");
	var btnEle = document.getElementById("DERIVED_SSS_SCT_SSR_PB_GO");
	if (btnEle == null && titleEle != null 
		    && titleEle.textContent == "My Class Schedule") {
		return true;
    }
}

function isOnSelectTerm() {
	var titleEle = document.getElementById("DERIVED_REGFRM1_SS_TRANSACT_TITLE");
	var btnEle = document.getElementById("DERIVED_SSS_SCT_SSR_PB_GO");
	if (btnEle != null && titleEle != null 
		    && titleEle.textContent == "My Class Schedule") {
	    return true;
    }
}

function showPageAction() {
	if (isOnScheduleList()) {
	    killPolling();

	    console.log("command sent");
	    chrome.pageAction.show(1);
	    // chrome.runtime.sendMessage({command: "show-page-action"}, function(response) {
	    // 	console.log(response.msg);
	    // });
	}
}

function killPolling() {
    if (pollCheck != null) {
    	window.clearTimeout(pollCheck);
    }
}

var pollCheck;
if (isOnSelectTerm()) {
	pollCheck = setInterval(showPageAction, 200);
}

showPageAction();



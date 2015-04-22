
function killPolling() {
    if (polling != null) {
    	window.clearTimeout(polling);
    }
}

function setPageActionVisibility(visible) {
	if (isPageActionVisible && !visible) {
		console.log("pageAction is hidden");
		chrome.runtime.sendMessage({hidePageAction: true});
	} else if (!isPageActionVisible && visible) {
		console.log("pageAction is visible");
		chrome.runtime.sendMessage({showPageAction: true});
	}

	isPageActionVisible = visible;
}

function getActionState() {
	var titleEle = document.getElementById("DERIVED_REGFRM1_SS_TRANSACT_TITLE");
	var listRadioBtn = document.getElementById("DERIVED_REGFRM1_SSR_SCHED_FORMAT$258$");

	if (titleEle != null && listRadioBtn != null
		    && titleEle.textContent == "My Class Schedule"
		    && listRadioBtn.checked) {
		return ActionStates.SHOW;
    } else if (titleEle != null 
		    && titleEle.textContent == "My Class Schedule") {
	    return ActionStates.HIDE;
    } else {
    	return ActionStates.GONE;
    }

}

function pollState() {
	switch(getActionState()) {
		case ActionStates.SHOW:
		    console.log("SHOW");
			setPageActionVisibility(true);
		    break;
		case ActionStates.HIDE:
		    console.log("HIDE");
		    setPageActionVisibility(false);
		    break;
		case ActionStates.GONE:
		    console.log("GONE");
		    killPolling();
		    break;
	}
}

ActionStates = {
	SHOW : 1,
	HIDE : 2,
	GONE : 3
}

var polling;
var isPageActionVisible = false;

// Always hide it onload
chrome.runtime.sendMessage({hidePageAction: true});
if (getActionState() != ActionStates.GONE) {
	polling = setInterval(pollState, 500);
}

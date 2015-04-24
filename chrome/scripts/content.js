
function killPolling() {
    if (polling != null) {
    	window.clearTimeout(polling);
    }
}

function setPageActionVisibility(visible) {
    if (isPageActionVisible && !visible) {
    	//console.log("pageAction is hidden");
    	chrome.runtime.sendMessage({hidePageAction: true});
    } else if (!isPageActionVisible && visible) {
    	//console.log("pageAction is visible");
    	chrome.runtime.sendMessage({showPageAction: true});
    }
    isPageActionVisible = visible;
}

function getActionState() {
    var titleEle = document.getElementById("DERIVED_REGFRM1_SS_TRANSACT_TITLE");
    var listRadioBtn = document.getElementById("DERIVED_REGFRM1_SSR_SCHED_FORMAT$258$");
    var calOnlyButton = document.getElementById("DERIVED_CLASS_S_SSR_PREV_WEEK");

    if (titleEle != null && listRadioBtn != null 
            && calOnlyButton == null
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
            setPageActionVisibility(true);
            break;
        case ActionStates.HIDE:
            setPageActionVisibility(false);
            break;
        case ActionStates.GONE:
            killPolling();
            break;
    }
}

function getScheduleText() {
    var texts = "";
    if (getActionState() == ActionStates.SHOW) {
        var courseTableElement = document.getElementById("ACE_STDNT_ENRL_SSV2$0");

        if (courseTableElement != null) {
            texts = courseTableElement.textContent.replace(/\r?\n{2,}|\r/g, "\n");
        }
        //console.log(texts);
    }

    return texts;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.getScheduleText) {
        sendResponse({scheduleText: getScheduleText()});
    }
});

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
    polling = setInterval(pollState, 200);
}

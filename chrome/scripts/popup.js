// Apparently 'NO-BREAK SPACE'(U+00A0) can mess up API's regex checks
function removeU00A0(str) {
    return str.replace(/\u00A0/g, String.fromCharCode(32));
}

function downloadFile(data) {
    var icsFile = new Blob([data], {type: 'text/plain'});
    var fileUrl = window.URL.createObjectURL(icsFile);

    var invLink = document.getElementById("invLink");
    invLink.href = fileUrl;
    invLink.click();
    window.close();
}

function responseCallback(response) {
    if (response.scheduleText) {
        var text = removeU00A0(response.scheduleText);
        //console.log(text);
        $.post(API_URL, {data: text})
            .done(function(data) {
                console.log(data);
                downloadFile(data);
            });
    }
}

function exportSchedule() {
    chrome.tabs.query(
        {currentWindow: true, active : true},
        function(tabArray) {
        chrome.tabs.sendMessage(
                    tabArray[0].id,
            	    {getScheduleText: true},
            	    responseCallback);
        }
    );
}


API_URL = "http://schedule.wattools.com/";

var exportBtn = document.getElementById("exportBtn");
exportBtn.addEventListener("click", function() {
    exportSchedule();
});
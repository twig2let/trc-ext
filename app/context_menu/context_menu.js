var CONTEXT_TYPE = 'link';
var OPTION_TITLE = 'Save Me!';

var contexts = [CONTEXT_TYPE]

chrome.contextMenus.create({
    title: OPTION_TITLE,
    contexts: contexts,
    onclick: genericOnClick
});

// A generic onclick callback function.
function genericOnClick(info, tab) {
    chrome.windows.create({
        'url': 'window.html',
        'type': 'detached_panel'
    }, function(window) {
    });
    console.log("info: " + info.linkUrl);
}
(function() {

    var MESSAGE_ID = 'TRC_FB_BOOKMARK_NODES';
    var CONTEXT_TYPE = 'link';
    var OPTION_TITLE = 'Save Me!';
    var contexts = [CONTEXT_TYPE];

    chrome.contextMenus.create({
        title: OPTION_TITLE,
        contexts: contexts,
        onclick: optionOnClick
    });

    // Context menu click handler
    function optionOnClick(info, tab) {
        // Search for the TRC_FB bookmark folder
        chrome.bookmarks.search({ title: 'TRC_FB'}, function(nodes) {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                // Pass the result to the bookmark manager dialogue (content_js)
                chrome.tabs.sendMessage(tabs[0].id, {
                    id: MESSAGE_ID,
                    permaLink: info.linkUrl,
                    nodes: nodes
                }, function() {
                });
            });
        });
    }
}());
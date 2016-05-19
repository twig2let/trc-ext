(function() {

    var MESSAGE_ID = 'TRC_FB_BOOKMARK_NODES';
    var CONTEXT_TYPE = 'link';
    var OPTION_TITLE = 'Save Me!';
    var contexts = [CONTEXT_TYPE];

    var linkUrl = null;


    // Create the context menu option
    chrome.contextMenus.create({
        title: OPTION_TITLE,
        contexts: contexts,
        onclick: optionOnClick
    });

    // Option click handler
    function optionOnClick(info, tab) {
        // Take a reference to the clicked url to avoid passing it as a parameter
        linkUrl = info.linkUrl;
        // Search for the TRC_FB bookmark folder
        chrome.bookmarks.search({ title: 'TRC_FB' }, searchCallback);
    }

    function searchCallback(nodes) {
        // There must be one folder called TRC_FB
        if (_.isEmpty(nodes) || nodes.length > 1) {
            sendMessage([]);
        } else {
            chrome.bookmarks.getSubTree(nodes[0].id, function(subTree) {
                sendMessage(removeNonFolders(subTree[0]));
            });

        }
    }

    function removeNonFolders(subTree) {
        // Recursively loop through tree and remove non-folders
        return _.each(subTree.children, function(node, idx, subTree) {
            if (node.url) {
                subTree.splice(idx, 1);
                return;
            }
            removeNonFolders(node);
        })

    }

    function sendMessage(nodes) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                id: MESSAGE_ID,
                permaLink: linkUrl,
                nodes: nodes
            }, function() {
                linkUrl = null;
            });
        });
    }


}());
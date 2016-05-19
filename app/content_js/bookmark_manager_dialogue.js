(function() {

    var MESSAGE_ID = 'TRC_FB_BOOKMARK_NODES';

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.id === MESSAGE_ID) {
                evaluateNodes(request);
            }
        });

    function evaluateNodes(request) {
        if (_.isEmpty(request.nodes)) {
            console.info('You must create a TRC_FB bookmark folder');
        } else {
            setupBookmarkManager(request);
        }
    }

    function setupBookmarkManager(request) {
        createDialogue().then(function($dialogue) {
            createDirectoryTree(request.nodes, $dialogue);
        });
    }

    function createDialogue() {
        return $.get(chrome.extension.getURL('/bookmark_manager_dialogue.html'), function(data) {
            return ($.parseHTML(data)[0]);
        });
    }

    function createDirectoryTree(nodes, $dialogue) {
        var el = ($.parseHTML($dialogue)[0]);
        _.each(nodes, function(node) {
            el.appendChild(document.createTextNode(node.title));
        });

        $('body').appendChild(el);
    }
}());
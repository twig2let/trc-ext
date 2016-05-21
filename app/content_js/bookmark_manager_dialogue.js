(function() {

    var MESSAGE_ID = 'TRC_FB_BOOKMARK_NODES';
    var messageRequest = null;
    var $el = null;

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.id === MESSAGE_ID) {
                evaluateNodes(request);
            }
        });

    function evaluateNodes(request) {
        if (_.isEmpty(request.nodes.children)) {
            console.info('You must create a TRC_FB bookmark folder');
        } else {
            messageRequest = request;
            getDialogueTemplate();
        }
    }

    function getDialogueTemplate() {
        return $.get(chrome.extension.getURL('/bookmark_manager_dialogue.html'), function(data) {
            $el = $($.parseHTML(data));
            createDirectoryTree(messageRequest.nodes);
            $('body').append($el);
        });
    }

    function createDirectoryTree(subTree, $rootNode) {
        _.each(subTree.children, function(node) {
            var $folder = createFolder(node);
            if (!$rootNode) {
                $el.find('.tree').append($folder.get(0));
            } else {
                $rootNode.find("ol").append($folder.get(0));
            }
            createDirectoryTree(node, $folder);
        });
    }

    function createFolder(options) {
        var id = 'folderId_' + options.id;
        var labelEl = '<label for="' + id +'">' + options.title + '</label>';
        var inputEl = '<input type="checkbox" id="' + id + '" data-folderId="' + options.id + '"/>';

        return $(['<li>',
            labelEl,
            inputEl,
            '<ol></ol>',
            '</li>'
        ].join(''));
    }
}());
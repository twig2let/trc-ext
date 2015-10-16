
var messageId = 'node_effecter';

chrome.runtime.onMessage.addListener(function (request) {
    if (_.isEqual(request.messageId, messageId)) {
        handleMessage(request.value);
    }
});


function handleMessage(mutations) {
    _.each(mutations, function (mutation) {
        _.each(mutation.addedNodes, function (node) {
            node.innerHTML = node.innerHTML + 'hello, Jonathan Morgan';
        });
    });
    console.info('Matching Patterns');
}
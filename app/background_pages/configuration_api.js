var messageType = 'GET_CONFIGURATION';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Sender: ', sender);

    if (_.isEqual(request.messageType, messageType)) {
        getConfiguration(request.taskId, sendResponse);
    }

    return true;
});


function getConfiguration(taskId, sendResponse) {
    chrome.storage.sync.get('config', function (config) {
        sendResponse(config.config[taskId])
    });
}


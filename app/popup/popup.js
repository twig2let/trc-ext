(function () {

    var toggleAbbreviationsBtn = document.getElementById('toggleAbbreviationsBtn');

    toggleAbbreviationsBtn.addEventListener('click', function () {
        var messageId = 'trc_abbreviations';
        var configKey = 'abbrHighlighting';

        chrome.storage.sync.get('config', function (config) {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {messageId: messageId, value: !config[configKey]}, function () {});
            });
        });
    });
}());




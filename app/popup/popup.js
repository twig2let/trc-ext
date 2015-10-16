(function () {

    var $toggleAbbreviationsBtn = $('#toggleAbbreviationsBtn');

    $toggleAbbreviationsBtn.on('click', function () {
        var messageId = 'TRC_ABBREVIATIONS';
        var configKey = 'ABBREVIATION_HIGHLIGHTING';

        chrome.storage.sync.get('config', function (storage) {
            var config = storage.config;
            config[configKey] = !config[configKey];
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {messageId: messageId, value: config[configKey]}, function () {});
            });
            updateConfigSettings(config);
            toggleBtnState(config[configKey]);
        });
    });

    function toggleBtnState(state) {
        $toggleAbbreviationsBtn.toggleClass('enabled', state);
    }

    function updateConfigSettings(config) {
        chrome.storage.sync.set({'config': config}, function () {});
    }

}());




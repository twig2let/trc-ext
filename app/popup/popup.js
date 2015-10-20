(function () {

    var TASK_ID = 'ABBREVIATION_HIGHLIGHTING';
    var $toggleAbbreviationsBtn = $('.toggle-abbreviations-btn');

    setAbbreviationsBtnState();

    function setAbbreviationsBtnState() {
        var $input = $('.toggle-abbreviations-input');
        chrome.runtime.sendMessage({messageType: 'GET_CONFIGURATION', taskId: TASK_ID}, function (state) {
            $input.prop('checked', state);
        });
    }

    $toggleAbbreviationsBtn.on('click', function () {
        var configKey = 'ABBREVIATION_HIGHLIGHTING';
        chrome.storage.sync.get('config', function (storage) {
            var config = storage.config;
            config[configKey] = !config[configKey];
            updateConfigSettings(config);
            refreshThePage();
        });
    });


    function updateConfigSettings(config) {
        chrome.storage.sync.set({'config': config}, function () {
            console.info('New configuration: ', config);
        });
    }

    function refreshThePage() {
        chrome.tabs.getSelected(null, function(tab) {
            var code = 'window.location.reload();';
            chrome.tabs.executeScript(tab.id, {code: code});
        });
    }

}());




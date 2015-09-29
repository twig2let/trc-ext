(function () {

    chrome.runtime.onInstalled.addListener(checkConfiguration);

    function checkConfiguration() {
        chrome.storage.sync.get('config', function (config) {
            if (_.isEmpty(config)) {
                setDefaultConfig();
            }
        });
    }

    function setDefaultConfig() {
        var defaultConfig = {
            abbrHighlighting: false
        };

        chrome.storage.sync.set({'config': defaultConfig}, function () {
            console.info('Default config saved');
        });
    }

}());

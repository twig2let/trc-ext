chrome.runtime.onInstalled.addListener(checkConfiguration);

function checkConfiguration() {
    chrome.storage.sync.get('config', function (config) {
        if (_.isEmpty(config)) {
            setDefaultConfig();
        }
    });
}

function setDefaultConfig() {
    //ToDo: Move this to json
    var defaultConfig = {
        ABBREVIATION_HIGHLIGHTING: false
    };

    console.info('Setting default configuration: ', defaultConfig);
    chrome.storage.sync.set({'config': defaultConfig}, function () {
        console.info('Default config saved');
    });
}



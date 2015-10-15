chrome.runtime.onInstalled.addListener(checkConfiguration);

function checkConfiguration() {
    console.info('Checking ext configuration');
    chrome.storage.sync.get('config', function (config) {
        console.info('Configuration is: ', config);
        if (_.isEmpty(config)) {
            console.info('No existing configuration found.');
            setDefaultConfig();
        }
    });
}

function setDefaultConfig() {
    var defaultConfig = {
        abbrHighlighting: false
    };

    console.info('Setting default configuration: ', defaultConfig);
    chrome.storage.sync.set({'config': defaultConfig}, function () {
        console.info('Default config saved');
    });
}



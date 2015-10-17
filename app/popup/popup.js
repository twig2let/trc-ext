(function () {

    var $toggleAbbreviationsBtn = $('#toggleAbbreviationsBtn');

    $toggleAbbreviationsBtn.on('click', function () {
        var configKey = 'ABBREVIATION_HIGHLIGHTING';
        chrome.storage.sync.get('config', function (storage) {
            var config = storage.config;
            config[configKey] = !config[configKey];
            updateConfigSettings(config);
        });
    });


    function updateConfigSettings(config) {
        chrome.storage.sync.set({'config': config}, function () {
            console.info('New configuration: ', config);
        });
    }

}());




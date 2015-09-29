describe('Configuration Setup File', function () {


    afterEach(function () {
        chrome.storage.sync.clear();
        chrome.storage.sync.set.reset();
        chrome.storage.sync.get.reset();
    });

    describe('onInstalled event', function () {
        describe('if there is no existing config', function () {
            it('should set a default configuration', function () {
                chrome.storage.sync.get.yields({}); // Chrome API returns empty object if no value exists
                chrome.storage.sync.set.yields(defaultConfiguration); // Included globally
                chrome.runtime.onInstalled.trigger();

                var expectCallCount = 1;
                var defaultConfigAsArg = chrome.storage.sync.set.args[0][0].config;

                chai.assert.deepEqual(defaultConfigAsArg, defaultConfiguration, 'Unexpected configuration object');
                chai.assert.strictEqual(chrome.storage.sync.set.callCount, expectCallCount, 'chrome.storage.sync.set was called more than once');
            });
        });

        describe('if there is an existing config', function () {
            it('should not attempt to set any configuration', function () {
                chrome.storage.sync.get.yields(defaultConfiguration);
                chrome.runtime.onInstalled.trigger();

                var expectCallCount = 0;

                chai.assert.strictEqual(chrome.storage.sync.set.callCount, expectCallCount, 'chrome.storage.sync.set should not have been called');
            });
        });
    });
});
describe('Popup JS File', function () {

    afterEach(function () {
        chrome.tabs.sendMessage.reset();
    });

    describe('Toggle Abbreviations Button', function () {
        describe('On Click', function () {
            it('Should fetch the state from the local config, flip the state value and pass a message to the content js and store the new config', function () {

                var config = {
                    abbrHighlighting: false
                };
                var mockTabs = [{
                    id: 'tab1'
                }];

                chrome.storage.sync.get.yields(config);
                chrome.tabs.query.yields(mockTabs);

                $('#toggleAbbreviationsBtn').click();

                var passedObject = chrome.tabs.sendMessage.args[0][1];
                var expectedObject = {
                    messageId: "trc_abbreviations",
                    value: true
                };
                var expectedCallCount = 1;
                var newConfig = chrome.storage.sync.set.args[0][0].config;
                var expectedConfig = {
                    config: {
                        abbrHighlighting: true
                    }
                };

                chai.assert.deepEqual(passedObject, expectedObject, 'Object passed in message is incorrect');
                chai.assert.strictEqual(chrome.tabs.sendMessage.callCount, expectedCallCount, 'chrome.tabs.sendMessage should have been called once');
                chai.assert.deepEqual(newConfig, expectedConfig.config, 'New config is incorrect');
            });
        })
    })
});
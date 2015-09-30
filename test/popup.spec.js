describe('Popup JS File', function () {

    afterEach(function () {
        chrome.tabs.sendMessage.reset();
        chrome.storage.sync.set.reset();
        chrome.storage.sync.get.reset();
    });

    describe('Toggle Abbreviations Button', function () {
        describe('On Click', function () {
            describe('when the existing abbrHighlighting key is false', function () {
                it('should pass message to content abbreviation_highlighting js with appropriate message id and new toggle state', function () {

                    var config = {
                        abbrHighlighting: false
                    };
                    var mockTabs = [{
                        id: 'tab1'
                    }];
                    var $toggleAbbreviationsBtn = $('#toggleAbbreviationsBtn');

                    chrome.storage.sync.get.yields(config);
                    chrome.tabs.query.yields(mockTabs);

                    $toggleAbbreviationsBtn.click();

                    var passedObject = chrome.tabs.sendMessage.args[0][1];
                    var expectedObject = {
                        messageId: "trc_abbreviations",
                        value: true
                    };
                    var expectedCallCount = 1;

                    chai.assert.deepEqual(passedObject, expectedObject, 'Object passed in message is incorrect');
                    chai.assert.strictEqual(chrome.tabs.sendMessage.callCount, expectedCallCount, 'chrome.tabs.sendMessage should have been called once');
                });

                it('should update the settings config with the new settings', function () {

                    var config = {
                        abbrHighlighting: false
                    };
                    var mockTabs = [{
                        id: 'tab1'
                    }];
                    var $toggleAbbreviationsBtn = $('#toggleAbbreviationsBtn');

                    chrome.storage.sync.get.yields(config);
                    chrome.tabs.query.yields(mockTabs);

                    $toggleAbbreviationsBtn.click();

                    var newConfig = chrome.storage.sync.set.args[0][0].config;
                    var expectedConfig = {
                        config: {
                            abbrHighlighting: true
                        }
                    };

                    chai.assert.deepEqual(newConfig, expectedConfig.config, 'New config is incorrect');
                    //chai.assert.isTrue($toggleAbbreviationsBtn.hasClass('enabled'), 'Button should have the class of enabled');
                });

                it('should add the \'enabled\' class to the toggleAbbreviationsBtn', function () {

                    var config = {
                        abbrHighlighting: false
                    };
                    var mockTabs = [{
                        id: 'tab1'
                    }];
                    var $toggleAbbreviationsBtn = $('#toggleAbbreviationsBtn');

                    chrome.storage.sync.get.yields(config);
                    chrome.tabs.query.yields(mockTabs);

                    $toggleAbbreviationsBtn.click();

                    chai.assert.isTrue($toggleAbbreviationsBtn.hasClass('enabled'), 'Button should have the class of enabled');
                });
            });

            describe('when the existing abbrHighlighting key is true', function () {
                it('should pass message to content abbreviation_highlighting js with appropriate message id and new toggle state', function () {

                    var config = {
                        abbrHighlighting: true
                    };
                    var mockTabs = [{
                        id: 'tab1'
                    }];
                    var $toggleAbbreviationsBtn = $('#toggleAbbreviationsBtn');

                    chrome.storage.sync.get.yields(config);
                    chrome.tabs.query.yields(mockTabs);

                    $toggleAbbreviationsBtn.click();

                    var passedObject = chrome.tabs.sendMessage.args[0][1];
                    var expectedObject = {
                        messageId: "trc_abbreviations",
                        value: false
                    };
                    var expectedCallCount = 1;

                    chai.assert.deepEqual(passedObject, expectedObject, 'Object passed in message is incorrect');
                    chai.assert.strictEqual(chrome.tabs.sendMessage.callCount, expectedCallCount, 'chrome.tabs.sendMessage should have been called once');
                });

                it('should update the settings config with the new settings', function () {

                    var config = {
                        abbrHighlighting: true
                    };
                    var mockTabs = [{
                        id: 'tab1'
                    }];
                    var $toggleAbbreviationsBtn = $('#toggleAbbreviationsBtn');

                    chrome.storage.sync.get.yields(config);
                    chrome.tabs.query.yields(mockTabs);

                    $toggleAbbreviationsBtn.click();

                    var newConfig = chrome.storage.sync.set.args[0][0].config;
                    var expectedConfig = {
                        config: {
                            abbrHighlighting: false
                        }
                    };

                    chai.assert.deepEqual(newConfig, expectedConfig.config, 'New config is incorrect');
                });

                it('should add the \'enabled\' class to the toggleAbbreviationsBtn', function () {

                    var config = {
                        abbrHighlighting: true
                    };
                    var mockTabs = [{
                        id: 'tab1'
                    }];
                    var $toggleAbbreviationsBtn = $('#toggleAbbreviationsBtn');

                    chrome.storage.sync.get.yields(config);
                    chrome.tabs.query.yields(mockTabs);

                    $toggleAbbreviationsBtn.click();

                    chai.assert.isFalse($toggleAbbreviationsBtn.hasClass('enabled'), 'Button should have the class of enabled');
                });
            });
        })
    })
});
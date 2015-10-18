describe('Popup JS File', function () {


    beforeEach(function(){
    });

    afterEach(function () {
        chrome.tabs.sendMessage.reset();
        chrome.storage.sync.set.reset();
        chrome.storage.sync.get.reset();
    });

    describe('Toggle Abbreviations Button', function () {
        describe('On Click', function () {
            describe('when the existing ABBREVIATION_HIGHLIGHTING key is false', function () {
                it('should update the settings config ABBREVIATION_HIGHLIGHTING key to be true', function () {

                    var mockTabs = [{
                        id: 'tab1'
                    }];
                    var $toggleAbbreviationsBtn = $('#toggleAbbreviationsBtn');

                    chrome.storage.sync.get.yields({config:defaultConfiguration});
                    chrome.tabs.query.yields(mockTabs);

                    $toggleAbbreviationsBtn.click();

                    var newConfig = chrome.storage.sync.set.args[0][0].config;
                    var expectedConfig = {
                        config: {
                            ABBREVIATION_HIGHLIGHTING: true
                        }
                    };

                    chai.assert.deepEqual(newConfig, expectedConfig.config, 'ABBREVIATION_HIGHLIGHTING key should be true');
                });

                //it('should add the \'enabled\' class to the toggleAbbreviationsBtn', function () {
                //
                //    var config = {
                //        abbrHighlighting: false
                //    };
                //    var mockTabs = [{
                //        id: 'tab1'
                //    }];
                //    var $toggleAbbreviationsBtn = $('#toggleAbbreviationsBtn');
                //
                //    chrome.storage.sync.get.yields({config:config});
                //    chrome.tabs.query.yields(mockTabs);
                //
                //    $toggleAbbreviationsBtn.click();
                //
                //    chai.assert.isTrue($toggleAbbreviationsBtn.hasClass('enabled'), 'Button should have the class of enabled');
                //});
            });

            describe('when the existing ABBREVIATION_HIGHLIGHTING key is true', function () {
                it('should update the settings config ABBREVIATION_HIGHLIGHTING key to be false', function () {

                    var mockTabs = [{
                        id: 'tab1'
                    }];
                    var $toggleAbbreviationsBtn = $('#toggleAbbreviationsBtn');

                    chrome.storage.sync.get.yields({config:defaultConfiguration});
                    chrome.tabs.query.yields(mockTabs);

                    $toggleAbbreviationsBtn.click();

                    var newConfig = chrome.storage.sync.set.args[0][0].config;
                    var expectedConfig = {
                        config: {
                            ABBREVIATION_HIGHLIGHTING: false
                        }
                    };

                    chai.assert.deepEqual(newConfig, expectedConfig.config, 'ABBREVIATION_HIGHLIGHTING key should be false');
                });

                //it('should add the \'enabled\' class to the toggleAbbreviationsBtn', function () {
                //
                //    var config = {
                //        abbrHighlighting: true
                //    };
                //    var mockTabs = [{
                //        id: 'tab1'
                //    }];
                //    var $toggleAbbreviationsBtn = $('#toggleAbbreviationsBtn');
                //
                //    chrome.storage.sync.get.yields({config:config});
                //    chrome.tabs.query.yields(mockTabs);
                //
                //    $toggleAbbreviationsBtn.click();
                //
                //    chai.assert.isFalse($toggleAbbreviationsBtn.hasClass('enabled'), 'Button should have the class of enabled');
                //});
            });
        })
    })
});
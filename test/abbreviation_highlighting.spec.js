describe('Abbreviation Highlighting File', function () {

    var triggerMutationObserver = function() {
        var $el = $('.yj-feed-messages').get(0);
        $el.appendChild(document.createElement('p'));
    };

    beforeEach(function () {

    });

    afterEach(function () {
        abbrHighlighting.reset();
    });

    describe('When popup sends a message', function () {
        describe('And the message value is true', function () {
            // Phantom JS doesn't implement MutationObserver
            if (!window.MutationObserver) {
                return;
            }
            it('should create a mutation observer for the feed dom node', function () {

                var mockObserver = {
                    observe: sinon.spy(),
                    disconnect: sinon.spy()
                };
                sinon.stub(window, 'MutationObserver').returns(mockObserver);

                var mockMessage = {
                    messageId: 'trc_abbreviations',
                    value: true
                };

                chrome.runtime.onMessage.trigger(mockMessage);

                var expectedCallCount = 1;
                var actualConfig = mockObserver.observe.args[0][1];
                var expectedConfig = {
                    childList: true,
                    characterData: true
                };

                chai.assert.strictEqual(mockObserver.observe.callCount, expectedCallCount);
                chai.assert.deepEqual(actualConfig, expectedConfig, 'Observer config was incorrect');

                MutationObserver.restore();
            });
        });

        describe('And the message value is false', function () {
            // Phantom JS doesn't implement MutationObserver
            if (!window.MutationObserver) {
                return;
            }
            it('should destroy the mutation observer', function () {

                var mockObserver = {
                    observe: sinon.spy(),
                    disconnect: sinon.spy()
                };
                sinon.stub(window, 'MutationObserver').returns(mockObserver);

                var mockMessage = {
                    messageId: 'trc_abbreviations',
                    value: true
                };

                // setup the observer first else there's nothing to disconnect
                chrome.runtime.onMessage.trigger(mockMessage);

                var mockMessage = {
                    messageId: 'trc_abbreviations',
                    value: false
                };

                chrome.runtime.onMessage.trigger(mockMessage);

                var expectedCallCount = 1;

                chai.assert.strictEqual(mockObserver.disconnect.callCount, expectedCallCount);

                MutationObserver.restore();
            });
        });
    });
});
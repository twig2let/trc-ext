describe('Abbreviation Highlighting File', function () {

    //var triggerMutationObserver = function () {
    //    var $el = $('.yj-feed-messages').get(0);
    //    $el.appendChild(document.createElement('script'));
    //};

    var appendMutationTargetToDom = function () {
        var $ul = $('<ul></ul>');
        $ul.attr('data-qaid', 'feed');
        $('.sandbox').append($ul);
    };

    var clock;

    beforeEach(function () {
        clock = sinon.useFakeTimers();
    });

    afterEach(function () {
        clock.restore();
        $("ul[data-qaid='feed']").remove();
    });

    describe('When testForMutationTarget() is called', function () {
        describe('when the mutationTarget exists', function () {
            it('should setup the mutation observer with the correct configuration', function () {
                var mockObserver = {
                    observe: sinon.spy(),
                    disconnect: sinon.spy()
                };
                sinon.stub(window, 'MutationObserver').returns(mockObserver);
                abbrHighlighting.reset(); // Call this here so we can reinstantiate the MutationObserver after its been mocked
                appendMutationTargetToDom();
                abbrHighlighting.testForMutationTarget();

                var expectedCallCount = 1;
                var actualConfig = mockObserver.observe.args[0][1];
                var expectedConfig = {
                    childList: true
                };

                chai.assert.strictEqual(mockObserver.observe.callCount, expectedCallCount);
                chai.assert.deepEqual(actualConfig, expectedConfig, 'Observer config was incorrect');

                window.MutationObserver.restore();
            })
        });

        describe('when the mutationTarget does not exist', function () {
            it('should start timer and connect mutation observer when target node exists', function () {
                var mockObserver = {
                    observe: sinon.spy(),
                    disconnect: sinon.spy()
                };
                sinon.stub(window, 'MutationObserver').returns(mockObserver);
                abbrHighlighting.reset(); // Call this here so we can reinstantiate the MutationObserver after its been mocked

                abbrHighlighting.testForMutationTarget();
                appendMutationTargetToDom();
                clock.tick(1000);

                var expectedCallCount = 1;
                var actualConfig = mockObserver.observe.args[0][1];
                var expectedConfig = {
                    childList: true
                };

                chai.assert.strictEqual(mockObserver.observe.callCount, expectedCallCount);
                chai.assert.deepEqual(actualConfig, expectedConfig, 'Observer config was incorrect');

                window.MutationObserver.restore();
            })
        })
    });

    //describe('When popup sends a message', function () {
    //    describe('And the message value is true', function () {
    //        // Phantom JS doesn't implement MutationObserver
    //        if (!window.MutationObserver) {
    //            return;
    //        }
    //        it('should create a mutation observer for the feed dom node', function () {
    //
    //            var mockObserver = {
    //                observe: sinon.spy(),
    //                disconnect: sinon.spy()
    //            };
    //            sinon.stub(window, 'MutationObserver').returns(mockObserver);
    //            abbrHighlighting.reset(); // Call this here so we can reinstantiate the MutationObserver after its been mocked
    //
    //            var mockMessage = {
    //                messageId: 'trc_abbreviations',
    //                value: true
    //            };
    //
    //            chrome.runtime.onMessage.trigger(mockMessage);
    //
    //            var expectedCallCount = 1;
    //            var actualConfig = mockObserver.observe.args[0][1];
    //            var expectedConfig = {
    //                attributes: ['message-text'],
    //                childList: true,
    //                characterData: true
    //            };
    //
    //            chai.assert.strictEqual(mockObserver.observe.callCount, expectedCallCount);
    //            chai.assert.deepEqual(actualConfig, expectedConfig, 'Observer config was incorrect');
    //
    //            MutationObserver.restore();
    //        });
    //
    //        it('should trigger a pattern match', function () {
    //            var mockMessage = {
    //                messageId: 'trc_abbreviations',
    //                value: true
    //            };
    //
    //            chrome.runtime.onMessage.trigger(mockMessage);
    //
    //            triggerMutationObserver();
    //
    //        });
    //    });
    //
    //    describe('And the message value is false', function () {
    //        // Phantom JS doesn't implement MutationObserver
    //        if (!window.MutationObserver) {
    //            return;
    //        }
    //        it('should destroy the mutation observer', function () {
    //
    //            var mockObserver = {
    //                observe: sinon.spy(),
    //                disconnect: sinon.spy()
    //            };
    //            sinon.stub(window, 'MutationObserver').returns(mockObserver);
    //            abbrHighlighting.reset(); // Call this here so we can reinstantiate the MutationObserver after its been mocked
    //
    //
    //            var mockMessage = {
    //                messageId: 'trc_abbreviations',
    //                value: true
    //            };
    //
    //            // setup the observer first else there's nothing to disconnect
    //            chrome.runtime.onMessage.trigger(mockMessage);
    //
    //            var mockMessage = {
    //                messageId: 'trc_abbreviations',
    //                value: false
    //            };
    //
    //            chrome.runtime.onMessage.trigger(mockMessage);
    //
    //            var expectedCallCount = 1;
    //
    //            chai.assert.strictEqual(mockObserver.disconnect.callCount, expectedCallCount);
    //
    //            MutationObserver.restore();
    //        });
    //    });
    //});
});
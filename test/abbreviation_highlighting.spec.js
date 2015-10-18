describe('Abbreviation Highlighting File', function () {

    var triggerMutationObserver = function () {
        var $el = $('<li></li>');
        $('.sandbox ul').append($el);
    };

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
    describe('when the mutation observer is triggered', function () {
        it('should disconnect the mutation observer', function () {
            var mockObserver = {
                observe: sinon.spy(),
                disconnect: sinon.spy()
            };
            sinon.stub(window, 'MutationObserver').returns(mockObserver);
            abbrHighlighting.reset(); // Call this here so we can reinstantiate the MutationObserver after its been mocked
            abbrHighlighting.testForMutationTarget();
            abbrHighlighting.checkConfiguration();

            chai.assert.isTrue(mockObserver.disconnect.calledOnce, 'observer.disconnect should have been called once');

            window.MutationObserver.restore();
            chrome.runtime.sendMessage.reset();
        });
        it('should send a message to the configuration API', function () {
            var mockObserver = {
                observe: sinon.spy(),
                disconnect: sinon.spy()
            };
            sinon.stub(window, 'MutationObserver').returns(mockObserver);
            abbrHighlighting.reset(); // Call this here so we can reinstantiate the MutationObserver after its been mocked
            abbrHighlighting.testForMutationTarget();
            abbrHighlighting.checkConfiguration();

            var actualMessageObject = chrome.runtime.sendMessage.args[0][0];
            var TASK_ID = 'ABBREVIATION_HIGHLIGHTING';
            var expectedMessageObject = {
                messageType: 'GET_CONFIGURATION',
                taskId: TASK_ID
            };

            chai.assert.isTrue(chrome.runtime.sendMessage.calledOnce);
            chai.assert.deepEqual(actualMessageObject, expectedMessageObject, 'Message object was incorrect');

            window.MutationObserver.restore();
            chrome.runtime.sendMessage.reset();
        });
        it('should then reconnect the mutation observer', function () {
            var mockObserver = {
                observe: sinon.spy(),
                disconnect: sinon.spy()
            };
            sinon.stub(window, 'MutationObserver').returns(mockObserver);
            abbrHighlighting.reset(); // Call this here so we can reinstantiate the MutationObserver after its been mocked
            abbrHighlighting.testForMutationTarget();
            abbrHighlighting.checkConfiguration();

            var actualConfig = mockObserver.observe.args[0][1];
            var expectedConfig = {
                childList: true
            };

            chai.assert.isTrue(mockObserver.observe.calledOnce);
            chai.assert.deepEqual(actualConfig, expectedConfig, 'Observer config was incorrect');

            window.MutationObserver.restore();
        })
    });
});
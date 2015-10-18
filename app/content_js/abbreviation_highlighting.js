var abbrHighlighting = (function () {

    var INTERVAL_DURATION = 1000;
    var TASK_ID = 'ABBREVIATION_HIGHLIGHTING';
    var observer = new MutationObserver(checkConfiguration);

    testForMutationTarget();

    function testForMutationTarget() {
        var observerTarget = $("ul[data-qaid='feed']").get(0);

        if (_.isUndefined(observerTarget)) {
            startTimerForMutationTarget();
        } else {
            connectMutationObserver();
        }
    }

    function startTimerForMutationTarget() {
        var timer = setInterval(function () {
            console.info('testing for node');
            var observerTarget = $("ul[data-qaid='feed']").get(0);
            if (_.isObject(observerTarget)) {
                clearInterval(timer);
                connectMutationObserver();
            }
        }, INTERVAL_DURATION);
    }

    function disconnectMutationObserver() {
        observer.disconnect();
    }

    function connectMutationObserver() {
        var config = {
            childList: true,
            subtree: true
        };
        var observerTarget = $("ul[data-qaid='feed']").get(0);
        observer.observe(observerTarget, config);
    }

    function checkConfiguration(mutations) {
        disconnectMutationObserver();
        chrome.runtime.sendMessage({messageType: 'GET_CONFIGURATION', taskId: TASK_ID}, function (state) {
            console.info('Abbreviation config state: ', state);
            if (state) {
                extractMessageNodes(mutations);
            }
        });
        connectMutationObserver();
    }

    function extractMessageNodes(mutations) {
        _.each(mutations, function (mutation) {
            var messageNodes = $(mutation.addedNodes).find('[data-qaid="message-text"]');
            _.each(messageNodes, function (messageNode) {
                $(messageNode).html('Allo Jeff, pleased to make your acquaintance.');
            })
        })
    }


    //--------- FOR DEVELOPMENT TESTING ONLY ----------
    if (_.isEqual(location.hostname, 'localhost') || window.mochaPhantomJS) {
        return {
            reset: function () {
                observer = new MutationObserver(checkConfiguration);

            },
            testForMutationTarget: testForMutationTarget,
            startTimerForMutationTarget: startTimerForMutationTarget,
            checkConfiguration: checkConfiguration
        }
    }
    //------------------------------------------------


    //function findPatterns() {
    //    // Loop all the relevant text nodes
    //    $('span[data-qaid="message-text"]:not(.trc-matched)').each(function (index) {
    //        var match;
    //        var messageHtml = $(this).html();
    //        var replacementHtml = messageHtml;
    //        var count = 0;
    //        var additionalCharacterCount = 0;
    //
    //        XRegExp.forEach(messageHtml, pattern, function (xregObj) {
    //            var match = xregObj[0];
    //            var msg = messageHtml;
    //
    //            console.info([
    //                'Block ',
    //                index,
    //                ', Match Index:',
    //                count++,
    //                ' matched pattern: ',
    //                match,
    //                ', position: ',
    //                xregObj.index].join(''));
    //
    //            if (count > 1000) {
    //                console.error([
    //                    'Something went wrong',
    //                    ' matching: ',
    //                    match,
    //                    ', in: ',
    //                    replacementHtml
    //                ].join(''));
    //                return;
    //            }
    //            var wrappedMatchPart = "<span class='match' title='" + getTooltipText(xregObj) + "'>" + match + "</span>";
    //
    //            var splitPartForReplace = splitString(xregObj.input, xregObj.index);
    //            var splitPartForKeeps = replacementHtml.substring(0, (xregObj.index + additionalCharacterCount));
    //
    //            console.info('splitPartForReplace: ', splitPartForReplace);
    //            console.info('splitPartForKeeps: ', splitPartForKeeps);
    //
    //            var replacement = XRegExp.replace(splitPartForReplace, XRegExp.build('\\b' + match + '\\b(?!<\/span>)', 'i'), wrappedMatchPart, 'one');
    //
    //            replacementHtml = splitPartForKeeps.concat(replacement);
    //            additionalCharacterCount = additionalCharacterCount + (wrappedMatchPart.length - match.length);
    //        });
    //
    //        $(this).html(replacementHtml).addClass('trc-matched');
    //        console.info(replacementHtml);
    //    });
    //
    //    // Node loop exit, rebind the DOMSubtreeModified listener
    //    addListener();
    //}

    //function getTooltipText(match) {
    //    if (_.isUndefined(match[1])) {
    //        return abbrsLookup[match[0]];
    //    } else {
    //        return [
    //            abbrsLookup.prefix[match[1]],
    //            ' ',
    //            abbrsLookup[match[2]]
    //        ].join('');
    //    }
    //}

    //function splitString(value, index) {
    //    return value.substring(index);
    //}

}());
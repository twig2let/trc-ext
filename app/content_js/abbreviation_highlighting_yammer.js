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


        //extractMessageNodes(mutations); // Comment in for testing
        chrome.runtime.sendMessage({messageType: 'GET_CONFIGURATION', taskId: TASK_ID}, function (state) {
            if (state) {
                extractMessageNodes(mutations);
            }
        });
        connectMutationObserver();
    }

    function extractMessageNodes(mutations) {
        _.each(mutations, function (mutation) {
            var messageNodes = $(mutation.addedNodes).find('[data-qaid="message-text"]');
            patternMatch(messageNodes);
        });
    }

    function  patternMatch(messageNodes) {
        _.each(messageNodes, function (messageNode) {
            var html = $(messageNode).html();
            var replacementHtml = _.clone(html);
            var additionalCharacterCount = 0;

            XRegExp.forEach(html, TRC_REGEX_SETTINGS.pattern, function (xregMatch) {
                var matchedText = xregMatch[0];
                var $spanWrappedMatch = createSpanWrap(xregMatch);

                if (_.contains(matchedText, '+')) {
                    matchedText = matchedText.replace(/\+/, '\\+');
                }

                /**
                 * We need to split the string because if any tooltip text
                 * e.g. <span title="Figure, VI, Chart / Candlestick pattern, Trend, Support / Resistance levels">FACTS</span>
                 * contains an abbreviation the regex will get a match and attempt to replace it!
                 */

                // This line removes all text behind the index of the match
                var isolatedReplacementStr = splitString(xregMatch.input, xregMatch.index);
                //console.info('splitPartForReplace: ', isolatedReplacementStr);
                // This line removes all the text including and after the match, basically remove any text already pattern matched
                var isolatedMutatedStr = splitString(replacementHtml, 0, (xregMatch.index + additionalCharacterCount));
                //console.info('isolatedMutatedStr: ', isolatedMutatedStr);
                // Make the replacement
                var replacement = XRegExp.replace(isolatedReplacementStr, XRegExp.build('\\b' + matchedText + '\\b(?!<\/span>)'), $spanWrappedMatch, 'one');
                //console.info('replacement: ', replacement);
                // Concat the two strings back together
                replacementHtml = isolatedMutatedStr.concat(replacement);
                //console.info('Concatenated replacementHtml', replacementHtml);
                // Store the length of text we have just added so we can split the string correctly on the next iteration
                additionalCharacterCount = additionalCharacterCount + ($spanWrappedMatch.length - matchedText.length);
            });
            $(messageNode).html(replacementHtml);
        });
    }

    function createSpanWrap(xregMatch) {
        // returns an object which cannot be interpolated
        //var $el = $('<span>');
        //$el.attr('title', TRC_REGEX_SETTINGS.getTooltipText(xregMatch));
        //$el.text(xregMatch[0]);
        //return $el.get(0);
        return '<span class="trc-matched-abbrev" title="' + TRC_REGEX_SETTINGS.getTooltipText(xregMatch) + '">' + xregMatch[0] + '</span>';
    }

    function splitString(str, fromIndex, toIndex) {
        return str.substring(fromIndex, toIndex);
    }


    //--------- FOR DEVELOPMENT TESTING ONLY ----------
    if (_.isEqual(location.hostname, 'localhost') || _.isEqual(location.hostname, '')|| window.mochaPhantomJS) {
        return {
            reset: function () {
                observer = new MutationObserver(checkConfiguration);
            },
            testForMutationTarget: testForMutationTarget,
            startTimerForMutationTarget: startTimerForMutationTarget,
            checkConfiguration: checkConfiguration,
            extractMessageNodes: extractMessageNodes,
            insertData: (function() {
                setTimeout(function() {
                    $("[data-qaid='feed']").load('./test.html');
                },300);

            }())
        };
    }
    //------------------------------------------------

}());
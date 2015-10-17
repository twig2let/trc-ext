var abbrHighlighting = (function () {

    var observer = new MutationObserver(checkConfiguration);
    var INTERVAL_DURATION = 1000;
    var taskId = 'ABBREVIATION_HIGHLIGHTING';

    testForMutationElement();

    function testForMutationElement() {
        var observerTarget = $("ul[data-qaid='feed']").get(0);

        if (_.isUndefined(observerTarget)) {
            startTimerForElement();
        } else {
            connectMutationObserver(observerTarget);
        }
    }

    function startTimerForElement() {
        var timer = setInterval(function () {
            var observerTarget = $("ul[data-qaid='feed']").get(0);
            if (_.isObject(observerTarget)) {
                clearTimeout(timer);
                connectMutationObserver(observerTarget);
            }
        }, INTERVAL_DURATION);
    }

    function disconnectMutationObserver() {
        observer.disconnect();
    }

    function connectMutationObserver(observerTarget) {
        var config = {
            childList: true
        };

        observer.observe(observerTarget, config);
    }

    function checkConfiguration(mutations) {
        console.info(mutations);
        disconnectMutationObserver();
        chrome.runtime.sendMessage({messageType: 'GET_CONFIGURATION', taskId: taskId}, function (state) {
            console.info('Abbreviation config state: ', state);
        });
    }

    //function matchPatterns(mutations) {
    //    disconnectMutationObserver();
    //    _.each(mutations, function (mutation) {
    //        _.each(mutation.addedNodes, function (node) {
    //            node.innerHTML = node.innerHTML + 'hello, Jonathan Morgan';
    //        });
    //    });
    //    connectMutationObserver();
    //}

    //--------- FOR DEVELOPMENT TESTING ONLY ----------
    if (_.isEqual(location.hostname, 'localhost') || window.mochaPhantomJS) {
        return {
            reset: function () {
                observer = new MutationObserver(function (mutations) {
                    mutations.forEach(matchPatterns);
                });

            }
        }
    }
    //-----------------------------------------

    //var abbrsLookup = {
    //    prefix: {
    //        Bu: 'Bullish',
    //        Br: 'Bearish'
    //    },
    //    '1R': 'Target is 100% of Risk (distance from entry to stop)',
    //    ABS: 'Advanced Breakout System',
    //    AE: 'Alternative Entry',
    //    BaC: 'Break and Close',
    //    BD: 'Break Down',
    //    BE: 'Break Even',
    //    BoBCAT: 'Break Out Bar Category (e.g 4 BoBCats)',
    //    BoB: 'Break Out Bar',
    //    BO: 'B/o – Break Out',
    //    'B/o': 'B/o – Break Out',
    //    BrE: 'Bearish Engulfing',
    //    BrF: 'Bearish Flag',
    //    BRRPI: 'Bearish Range Percentage Indicator',
    //    BuE: 'Bullish Engulfing',
    //    BuF: 'Bullish Flag',
    //    BURPI: 'Bullish Range Percentage Indicator',
    //    BW: 'Bollinger Bandwidth',
    //    BZ: 'Buy Zone',
    //    C4H: 'Cat 4 High or Cat 4 Low',
    //    C4L: 'Cat 4 High or Cat 4 Low',
    //    CAT: 'Category (e.g Cat 4)',
    //    CoE: 'Confluence of Events',
    //    CT: 'Channel Tunnel',
    //    CTS: 'Collapsible Trailing Stop',
    //    DB: 'Double Bottom',
    //    DD: 'Double Deviation',
    //    DnT: 'Do Not Trade',
    //    DMA: 'Dual Moving Average',
    //    DT: 'Double Top',
    //    DVI: 'Daily Value Index',
    //    EA: 'Entry Advantage',
    //    EMMA: 'Exponential Multiple Moving Average',
    //    ESLT: 'Entry Stop Loss Technique',
    //    EW: 'Elliott Waves',
    //    FACTS: 'Figure, VI, Chart / Candlestick pattern, Trend, Support / Resistance levels',
    //    FT: 'Free Trade',
    //    GO: 'Gator Oscillator',
    //    HH: 'Highest High (Donchian levels)',
    //    LL: 'Lowest Low (Donchian levels)',
    //    IB: 'Initial Breakout',
    //    IW: 'Impulse Wave',
    //    LHF: 'Low Hanging Fruit',
    //    LT: 'Long Term',
    //    MT: 'Medium Term',
    //    OO: 'Obvious Opportunity',
    //    'P&amp;P': 'Price and Personaility', // no match
    //    PB: 'Pullback',
    //    'P/B': 'Pullback', // span wrap breaks
    //    PL: 'Pink Line',
    //    'P/L': 'Pink Line', // span wrap breaks
    //    PoA: 'Plan of Action',
    //    PP: 'Personal Preference',
    //    PT: 'Pilot Trade',
    //    PuB: 'Pullback Bar',
    //    RBO: 'Range Break Out',
    //    RBOA: 'Range Breakout Advanced',
    //    RC: 'Reversal Candle',
    //    RN: 'Round Number',
    //    RF: 'Risk Free',
    //    RPI: 'Range Percentage Indicator',
    //    RR: 'R Ratio',
    //    RST: 'Resistance, Support and Trendline',
    //    RTC: 'Regression Trend Channel',
    //    RZ: 'Range Zone',
    //    SD: 'Standard Deviation',
    //    ST: 'Short Term',
    //    STEP: 'Stop to Entry Point',
    //    SZ: 'Sell Zone',
    //    T1: 'First Target',
    //    TAB: 'Turnaround Bar',
    //    TB: 'Triple Bottom',
    //    TC: 'Trend Check',
    //    TL: 'Trendline',
    //    'TL BOB': 'Trendline Break or Bounce',
    //    TSH: 'Trailing Stop High',
    //    TSL: 'Trailing Stop Low',
    //    TT: 'Triple Top',
    //    VI: 'Value Index',
    //    WVI: 'Weekly Value Index'
    //};
    //var pattern = /\b(Br|Bu)?(1R|ABS|AE|BaC|BD|BE|BoBCAT|BoB|BO|B\/o|BrE|BrF|BRRPI|BuE|BuF|BURPI|BW|BZ|C4L|C4H|CoE|CT|CTS|CAT|DB|DD|DnT|DMA|DT|DVI|EA|EMMA|ESLT|EW|FACTS|FT|GO|HH|LL|IB|IW|LHF|LT|MT|OO|P&amp;P|PB|PL|PoA|PP|PT|P\/L|P\/B|PuB|RBO|RBOA|RC|RN|RF|RPI|RR|RST|RTC|RZ|SD|ST|STEP|SZ|T1|TAB|TB|TC|TL|TSH|TSL|TT|VI|WVI)\b/g;
    //
    //XRegExp.install({
    //    // Overrides native regex methods with fixed/extended versions that support named
    //    // backreferences and fix numerous cross-browser bugs
    //    natives: true
    //});
    //
    //function findPatterns() {
    //    // Prevent infinite loop, find patterns results in a DOMSubtreeModified event
    //    removeListener();
    //
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
    //
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
    //
    //function splitString(value, index) {
    //    return value.substring(index);
    //}
    //
    ////addListener();


}());
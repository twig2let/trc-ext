/*ToDo:
 * Fix auto prefix recognition, int & Br,Bu etc?
 * Capture all the abbreviation data to construct regex
 * Create tooltip
 * Create popup options, e.g. toggle for abbreviation highlighting
 */


(function () {

    $('body').append("<style>.match {text-decoration:underline;color:#bfd730;cursor:pointer;}</style>");

    var abbrsLookup = {
        prefix: {
            bu: 'Bullish',
            br: 'Bearish'
        },
        '1r': 'Target is 100% of Risk (distance from entry to stop)',
        abs: 'Advanced Breakout System',
        ae: 'Alternative Entry',
        bac: 'Break and Close',
        bd: 'Break Down',
        be: 'Break Even',
        bobcat: 'Break Out Bar Category (e.g 4 BoBCats)',
        bob: 'Break Out Bar',
        bo: 'B/o – Break Out',
        bre: 'Bearish Engulfing',
        brf: 'Bearish Flag',
        brrpi: 'Bearish Range Percentage Indicator',
        bue: 'Bullish Engulfing',
        buf: 'Bullish Flag',
        burpi: 'Bullish Range Percentage Indicator',
        bw: 'Bollinger Bandwidth',
        bz: 'Buy Zone',
        c4h: 'Cat 4 High or Cat 4 Low',
        c4l: 'Cat 4 High or Cat 4 Low',
        cat: 'Category (e.g Cat 4)',
        coe: 'Confluence of Events',
        ct: 'Channel Tunnel',
        cts: 'Collapsible Trailing Stop',
        db: 'Double Bottom',
        dd: 'Double Deviation',
        dnt: 'Do Not Trade',
        dma: 'Dual Moving Average',
        dt: 'Double Top',
        dvi: 'Daily Value Index',
        ea: 'Entry Advantage',
        emma: 'Exponential Multiple Moving Average',
        eslt: 'Entry Stop Loss Technique',
        ew: 'Elliott Waves',
        facts: 'Figure, VI, Chart / Candlestick pattern, Trend, Support / Resistance levels',
        ft: 'Free Trade',
        go: 'Gator Oscillator',
        hh: 'Highest High (Donchian levels)',
        ll: 'Lowest Low (Donchian levels)',
        ib: 'Initial Breakout',
        iw: 'Impulse Wave',
        lhf: 'Low Hanging Fruit',
        lt: 'Long Term',
        mt: 'Medium Term',
        oo: 'Obvious Opportunity',
        'p&amp;p': 'Price and Personaility', // no match
        pb: 'Pullback',
        'p/b': 'Pullback', // span wrap breaks
        pl: 'Pink Line',
        'p/l': 'Pink Line', // span wrap breaks
        poa: 'Plan of Action',
        pp: 'Personal Preference',
        pt: 'Pilot Trade',
        pub: 'Pullback Bar',
        rbo: 'Range Break Out',
        rboa: 'Range Breakout Advanced',
        rc: 'Reversal Candle',
        rn: 'Round Number',
        rf: 'Risk Free',
        rpi: 'Range Percentage Indicator',
        rr: 'R Ratio',
        rst: 'Resistance, Support and Trendline',
        rtc: 'Regression Trend Channel',
        rz: 'Range Zone',
        sd: 'Standard Deviation',
        st: 'Short Term',
        step: 'Stop to Entry Point',
        sz: 'Sell Zone',
        t1: 'First Target',
        tab: 'Turnaround Bar',
        tb: 'Triple Bottom',
        tc: 'Trend Check',
        tl: 'Trendline',
        'tl bob': 'Trendline Break or Bounce',
        tsh: 'Trailing Stop High',
        tsl: 'Trailing Stop Low',
        tt: 'Triple Top',
        vi: 'Value Index',
        wvi: 'Weekly Value Index'
    };

    var pattern = /\b(br|bu)?(1r|abs|ae|bac|bd|be|bobcat|bob|bo|bre|brf|brrpi|bue|buf|burpi|bw|bz|c4l|c4h|coe|ct|cts|cat|db|dd|dnt|dma|dt|dvi|ea|emma|eslt|ew|facts|ft|go|hh|ll|ib|iw|lhf|lt|mt|oo|p&amp;p|pb|pl|poa|pp|pt|p\/l|p\/b|pub|rbo|rboa|rc|rn|rf|rpi|rr|rst|rtc|rz|sd|st|step|sz|t1|tab|tb|tc|tl|tsh|tsl|tt|vi|wvi)\b/ig;

    XRegExp.install({
        // Overrides native regex methods with fixed/extended versions that support named
        // backreferences and fix numerous cross-browser bugs
        natives: true
    });


    function addListener() {
        document.addEventListener("DOMSubtreeModified", findPatterns, false);
    }

    function removeListener() {
        document.removeEventListener("DOMSubtreeModified", findPatterns, false);
    }

    function findPatterns() {
        // Prevent infinite loop, find patterns results in a DOMSubtreeModified event
        removeListener();

        // Loop all the relevant text nodes
        $('span[data-qaid="message-text"]:not(.trc-matched)').each(function (index) {
            var match;
            var messageHtml = $(this).html();
            var replacementHtml = messageHtml;
            var count = 0;
            var additionalCharacterCount = 0;

            XRegExp.forEach(messageHtml, pattern, function (xregObj) {
                var match = xregObj[0];
                var msg = messageHtml;

                console.info([
                    'Block ',
                    index,
                    ', Match Index:',
                    count++,
                    ' matched pattern: ',
                    match,
                    ', position: ',
                    xregObj.index].join(''));

                if (count > 1000) {
                    console.error([
                        'Something went wrong',
                        ' matching: ',
                        match,
                        ', in: ',
                        replacementHtml
                    ].join(''));
                    return;
                }
                var wrappedMatchPart = "<span class='match' title='" + getTooltipText(xregObj) + "'>" + match + "</span>";

                var splitPartForReplace = splitString(xregObj.input, xregObj.index);
                var splitPartForKeeps = replacementHtml.substring(0, (xregObj.index + additionalCharacterCount));

                console.info('splitPartForReplace: ', splitPartForReplace);
                console.info('splitPartForKeeps: ', splitPartForKeeps);

                var replacement = XRegExp.replace(splitPartForReplace, XRegExp.build('\\b' + match + '\\b(?!<\/span>)', ''), wrappedMatchPart, 'one');

                replacementHtml = splitPartForKeeps.concat(replacement);
                additionalCharacterCount = additionalCharacterCount + (wrappedMatchPart.length - match.length);
            });

            $(this).html(replacementHtml).addClass('trc-matched');
            console.info(replacementHtml);
        });

        // Node loop exit, rebind the DOMSubtreeModified listener
        addListener();
    }

    function getTooltipText(match) {
        if (_.isUndefined(match[1])) {
            return abbrsLookup[match[0].toLowerCase()];
        } else {
            return [
                abbrsLookup.prefix[match[1].toLowerCase()],
                ' ',
                abbrsLookup[match[2].toLowerCase()]
            ].join('');
        }
    }

    function splitString(value, index) {
        return value.substring(index);
    }

    addListener();

    //--------- FOR DEVELOPMENT ONLY ----------
    if (!_.isEqual(location.hostname, 'www.yammer.com')) {
        $('body').append('<h3></h3>');
    }
    //-----------------------------------------

}());



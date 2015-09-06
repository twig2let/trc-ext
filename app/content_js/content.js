/*ToDo:
 * Fix auto prefix recognition, int & Br,Bu etc?
 * Capture all the abbreviation data to construct regex
 * Create tooltip
 * Create popup options, e.g. toggle for abbreviation highlighting
 */


(function () {

    $('body').append("<style>.match {text-decoration:underline;color:#bfd730;cursor:pointer;}</style>");

    var abbrs = /\b(br|bu)?(1r|abs|ae|bac|bd|be|bobcat|bob|bo|bre|brf|brrpi|bue|buf|burpi|bw|bz|c4l|c4h|coe|ct|cts|db|dd|dnt|dma|dt|dvi|ea|emma|eslt|ew|facts|ft|go|hh|ll|ib|iw|lhf|lt|mt|oo|pb|pl|poa|pp|pt|pub|rbo|rboa|rc|rn|rf|rpi|rr|rst|rtc|rz|sd|st|step|sz|t1|tab|tb|tc|tl|tsh|tsl|tt|vi|wvi)\b/ig;

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
        cat: 'Category (e.g Cat 4)', // breaks
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
        oo: 'Obvious Opportunity: ',
        'p&p': 'Price and Personaility', // no match
        pb: 'Pullback',
        'p/b': 'Pink Line', // span wrap breaks
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
            // Test string for matches
            while (match = abbrs.exec(messageHtml)) {
                console.info([
                    'Block ',
                    index,
                    ', Match Index:',
                    count++,
                    ' matched pattern: ',
                    match[0],
                    ', position: ',
                    match.index].join(''));

                // Pass any matches to the replacement function
                replacementHtml = replacement(replacementHtml, match);

                if(count > 1000) {
                    console.error([
                        'Something went wrong',
                        ' matching: ',
                        match,
                        ', in: ',
                        replacementHtml
                    ].join(''));
                    return;
                }
            }
            $(this).html(replacementHtml).addClass('trc-matched');
        });

        // Node loop exit, rebind the DOMSubtreeModified listener
        addListener();
    }

    function replacement(replacementHtml, match) {
        var tooltipTxt = getTooltipText(match);
        var wrappedMatchPart = "<span class='match' title='" + tooltipTxt + "'>" + match[0] + "</span>";
        // Match pattern as a whole word only if it is not proceeded by a '</span>' tag
        var matchPattern = '\\b' + match[0] + '\\b(?!<\/span>)';
        return replacementHtml.replace(new RegExp(matchPattern, 'ig'), wrappedMatchPart);
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

    addListener();

    //--------- FOR DEVELOPMENT ONLY ----------
    if (!_.isEqual(location.hostname, 'www.yammer.com')) {
        $('body').append('<h3></h3>');
    }
    //-----------------------------------------

}());
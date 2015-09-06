/*ToDo:
 * Fix auto prefix recognition, int & Br,Bu etc?
 * Capture all the abbreviation data to construct regex
 * Create tooltip
 * Create popup options, e.g. toggle for abbreviation highlighting
 */


(function () {

    $('body').append("<style>.match {text-decoration:underline;color:#bfd730;cursor:pointer;}</style>");

    var abbrs = /(br|bu)?(rpi|dvi|wvi|sma|db|iw|pb|dma|ath|hfig|fig)/ig;
    var abbrsLookup = {
        prefix: {
            bu: 'Bullish',
            br: 'Bearish'
        },
        '1R': '– Target is 100% of Risk (distance from entry to stop)',
        ABS: 'Advanced Breakout System',
        AE: 'Alternative Entry',
        BaC: 'Break and Close',
        BD: 'Break Down',
        BE: 'Break Even',
        BO: 'B/o – Break Out',
        BoB: 'Break Out Bar',
        BoBCAT: 'Break Out Bar Category (e.g 4 BoBCats)',
        BrE: 'Bearish Engulfing',
        BrF: 'Bearish Flag',
        BrRPI: 'Bearish RPI',
        BuE: 'Bullish Engulfing',
        BuF: 'Bullish Flag',
        BuRPI: 'Bullish RPI',
        BW: 'Bollinger Bandwidth',
        BZ: 'Buy Zone',
        C4H: 'C4L – Cat 4 High or Cat 4 Low',
        CAT: 'Category (e.g Cat 4)',
        CoE: 'Confluence of Events',
        CT: 'Channel Tunnel',
        CTS: 'Collapsible Trailing Stop',
        DB: 'Double Bottom',
        DD: 'Double Deviation',
        DnT: 'Do Not Trade',
        DMA: 'Dual Moving Average',
        DT: 'Double Top',
        DVI: 'Daily Value Index',
        EA: 'Entry Advantage',
        EMMA: 'Exponential Multiple <Mving Average',
        ESLT: 'Entry Stop Loss Technique',
        EW: 'Elliott Waves',
        FACTS: 'Figure, VI, Chart / Candlestick pattern, Trend, Support / Resistance levels',
        FT: 'Free Trade',
        GO: 'Gator Oscillator',
        'HH/LL': 'Highest High / Lowest Low (Donchian levels)',
        IB: 'Initial Breakout',
        IW: 'Impulse Wave',
        LHF: 'Low Hanging Fruit',
        LT: 'Long Term',
        MT: 'Medium Term',
        OO: 'Obvious Opportunity: ',
        'P&P': 'Price and Personaility',
        PB: 'P/b – Pullback',
        PL: 'P/L – Pink Line',
        PoA: 'Plan of Action',
        PP: 'Personal Preference',
        PT: 'Pilot Trade',
        PuB: 'Pullback Bar',
        RBO: 'Range Break Out',
        RBOA: 'Range Breakout Advanced',
        RC: 'Reversal Candle',
        RN: 'Round Number',
        RF: 'Risk Free',
        RPI: 'Range Percentage Indicator',
        RR: 'R Ratio',
        RST: 'Resistance, Support and Trendline',
        RTC: 'Regression Trend Channel',
        RZ: 'Range Zone',
        SD: 'Standard Deviation',
        ST: 'Short Term',
        STEP: 'Stop to Entry Point',
        SZ: 'Sell Zone',
        T1: 'First Target',
        TAB: 'Turnaround Bar',
        TB: 'Triple Bottom',
        TC: 'Trend Check',
        TL: 'Trendline',
        'TL BoB': 'Trendline Break or Bounce',
        TSH: 'TSL – Trailing Stop High / Trailing Stop Low',
        TT: 'Triple Top',
        VI: 'Value Index',
        WVI: 'Weekly Value Index'
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
                messageHtml = replacement(messageHtml, match);
            }
            $(this).html(messageHtml).addClass('trc-matched');
        });

        // Node loop exit, rebind the DOMSubtreeModified listener
        addListener();
    }

    function replacement(messageHtml, match) {
        var tooltipTxt = getTooltipText(match);
        var wrappedMatchPart = "<span class='match' title='" + tooltipTxt + "'>" + match[0] + "</span>";
        // Match pattern as a whole word only if it is not proceeded by a '</span>' tag
        var matchPattern = '\\b' + match[0] + '\\b(?!<\/span>)';
        return messageHtml.replace(new RegExp(matchPattern, 'ig'), wrappedMatchPart);
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
        $('body').append('<h3>Tee hee</h3>');
    }
    //-----------------------------------------

}());
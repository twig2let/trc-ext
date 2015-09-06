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
        rpi: 'Relative Price Indicator',
        dvi: 'Daily Value Index',
        wvi: 'Weekly Value Index',
        sma: 'Simple Moving Average',
        db: 'Double Bottom',
        iw: 'Impulse Wave',
        pb: 'Pullback',
        dma: '???',
        ath: 'All Time High',
        hfig: 'Half Figure',
        fig: 'The Figure'
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
        if (_.isUndefined(match[1])){
            return abbrsLookup[match[0].toLowerCase()];
        } else {
            return [
                abbrsLookup.prefix[match[1].toLowerCase()],
                ' ',
                abbrsLookup[match[2].toLowerCase()]
            ].join('');
        }
    }

    //--------- FOR DEVELOPMENT ONLY ----------
    if (!_.isEqual(location.hostname, 'www.yammer.com')) {
        addListener();
        $('body').append('<h3>Tee hee</h3>');
    }
    //-----------------------------------------

}());
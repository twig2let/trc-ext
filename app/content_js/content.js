/*ToDo:
 * Fix auto prefix recognition, int & Br,Bu etc?
 * Capture all the abbreviation data to construct regex
 * Create tooltip
 * Create popup options, e.g. toggle for abbreviation highlighting
 */


(function () {

    $('body').append("<style>.match {text-decoration:underline;color:#bfd730;cursor:pointer;}</style>");

    var abbreviations = /(br|bu)?(rpi|dvi|wvi|sma|db|iw|pb|dma|ath|hfig|fig)/ig;

    //var abbrLookup = {
    //    dvi: ''
    //};

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
            while (match = abbreviations.exec(messageHtml)) {
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
        var wrappedMatchPart = "<span class='match' title='A tooltip'>" + match[0] + "</span>";
        // Match pattern as a whole word only if it is not proceeded by a '</span>' tag
        var matchPattern = '\\b' + match[0] + '\\b(?!<\/span>)';
        return messageHtml.replace(new RegExp(matchPattern, 'ig'), wrappedMatchPart);
    }

    function testForKnownPrefix(result) {
    }

    function insertAt(src, index, str) {
        return src.substr(0, index) + str + src.substr(index)
    }

    //--------- FOR DEVELOPMENT ONLY ----------
    if (!_.isEqual(location.hostname, 'www.yammer.com')) {
        addListener();
        $('body').append('<h3>Tee hee</h3>');
    }
    //-----------------------------------------

}());
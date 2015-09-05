var abbreviations = /hfig|fig|dvi|wvi|sma|db|rpi|iw|pb|dma|ath/ig;

/*
 F: Above HFig 150. Plenty of space prior to Fig 200.
 A: Above DVI&WVI. 59 weeks above the weekly 20SMA.
 C: Daily DB confirmed. One (at a push, two) recent Gap Ups, above the daily 20SMA, on increased vol. Most recent (potential entry) candle is BuRPI 95.
 T: IW in play. Trend checker favourable. Bouncer plunging back below 3 after the PB. Green DMA full house. Neat PB on weekly, slightly scrappier on the Daily, but this has allowed the DB to develop, and the all important blue candles to present themselves.
 S: ATH at 185.
 */

/*ToDo:
    * Fix auto prefix recognition, int & Br,Bu etc
    * Capture all the abbreviation data to construct regex
    * Fix multiple string replacement issue (infinite loop)
    * Tidy this up
    * Write some unit tests
    * Create tooltip
    * Create popup options, e.g. toggle for abbreviation highlighting
    * Test it!
*/


(function () {

    $('body').append("<style>.match {text-decoration:underline;color:#bfd730;font-size:12px;cursor:pointer;}</style>");

    function listener() {
        var startTime = new Date().getTime();
        var endTime;

        var replacementStr = "";

        $('span[data-qaid="message-text"]').each(function (index) {
            var result;
            var actualStr = $(this).html();
            var strLength = actualStr.length;
            replacementStr = actualStr;

            console.info('Block' + index + ', string length: ' + strLength);
            while (result = abbreviations.exec(actualStr)) {
                console.info([
                    'Block',
                    index,
                    ' match: ',
                    result,
                    ', position: ',
                    result.index].join(''));

                replacement(result);
            }

            $(this).html(replacementStr);


        });
        console.info('duration in seconds: ', (new Date().getTime() - startTime) / 1000);

        function replacement(result) {
            var matchStr = result[0];
            var matchReplacement = "<span class='match' title='A tooltip'>" + matchStr + "</span>";
            var matchPattern = '\\b' + matchStr + '\\b';
            replacementStr = replacementStr.replace(new RegExp(matchPattern, ''), matchReplacement);
        }
    }

    var timeout;
    document.addEventListener("DOMSubtreeModified", function() {
        if(timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(listener, 500);
    }, false);

}());


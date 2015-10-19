var TRC_REGEX_SETTINGS = (function () {

    XRegExp.install({
        natives: true
    });

    var map = {
        prefix: {
            Bu: 'Bullish',
            Br: 'Bearish'
        },
        '1R': 'Target is 100% of Risk (distance from entry to stop)',
        ABS: 'Advanced Breakout System',
        AE: 'Alternative Entry',
        BaC: 'Break and Close',
        BD: 'Break Down',
        BE: 'Break Even',
        BoBCAT: 'Break Out Bar Category (e.g 4 BoBCats)',
        BoB: 'Break Out Bar',
        BO: 'B/o - Break Out',
        'B/o': 'B/o - Break Out',
        BrE: 'Bearish Engulfing',
        BrF: 'Bearish Flag',
        BRRPI: 'Bearish Range Percentage Indicator',
        BuE: 'Bullish Engulfing',
        BuF: 'Bullish Flag',
        BURPI: 'Bullish Range Percentage Indicator',
        BW: 'Bollinger Bandwidth',
        BZ: 'Buy Zone',
        C4H: 'Cat 4 High or Cat 4 Low',
        C4L: 'Cat 4 High or Cat 4 Low',
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
        EMMA: 'Exponential Multiple Moving Average',
        ESLT: 'Entry Stop Loss Technique',
        EW: 'Elliott Waves',
        FACTS: 'Figure, VI, Chart / Candlestick pattern, Trend, Support / Resistance levels',
        FT: 'Free Trade',
        GO: 'Gator Oscillator',
        HH: 'Highest High (Donchian levels)',
        LL: 'Lowest Low (Donchian levels)',
        IB: 'Initial Breakout',
        IW: 'Impulse Wave',
        LHF: 'Low Hanging Fruit',
        LT: 'Long Term',
        MT: 'Medium Term',
        OO: 'Obvious Opportunity',
        'P&amp;P': 'Price and Personaility', // no match
        PB: 'Pullback',
        'P/B': 'Pullback', // span wrap breaks
        PL: 'Pink Line',
        'P/L': 'Pink Line', // span wrap breaks
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
        'TL BOB': 'Trendline Break or Bounce',
        TSH: 'Trailing Stop High',
        TSL: 'Trailing Stop Low',
        TT: 'Triple Top',
        VI: 'Value Index',
        WVI: 'Weekly Value Index'
    };

    /**
     *
     * @type {RegExp}
     *
     * (Br|Bu)?     - Optionally match can start with Br or Bu
     * (s|[0-9]*?)  - Optionally match can end with an 's' (e.g. OOs) OR any number of digits 0-9 (e.g. ATR30)
     *
     */
    var pattern = /\b(Br|Bu)?(1R|ABS|AE|BaC|BD|BE|BoBCAT|BoB|BO|B\/o|BrE|BrF|BRRPI|BuE|BuF|BURPI|BW|BZ|C4L|C4H|CoE|CT|CTS|CAT|DB|DD|DnT|DMA|DT|DVI|EA|EMMA|ESLT|EW|FACTS|FT|GO|HH|LL|IB|IW|LHF|LT|MT|OO|P&amp;P|PB|PL|PoA|PP|PT|P\/L|P\/B|PuB|RBO|RBOA|RC|RN|RF|RPI|RR|RST|RTC|RZ|SD|ST|STEP|SZ|T1|TAB|TB|TC|TL|TSH|TSL|TT|VI|WVI)(s|[0-9]*?)\b/g;

    function getTooltipText(xregMatch) {
        var matchHasPrefix = !_.isUndefined(xregMatch[0]);
        if (matchHasPrefix) {
            return [
                map.prefix[xregMatch[1]],
                ' ',
                map[xregMatch[2]]
            ].join('');
        } else {
            return map[xregMatch[2]];
        }
    }

    return {
        map: map,
        pattern: pattern,
        getTooltipText: getTooltipText
    }

}());


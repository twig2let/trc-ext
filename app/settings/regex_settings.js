var TRC_REGEX_SETTINGS = (function () {

    XRegExp.install({
        natives: true
    });

    var map = {
        prefix: {
            Bu: 'Bullish',
            Br: 'Bearish',
            d: 'Daily',
            w: 'Weekly',
            m: 'Monthly',
            'w+d': 'Weekly and Daily',
            'm+w': 'Monthly and Weekly'
        },
        '1R': 'Target is 100% of Risk (distance from entry to stop)',
        ABS: 'Advanced Breakout System',
        AE: 'Alternative Entry',
        ATH: 'All Time High',
        ATL: 'All time Low',
        ATR: 'Average True Range',
        BaC: 'Break and Close',
        BD: 'Break Down',
        BE: 'Break Even',
        BoBCAT: 'Break Out Bar Category (e.g 4 BoBCats)',
        BoB: 'Break Out Bar',
        BO: 'Break Out',
        BuEC: 'Bullish Engulfing Candle',
        BrE: 'Bearish Engulfing',
        BrEC: 'Bearish Engulfing Candle',
        BrF: 'Bearish Flag',
        BRRPI: 'Bearish Range Percentage Indicator',
        BuE: 'Bullish Engulfing',
        BuF: 'Bullish Flag',
        BURPI: 'Bullish Range Percentage Indicator',
        BW: 'Bollinger Bandwidth',
        BZ: 'Buy Zone',
        'C&amp;H': 'Cup and Handle',
        C4H: 'Cat 4 High or Cat 4 Low',
        C4L: 'Cat 4 High or Cat 4 Low',
        CAT: 'Category (e.g Cat 4)',
        CoE: 'Confluence of Events',
        CT: 'Channel Tunnel',
        CTS: 'Collapsible Trailing Stop',
        Cor: 'Correlated to market index',
        DB: 'Double Bottom',
        DCI: 'Directional Count Index',
        DD: 'Double Deviation',
        DnT: 'Do Not Trade',
        DMA: 'Dual Moving Average',
        DT: 'Double Top',
        DVI: 'Daily Value Index / 200 Simple Moving Average (200SMA)',
        EA: 'Entry Advantage',
        EC: 'Engulfing Candle',
        EMMA: 'Exponential Multiple Moving Average',
        ESLT: 'Entry Stop Loss Technique',
        EW: 'Elliott Waves',
        FACTS: 'Figure, VI, Chart / Candlestick pattern, Trend, Support / Resistance levels',
        Fig: 'Figure',
        FT: 'Free Trade',
        GdBoB: 'Gap Down Breakout Bar',
        GO: 'Gator Oscillator',
        'G&amp;G': 'Gap and Go',
        GuBoB: 'Gap Up Breakout Bar',
        HFig: 'Half Figure',
        HF: 'Half Figure',
        HH: 'Highest High (Donchian levels)',
        'H&amp;S': 'Head and Shoulders',
        HVol: 'Higher Volume',
        LL: 'Lowest Low (Donchian levels)',
        IB: 'Initial Breakout',
        IW: 'Impulse Wave',
        LHF: 'Low Hanging Fruit',
        LT: 'Long Term',
        LVol: 'Lower Volume',
        'M/W/D': 'Monthly, Weekly and Daily time frames',
        MA: 'Moving Average',
        MT: 'Medium Term',
        NFP: 'Nonfarm Payroll',
        OO: 'Obvious Opportunity',
        'P&amp;P': 'Price and Personality',
        PA: 'Price Action',
        PB: 'Pullback',
        PL: 'Pink Line',
        PoA: 'Plan of Action',
        PP: 'Personal Preference',
        PT: 'Pilot Trade',
        PuB: 'Pullback Bar',
        RBO: 'Range Break Out',
        RBOA: 'Range Breakout Advanced',
        RC: 'Reversal Candle',
        RelS: 'Relative Strength Indicator',
        RN: 'Round Number',
        RF: 'Risk Free',
        RoC: 'Rate of Change',
        RPI: 'Range Percentage Indicator',
        RR: 'R Ratio',
        RST: 'Resistance, Support and Trendline',
        RTC: 'Regression Trend Channel',
        RtS: 'Resistance Turned Support',
        RZ: 'Range Zone',
        SD: 'Standard Deviation',
        SMA: 'Simple Moving Average',
        ST: 'Short Term',
        StR: 'Support Turned Resistance',
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
        UnCor: 'UnCorrelated to market index',
        VI: 'Value Index',
        WVI: 'Weekly Value Index'
    };

    /**
     *
     * @type {RegExp}
     *
     * Match Prefix: (Br|Bu|d|w|m|[0-9]{0,3}|w\+d|m\+w)
     *    - Optionally match Br, Bu, d, w, m
     *    - Optionally match between one and three digits e.g. 1, 50, 200
     *    - Optionally match w+d e.g. Weekly and Daily
     *
     * Match Suffix: (s|(\$?)[0-9]{0,3})
     *    - Optionally match can end with an 's' (e.g. OOs)
     *    - Optionally between one and three digits (e.g. ATR30)
     *          - This integer match can be preceded by a '$' e.g. Fig$200
     *
     *  https://regex101.com/r/sO5xN8/16
     */
    var pattern = /\b(Br|Bu|d|w|m|[0-9]{0,3}|w\+d|m\+w)?(1R|ABS|AE|ATL|ATH|ATR|BaC|BD|BE|BoBCAT|BoB|BO|BuEC|BrE|BrEC|BrF|BRRPI|BuE|BuF|BURPI|BW|BZ|C4L|C4H|C&amp;H|CoE|Cor|CT|CTS|CAT|DB|DCI|DD|DnT|DMA|DT|DVI|EA|EC|EMMA|ESLT|EW|FACTS|Fig|FT|GdBoB|GO|G&amp;G|GuBoB|HFig|HF|HH|H&amp;S|HVol|LL|IB|IW|LHF|LT|LVol|M\/W\/D|MA|MT|NFP|OO|P&amp;P|PA|PB|PL|PoA|PP|PT|PuB|RBO|RBOA|RC|RelS|RN|RF|RoC|RPI|RR|RST|RtS|RTC|RZ|SD|SMA|ST|StR|STEP|SZ|T1|TAB|TB|TC|TL|TSH|TSL|TT|UnCor|VI|WVI)(s|[0-9]{0,3})?\b/g;

    /**
     *
     * @param xregMatch
     * @schema [
     *  'FullMatch',
     *  'nth Capture Group'...
     * ]
     */

    function getTooltipText(xregMatch) {
        var matchHasPrefix = !_.isUndefined(xregMatch[1]);
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
    };

}());


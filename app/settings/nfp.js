(function() {

    //Y/M/D
    var nfpDates = [
        '2016-01-08',
        '2016-02-05',
        '2016-03-04'
    ];

    function getTimestampMinusFiveDays(str) {
        var d = str.match(/\d+/g);
        var nfpDate = new Date(d[0], d[1] - 1, d[2]);
        return nfpDate.setDate(nfpDate.getDate()-5);
    }

    _.each(nfpDates, function(dateStr) {
        if (Date.now() >= getTimestampMinusFiveDays()) {

        }
    });

});
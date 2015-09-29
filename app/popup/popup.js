(function () {

    var toggleAbbr = document.getElementById('toggleAbbrevs');

    toggleAbbr.addEventListener('click', function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {message: 'abbrHighlighting'}, function () {
                console.info('toggle abbrev done!');
            });
        });
    });

}());




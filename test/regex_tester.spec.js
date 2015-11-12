describe('Pattern Matching Cases', function () {

    function constructMockMutationObject(nodes) {
        var mutations = [];

        _.each(nodes, function (node) {
            var mutationRecord = {
                addedNodes: $(node).find('[data-addedNode="true"]')
            };
            mutations.push(mutationRecord);
        });

        return mutations;
    }

    function fetchPatternMatchedNodes(mockMutations) {
        var replacements = $(mockMutations[0].addedNodes).find('[data-qaid="message-text"]');
        console.info(replacements);
    }

    function generateMessageTextSpanEl() {
        return $('<span>').attr('data-qaid', 'message-text');
    }

    function generateSpansWithPrefix(prefix, abbr) {
        var $el = generateMessageTextSpanEl();
        $el.text(prefix + abbr);
        return $el;
    }

    beforeEach(function () {

    });

    afterEach(function () {

    });

    describe('Optional Prefixes', function () {
        describe('Should match abbreviations that are prefixed', function () {
            it('Br', function () {

                var contaninerEl = $('.mockMessageContainer');

                // Generate

                console.info(generateSpansWithPrefix('Br'));

                //var selector = '.pattern-match-br-prefix';
                //var mockMutations = constructMockMutationObject($(selector));
                //
                //abbrHighlighting.extractMessageNodes(mockMutations);
                //
                //fetchPatternMatchedNodes(mockMutations);

            });
        })
    })
});
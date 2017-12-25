'use strict';
var animFuncs = require('../../utils/AnimateFunctions');

function ScrollableLinks(settings) {
    var links = settings.links;
    var scrollTime = settings.scrollTime || 1000;

    function addClickEventsForLinks() {
        for (var i = 0; i < links.length; i++) {
            addEventHandler(links[i]);
        }
    }

    function addEventHandler(link) {
        var elem = document.querySelector(link.getAttribute('href'));
        link.addEventListener('click', function (event) {
            event.preventDefault();
            animFuncs.scrollTo(elem, scrollTime, 'easeOut');
        });
    }

    return {
        run: function() {
            addClickEventsForLinks();
        }
    };
}
module.exports = ScrollableLinks;

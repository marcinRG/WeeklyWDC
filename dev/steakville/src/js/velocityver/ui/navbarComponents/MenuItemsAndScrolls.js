'use strict';
var animFuncs = require('../../utils/AnimateFunctions');

function MenuItemsAndScrolls(settings) {
    var menu = settings.menu;
    var links = settings.menuLinks;
    var pageSmallSize = settings.pageSmallSize;
    var scrollTime = settings.scrollTime || 1000;
    var slideTime = settings.slideTime || 1000;

    var animateScroll = settings.animateScroll;
    var hideMenuOnClick = settings.hideMenuOnClick;

    function addBodyClickHandler() {
        var body = document.getElementsByTagName('body')[0];
        body.addEventListener('click', function () {
            if (hideMenuOnClick && (window.outerWidth < pageSmallSize)) {
                if (animFuncs.isShown(menu)) {
                    animFuncs.doSlideAnimation(menu, 'slideUp', slideTime, 'easeOut');
                }
            }
        });
    }

    function addEventHandler(link) {
        var elem = document.querySelector(link.getAttribute('href'));
        link.addEventListener('click', function (event) {
            if (animateScroll) {
                event.preventDefault();
                animFuncs.scrollTo(elem, scrollTime, 'easeIn');
            }
            if (hideMenuOnClick && (window.outerWidth < pageSmallSize)) {
                event.stopPropagation();
                animFuncs.slideToggle(menu, slideTime, 'easeOut');
            }
        });
    }

    function menuItemClickHandlers() {
        addBodyClickHandler();
        for (var i = 0; i < links.length; i++) {
            addEventHandler(links[i]);
        }
    }

    return {
        run: menuItemClickHandlers
    };
}

module.exports = MenuItemsAndScrolls;

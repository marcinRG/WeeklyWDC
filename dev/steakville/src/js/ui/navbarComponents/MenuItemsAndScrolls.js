'use strict';
var animFuncs = require('../utils/AnimateFunctions');
var utils = require('../utils/Utlities');

function MenuItemsAndScrolls(settings) {
    var menu = settings.menu;
    var links = Array.from(settings.menuLinks);
    var pageSmallSize = settings.pageSmallSize;
    var scrollTime = settings.scrollTime || 1000;
    var slideTime = settings.slideTime || 1000;
    var changeClassOnScroll = settings.changeClassOnScroll;
    var changeScrollClass = settings.changeScrollClass;
    var animateScroll = settings.animateScroll;
    var hideMenuOnClick = settings.hideMenuOnClick;

    var currentElem = '';
    var removeClass = utils.removeClassFromElem(changeScrollClass);
    var addClass = utils.addClassToElem(changeScrollClass);

    function addBodyClickHandler() {
        var body = document.getElementsByTagName('body')[0];
        body.addEventListener('click', function () {
            if ((window.outerWidth < pageSmallSize)) {
                if (animFuncs.isShown(menu)) {
                    animFuncs.doSlideAnimation(menu, 'slideUp', slideTime, 'easeOut');
                }
            }
        });
    }

    function findLink(elemName) {
        return menu.querySelector('[href="#' + elemName + '"]');
    }

    function changeClassOfCurrentElement(elementName, currentElem) {
        if ((elementName) && (elementName !== currentElem)) {
            var link = findLink(elementName);
            links.map(removeClass);
            addClass(link);
            return elementName;
        }
        else {
            return currentElem;
        }
    }

    function addScrollHandler(elems) {
        window.addEventListener('scroll', function () {
            var elementName = findCurrentElement(elems);
            currentElem = changeClassOfCurrentElement(elementName, currentElem);
        });
    }

    function findElems(links) {
        var tab = [];
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var pageElement = document.querySelector(link.getAttribute('href'));
            if (pageElement) {
                tab.push(pageElement);
            }
        }
        return tab;
    }

    function findCurrentElement(elements) {
        var error = 1;
        var position = window.pageYOffset;
        for (var i = 0; i < elements.length; i++) {
            var topBottom = utils.getElementTopBottom(elements[i]);
            if ((position + error >= topBottom.top) && (position + error < topBottom.bottom)) {
                return elements[i].getAttribute('id');
            }
        }
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
        if (hideMenuOnClick) {
            addBodyClickHandler();
        }
        if (changeClassOnScroll) {
            var elems = findElems(links);
            var elementName = findCurrentElement(elems);
            currentElem = changeClassOfCurrentElement(elementName, currentElem);
            addScrollHandler(elems);
        }
        for (var i = 0; i < links.length; i++) {
            addEventHandler(links[i]);
        }
    }

    return {
        run: menuItemClickHandlers
    };
}

module.exports = MenuItemsAndScrolls;

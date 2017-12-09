'use strict';

var $ = require('jquery');

function MenuItemsAndScrolls(settings) {
    var win = settings.window;
    var pageElems = settings.pageElements;
    var scrollTime = settings.scrollTime || 1000;
    var slideTime = settings.slideTime || 1000;
    var animateScroll = settings.animateScroll;
    var pageSmallSize = settings.pageSmallSize;
    var menu = settings.menu;
    var hideMenuOnClick = settings.hideMenuOnClick;
    var changeClassOnScroll = settings.changeClassOnScroll;
    var changeScrollClass = settings.changeScrollClass || '';
    var menuItems = settings.menuItems;
    var prevAttrName = '';

    function findCurrentElement(scrollTop) {
        var error = 1;
        for (var elems in pageElems) {
            if (pageElems.hasOwnProperty(elems)) {
                var top = pageElems[elems].offset().top;
                var height = pageElems[elems].outerHeight();
                if ((top <= scrollTop + error) && (top + height - error > scrollTop)) {
                    return elems;
                }
            }
        }
        return null;
    }

    function scrollToElement(elemName) {
        var bodyObj = $('html, body');
        if (animateScroll) {
            bodyObj.animate({
                scrollTop: pageElems[elemName].offset().top
            }, scrollTime);
            return;
        }
        bodyObj.scrollTop = pageElems[elemName].offset().top;
    }

    function removeClassFromAll() {
        $.each(menuItems, function (val, item) {
            $(item).removeClass(changeScrollClass);
        });
    }

    function menuElemSetClass(elemAttr) {
        if (elemAttr) {
            if (elemAttr !== prevAttrName) {
                removeClassFromAll();
                menuItems.filter('[data-id="' + elemAttr + '"]')
                    .addClass(changeScrollClass);
                prevAttrName = elemAttr;
            }
        }
    }

    function menuItemClickHandlers() {
        $.each(menuItems, function (val, item) {
            $(item).on('click', function () {
                if ((pageSmallSize > win.outerWidth()) && (hideMenuOnClick)) {
                    menu.slideToggle(slideTime);
                }
                scrollToElement($(this).attr('data-id'));
            });
        });
    }

    function changeMenuItemStyleOnScrollHandler() {
        win.on('scroll', function () {
            var scrollTop = win.scrollTop();
            menuElemSetClass(findCurrentElement(scrollTop));
        });
    }

    menuItemClickHandlers();
    if (changeClassOnScroll) {
        menuElemSetClass(findCurrentElement(win.scrollTop()));
        changeMenuItemStyleOnScrollHandler();
    }
}

module.exports = MenuItemsAndScrolls;

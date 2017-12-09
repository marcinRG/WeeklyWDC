'use strict';
var animFuncs = require('../../utils/AnimateFunctions');

function NavBarButton(settings) {
    var navBtn = settings.button;
    var menu = settings.menu;
    var pageSmallSize = settings.pageSmallSize;
    var slideTime = settings.slideTime || 1000;
    var prevWidth = window.outerWidth;

    function toggleMenuOnButtonPressHandler() {
        navBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            toggleMenu();
        });
    }

    function toggleMenu() {
        animFuncs.slideToggle(menu, slideTime, 'easeOut');
    }

    function isSmallSize(size) {
        return (size < pageSmallSize);
    }

    function getSizeAndResetStyles() {
        var currentSize = window.outerWidth;
        if (isSmallSize(prevWidth) && !(isSmallSize(currentSize))) {
            menu.removeAttribute('style');
        }
        if (!isSmallSize(prevWidth) && (isSmallSize(currentSize))) {
            menu.removeAttribute('style');
        }
        return currentSize;
    }

    function toggleMenuOnBrowserResizeHandler() {
        window.addEventListener('resize', function () {
            prevWidth = getSizeAndResetStyles();
        });
    }

    return {
        run: function () {
            toggleMenuOnBrowserResizeHandler();
            toggleMenuOnButtonPressHandler();
        }
    };
}

module.exports = NavBarButton;

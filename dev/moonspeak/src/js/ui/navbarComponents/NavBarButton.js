'use strict';

function NavBarButton(settings) {
    var win = settings.window;
    var navBtn = settings.button;
    var menu = settings.menu;
    var pageSmallSize = settings.pageSmallSize;
    var classToApply = settings.classToApply;
    var slideTime = settings.slideTime || 1000;
    var prevWidth = win.outerWidth();

    function toggleMenuOnButtonPressHandler() {
        navBtn.on('click', function () {
            menu.slideToggle(slideTime);
        });
    }

    function isSmallSize(size) {
        return (size < pageSmallSize);
    }

    function toggleMenuOnBrowserResizeHandler() {
        win.on('resize', function () {
            var currentSize = win.outerWidth();
            if (isSmallSize(prevWidth) && !(isSmallSize(currentSize))) {
                menu.attr('style', '');
                menu.addClass(classToApply);
            }
            if (!isSmallSize(prevWidth) && (isSmallSize(currentSize))) {
                menu.removeClass(classToApply);
            }
            prevWidth = currentSize;
        });
    }

    toggleMenuOnBrowserResizeHandler();
    toggleMenuOnButtonPressHandler();
}

module.exports = NavBarButton;

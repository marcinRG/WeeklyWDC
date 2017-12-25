'use strict';

function NavBarButton(settings) {
    var win = settings.window;
    var navBtn = settings.button;
    var menu = settings.menu;
    var pageSmallSize = settings.pageSmallSize;
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
                menu.show();
            }
            if (!isSmallSize(prevWidth) && (isSmallSize(currentSize))) {
                menu.hide();
            }
            prevWidth = currentSize;
        });
    }

    toggleMenuOnBrowserResizeHandler();
    toggleMenuOnButtonPressHandler();
}

module.exports = NavBarButton;

'use strict';

function ChangeClassOnEvent(settings) {
    var win = settings.window;
    var navbarElem = settings.navbar;
    var pageSmallSize = settings.pageSmallSize || 0;
    var pixelsToChangeBig = settings.pixelsChangeBig;
    var pixelsToChangeSmall = settings.pixelsChangeSmall;
    var classToChange = settings.classToChange;

    var prevScroll = 0;

    function changeNavbarStyle(breakVal, scrollTop) {
        if (!((scrollTop < breakVal && prevScroll < breakVal) ||
            ((scrollTop > breakVal && prevScroll > breakVal)))) {
            if (scrollTop > breakVal) {
                navbarElem.addClass(classToChange);
            }
            else {
                navbarElem.removeClass(classToChange);
            }
        }
        prevScroll = scrollTop;
    }

    function setNavbarStyle(scrollTop, windowObj) {
        var scrollBreak =
            (pageSmallSize > windowObj.outerWidth()) ? pixelsToChangeSmall : pixelsToChangeBig;
        changeNavbarStyle(scrollBreak, scrollTop);
    }

    function addEventHandlerOnScroll() {
        win.on('scroll', function () {
            var scrollTop = win.scrollTop();
            setNavbarStyle(scrollTop, win);
        });
    }

    addEventHandlerOnScroll();
}

module.exports = ChangeClassOnEvent;

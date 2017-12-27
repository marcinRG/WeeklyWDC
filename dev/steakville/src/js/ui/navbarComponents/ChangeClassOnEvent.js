'use strict';

function ChangeClassOnEvent(settings) {
    var navbarElem = settings.navbar;
    var pageSmallSize = settings.pageSmallSize || 0;
    var pixelsToChangeBig = settings.pixelsChangeBig;
    var pixelsToChangeSmall = settings.pixelsChangeSmall;
    var classToChange = settings.classToChange;

    var prevScroll = 0;

    function changeNavbarStyle(breakVal) {
        var scrollTop = window.pageYOffset;
        if (!((scrollTop < breakVal && prevScroll < breakVal) ||
            ((scrollTop > breakVal && prevScroll > breakVal)))) {
            if (scrollTop > breakVal) {
                navbarElem.classList.add(classToChange);
            }
            else {
                navbarElem.classList.remove(classToChange);
            }
        }
        prevScroll = scrollTop;
    }

    function setNavbarStyle() {
        var scrollBreak =
            (pageSmallSize > window.outerWidth) ? pixelsToChangeSmall : pixelsToChangeBig;
        changeNavbarStyle(scrollBreak);
    }

    function addEventHandlerOnScroll() {
        window.addEventListener('scroll', function () {
            setNavbarStyle();
        });
    }

    setNavbarStyle();
    return {
        run: addEventHandlerOnScroll
    };
}

module.exports = ChangeClassOnEvent;

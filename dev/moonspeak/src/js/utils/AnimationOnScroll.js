'use strict';

function partWindowHeight(precentage, winObj) {
    var height = winObj.height();
    return (height * (precentage / 100));
}

function AnimationOnScroll(settings) {
    var win = settings.window;
    var elem = settings.elem;
    var minWidth = settings.minWidth;
    var triggerTopPoint = settings.triggerTopPoint;
    var triggerBottomPoint = settings.triggerBottomPoint;
    var funcFirst = settings.funcFirst;
    var funcSecond = settings.funcSecond;

    var roundError = 1;
    var eventIn = false;
    var eventOut = true;
    var top = 0;
    var bottom = 0;

    function getElemTopBottom(elem) {
        if (elem || elem.offset()) {
            top = elem.offset().top;
            bottom = elem.offset().top + elem.outerHeight();
        }
    }

    function doInside() {
        if (eventIn) {
            eventOut = true;
            eventIn = false;
            funcFirst();
        }
    }

    function doOutside() {
        if (eventOut) {
            eventOut = false;
            eventIn = true;
            funcSecond();
        }
    }

    function isInside(scrollTop) {
        if ((scrollTop + roundError + partWindowHeight(triggerTopPoint, win) >= top) &&
            (scrollTop + roundError + partWindowHeight(triggerBottomPoint, win) < bottom)) {
            return true;
        }
    }

    function triggerFunctions(scrollTop) {
        if (isInside(scrollTop)) {
            doInside();
            return;
        }
        doOutside();
    }

    function addOnResizeHandler() {
        win.on('resize', function () {
            getElemTopBottom(elem);
            checkWindowWidthAndRun(win.scrollTop());
        });
    }

    function checkWindowWidthAndRun(scrollTop) {
        if (win.outerWidth() > minWidth) {
            triggerFunctions(scrollTop);
        }
    }

    function addOnScrollHandler() {
        win.on('scroll', function () {
            var scrollTop = win.scrollTop();
            checkWindowWidthAndRun(scrollTop);
        });
    }

    getElemTopBottom(elem);
    checkWindowWidthAndRun(win.scrollTop());
    addOnResizeHandler();
    addOnScrollHandler();
}

module.exports = AnimationOnScroll;

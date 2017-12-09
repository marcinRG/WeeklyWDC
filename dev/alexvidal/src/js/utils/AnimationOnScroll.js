'use strict';

function partWindowHeight(precentage) {
    var height = window.innerHeight;
    return (height * (precentage / 100));
}

function AnimationOnScroll(settings) {
    var elem = settings.elem;
    var minWidth = settings.minWidth;
    var triggerTopPoint = settings.triggerTopPoint;
    var triggerBottomPoint = settings.triggerBottomPoint;
    var funcFirst = settings.funcFirst;
    var funcSecond = settings.funcSecond;

    var roundError = 1;
    var prevValue;
    var top = 0;
    var bottom = 0;

    function getElemTopBottom() {
        if (elem) {
            top = elem.getBoundingClientRect().top + window.pageYOffset;
            bottom = top + elem.getBoundingClientRect().height;
        }
    }

    function doInside() {
        if (funcFirst) {
            funcFirst();
        }
    }

    function doOutside() {
        if (funcSecond) {
            funcSecond();
        }
    }

    function isInside() {
        var scrollTop = window.pageYOffset;
        if ((scrollTop + roundError + partWindowHeight(triggerTopPoint) >= top) &&
            (scrollTop + roundError + partWindowHeight(triggerBottomPoint) < bottom)) {
            return true;
        }
        return false;
    }

    function triggerFunctions() {
        var newVal = isInside();
        if (prevValue !== newVal) {
            if (newVal) {
                doInside();
            }
            else {
                doOutside();
            }
        }
        prevValue = newVal;
    }

    function addOnResizeHandler() {
        window.addEventListener('resize', function () {
            getElemTopBottom(elem);
            checkWindowWidthAndRun();
        });
    }

    function checkWindowWidthAndRun() {
        if (window.outerWidth > minWidth) {
            triggerFunctions();
        }
    }

    function addOnScrollHandler() {
        window.addEventListener('scroll', function () {
            checkWindowWidthAndRun();
        });
    }

    function initialize() {
        getElemTopBottom();
        addOnResizeHandler();
        addOnScrollHandler();
    }

    return {
        run: initialize
    };
}

module.exports = AnimationOnScroll;

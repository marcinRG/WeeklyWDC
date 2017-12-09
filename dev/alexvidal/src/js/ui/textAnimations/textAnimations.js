'use strict';
var utils = require('../../utils/Utlities');

function TimeAnimation(settings) {
    var timeTxt = settings.elem;
    var animClass = settings.animClass;
    var hideClass = settings.hideClass;
    var deltaVal = settings.changeValue;
    var showTime = deltaVal * 1000 - 250;
    var hideTime = 250;
    var timeOutId;
    var seconds = 0;

    function animate() {
        timeTxt.textContent = seconds;
        utils.swapClasses(timeTxt, hideClass, animClass);
        timeOutId = utils.executeInFuture(timeOutId, hide, showTime);
    }

    function hide() {
        utils.swapClasses(timeTxt, animClass, hideClass);
        seconds = seconds + deltaVal;
        timeOutId = utils.executeInFuture(timeOutId, animate, hideTime);
    }

    return {
        run: animate
    };
}

function CountUpAnimation(settings) {
    var elem = settings.elem;
    var animClass = settings.animClass;
    var hideClass = settings.hideClass;
    var deltaVal = settings.changeValue;
    var maxVal = settings.maxValue;
    var time = 0;
    var iteration = 0;
    var showTime = 250;
    var hideTime = 250;
    var timeOutId;

    function animate() {
        elem.textContent = iteration;
        utils.swapClasses(elem, hideClass, animClass);
        if (iteration < maxVal) {
            time = showTime;
        }
        else {
            time = 5 * (maxVal / deltaVal) * 1000;
            iteration = 0;
        }
        timeOutId = utils.executeInFuture(timeOutId, hide, time);
    }

    function hide() {
        utils.swapClasses(elem, animClass, hideClass);
        iteration = iteration + deltaVal;
        timeOutId = utils.executeInFuture(timeOutId, animate, hideTime);
    }

    return {
        run: function () {
            animate();
        }
    };
}

module.exports = {
    TimeAnimation: TimeAnimation,
    CountUpAnimation: CountUpAnimation
};

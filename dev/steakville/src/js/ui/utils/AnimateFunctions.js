'use strict';

var velocity = require('velocity-animate');
var isShownString = 'display: block';

function doSlideAnimation(elem, animation, slideTime, easing) {
    velocity(elem, animation, {
        duration: slideTime,
        easing: easing
    });
}

function scrollTo(elem, time, easing) {
    velocity(elem, 'scroll', {
        duration: time,
        easing: easing
    });
}

function isShown(elem) {
    if ((elem.hasAttribute('style')) &&
        (elem.getAttribute('style').indexOf(isShownString) >= 0)) {
        return true;
    }
    return false;
}

function slideToggle(elem, time, ease) {
    if (isShown(elem)) {
        doSlideAnimation(elem, 'slideUp', time, ease);
    }
    else {
        doSlideAnimation(elem, 'slideDown', time, ease);
    }
}

function animateProgress(elem, time, ease, precentage) {
    elem.style.width = 0;
    velocity(elem, {
        width: precentage
    }, {
        duration: time,
        easing: ease
    });
}

module.exports = {
    isShown: isShown,
    doSlideAnimation: doSlideAnimation,
    scrollTo: scrollTo,
    slideToggle: slideToggle,
    animateProgress: animateProgress
};

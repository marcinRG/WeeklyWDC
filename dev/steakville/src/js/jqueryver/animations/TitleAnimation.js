'use strict';

var utils = require('../utils/Utlities');

function TitleAnimation(settings) {
    var title = settings.title;
    var button = settings.button;
    var titleAnimations = settings.titleAnimations;
    var hideAnimation = settings.hideAnimation;
    var longTime = settings.longTime;
    var shortTime = settings.shortTime;

    var counter = 0;
    var timeOutId;

    function updateCounter(currentValue, maxLength) {
        if (currentValue < maxLength - 1) {
            currentValue = currentValue + 1;
        }
        else {
            currentValue = 0;
        }
        return currentValue;
    }

    function clearClasses() {
        title.attr('class', '');
        button.attr('class', '');
    }

    function hideTitle() {
        clearClasses();
        counter = updateCounter(counter, titleAnimations.length);
        title.addClass(hideAnimation);
        button.addClass(hideAnimation);
        utils.executeInFuture(timeOutId, animateTitle, shortTime);
    }

    function animateTitle() {
        clearClasses();
        title.addClass(titleAnimations[counter]);
        button.addClass(titleAnimations[titleAnimations.length - counter - 1]);
        timeOutId = utils.executeInFuture(timeOutId, hideTitle, longTime);
    }

    animateTitle();
}

module.exports = TitleAnimation;

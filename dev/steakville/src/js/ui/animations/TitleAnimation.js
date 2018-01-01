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
        title.setAttribute('class', '');
        button.setAttribute('class', '');
    }

    function hideTitle() {
        clearClasses();
        counter = updateCounter(counter, titleAnimations.length);
        title.classList.add(hideAnimation);
        button.classList.add(hideAnimation);
        timeOutId = utils.executeInFuture(timeOutId, animateTitle, shortTime);
    }

    function animateTitle() {
        clearClasses();
        title.classList.add(titleAnimations[counter]);
        button.classList.add(titleAnimations[titleAnimations.length - counter - 1]);
        timeOutId = utils.executeInFuture(timeOutId, hideTitle, longTime);
    }

    return {
        run: animateTitle
    };
}

module.exports = TitleAnimation;

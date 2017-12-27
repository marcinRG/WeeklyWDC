'use strict';

var utils = require('../utils/Utlities');

function BurgerAnimation(settings) {
    var hamburgers = Array.from(settings.hamburgers);
    var classOdd = settings.classOdd;
    var classEven = settings.classEven;
    var classHide = settings.classHide;

    function showHamburgers() {
        hamburgers = hamburgers.map(utils.addAnimationDelay(0, 0.25));
        var className = classOdd;
        for (var i = 0; i < hamburgers.length; i++) {
            className = classOdd;
            if (i % 2) {
                className = classEven;
            }
            utils.swapClasses(hamburgers[i], classHide, className);
        }
    }

    function hideHamburgers() {
        hamburgers = hamburgers.map(utils.addAnimationDelay(0, 0.5));
        for (var i = 0; i < hamburgers.length; i++) {
            hamburgers[i].classList.remove(classEven, classOdd);
            hamburgers[i].classList.add(classHide);
        }
    }

    return {
        showHamburgers: showHamburgers,
        hideHamburgers: hideHamburgers
    };
}

module.exports = BurgerAnimation;

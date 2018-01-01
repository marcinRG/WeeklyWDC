'use strict';

var utils = require('../utils/Utlities');

function DishesAnimation(settings) {
    var dishes = settings.dishes;
    var showClass = settings.showClass;
    var hideClass = settings.hideClass;
    var dishesLeft = Array.from(dishes.querySelectorAll('.left .meal'));
    var dishesRight = Array.from(dishes.querySelectorAll('.right .meal'));

    function showDishes() {
        dishesLeft = dishesLeft.map(utils.addAnimationDelay(0, 0.25));
        dishesRight = dishesRight.map(utils.addAnimationDelay(0, 0.25));

        dishesRight = dishesRight.map(utils.swapElemClasses(hideClass, showClass));
        dishesLeft = dishesLeft.map(utils.swapElemClasses(hideClass, showClass));
    }

    function hideDishes() {
        dishesLeft = dishesLeft.map(utils.resetElemStyle());
        dishesRight = dishesRight.map(utils.resetElemStyle());

        dishesLeft = dishesLeft.map(utils.swapElemClasses(showClass, hideClass));
        dishesRight = dishesRight.map(utils.swapElemClasses(showClass, hideClass));
    }

    return {
        showDishes: showDishes,
        hideDishes: hideDishes
    };
}

module.exports = DishesAnimation;

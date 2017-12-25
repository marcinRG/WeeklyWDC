'use strict';

function addAnimationDelay(intialDelay, delay) {
    return function (index, value) {
        value.style.webkitAnimationDelay = (intialDelay + index * delay) + 's';
        value.style.animationDelay = (intialDelay + index * delay) + 's';
        return value;
    };
}

function resetElemStyle() {
    return function (index, value) {
        value.removeAttribute('style');
        return value;
    };
}

function swapElemClasses(classToRemove, classToAdd) {
    return function (index, value) {
        value.classList.remove(classToRemove);
        value.classList.add(classToAdd);
        return value;
    };
}

function addClassToElem(className) {
    return function (index, value) {
        value.className = className;
        return value;
    };
}

function executeInFuture(timeOutId, func, time) {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(func, time);
    return timeOutId;
}

module.exports = {
    addAnimationDelay: addAnimationDelay,
    resetElemStyle: resetElemStyle,
    addClassToElem: addClassToElem,
    swapElemClasses: swapElemClasses,
    executeInFuture: executeInFuture
};

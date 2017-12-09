'use strict';

function addAnimationDelay(intialDelay, delay) {
    return function (value, index) {
        value.style.webkitAnimationDelay = (intialDelay + index * delay) + 's';
        value.style.animationDelay = (intialDelay + index * delay) + 's';
        return value;
    };
}

function resetElemStyle() {
    return function (value) {
        value.removeAttribute('style');
        return value;
    };
}

function swapClasses(elem, classToRemove, classToAdd) {
    elem.classList.remove(classToRemove);
    elem.classList.add(classToAdd);
}

function swapElemClasses(classToRemove, classToAdd) {
    return function (value) {
        swapClasses(value, classToRemove, classToAdd);
        return value;
    };
}

function addClassToElem(className) {
    return function (value) {
        value.classList.add(className);
        return value;
    };
}

function removeClassFromElem(className) {
    return function (value) {
        if (Array.isArray(className)) {
            className.forEach(function (val) {
                value.classList.remove(val);
            });
        }
        else {
            value.classList.remove(className);
        }
        return value;
    };
}

function executeInFuture(timeOutId, func, time) {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(func, time);
    return timeOutId;
}

function removeAllNonPrintableCharacters(text) {
    return text.replace(/[^\x20-\x7E]+/g, '');
}

function removeSpaces(text) {
    return text.replace(/ {2,}/g, ' ');
}

function updateCounterWithMaxValue(currentValue, maxLength) {
    if (currentValue < maxLength - 1) {
        currentValue = currentValue + 1;
    }
    else {
        currentValue = 0;
    }
    return currentValue;
}

function doAnimation(elems, className, mainDelay, delay) {
    elems.map(resetElemStyle());
    elems.map(addAnimationDelay(mainDelay, delay));
    elems.map(addClassToElem(className));
}

module.exports = {
    removeAllNonPrintableCharacters: removeAllNonPrintableCharacters,
    removeSpaces: removeSpaces,
    swapClasses: swapClasses,
    addAnimationDelay: addAnimationDelay,
    resetElemStyle: resetElemStyle,
    addClassToElem: addClassToElem,
    removeClassFromElem: removeClassFromElem,
    swapElemClasses: swapElemClasses,
    executeInFuture: executeInFuture,
    updateCounterWithMaxValue: updateCounterWithMaxValue,
    doAnimation: doAnimation
};

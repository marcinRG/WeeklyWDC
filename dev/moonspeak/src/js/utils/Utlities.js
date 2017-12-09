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
        value.classList.add(className);
        return value;
    };
}

function removeClassFromElem(className) {
    return function (index, value) {
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

function changeTextToSpans(elem, splitChar, func) {
    var elemsArray = elem.text().split(splitChar);
    elemsArray = elemsArray.map(function (value) {
        return value + splitChar;
    });
    elemsArray = elemsArray.map(func);
    return elemsArray;
}

function appendArrayOfElems(elem, arrayOfElements) {
    elem.html('');
    arrayOfElements.forEach(function (value) {
        elem.append(value);
    });
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
    addAnimationDelay: addAnimationDelay,
    resetElemStyle: resetElemStyle,
    addClassToElem: addClassToElem,
    removeClassFromElem: removeClassFromElem,
    swapElemClasses: swapElemClasses,
    executeInFuture: executeInFuture,
    appendArrayOfElems: appendArrayOfElems,
    changeTextToSpans: changeTextToSpans,
    updateCounterWithMaxValue: updateCounterWithMaxValue,
    doAnimation: doAnimation
};

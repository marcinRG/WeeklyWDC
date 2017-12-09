'use strict';
var $ = require('jquery');
var utils = require('../utils/Utlities');

function createSpan(text) {
    var span = document.createElement('span');
    span.textContent = text;
    return span;
}

function replaceTextContent(elem) {
    var str = utils.removeSpaces(utils.removeAllNonPrintableCharacters(elem.text()));
    elem.text(str);
}

function calculateAnimationLength(amount, animationParams) {
    return ((animationParams.animLength + 1 + animationParams.intialDelay +
    ((amount - 1) * animationParams.delay)) * 1000 +
    animationParams.showTime);
}

function TextAnimation(settings) {
    var text = settings.elem;
    var showParams = settings.showParams;
    var hideParams = settings.hideParams;
    var showTime;
    var hideTime;
    var spans;
    var timeOutId;

    function calculateAnimationTimes() {
        showTime = calculateAnimationLength(spans.length, showParams);
        hideTime = calculateAnimationLength(spans.length, hideParams);
    }

    function prepareElem() {
        var spansArray;
        replaceTextContent(text);
        spansArray = utils.changeTextToSpans(text, ' ', createSpan);
        utils.appendArrayOfElems(text, spansArray);
        spans = $(text).find('span');
    }

    function animate() {
        spans.map(utils.removeClassFromElem(hideParams.className));
        utils.doAnimation(spans, showParams.className,
            showParams.intialDelay, showParams.delay);
        timeOutId = utils.executeInFuture(timeOutId, hideText, showTime);
    }

    function hideText() {
        spans.map(utils.removeClassFromElem(showParams.className));
        utils.doAnimation(spans, hideParams.className,
            hideParams.intialDelay, hideParams.delay);
        timeOutId = utils.executeInFuture(timeOutId, animate, hideTime);
    }

    prepareElem();
    calculateAnimationTimes();
    animate();
}

module.exports = {
    TextAnimation: TextAnimation
};

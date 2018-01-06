'use strict';
var utils = require('../utils/Utlities');

function createSpan(text) {
    var span = document.createElement('span');
    span.textContent = text;
    return span;
}

function changeTextToSpans(elem) {
    var elemsArray = elem.textContent.split('');
    elemsArray = elemsArray.map(createSpan);
    elemsArray = elemsArray.map(utils.addAnimationDelay(1, 0.3));
    return elemsArray;
}

function addSpansToElement(elem, spans) {
    elem.innerHTML = '';
    spans.forEach(function (value) {
        elem.appendChild(value);
    });
}

function MainTextAnimation(settings) {
    var titleWrapper = settings.title;
    var title = titleWrapper.querySelector('.title-text');
    var subtitle = titleWrapper.querySelector('.title-small');
    var delay = settings.delay;
    var spans = changeTextToSpans(title);
    var timeOutId;

    function setAnimationClasses() {
        subtitle.classList.add('small-animation');
        spans.map(utils.addClassToElem('span-animation'));
    }

    function run() {
        addSpansToElement(title, spans);
        timeOutId = utils.executeInFuture(timeOutId, setAnimationClasses, delay);
    }

    return {
        run: run
    };
}

module.exports = MainTextAnimation;

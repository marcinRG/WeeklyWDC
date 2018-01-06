'use strict';
var utils = require('../utils/Utlities');

function prepareSlide(slide) {
    var bgImage = slide.getAttribute('data-img');
    slide.innerHTML = '';
    for (var i = 0; i < 4; i++) {
        var panelDiv = document.createElement('div');
        panelDiv.style.backgroundImage = 'url("' + bgImage + '")';
        panelDiv.classList.add('panel');
        slide.appendChild(panelDiv);
    }
}

function removeClasses(slides, elem) {
    if (elem >= 0) {
        var slide = slides[elem];
        slide.classList.remove('to-top', 'previous');
        var childNodes = utils.toArray(slide.children);
        childNodes.map(utils.removeClassFromElem('slide-panel'));
    }
}

function showSlide(slides, current, previous) {
    moveSlideDown(slides, previous);
    var slide = slides[current];
    slide.classList.add('to-top');
    var childNodes = utils.toArray(slide.children);
    childNodes.map(utils.addClassToElem('slide-panel'));
}

function moveSlideDown(slides, previous) {
    if (previous >= 0) {
        var slide = slides[previous];
        utils.swapClasses(slide, 'to-top', 'previous');
    }
}

function chairSliderInitialize(slides) {
    for (var i = 0; i < slides.length; i++) {
        prepareSlide(slides[i]);
    }
}

function ChairSlider(settings) {
    var slider = settings.chairSlider;
    var delay = settings.delay;
    var slides = slider.querySelectorAll('.slide');
    var val = -1;
    var prev = -1;
    var tohide = -1;
    var timeOutId;

    function changeSlide() {
        tohide = prev;
        prev = val;
        val = utils.updateCounterWithMaxValue(val, slides.length);
        showSlide(slides, val, prev);
        removeClasses(slides, tohide);
        timeOutId = utils.executeInFuture(timeOutId, changeSlide, delay);
    }

    function run() {
        chairSliderInitialize(slides);
        showSlide(slides, 0, -1);
        timeOutId = utils.executeInFuture(timeOutId, changeSlide, delay);
    }

    return {
        run: run
    };
}

module.exports = ChairSlider;

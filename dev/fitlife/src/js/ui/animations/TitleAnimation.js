'use strict';
var $ = require('jquery');

function createSpanWithDelayProperty(intial, diff) {
    return function (value) {
        var span = document.createElement('span');
        span.textContent = value;
        span.style.animationDelay = intial + 's';
        intial = intial + diff;
        return span;
    };
}

function changeTextToSpans(elem) {
    var elemsArray = elem.text().split('');
    elemsArray = elemsArray.map(createSpanWithDelayProperty(1, 0.3));
    return elemsArray;

}

function addSpansToElement(elem, spans) {
    elem.html('');
    spans.forEach(function (value) {
        elem.append(value);
    });
}

function MainTextAnimation(settings) {

    var titleWrapper = settings.title;
    var title = titleWrapper.children('h1').filter(':first');
    var subtitle = titleWrapper.children('small').filter(':first');
    var spans = changeTextToSpans(title);
    addSpansToElement(title, spans);
    setTimeout(function () {
        subtitle.addClass('small-animation');
        spans.forEach(function (value) {
            $(value).addClass('span-animation');
        });
    }, settings.animationDelay);
}
///-------------------------------------------
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
        slide.classList.remove('to-top');
        slide.classList.remove('previous');
        var childNodes = slide.children;
        for (var i = 0; i < childNodes.length; i++) {
            childNodes[i].classList.remove('slide-panel');
        }
    }
}

function showSlide(slides, current, previous) {
    moveSlideDown(slides, previous);
    var slide = slides[current];
    slide.classList.add('to-top');
    var childNodes = slide.children;
    for (var i = 0; i < childNodes.length; i++) {
        childNodes[i].classList.add('slide-panel');
    }
}

function moveSlideDown(slides, previous) {
    if (previous >= 0) {
        var slide = slides[previous];
        slide.classList.remove('to-top');
        slide.classList.add('previous');
    }
}

function chairSliderIntialize(slides) {
    for (var i = 0; i < slides.length; i++) {
        prepareSlide(slides[i]);
    }
}

function ChairSlider(settings) {
    var slider = settings.chairSlider;
    var slides = slider.children('.slide');
    var val = -1, prev = -1, tohide = -1;
    chairSliderIntialize(slides);
    showSlide(slides, 0, -1);
    setInterval(function () {
        tohide = prev;
        prev = val;
        if (val < slides.length - 1) {
            val = val + 1;
        }
        else {
            val = 0;
        }

        showSlide(slides, val, prev);
        removeClasses(slides, tohide);
    }, settings.chairAnimationDelay);
}

module.exports = {
    MainTextAnimation: MainTextAnimation,
    ChairSlider: ChairSlider
};

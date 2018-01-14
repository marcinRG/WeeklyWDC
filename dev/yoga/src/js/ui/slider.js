'use strict';

function Slider(settings) {
    var slider = settings.slider;
    var activeClass = settings.activeClass;
    var slides = Array.from(slider.querySelectorAll('.slide-elem'));
    var nextBtn = slider.querySelector('.next');
    var prevBtn = slider.querySelector('.prev');
    var autoFunc;
    var current = 0;
    var max = slides.length;

    function setActive(i) {
        slides[i].classList.add(activeClass);
    }

    function removeActive(i) {
        slides[i].classList.remove(activeClass);
    }

    function rotate() {
        clearTimeout(autoFunc);
        autoFunc = setTimeout(next, 7500);
    }

    function next() {
        rotate();
        removeActive(current);
        if (current + 1 === max) {
            current = 0;
        }
        else {
            current = current + 1;
        }
        setActive(current);
    }

    function previous() {
        rotate();
        removeActive(current);
        if (current === 0) {
            current = max - 1;
        }
        else {
            current = current - 1;
        }
        setActive(current);
    }

    function intialize() {
        nextBtn.addEventListener('click', function () {
            next();
        });
        prevBtn.addEventListener('click', function () {
            previous();
        });
        setActive(current);
        autoFunc = setTimeout(rotate, 7500);
    }

    return {
        run: intialize
    };
}

module.exports = Slider;

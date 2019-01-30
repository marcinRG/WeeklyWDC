'use strict';

var velocity = require('velocity-animate');
var utils = require('../utils/Utlities');

function SimpleSlider(settings) {
    var delay = settings.delay;
    var slideDelay = settings.slideDelay;
    var autoPlay = settings.autoPlay;
    var currentElem = settings.currentElem;
    var slider = settings.slider;
    var navbarItemClass = settings.navbarItemClass;
    var navbarItemSelected = settings.navbarItemSelected;
    var isContinuous = settings.isContinuous;

    var prevBtn = slider.querySelector('.prev > span');
    var nextBtn = slider.querySelector('.next > span');
    var navbar = slider.querySelector('.nav');
    var slidesContainer = slider.querySelector('.slides');
    var slides = Array.from(slider.querySelectorAll('.slide'));
    var dots;
    var timeOutId;

    function createNavbarElements() {
        navbar.innerHTML = '';
        var start = isContinuous ? 1 : 0;
        var end = isContinuous ? slides.length - 1 : slides.length;
        for (var i = start; i < end; i++) {
            var span = document.createElement('span');
            span.className = navbarItemClass;
            span.setAttribute('data-number', i);
            navbar.appendChild(span);
        }
        return Array.from(navbar.querySelectorAll('.' + navbarItemClass));
    }

    function removeCLassFromCollection(collection, className) {
        if (collection) {
            for (var i = 0; i < collection.length; i++) {
                collection[i].classList.remove(className);
            }
        }
    }

    function findNextElem() {
        if (currentElem < slides.length - 1) {
            currentElem = currentElem + 1;
        }
        else {
            currentElem = 0;
        }
    }

    function findPreviousElem() {
        if (currentElem > 0) {
            currentElem = currentElem - 1;
        }
        else {
            currentElem = slides.length - 1;
        }
    }

    function changeSlide() {
        velocity(slidesContainer, 'stop');
        velocity(slidesContainer, {
            left: '-' + calculatePositionToMove(currentElem) + 'px'
        }, {
            duration: slideDelay,
            easing: 'easeOut',
            complete: onAnimationComplete
        });
    }

    function onAnimationComplete() {
        if (isContinuous) {
            if ((currentElem === 0)) {
                currentElem = slides.length - 2;
            } else {
                if ((currentElem === slides.length - 1)) {
                    currentElem = 1;
                }
            }
            slidesContainer.style.left = '-' + calculatePositionToMove(currentElem) + 'px';
        }
        removeCLassFromCollection(dots, navbarItemSelected);
        changeSelectedNavbarButton(currentElem);
        autoplay();
    }

    function next() {
        timeOutId = clearTimeout(timeOutId);
        findNextElem();
        changeSlide();
    }

    function autoplay() {
        if (autoPlay) {
            timeOutId = utils.executeInFuture(timeOutId, next, delay);
        }
    }

    function addNavbarHandlers() {
        for (var i = 0; i < dots.length; i++) {
            (function (j) {
                (dots[j]).addEventListener('click', function () {
                    currentElem = parseInt(dots[j].getAttribute('data-number'));
                    changeSlide();
                });
            }(i));
        }
    }

    function addNextHandler() {
        nextBtn.addEventListener('click', function () {
            timeOutId = clearTimeout(timeOutId);
            findNextElem();
            changeSlide();
        });
    }

    function addPreviousHandler() {
        prevBtn.addEventListener('click', function () {
            timeOutId = clearTimeout(timeOutId);
            findPreviousElem();
            changeSlide();
        });
    }

    function addResizeHandler() {
        window.addEventListener('resize', function () {
            next();
        });
    }

    function addHandlers() {
        addNavbarHandlers();
        addNextHandler();
        addPreviousHandler();
        addResizeHandler();
    }

    function prepareForContinuous() {
        if (isContinuous) {
            modifySlidesArray();
            currentElem = currentElem + 1;
            slidesContainer.style.left = '-' + calculatePositionToMove(currentElem) + 'px';
        }
    }

    function modifySlidesArray() {
        var parent = slides[0].parentNode;
        var lastNode = slides[slides.length - 1].cloneNode(true);
        var fistNode = slides[0].cloneNode(true);
        parent.insertBefore(lastNode, slides[0]);
        parent.insertBefore(fistNode, slides[slides.length - 1].nextSibling);
        slides = Array.from(parent.querySelectorAll('.slide'));
    }

    function calculatePositionToMove(position) {
        if (position <= slides.length) {
            var nextPosition = 0;
            for (var i = 0; i <= position - 1; i++) {
                nextPosition = nextPosition + slides[i].getBoundingClientRect().width;
            }
            return nextPosition;
        }
    }

    function changeSelectedNavbarButton(pos) {
        for (var i = 0; i < dots.length; i++) {
            if (pos === parseInt(dots[i].getAttribute('data-number'))) {
                dots[i].classList.add(navbarItemSelected);
            }
        }
    }

    function initialize() {
        prepareForContinuous();
        dots = createNavbarElements();
        addHandlers();
        changeSelectedNavbarButton(currentElem);
        autoplay();
    }

    return {
       run: initialize
    };
}

module.exports = SimpleSlider;

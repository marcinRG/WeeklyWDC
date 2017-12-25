'use strict';

var $ = require('jquery');
var utils = require('../utils/Utlities');

function SimpleSlider(settings) {
    var delay = settings.delay;
    var autoPlay = settings.autoPlay;
    var currentElem = settings.currentElem;
    var sliderElem = settings.sliderElem;
    var navbarItemClass = settings.navbarItemClass;
    var navbarItemSelected = settings.navbarItemSelected;

    var prevBtn = sliderElem.find('.prev').children('span');
    var nextBtn = sliderElem.find('.next').children('span');
    var navbar = sliderElem.find('.nav');
    var sliders = sliderElem.find('.slider').children('.slide');
    var length = sliders.length;
    var navbarElems = createNavbarElements(navbar, length);

    var timeOutId;
    function createNavbarElements(nav, length) {
        nav.html('');
        for (var i = 0; i < length; i++) {
            var span = document.createElement('span');
            $(span).addClass(navbarItemClass);
            nav.append(span);
        }
        return nav.children('span');
    }

    function removeCLassFromCollection(collection, className) {
        for (var i = 0; i < collection.length; i++) {
            $(collection[i]).removeClass(className);
        }
    }

    function findNextElem(elemNr) {
        if (elemNr < length - 1) {
            elemNr = elemNr + 1;
        }
        else {
            elemNr = 0;
        }
        return elemNr;
    }

    function next() {
        timeOutId = clearTimeout(timeOutId);
        currentElem = findNextElem(currentElem);
        changeSlide();
        autoplay();
    }

    function autoplay() {
        if (autoPlay) {
            timeOutId = utils.executeInFuture(timeOutId, next, delay);
        }
    }

    function setSliderPosition() {
        for (var i = 0; i < length; i++) {
            sliders[i].style.left = ((i - currentElem) * 100) + '%';
        }
    }

    function findPreviousElem(elemNr) {
        if (elemNr > 0) {
            elemNr = elemNr - 1;
        }
        else {
            elemNr = length - 1;
        }
        return elemNr;
    }

    function changeSlide() {
        markCurrentNavElement();
        setSliderPosition();
    }

    function previous() {
        timeOutId = clearTimeout(timeOutId);
        currentElem = findPreviousElem(currentElem);
        changeSlide();
        autoplay();
    }

    function moveTo(elem) {
        timeOutId = clearTimeout(timeOutId);
        currentElem = elem;
        changeSlide();
        autoplay();
    }

    function markCurrentNavElement() {
        removeCLassFromCollection(navbarElems, navbarItemSelected);
        $(navbarElems[currentElem]).addClass(navbarItemSelected);
    }

    function addNavbarHandlers() {
        for (var i = 0; i < navbarElems.length; i++) {
            (function (j) {
                $(navbarElems[j]).on('click', function () {
                    moveTo(j);
                });
            }(i));
        }
    }

    function addNextHandler() {
        prevBtn.on('click', function () {
            previous();
        })
    }

    function addPreviousHandler() {
        nextBtn.on('click', function () {
            next();
        })
    }

    function addHandlers() {
        addNavbarHandlers();
        addNextHandler();
        addPreviousHandler();
    }

    function intialize() {
        markCurrentNavElement();
        setSliderPosition();
        autoplay();
        addHandlers();
    }
    intialize();
}

module.exports = SimpleSlider;

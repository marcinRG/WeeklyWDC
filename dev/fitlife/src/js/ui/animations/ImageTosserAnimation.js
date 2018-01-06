'use strict';
var utils = require('../utils/Utlities');

function createImagesPropeties(imagesCount, rotateAng) {
    return function (value, index) {
        var sign = 1;
        value.style.zIndex = (imagesCount - index) + '';
        if (index % 2) {
            sign = 1 * (index + 1) / 2;
        }
        else {
            sign = -1 * (index) / 2;
        }
        value.style.transform = 'rotateZ(' + (sign * rotateAng) + 'deg)';
        return value;
    };
}

function imagesInitialize(images) {
    var imgs = utils.toArray(images);
    return imgs.map(createImagesPropeties(imgs.length, 5));
}

function ImageTosser(settings) {
    var longSmall = settings.longSmall;
    var shortSmall = settings.shortSmall;
    var longBig = settings.longBig;
    var shortBig = settings.shortBig;
    var changeTrigger = settings.changeTrigger;
    var images = imagesInitialize(settings.images);
    var timeOutId;
    var counter = 0;
    var animationShow = true;
    var maxValue = images.length;
    var prevWidth = window.outerWidth;

    function changeCounterSmall() {
        if (animationShow) {
            if (counter === maxValue - 1) {
                animationShow = false;
            }
            if (counter < maxValue - 1) {
                counter = counter + 1;
            }
            return;
        }
        if (counter === 0) {
            animationShow = true;
        }
        if (counter > 0) {
            counter = counter - 1;
        }
    }

    function resetImageClasses() {
        for (var i = 0; i < images.length; i++) {
            images[i].className = 'image';
        }
    }

    function doImageSmall() {
        changeCounterSmall();
        if (animationShow) {
            animatePicturesSmall();
        }
        else {
            hidePicturesSmall();
        }
    }

    function animatePicturesSmall() {
        if (counter % 2) {
            images[counter].classList.remove('go-left-back');
            images[counter].classList.add('go-left');
        }
        else {
            images[counter].classList.remove('go-right-back');
            images[counter].classList.add('go-right');
        }
        timeOutId = utils.executeInFuture(timeOutId, doImageSmall, longSmall);
    }

    function hidePicturesSmall() {
        if (counter % 2) {
            images[counter].classList.remove('go-left');
            images[counter].classList.add('go-left-back');
        }
        else {
            images[counter].classList.remove('go-right');
            images[counter].classList.add('go-right-back');
        }
        timeOutId = utils.executeInFuture(timeOutId, doImageSmall, shortSmall);
    }

    function shiftValues(counter, value, maxValue) {
        if ((value - counter) >= 0) {
            return (value - counter);
        }
        else {
            return (maxValue - counter + value);
        }
    }

    function animatePictures() {
        for (var i = 0; i < maxValue; i++) {
            images[i].style.zIndex = maxValue -
                shiftValues(counter, i, maxValue) + '';
            images[i].classList.add('transform-' +
                (shiftValues(counter, i, maxValue) + 1));
        }
        timeOutId = utils.executeInFuture(timeOutId, hidePictures, longBig);
    }

    function hidePictures() {
        for (var i = 0; i < maxValue; i++) {
            images[i].classList.add('transform-bck-' +
                (shiftValues(counter, i, maxValue) + 1));
        }
        timeOutId = utils.executeInFuture(timeOutId, resetClasses, shortBig);
    }

    function resetClasses() {
        resetImageClasses();
        counter = utils.updateCounterWithMaxValue(counter, maxValue);
        animatePictures();
    }

    function reset() {
        counter = 0;
        imagesInitialize(settings.images);
        resetImageClasses();
    }

    function addResizeListener() {
        window.addEventListener('resize', function () {
            var currentSize = window.outerWidth;
            if ((changeTrigger > prevWidth) && !(changeTrigger > currentSize)) {
                reset();
                timeOutId = utils.executeInFuture(timeOutId, animatePictures, 1000);
            }
            if (!(changeTrigger > prevWidth) && (changeTrigger > currentSize)) {
                reset();
                timeOutId = utils.executeInFuture(timeOutId, animatePicturesSmall, 1000);
            }
            prevWidth = currentSize;
        });
    }

    function run() {
        reset();
        addResizeListener();
        if (prevWidth > changeTrigger) {
            animatePictures();
        }
        else {
            animatePicturesSmall();
        }
    }

    return {
        run: run
    };
}

module.exports = ImageTosser;

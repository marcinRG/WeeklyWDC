'use strict';

function createImagesPropeties(imagesCount, rotateAng) {
    return function (index, value) {
        var sign = 1;
        value.style.zIndex = imagesCount - index;
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

function imagesIntialize(images) {
    return images.map(createImagesPropeties(images.length, 5));
}

function ImageTosser(settings) {

    var win = settings.window;
    var longSmall = settings.longSmall;
    var shortSmall = settings.shortSmall;
    var longBig = settings.longBig;
    var shortBig = settings.shortBig;
    var changeTrigger = settings.changeTrigger;
    var images = imagesIntialize(settings.images);

    var timeOutId;
    var counter = 0;
    var animationShow = true;
    var maxValue = images.length;
    var prevWidth = win.outerWidth();

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
            images[i].className = '';
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
            images[counter].classList.remove('goLeftBack');
            images[counter].classList.add('goLeft');
        }
        else {
            images[counter].classList.remove('goRightBack');
            images[counter].classList.add('goRight');
        }
        executeInFuture(doImageSmall, longSmall);
    }

    function hidePicturesSmall() {
        if (counter % 2) {
            images[counter].classList.remove('goLeft');
            images[counter].classList.add('goLeftBack');
        }
        else {
            images[counter].classList.remove('goRight');
            images[counter].classList.add('goRightBack');
        }
        executeInFuture(doImageSmall, shortSmall);
    }

    function shiftValues(counter, value, maxValue) {
        if ((value - counter) >= 0) {
            return (value - counter);
        }
        else {
            return (maxValue - counter + value);
        }
    }

    function executeInFuture(func, time) {
        clearTimeout(timeOutId);
        timeOutId = setTimeout(func, time);
    }

    function updateCounterBig(currentValue, maxLength) {
        if (currentValue < maxLength - 1) {
            currentValue = currentValue + 1;
        }
        else {
            currentValue = 0;
        }
        return currentValue;
    }

    function animatePictures() {
        for (var i = 0; i < maxValue; i++) {
            images[i].style.zIndex = maxValue -
                shiftValues(counter, i, maxValue);
            images[i].classList.add('transform-' +
                (shiftValues(counter, i, maxValue) + 1));
        }
        executeInFuture(hidePictures, longBig);
    }

    function hidePictures() {
        for (var i = 0; i < maxValue; i++) {
            images[i].classList.add('transform-bck-' +
                (shiftValues(counter, i, maxValue) + 1));
        }
        executeInFuture(resetClasses, shortBig);
    }

    function resetClasses() {
        resetImageClasses();
        counter = updateCounterBig(counter, maxValue);
        animatePictures();
    }

    function reset() {
        counter = 0;
        imagesIntialize(settings.images);
        resetImageClasses();
    }

    win.on('resize', function () {
        var currentSize = win.outerWidth();
        if ((changeTrigger > prevWidth) && !(changeTrigger > currentSize)) {
            reset();
            executeInFuture(animatePictures, 1000);
        }
        if (!(changeTrigger > prevWidth) && (changeTrigger > currentSize)) {
            reset();
            executeInFuture(animatePicturesSmall, 1000);
        }
        prevWidth = currentSize;
    });

    if (prevWidth > changeTrigger) {
        animatePictures();
    }
    else {
        animatePicturesSmall();
    }
}

module.exports = ImageTosser;

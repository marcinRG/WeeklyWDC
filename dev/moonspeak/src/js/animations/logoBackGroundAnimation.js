'use strict';
var $ = require('jquery');
var utils = require('../utils/Utlities');

function BackGroundLogoAnimation(settings) {
    var elem = settings.elem;
    var animationSettings = settings.animations;
    var win = $(window);
    var minWidth = 768;
    var panelsCount = 5;
    var slides;
    var timeOutId;
    var allAnimClasses;
    var allHideClasses;
    var allColors;
    var counter = 0;
    var animationRuning = true;

    function classNamesToArray(objName) {
        var classesStr = '';
        animationSettings.forEach(function (value) {
            classesStr = classesStr + value[objName]['className'] + ' ';
        });
        return classesStr.trim().split(' ');
    }

    function allColorsToArray() {
        var classesStr = '';
        animationSettings.forEach(function (value) {
            classesStr = classesStr + value['color'] + ' ';
        });
        return classesStr.trim();
    }

    function createPanel(i) {
        var panel = document.createElement('div');
        $(panel).addClass('panel');
        $(panel).addClass('panel-' + i);
        return panel;
    }

    function createContainer(i, childElem) {
        var container = document.createElement('div');
        $(container).addClass('container');
        $(container).addClass('container-' + i);
        $(container).append(childElem);
        return container;
    }

    function createSlides(elem) {
        for (var i = 0; i < panelsCount; i++) {
            var container = createContainer(i, createPanel(i));
            elem.append(container);
        }
        slides = $(elem).find('.panel');
    }

    function removeSlides() {
        $(elem).find('.container').remove();
    }

    function animate() {
        slides.map(utils.removeClassFromElem(allHideClasses));
        utils.doAnimation(slides,
            animationSettings[counter].showAnim.className,
            animationSettings[counter].showAnim.intialDelay,
            animationSettings[counter].showAnim.delay);
        timeOutId = utils.executeInFuture(timeOutId, hide,
            animationSettings[counter].showTime);
    }

    function hide() {
        slides.map(utils.removeClassFromElem(allAnimClasses));
        elem.removeClass(animationSettings[counter].color);
        utils.doAnimation(slides,
            animationSettings[counter].hideAnim.className,
            animationSettings[counter].hideAnim.intialDelay,
            animationSettings[counter].hideAnim.delay);
        counter = utils.updateCounterWithMaxValue(counter, animationSettings.length);
        elem.addClass(animationSettings[counter].color);
        timeOutId = utils.executeInFuture(timeOutId, animate,
            animationSettings[counter].hideTime);
    }

    function run() {
        if (win.outerWidth() > minWidth) {
            animationRuning = true;
            createSlides(elem);
            elem.addClass(animationSettings[counter].color);
            timeOutId = utils.executeInFuture(timeOutId, hide, 15000);
        }
        else {
            animationRuning = false;
        }
    }

    allAnimClasses = classNamesToArray('showAnim');
    allHideClasses = classNamesToArray('hideAnim');
    allColors = allColorsToArray();

    win.on('resize', function () {
        if (win.outerWidth() <= minWidth) {
            elem.removeClass(allColors);
            animationRuning = false;
            removeSlides();
            clearTimeout(timeOutId);
        }
        else {
            if (!animationRuning) {
                run();
            }
        }
    });
    run();
}

module.exports = BackGroundLogoAnimation;

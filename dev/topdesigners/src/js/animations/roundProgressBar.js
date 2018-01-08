'use strict';

var describeArc = require('./arcDraw');
var velocity = require('velocity-animate');

function RoundProgress(settings) {
    var elem = document.querySelector(settings.elementClass);
    var progressBars;

    function findAllProgressBars() {
        var barsArray = [];
        settings.progressBars.forEach(function (item) {
            var bar = elem.querySelector(item.className);
            barsArray.push({
                progressBar: bar,
                arc: bar.querySelector('.arc'),
                txt: bar.querySelector('.txt-big'),
                value: item.value,
                start: settings.intialValue,
                end: settings.intialValue + (item.value / 100) * 360
            });
        });
        return barsArray;
    }

    function animateProgressBar(pBar, animDuration, reverse) {
        var points = setBeginFinish(pBar, reverse);
        velocity(pBar.progressBar,
            {
                tween: [points.finish, points.begin]
            }, {
                duration: animDuration,
                progress: function (elements, precentage, timeRemaning, s, calculatedValue) {
                    pBar.arc.setAttribute('d', describeArc(110, 110,
                        108, pBar.start, calculatedValue));
                    pBar.txt.textContent = computeValue(pBar.value, precentage, reverse);
                }
            });
    }

    function setBeginFinish(pBar, reverse) {
        var obj = {};
        if (reverse) {
            obj.begin = pBar.end;
            obj.finish = pBar.start;
            return obj;
        }
        obj.begin = pBar.start;
        obj.finish = pBar.end;
        return obj;
    }

    function computeValue(value, percentage, reverse) {
        if (reverse) {
            return parseInt(value - (percentage * value));
        }
        return parseInt(percentage * value);
    }

    function animate() {
        progressBars.forEach(function (value) {
            animateProgressBar(value, settings.animationDuration, false);
        });
    }

    function animateReverse() {
        progressBars.forEach(function (value) {
            animateProgressBar(value, (settings.animationDuration / 4), true);
        });
    }

    progressBars = findAllProgressBars();

    return {
        forward: animate,
        reverse: animateReverse
    };
}

module.exports = RoundProgress;

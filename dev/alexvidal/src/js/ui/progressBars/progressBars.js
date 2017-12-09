'use strict';
var animFuncs = require('../../utils/AnimateFunctions');

function ProgressBars(settings) {
    var progressElems = settings.progressElems;
    var animationTime = settings.animationTime || 1000;
    var animationEasing = settings.animationEasing || 'easeOut';
    var progressBars = [];

    function addProgressPercentageDiv(elem) {
        var div = document.createElement('div');
        div.className = 'skill-precentage';
        div.style.width = elem.value;
        elem.htmlElem.appendChild(div);
    }

    function initializeProgressBars() {
        for (var i = 0; i < progressElems.length; i++) {
            var progress = {
                htmlElem: progressElems[i],
                value: progressElems[i].getAttribute('data-skill-level') + '%'
            };
            addProgressPercentageDiv(progress);
            progressBars.push(progress);
        }
    }

    function runAnimation() {
        progressBars.forEach(function (item) {
            var elem = item.htmlElem.children[0];
            animFuncs.animateProgress(elem, animationTime, animationEasing, item.value);
        });
    }

    initializeProgressBars();
    return {
        animate: runAnimation
    };
}

module.exports = ProgressBars;

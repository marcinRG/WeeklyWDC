'use strict';
var RoundProgressBar = require('./animations/roundProgressBar');
var Menu = require('./menuBar/menu');

var settings = {
    progressBars: [
        {
            className: '.months',
            value: 80
        },
        {
            className: '.projects',
            value: 50
        },
        {
            className: '.clients',
            value: 35
        }],
    elementClass: '.performance',
    elementToAnimate: 'arc',
    intialValue: 160,
    animationDuration: 2000
};

var progresBar = new RoundProgressBar(settings);
var intervalId;
progresBar.forward();
intervalId = setInterval(progresBar.forward, 10000);

var settingsMenu = {
    isHidden: true,
    menuButton: document.querySelector('nav > .nav > .menu'),
    menu: document.querySelector('nav > .menu-items'),
    showClass: 'show-menu'
};

var menu = new Menu(settingsMenu);

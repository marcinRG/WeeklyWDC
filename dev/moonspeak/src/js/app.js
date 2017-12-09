'use strict';
var $ = require('jquery');

var maps = require('./maps/maps')();
var Btn = require('./ui/navbarComponents/NavBarButton');
var ChangeClassOnEvent = require('./ui/navbarComponents/ChangeClassOnEvent');
var LogoBGAnimation = require('./animations/logoBackGroundAnimation');
var TextAnimations = require('./animations/textAnimations');

var windows = $(window);
var menu = $('.menu-items').filter(':first');
var button = $('.nav-button').filter(':first');
var nav = $('nav').filter(':first');
var logo = $('#logo');

var navbarSettings = {
    window: windows,
    button: button,
    navbar: nav,
    menu: menu,
    pageSmallSize: 768,
    classToApply: 'show',
    slideTime: 500,
    hideMenuOnClick: true,
    pixelsChangeBig: 125,
    pixelsChangeSmall: 125,
    classToChange: 'remove-spaces'
};

function Navbar(settings) {
    var navbarBtn = new Btn(settings);
    var changeClassOnEvent = new ChangeClassOnEvent(settings);
}

var navbar = new Navbar(navbarSettings);

var logoBGSettings = {
    elem: logo.filter(':first'),
    animations: [
        {
            showAnim: {
                className: 'anim-slide-down',
                intialDelay: 0,
                delay: 0.5
            },
            hideAnim: {
                className: 'anim-hide-up',
                intialDelay: 0,
                delay: 0.25
            },
            color: 'color-1',
            showTime: 10000,
            hideTime: 2000
        },
        {
            showAnim: {
                className: 'anim-slide-right',
                intialDelay: 0,
                delay: 0
            },
            hideAnim: {
                className: 'anim-hide-down',
                intialDelay: 0,
                delay: 0.3
            },
            color: 'color-1',
            showTime: 10000,
            hideTime: 3000
        },
        {
            showAnim: {
                className: 'anim-slide-left',
                intialDelay: 0,
                delay: 0.1
            },
            hideAnim: {
                className: 'anim-hide-left',
                intialDelay: 0,
                delay: 0
            },
            color: 'color-1',
            showTime: 10000,
            hideTime: 2000
        },
        {
            showAnim: {
                className: 'anim-slide-up',
                intialDelay: 0,
                delay: 0.5
            },
            hideAnim: {
                className: 'anim-hide-right',
                intialDelay: 0,
                delay: 0
            },
            color: 'color-1',
            showTime: 10000,
            hideTime: 2000
        }
    ]
};

var logoBGAnim = new LogoBGAnimation(logoBGSettings);

var logoTextParams = {
    elem: logo.find('h1'),
    showParams: {
        className: 'anim-text-show',
        animLength: 0.3,
        intialDelay: 0,
        delay: 0.1,
        showTime: 10000
    },
    hideParams: {
        className: 'anim-text-hide',
        animLength: 0.5,
        intialDelay: 0,
        delay: 0.2,
        showTime: 100
    }
};

var logoTextAnim = new TextAnimations.TextAnimation(logoTextParams);

var quoteTextParams = {
    elem: $('.quote').find('p'),
    showParams: {
        className: 'anim-quote-show',
        animLength: 1,
        intialDelay: 0,
        delay: 0.25,
        showTime: 5000
    },
    hideParams: {
        className: 'anim-quote-hide',
        animLength: 0.5,
        intialDelay: 0,
        delay: 0.1,
        showTime: 200
    }
};

var quoteTextAnim = new TextAnimations.TextAnimation(quoteTextParams);

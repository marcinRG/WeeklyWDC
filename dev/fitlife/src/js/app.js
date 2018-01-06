'use strict';
var ChangeBar = require('./ui/navbarComponents/ChangeClassOnEvent');
var NavbarButton = require('./ui/navbarComponents/NavBarButton');
var MenuLinks = require('./ui/navbarComponents/MenuItemsAndScrolls');

var navbar = document.querySelector('.navbar');
var menu = navbar.querySelector('.menu-items');
var menuLinks = menu.querySelectorAll('a');
var button = navbar.querySelector('.nav-btn');

var navBarSettings = {
    navbar: navbar,
    pageSmallSize: 768,
    pixelsChangeBig: 56,
    pixelsChangeSmall: 83,
    classToChange: 'bottom-line'
};

var changeBar = new ChangeBar(navBarSettings);
changeBar.run();

var navButtonSettings = {
    button: button,
    menu: menu,
    pageSmallSize: 768,
    slideTime: 400
};

var navButton = new NavbarButton(navButtonSettings);
navButton.run();

var menuItemsSettings = {
    menu: menu,
    menuLinks: menuLinks,
    pageSmallSize: 772,
    scrollTime: 1000,
    slideTime: 1000,
    animateScroll: true,
    hideMenuOnClick: true,
    changeClassOnScroll: false,
    changeScrollClass: ''
};
var linksOfMenu = new MenuLinks(menuItemsSettings);
linksOfMenu.run();

var TitleAnimation = require('./ui/animations/TitleAnimation');
var animationSettings = {
    title: document.querySelector('.title'),
    animationDelay: 5000
};
var titleAnimation = new TitleAnimation(animationSettings);
titleAnimation.run();

var ChairAnimation = require('./ui/animations/ChairAnimation');
var charAnimationSettings = {
    delay: 5000,
    chairSlider: document.querySelector('.slider')
};
var chairAnimation = new ChairAnimation(charAnimationSettings);
chairAnimation.run();

var imagesSliderSettings = {
    longSmall: 4000,
    shortSmall: 1000,
    longBig: 15000,
    shortBig: 800,
    images: document.querySelectorAll('.image-tosser .image'),
    changeTrigger: 992
};

var ImageTosser = require('./ui/animations/ImageTosserAnimation');
var imageTosser = new ImageTosser(imagesSliderSettings);
imageTosser.run();

var VideoPlayer = require('./ui/videoControl/VideoControls');
var playerSettings = {
    viewer: document.querySelector('.viewer'),
    button: document.querySelector('.video-btn'),
    viewerClass: 'video-play',
    buttonClass: 'button-play'
};
var videoplayer = new VideoPlayer(playerSettings);
videoplayer.run();

//
// var navbar = new NavBar(navbarSettings);
// var videoPlayer = new VideoPlayer(playerSettings);
// var textAnimation = new TextAnimation(animationSettings);
// var chairAnimation = new ChairAnimation(animationSettings);
// var imageTosser = new ImageTosser(imagesSliderSettings);

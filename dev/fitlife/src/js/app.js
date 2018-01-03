// 'use strict';
//
// var $ = require('jquery');
//
// var NavBar = require('./ui/NavbarNew');
// var VideoPlayer = require('./ui/videoControl/VideoControls');
// var TextAnimation = require('./ui/animations/TitleAnimation').MainTextAnimation;
// var ChairAnimation = require('./ui/animations/TitleAnimation').ChairSlider;
// var ImageTosser = require('./ui/animations/ImageTosserAnimation');
//
// var menu = $('.menu-items').filter(':first');
// var windows = $(window);
//
// var pageElems = {
//     'home': $('#home'),
//     'products': $('#products'),
//     'business': $('#business'),
//     'contact': $('#contact')
// };
//
// var navbarSettings = {
//     window: windows,
//     button: $('.nav-btn').filter(':first'),
//     navbar: $('nav').filter(':first'),
//     menu: menu,
//     menuItems: menu.find('a'),
//     pageElements: pageElems,
//     pageSmallSize: 772,
//     slideTime: 500,
//     animateScroll: true,
//     hideMenuOnClick: true,
//     pixelsChangeBig: 56,
//     pixelsChangeSmall: 83,
//     classToChange: 'bottom-line'
// };
//
// var playerSettings = {
//     viewer: $('.viewer').filter(':first'),
//     button: $('.video-btn').filter(':first'),
//     viewerClass: 'video-play',
//     buttonClass: 'button-play'
// };
//
// var animationSettings = {
//     title: $('.title'),
//     animationDelay: 5000,
//     chairAnimationDelay: 5000,
//     chairSlider: $('.slider').filter(':first')
// };
//
// var imagesContainer = $('.image-tosser').filter(':first');
// var images = imagesContainer.children('img');
//
// var imagesSliderSettings = {
//     window: windows,
//     longSmall : 4000,
//     shortSmall : 1000,
//     longBig : 15000,
//     shortBig : 800,
//     images: images,
//     changeTrigger : 992
// };
//
// var navbar = new NavBar(navbarSettings);
// var videoPlayer = new VideoPlayer(playerSettings);
// var textAnimation = new TextAnimation(animationSettings);
// var chairAnimation = new ChairAnimation(animationSettings);
// var imageTosser = new ImageTosser(imagesSliderSettings);

'use strict';

var $ = require('jquery');

var NavBar = require('./ui/Navbar');
var TitleAnimation = require('./animations/TitleAnimation');
var HamburgerAnimation = require('./animations/BurgerAnimation');
var DishesAnimation = require('./animations/DishesAnimation');
var AnimationOnScroll = require('./utils/AnimationOnScroll');
var ImagesAnimation = require('./animations/InfoAnimation');
var SimpleSlider = require('./sliders/SimpleSlider');

var menu = $('.menu-items').filter(':first');
var windows = $(window);

var pageElems = {
    'welcome': $('#welcome'),
    'reservation': $('#reservation'),
    'menu': $('#menu'),
    'opening': $('#opening'),
    'dishes': $('#dishes')
};

var navbarSettings = {
    window: windows,
    button: $('.nav-btn').filter(':first'),
    navbar: $('nav').filter(':first'),
    menu: menu,
    menuItems: menu.find('a'),
    pageElements: pageElems,
    pageSmallSize: 768,
    slideTime: 500,
    animateScroll: true,
    hideMenuOnClick: true,
    pixelsChangeBig: 76,
    pixelsChangeSmall: 76,
    classToChange: 'remove-spaces',
    changeClassOnScroll: true,
    changeScrollClass: 'selected-item'
};

var navbar = new NavBar(navbarSettings);

var elem = pageElems['welcome'];
var title = elem.find('h1');
var button = elem.find('button');
var titleAnimationSettings = {
    title: title,
    button: button,
    titleAnimations: ['up-anim', 'fromLeft-anim', 'fromRight-anim', 'drop-anim'],
    hideAnimation: 'hide-anim',
    longTime: 15000,
    shortTime: 2000
};
var titleAnimation = new TitleAnimation(titleAnimationSettings);

var burgerAnimationSettings = {
    hamburgers: $('.hamburgers').children('div'),
    classOdd: 'hamburger-odd',
    classEven: 'hamburger-even',
    classHide: 'hamburger-hide'
};
var burgerAnimation = new HamburgerAnimation(burgerAnimationSettings);
var hamburgerScrollAnimationSettings = {
    window: windows,
    minWidth: 768,
    elem: pageElems['menu'],
    triggerTopPoint: 70,
    triggerBottomPoint: 30,
    funcFirst: burgerAnimation.showHamburgers,
    funcSecond: burgerAnimation.hideHamburgers
};
var scrollAnimHamburger = new AnimationOnScroll(hamburgerScrollAnimationSettings);

var dishesAnimationSettings = {
    dishes: $('.meals'),
    showClass: 'up-anim-dishes',
    hideClass: 'hamburger-hide'
};
var dishesAnimation = new DishesAnimation(dishesAnimationSettings);
var dishesScrollAnimationSettings = {
    window: windows,
    minWidth: 768,
    elem: $('#dishes'),
    triggerTopPoint: 75,
    triggerBottomPoint: 20,
    funcFirst: dishesAnimation.showDishes,
    funcSecond: dishesAnimation.hideDishes
};
var scrollAnimDishes = new AnimationOnScroll(dishesScrollAnimationSettings);
var infoElem = $('#info');
var imagesAnimationSettings = {
    images: infoElem.find('.images'),
    showClass: 'anim-images-show',
    hideClass: 'anim-images-hide'
};
var imagesAnimation = new ImagesAnimation(imagesAnimationSettings);
var imagesScrollAnimationSettings = {
    window: windows,
    minWidth: 768,
    elem: infoElem,
    triggerTopPoint: 50,
    triggerBottomPoint: 80,
    funcFirst: imagesAnimation.showImages,
    funcSecond: imagesAnimation.hideImages
};
var scrollAnimImages = new AnimationOnScroll(imagesScrollAnimationSettings);

var sliderBigSettings = {
    delay: 8000,
    autoPlay: false,
    currentElem: 0,
    sliderElem: $('#slider-big'),
    navbarItemClass: 'dot-2',
    activeClass: 'active',
    navbarItemSelected: 'selected'
};
var simpleSlider = new SimpleSlider(sliderBigSettings);
var sliderSmallSettings = {
    delay: 5000,
    autoPlay: true,
    currentElem: 0,
    sliderElem: $('#slider-small'),
    navbarItemClass: 'dot',
    activeClass: 'active',
    navbarItemSelected: 'selected'
};
var simpleSliderSmall = new SimpleSlider(sliderSmallSettings);

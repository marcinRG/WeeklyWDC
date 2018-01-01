'use strict';
var ChangeBar = require('./ui/navbarComponents/ChangeClassOnEvent');
var NavbarButton = require('./ui/navbarComponents/NavBarButton');
var MenuLinks = require('./ui/navbarComponents/MenuItemsAndScrolls');
var TitleAnimation = require('./ui/animations/TitleAnimation');
var InfoAnimation = require('./ui/animations/InfoAnimation');
var AnimationOnScroll = require('./ui/animationOnMouseScroll/AnimationOnScroll');
var HamburgerAnimation = require('./ui/animations/BurgerAnimation');
var DishesAnimation = require('./ui/animations/DishesAnimation');

var navbar = document.querySelector('.navbar');
var menu = navbar.querySelector('.menu-items');
var menuLinks = menu.querySelectorAll('a');
var button = navbar.querySelector('.nav-btn');

var navBarSettings = {
    navbar: navbar,
    pageSmallSize: 768,
    pixelsChangeBig: 76,
    pixelsChangeSmall: 76,
    classToChange: 'remove-spaces'
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
    pageSmallSize: 768,
    scrollTime: 1000,
    slideTime: 1000,
    animateScroll: true,
    hideMenuOnClick: true,
    changeClassOnScroll: true,
    changeScrollClass: 'selected-item'
};

var linksOfMenu = new MenuLinks(menuItemsSettings);
linksOfMenu.run();

var titleAnimationSettings = {
    title: document.querySelector('.info h1'),
    button: document.querySelector('.info > button'),
    titleAnimations: ['up-anim', 'from-left-anim', 'from-right-anim', 'drop-anim'],
    hideAnimation: 'hide-anim',
    longTime: 15000,
    shortTime: 2000
};
var titleAnimation = new TitleAnimation(titleAnimationSettings);
titleAnimation.run();

var imagesAnimationSettings = {
    images: document.querySelector('.info-section .images'),
    showClass: 'anim-images-show',
    hideClass: 'anim-images-hide'
};
var imagesAnimation = new InfoAnimation(imagesAnimationSettings);

var imagesScrollAnimationTrigger = {
    minWidth: 768,
    elem: document.querySelector('.info-section'),
    triggerTopPoint: 50,
    triggerBottomPoint: 80,
    funcFirst: imagesAnimation.showImages,
    funcSecond: imagesAnimation.hideImages
};
var imagesScroll = new AnimationOnScroll(imagesScrollAnimationTrigger);
imagesScroll.run();

var burgerAnimationSettings = {
    hamburgers: document.querySelectorAll('.hamburgers .hamburger'),
    classOdd: 'hamburger-odd',
    classEven: 'hamburger-even',
    classHide: 'hamburger-hide'
};

var burgerAnimation = new HamburgerAnimation(burgerAnimationSettings);

var hamburgerScrollAnimationTrigger = {
    minWidth: 768,
    elem: document.querySelector('.menu-section'),
    triggerTopPoint: 35,
    triggerBottomPoint: 20,
    funcFirst: burgerAnimation.showHamburgers,
    funcSecond: burgerAnimation.hideHamburgers
};
var scrollAnimHamburger = new AnimationOnScroll(hamburgerScrollAnimationTrigger);
scrollAnimHamburger.run();

var dishesAnimationSettings = {
    dishes: document.querySelector('.meals'),
    showClass: 'up-anim-dishes',
    hideClass: 'hamburger-hide'
};

var dishesAnimation = new DishesAnimation(dishesAnimationSettings);
var dishesScrollAnimationSettings = {
    minWidth: 768,
    elem: document.querySelector('.dishes-section'),
    triggerTopPoint: 75,
    triggerBottomPoint: 20,
    funcFirst: dishesAnimation.showDishes,
    funcSecond: dishesAnimation.hideDishes
};
var scrollAnimDishes = new AnimationOnScroll(dishesScrollAnimationSettings);
scrollAnimDishes.run();

var SimpleSlider = require('./ui/sliders/SimpleSlider');
var sliderBigSettings = {
    delay: 15000,
    slideDelay: 1000,
    autoPlay: true,
    currentElem: 0,
    slider: document.querySelector('.slider.big'),
    navbarItemClass: 'dot-2',
    navbarItemSelected: 'selected',
    isContinuous: true
};
var simpleSlider = new SimpleSlider(sliderBigSettings);
simpleSlider.run();

var sliderSmallSettings = {
    delay: 5000,
    slideDelay: 500,
    autoPlay: true,
    currentElem: 0,
    slider: document.querySelector('.slider.small'),
    navbarItemClass: 'dot',
    navbarItemSelected: 'selected',
    isContinuous: true
};
var simpleSmallSlider = new SimpleSlider(sliderSmallSettings);
simpleSmallSlider.run();

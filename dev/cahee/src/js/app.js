'use strict';
var ChangeBar = require('./ui/navbarComponents/ChangeClassOnEvent');
var NavbarButton = require('./ui/navbarComponents/NavBarButton');
var MenuLinks = require('./ui/navbarComponents/MenuItemsAndScrolls');

// var $ = require('jquery');
//
// var NavBar = require('./ui/NavbarNew');
//
// var menu = $('.menu-items').filter(':first');
// var windows = $(window);
//
// var pageElems = {
//     'home': $('#home'),
//     'about': $('#about'),
//     'services': $('#services'),
//     'gallery': $('#gallery'),
//     'blog': $('#blog'),
//     'contact': $('#contact')
// };

// var navbarSettings = {
//     window: windows,
//     button: $('.nav-btn').filter(':first'),
//     navbar: $('nav').filter(':first'),
//     menu: menu,
//     menuItems: menu.find('a'),
//     pageElements: pageElems,
//     pageSmallSize: 768,
//     slideTime: 500,
//     animateScroll: true,
//     hideMenuOnClick: true,
//     pixelsChangeBig: 102,
//     pixelsChangeSmall: 60,
//     classToChange: 'new-nav-style'
// };

var navbar = document.querySelector('.navbar-section');
var navBarSettings = {
    navbar: navbar,
    pageSmallSize: 768,
    pixelsChangeBig: 102,
    pixelsChangeSmall: 60,
    classToChange: 'new-nav-style'
};
var changeBar = new ChangeBar(navBarSettings);
changeBar.run();

var menu = navbar.querySelector('.menu-items');
var menuLinks = menu.querySelectorAll('a');
var button = navbar.querySelector('.nav-btn');

var navButtonSettings = {
    button: button,
    menu: menu,
    pageSmallSize: 768,
    slideTime: 500
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
    changeClassOnScroll: false
};
var linksOfMenu = new MenuLinks(menuItemsSettings);
linksOfMenu.run();

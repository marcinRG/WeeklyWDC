'use strict';
window.addEventListener('load', function () {
    var ChangeBar = require('./ui/navbarComponents/ChangeClassOnEvent');
    var NavbarButton = require('./ui/navbarComponents/NavBarButton');
    var MenuLinks = require('./ui/navbarComponents/MenuItemsAndScrolls');
    var navbar = document.querySelector('.main-navbar');
    var navBarSettings = {
        navbar: navbar,
        pageSmallSize: 768,
        pixelsChangeBig: 106,
        pixelsChangeSmall: 60,
        classToChange: 'navbar-change'
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
        changeClassOnScroll: true,
        changeScrollClass: 'item-change'
    };
    var linksOfMenu = new MenuLinks(menuItemsSettings);
    linksOfMenu.run();

    var Slider = require('./ui/slider');
    var sliderSettings = {
        slider: document.querySelector('.slide-show'),
        activeClass: 'active'
    };
    var slider = new Slider(sliderSettings);
    slider.run();
});

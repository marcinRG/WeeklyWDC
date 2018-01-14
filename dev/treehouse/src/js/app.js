'use strict';
window.addEventListener('load', function () {
    var ChangeBar = require('./ui/navbarComponents/ChangeClassOnEvent');
    var NavbarButton = require('./ui/navbarComponents/NavBarButton');
    var MenuLinks = require('./ui/navbarComponents/MenuItemsAndScrolls');
    var navbar = document.querySelector('.main-navbar');
    var navBarSettings = {
        navbar: navbar,
        pageSmallSize: 768,
        pixelsChangeBig: 87,
        pixelsChangeSmall: 57,
        classToChange: 'navbar-change'
    };
    var changeBar = new ChangeBar(navBarSettings);
    changeBar.run();

    var button = navbar.querySelector('.nav-btn');
    var menu = navbar.querySelector('.menu-items');
    var navButtonSettings = {
        button: button,
        menu: menu,
        pageSmallSize: 768,
        slideTime: 500
    };
    var navButton = new NavbarButton(navButtonSettings);
    navButton.run();

    var menuLinks = menu.querySelectorAll('a');
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
});

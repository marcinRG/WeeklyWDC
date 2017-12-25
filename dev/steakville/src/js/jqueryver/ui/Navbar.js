'use strict';

var Btn = require('./navbarComponents/NavBarButton');
var MenuItems = require('./navbarComponents/MenuItemsAndScrolls');
var ChangeClassOnEvent = require('./navbarComponents/ChangeClassOnEvent');

function Navbar(settings) {
    var navbarBtn = new Btn(settings);
    var menuItems = new MenuItems(settings);
    var changeClassOnEvent = new ChangeClassOnEvent(settings);
}

module.exports = Navbar;

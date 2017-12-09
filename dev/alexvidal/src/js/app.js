'use strict';
var ChangeBar = require('./ui/navbarComponents/ChangeClassOnEvent');
var NavbarButton = require('./ui/navbarComponents/NavBarButton');
var MenuLinks = require('./ui/navbarComponents/MenuItemsAndScrolls');
var ProgressBars = require('./ui/progressBars/progressBars');
var ScrollableLinks = require('./ui/scrollableLinks/scrollableLinks');
var AnimationsOnScroll = require('./utils/AnimationOnScroll');
var TextAnimations = require('./ui/textAnimations/textAnimations');

var navbar = document.querySelector('nav');
var menu = navbar.querySelector('.menu-items');
var button = navbar.querySelector('.menu-btn');
var linksMenu = menu.querySelectorAll('a');
var skillBars = document.querySelectorAll('.skill-bar');
var scrollableLinksElems = document.querySelectorAll('a[data-scrollable-link]');

var settings = {
    navbar: navbar,
    pageSmallSize: 768,
    pixelsChangeBig: 118,
    pixelsChangeSmall: 70,
    classToChange: 'changed'
};

var changeBar = new ChangeBar(settings);
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
    menuLinks: linksMenu,
    pageSmallSize: 768,
    scrollTime: 1000,
    slideTime: 1000,
    animateScroll: true,
    hideMenuOnClick: true
};

var menuLinks = new MenuLinks(menuItemsSettings);
menuLinks.run();

var scrollLinksSettings = {
    links: scrollableLinksElems,
    scrollTime: 1500
};
var scrollableLinks = new ScrollableLinks(scrollLinksSettings);
scrollableLinks.run();

var progressBarsSettings = {
    progressElems: skillBars,
    animationTime: 1500,
    animationEasing: 'easeOut'
};
var progressBars = new ProgressBars(progressBarsSettings);
var el = document.querySelector('#skills');
var settingsSkillsTrigger = {
    elem: el,
    minWidth: 768,
    triggerTopPoint: 40,
    triggerBottomPoint: 0,
    funcFirst: progressBars.animate
};
var animScrollSkills = new AnimationsOnScroll(settingsSkillsTrigger);
animScrollSkills.run();

var timeAnimSettings = {
    elem: document.querySelector('.summary.time > h4'),
    animClass: 'anim-txt-rotate',
    hideClass: 'anim-txt-hide',
    changeValue: 5
};
var timeAnimation = new TextAnimations.TimeAnimation(timeAnimSettings);
timeAnimation.run();

var yearsAnimSettings = {
    elem: document.querySelector('.summary.years > h4'),
    animClass: 'anim-txt-translate',
    hideClass: 'anim-txt-hide',
    changeValue: 2,
    maxValue: 10
};
var yearsAnimation = new TextAnimations.CountUpAnimation(yearsAnimSettings);
yearsAnimation.run();

var projectsAnimSettings = {
    elem: document.querySelector('.summary.projects > h4'),
    animClass: 'anim-txt-scale',
    hideClass: 'anim-txt-hide',
    changeValue: 30,
    maxValue: 120
};
var projectsAnimation = new TextAnimations.CountUpAnimation(projectsAnimSettings);
projectsAnimation.run();

'use strict';
function MenuBar(settings) {
    var menuButton = settings.menuButton;
    var menu = settings.menu;
    var showClass = settings.showClass;
    var isHidden = settings.isHidden;

    function hideMenu() {
        menu.classList.remove(showClass);
        isHidden = true;
    }

    function showMenu() {
        menu.classList.add(showClass);
        isHidden = false;
    }

    menuButton.addEventListener('click', function () {
        if (isHidden) {
            showMenu();
        }
        else {
            hideMenu();
        }
    });
}

module.exports = MenuBar;

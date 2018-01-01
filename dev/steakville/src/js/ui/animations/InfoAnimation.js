'use strict';
var utils = require('../utils/Utlities');

function InfoAnimation(settings) {
    var images = settings.images;
    var showClass = settings.showClass;
    var hideClass = settings.hideClass;

    function showImages() {
        utils.swapClasses(images, hideClass, showClass);
    }

    function hideImages() {
        utils.swapClasses(images, showClass, hideClass);
    }

    return {
        showImages: showImages,
        hideImages: hideImages
    };
}

module.exports = InfoAnimation;

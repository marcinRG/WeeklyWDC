'use strict';

function InfoAnimation(settings) {
    var images = settings.images;
    var showClass = settings.showClass;
    var hideClass = settings.hideClass;

    function showImages() {
       images.removeClass(hideClass);
       images.addClass(showClass);
    }

    function hideImages() {
        images.removeClass(showClass);
        images.addClass(hideClass);
    }
    return {
        showImages: showImages,
        hideImages: hideImages
    };
}
module.exports = InfoAnimation;

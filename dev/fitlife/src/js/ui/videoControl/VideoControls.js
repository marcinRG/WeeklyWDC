'use strict';

function VideoPlayer(settings) {
    var video = settings.viewer;
    var btn = settings.button;
    var videoPlayClass = settings.viewerClass;
    var buttonPlayClass = settings.buttonClass;

    var isPlaying = false;

    function play() {
        video[0].play();
        video.addClass(videoPlayClass);
        btn.text('Stop video');
        btn.addClass(buttonPlayClass);
    }

    function stop() {
        video[0].pause();
        video.removeClass(videoPlayClass);
        btn.text('Play video');
        btn.removeClass(buttonPlayClass);

    }

    function addBtnEventHandler() {
        btn.on('click', function () {
            if (isPlaying) {
                stop();
                isPlaying = false;
                return;
            }
            play();
            isPlaying = true;
        });
    }

    addBtnEventHandler();
}

module.exports = VideoPlayer;

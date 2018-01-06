'use strict';

function VideoPlayer(settings) {
    var video = settings.viewer;
    var btn = settings.button;
    var videoPlayClass = settings.viewerClass;
    var buttonPlayClass = settings.buttonClass;

    var isPlaying = false;

    function play() {
        video.play();
        video.classList.add(videoPlayClass);
        btn.textContent = 'Stop video';
        btn.classList.add(buttonPlayClass);
    }

    function stop() {
        video.pause();
        video.classList.remove(videoPlayClass);
        btn.textContent = 'Play video';
        btn.classList.remove(buttonPlayClass);
    }

    function addBtnEventHandler() {
        btn.addEventListener('click', function () {
            if (isPlaying) {
                stop();
                isPlaying = false;
                return;
            }
            play();
            isPlaying = true;
        });
    }

    return {
        run: function () {
            addBtnEventHandler();
        }
    };
}

module.exports = VideoPlayer;

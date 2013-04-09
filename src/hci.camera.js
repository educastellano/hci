//
// HCI Camera for QR Scanner
//
// Requires:
// - jsqrcode - https://github.com/LazarSoft/jsqrcode
//
(function (root) {
    'use strict';

    var hci = root.hci || (root.hci = {}),
        getElByString;

    hci.camera = {};

    hci.camera.init = function (options) {
        var elVideo,
            elCanvas,
            elMsg,
            onDOMContentLoaded;

        // Arguments
        hci.camera.elVideo = elVideo = getElByString(options.elVideo);
        hci.camera.elCanvas = getElByString(options.elCanvas);
        hci.camera.elMsg = elMsg = getElByString(options.elMsg);
        hci.camera.interval = options.p_inter || 1000;
        hci.camera.scale    = options.p_scale || 0.5;

        // Replace the source of the video element with the stream from the camera
        onDOMContentLoaded = function () {
            var options = {
                    "audio": false,
                    "video": true
                },
                success,
                error;

            success = function(stream) {
                elVideo.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
            };

            error = function(error) {
                console.log(error);
            };

            if (navigator.getUserMedia) {
                navigator.getUserMedia(options, success, error);
            }
            else {
                if (elMsg && 'innerHTML' in elMsg) {
                    elMsg.innerHTML = 'Sorry, native web camera streaming is not supported by this browser...';
                }
            }
        };

        if (options.onRead) {
            qrcode.callback = options.onRead;
        }

        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

        window.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);
    };

    hci.camera.isSupported = function () {
        return !!navigator.getUserMedia;
    };

    hci.camera.start = function () {
        if (hci.camera.interval_id) {
            hci.camera.stop();
        }
        hci.camera.interval_id = setInterval(function(video, scale) {
            hci.camera.capture()
        }, hci.camera.interval);
    };

    hci.camera.stop = function () {
        clearInterval(hci.camera.interval_id);
    };

    hci.camera.capture = function () {
        var elVideo = hci.camera.elVideo,
            w = elVideo.videoWidth * hci.camera.scale,
            h = elVideo.videoHeight * hci.camera.scale,
            qr_canvas = hci.camera.elCanvas.getContext('2d');

        qr_canvas.drawImage(elVideo, 0, 0, w, h);
        try {
            qrcode.decode();
        }
        catch(err) {
            console.log(err);
        }
    };

    getElByString = function (str) {
        var el;

        if (typeof str === 'string') {
            str = str[0] === '#' ? str.substring(1) : str;
            el = document.getElementById(str);
        }
        else {
            el = str;
        }

        return el;
    };


})(this);

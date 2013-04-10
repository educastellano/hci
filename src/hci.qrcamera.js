//
// HCI QR Camera for scanning QR codes
//
// Requires:
// - jsqrcode - https://github.com/LazarSoft/jsqrcode
//
(function (root) {
    'use strict';

    var hci = root.hci || (root.hci = {}),
        getElByString;

    hci.qrcamera = {};

    hci.qrcamera.init = function (options) {
        var el_video,
            el_msg,
            onDOMContentLoaded;

        // Arguments
        hci.qrcamera.el_video = el_video = getElByString(options.el_video);
        hci.qrcamera.el_canvas = getElByString(options.el_canvas);
        hci.qrcamera.el_msg = el_msg = getElByString(options.el_msg);
        hci.qrcamera.interval = options.interval || 1000;
        hci.qrcamera.scale    = options.scale || 0.5;
        if (options.onRead) {
            qrcode.callback = options.onRead;
        }

        // Replace the source of the video element with the stream from the camera
        onDOMContentLoaded = function () {
            var options = {
                    "audio": false,
                    "video": true
                },
                success,
                error;

            success = function(stream) {
                el_video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
            };

            error = function(error) {
                console.log(error);
            };

            if (navigator.getUserMedia) {
                navigator.getUserMedia(options, success, error);
            }
            else {
                if (el_msg && 'innerHTML' in el_msg) {
                    el_msg.innerHTML = 'Sorry, native web camera streaming is not supported by this browser...';
                }
            }
        };

        navigator.getUserMedia =
            navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;

        window.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);
    };

    hci.qrcamera.isSupported = function () {
        return !!navigator.getUserMedia;
    };

    hci.qrcamera.start = function () {
        if (hci.qrcamera.interval_id) {
            hci.qrcamera.stop();
        }
        hci.qrcamera.interval_id = setInterval(function(video, scale) {
            hci.qrcamera.capture()
        }, hci.qrcamera.interval);
    };

    hci.qrcamera.stop = function () {
        clearInterval(hci.qrcamera.interval_id);
    };

    hci.qrcamera.capture = function () {
        var el_video = hci.qrcamera.el_video,
            w = el_video.videoWidth * hci.qrcamera.scale,
            h = el_video.videoHeight * hci.qrcamera.scale,
            qr_canvas = hci.qrcamera.el_canvas.getContext('2d');

        qr_canvas.drawImage(el_video, 0, 0, w, h);
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

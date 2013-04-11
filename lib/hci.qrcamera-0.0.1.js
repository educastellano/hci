//
// HCI QR Camera for scanning QR codes
//
// Requires:
// - jsqrcode - https://github.com/LazarSoft/jsqrcode
//
(function (root) {
    'use strict';

    var hci = root.hci || (root.hci = {}),
        getElByString,
        capture,
        stream_obj,
        interval,
        scale,
        interval_id;

    hci.qrcamera = {};

    hci.qrcamera.init = function (options) {
        var el_video,
            el_msg,
            media_options,
            success,
            error;

        // Arguments
        hci.qrcamera.el_video = el_video = getElByString(options.el_video);
        hci.qrcamera.el_canvas = getElByString(options.el_canvas);
        hci.qrcamera.el_msg = el_msg = getElByString(options.el_msg);
        interval = options.interval || 1000;
        scale    = options.scale || 0.5;
        if (options.onRead) {
            qrcode.callback = options.onRead;
        }

        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

        if (navigator.getUserMedia) {
            media_options = {
                "audio": false,
                "video": true
            };

            success = function (stream) {
                el_video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
                stream_obj = stream;
                hci.qrcamera.start_scan();
            };

            error = function (error) {
                console.log(error);
            };

            navigator.getUserMedia(media_options, success, error);
        }
        else {
            if (el_msg && 'innerHTML' in el_msg) {
                el_msg.innerHTML = 'Sorry, native web camera streaming is not supported by this browser...';
            }
        }
    };

    hci.qrcamera.isSupported = function () {
        return !!navigator.getUserMedia;
    };

    hci.qrcamera.start_scan = function () {
        if (interval_id) {
            hci.qrcamera.stop();
        }
        interval_id = setInterval(function (video, scale) {
            capture()
        }, interval);
    };

    hci.qrcamera.stop_scan = function () {
        clearInterval(interval_id);
    };

    hci.qrcamera.stop = function () {
        hci.qrcamera.stop_scan();
        if (stream_obj) {
            stream_obj.stop();
        }
    };

    capture = function () {
        var el_video = hci.qrcamera.el_video,
            w = el_video.videoWidth * scale,
            h = el_video.videoHeight * scale,
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

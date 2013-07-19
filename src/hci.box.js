
//
// HCI Box
//
// Requires:
// - jQuery
//
(function (root) {
    'use strict';

    var hci = root.hci || (root.hci = {});

    hci.box = {};

    hci.box.popable = function (options) {
        var el = typeof options.el === 'string' ? $(options.el) : options.el,
            btn = typeof options.btn === 'string' ? $(options.btn) : options.btn;

        var onBtnClick = function () {
            if (el.is(':hidden')) {
                show();
            }
            else {
                hide();
            }
        };

        var onPageMouseDown = function (e) {
            if (el && btn) {
                if (!el.find($(e.target)).length && e.target !== btn.get(0)) {
                    hide();
                    $('html').off('mousedown', onPageMouseDown);
                }
            }
        };

        var show = function () {
            if (options.beforeShow) {
                options.beforeShow();
            }
            el.show();
            $('html').on('mousedown', onPageMouseDown);
            if (options.onShow) {
                options.onShow();
            }
        };

        var hide = function () {
            if (options.beforeHide) {
                options.beforeHide();
            }
            el.hide();
            if (options.onHide) {
                options.onHide();
            }
        };

        btn.off('click', onBtnClick);
        btn.on('click', onBtnClick);
    };

})(this);
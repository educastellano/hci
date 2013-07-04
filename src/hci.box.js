
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
            btn = typeof options.btn === 'string' ? $(options.btn) : options.btn,
            onPageMouseDown,
            onBtnClick;

        onBtnClick = function () {
            if (options.beforeShow) {
                options.beforeShow();
            }
            el.show();
            $('html').on('mousedown', onPageMouseDown);
            if (options.onShow) {
                options.onShow();
            }
        };

        onPageMouseDown = function (e) {
            if (el) {
                if (!el.find($(e.target)).length) {
                    if (options.beforeHide) {
                        options.beforeHide();
                    }
                    el.hide();
                    $('html').off('mousedown', onPageMouseDown);
                    if (options.onHide) {
                        options.onHide();
                    }
                }
            }
        };

        btn.off('click', onBtnClick);
        btn.on('click', onBtnClick);
    };

})(this);

//
// HCI Msg
//
// Requires:
// - jQuery
//
(function (root) {
    'use strict';

    var hci = root.hci || (root.hci = {}),
        id = 0,
        html_option;

    hci.msg = {};

    hci.msg.confirm = function (options) {
        var el = typeof options.el === 'string' ? $(options.el) : options.el,
            msg = options.msg || '',
            component,
            onPageMouseDown,
            onConfirmClick,
            onCancelClick;

        component = $('<div id="hci-msg-'+ (++id) +'" class="hci-msg">' +
            '<div class="msg">'+ msg +'</div>' +
            '<div class="options">' +
            html_option(options.msg_confirm, 'confirm', 'Yes') +
            html_option(options.msg_cancel, 'cancel', 'No') +
            '</div>' +
            '</div>');

        el.append(component);

        onConfirmClick = function () {
            component.remove();
            if (options.confirm) {
                options.confirm();
            }
        };

        onCancelClick = function () {
            component.remove();
            if (options.cancel) {
                options.cancel();
            }
        };

        onPageMouseDown = function (e) {
            if (component) {
                if (!component.find($(e.target)).length) {
                    component.remove();
                    $('html').off('mousedown', onPageMouseDown);
                    if (options.remove) {
                        options.remove();
                    }
                }
            }
        };

        $('html').on('mousedown', onPageMouseDown);
        component.find('.confirm').off('click', onConfirmClick);
        component.find('.confirm').on('click', onConfirmClick);
        component.find('.cancel').off('click', onCancelClick);
        component.find('.cancel').on('click', onCancelClick);
    };

    html_option = function (option, name, default_value) {
        var html;

        if (typeof option === 'boolean') {
            if (!option) {
                html = '';
            }
        }
        else if (typeof option === 'string') {
            html = '<div class="'+ name +'">'+ option +'</div>';
        }
        else { // undefined
            if (default_value) {
                html = '<div class="'+ name +'">'+ default_value +'</div>';
            }
            else {
                html = '';
            }
        }

        return html;
    };

})(this);
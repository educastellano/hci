//
// HCI Url. Utilities for URL manipulation.
//
// Requires:
// -
//
(function (root) {
    'use strict';

    var hci = root.hci || (root.hci = {});

    hci.url = {};
    hci.url.getParams = function () {
        var params_str = window.location.search,
            params = {};

        params_str.replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function ($0, $1, $2, $3) {
                params[$1] = $3;
            }
        );

        return params;
    };

})(this);

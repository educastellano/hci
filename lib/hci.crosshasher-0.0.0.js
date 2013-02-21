//
// HCI CrossHasher. A combination of Crossroads and Hasher.
//
// Requires:
// - Crossroads (http://millermedeiros.github.com/crossroads.js/)
// - Hasher (https://github.com/millermedeiros/hasher/)
//
(function (root) {
    'use strict';

    var hci = root.hci || (root.hci = {});

    hci.crosshasher = {};
    hci.crosshasher.init = function () {
        function handleChanges(newHash, oldHash){
            crossroads.parse(newHash);
        }
        hasher.changed.add(handleChanges);
        hasher.initialized.add(handleChanges);
        hasher.init();
    };

})(this);

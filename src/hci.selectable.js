//
// HCI Selectable
//
// Requires:
// - jQuery
//
(function (root) {
    'use strict';

    var hci = root.hci || (root.hci = {});

    hci.selectable = function (opts) {
        var el = $(opts.el),
            cssClass = opts.cssClass || 'hci-selected',
            multiple = opts.multiple,
            getNode,
            onMouseDown,
            onMouseUp;

        // Helpers
        //
        // Get the node un level under the el container,
        // by any other sublevel node.
        getNode = function (node) {
            var iGetNode = function iGetNode(node, previousNode) {
                if (node === el.get(0)) {
                    return previousNode;
                }
                else {
                    return iGetNode($(node).parent().get(0), node);
                }
            };

            return iGetNode(node);
        };

        // Event Handlers
        //
        onMouseDown = function (e) {
            var node = getNode(e.target),
                nodes,
                selectedNodes,
                i,
                idxFirst,
                idxCurrent,
                idxFrom,
                idxTo;

            if (e.metaKey && multiple) {
                $(node).toggleClass(cssClass);
            }
            else {
                if (e.shiftKey && multiple) {
                    nodes = $(node).parent().children();
                    i=0;
                    while ( !(idxFirst && idxCurrent) && i<nodes.length ) {
                        if ($(nodes[i]).hasClass(cssClass)) {
                            idxFirst = i;
                        }
                        if (nodes[i] === node) {
                            idxCurrent = i;
                        }
                        i++;
                    }
                    if (idxFirst <= idxCurrent) {
                        idxFrom = idxFirst;
                        idxTo = idxCurrent;
                    }
                    else {
                        idxFrom = idxCurrent;
                        idxTo = idxFirst;
                    }
                    for (i=idxFrom; i<=idxTo; i++) {
                        $(nodes[i]).addClass(cssClass);
                    }
                }
                else {
                    selectedNodes = el.find('.' + cssClass);
                    if (selectedNodes.length > 1) {
                        // mouseup event handles this case,
                        // to avoid losing selection when drag
                    }
                    else {
                        el.children().removeClass(cssClass);
                        $(node).addClass(cssClass);
                    }
                }
            }
        };

        onMouseUp = function (e) {
            var node = getNode(e.target),
                selectedNodes;

            if (!e.metaKey && !e.shiftKey) {
                selectedNodes = el.find('.' + cssClass);
                if (selectedNodes.length > 0) {
                    el.children().removeClass(cssClass);
                    $(node).addClass(cssClass);
                }
            }

            if (opts.onMouseUp) {
                opts.onMouseUp();
            }
        };

        el.off('mousedown');
        el.off('mouseup');
        el.on('mousedown', onMouseDown);
        el.on('mouseup', onMouseUp);
    };

})(this);

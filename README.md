# HCI

A bunch of micro-libraries using the same namespace (hci). They work independently from each other.

List of micro-libs available:

* [hci.msg](https://github.com/educastellano/hci#hcimsg)
* [hci.box](https://github.com/educastellano/hci#hcibox)
* [hci.selectable](https://github.com/educastellano/hci#hciselectable)
* [hci.crosshasher](https://github.com/educastellano/hci#hcicrosshasher)
* [hci.qrcamera](https://github.com/educastellano/hci#hciqrcamera)
* [hci.url](https://github.com/educastellano/hci#hciurl)

## hci.msg

Alerts and confirmation components

#### Requires

* jQuery

#### Install

Get the minified version from [here](https://raw.github.com/educastellano/hci/master/lib/hci.msg-0.0.0.min.js)

#### Usage

	hci.msg.confirm({
		el: '#container',
		msg: 'Are you sure?',
		confirm: function () {
			// confirm btn clicked
		},
		cancel: function () {
			// cancel btn clicked
		}
	})

Parameters:

* el [string or "jQuery object"]

Optional parameters:

* msg [string] Default: ''
* msg_confirm [string] Default: 'Yes'
* msg_cancel [string or false] Default: 'No'
* confirm [function]
* cancel [function]
* remove [function]

## hci.box

Generic manipulation of DOM containers.

#### Requires

* jQuery

#### Install

Get the minified version from [here](https://raw.github.com/educastellano/hci/master/lib/hci.box-0.0.0.min.js)

#### Usage

* Pop up a DOM element when click a button, and hide it when click anywhere else on the page:

        hci.box.popable({
            el: '#container',
            btn: '#button'
        })

	Parameters:

	* el  [string or "jQuery object"]
	* btn [string or "jQuery object"]	
     
	Optional parameters:	

	* onShow [function]
	* onHide [function]

## hci.selectable

Makes selectable DOM nodes of a parent node.

#### Requires

* jQuery

#### Install

Get the minified version from [here](https://raw.github.com/educastellano/hci/master/lib/hci.selectable-0.0.0.min.js)

#### Usage

	hci.selectable({
		el: '#container'
	});

Parameters:

* el [string or "jQuery object"]

Optional parameters:

* multiple [bool] Default: false
* cssClass [string] Default: 'hci-selected'
* onMouseUp [function]

## hci.crosshasher

Some glue for [Crossroads](http://millermedeiros.github.com/crossroads.js/) and [Hasher](https://github.com/millermedeiros/hasher/)

#### Requires

* Crossroads
* Hasher

#### Install

Get the minified version from [here](https://raw.github.com/educastellano/hci/master/lib/hci.crosshasher-0.0.0.min.js)

#### Usage

Define your routes as usual and call the init() method.

	crossroads.addRoute(...);
	crossroads.addRoute(...);
    hci.crosshasher.init();

## hci.qrcamera

Native camera for scanning QR codes, using [jsqrcode](https://github.com/LazarSoft/jsqrcode) lib.

*Special thanks to [asbjornenge](https://github.com/asbjornenge) for his [demo app](https://github.com/asbjornenge/jsqrcode-scanner)*

#### Requires

* jsqrcode - You can get a minified version [here](https://raw.github.com/educastellano/hci/master/vendor/jsqrcode.min.js)

#### Install

Get the minified version from [here](https://raw.github.com/educastellano/hci/master/lib/hci.qrcamera-0.0.1.min.js)

#### Usage

Initialize camera and scanner:

	hci.qrcamera.init({
		el_video: '#camsource',
		el_canvas: '#qr-canvas',
		el_msg: '#qr-value',
		onRead: function (value) {
			$("#some-input").val(value);
		}
	});

Stop it:

	hci.qrcamera.stop();

#### Changelog

##### 0.0.1
* hci.qrcamera.init onDOMContentLoad removed, navigator.getUserMedia() is called straight away.
* hci.qrcamera.stop safe check for stream_obj 


## hci.url

Utilities for URL manipulation.

#### Requires
nothing

#### Install

Get the minified version from [here](https://raw.github.com/educastellano/hci/master/lib/hci.url-0.0.0.min.js)

#### Usage

* Parse search parameters to an object.

		var params = hci.url.getParams();
		console.log(params['name']);





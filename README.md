# HCI


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

QR Camera for scanning QR codes, using [jsqrcode](https://github.com/LazarSoft/jsqrcode) lib.

*Special thanks to [asbjornenge](https://github.com/asbjornenge) for his [demo app](https://github.com/asbjornenge/jsqrcode-scanner)*

#### Requires

* jsqrcode - You can get a minified version [here](https://raw.github.com/educastellano/hci/master/vendor/jsqrcode.min.js)

#### Install

Get the minified version from [here](https://raw.github.com/educastellano/hci/master/lib/hci.qrcamera-0.0.0.min.js)

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



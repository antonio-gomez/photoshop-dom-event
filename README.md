## Photoshop-DOM-Event
==========

[![npm-image](https://img.shields.io/badge/npm-v0.0.0-ff69b4.svg)](https://www.npmjs.com/package/photoshop-dom-event)
![version-image](https://img.shields.io/badge/license-MIT-ff69b4.svg)

#### Description
-----------
Node.js module for listening to Adobe Photoshop DOM events from a CEP HTML/JavaScript Extension (Custom Panel).

For registering a Photoshop event callback is necessary to specify the charID or stringID that is expected to listen. To preserve Photoshop stability, event listeners can be started or stopped during extension execusion by using the corresponding methods described below.


#### Example
--------
```
var photoshopDOM = require('photoshop-dom-event');

photoshopDOM.startListeningEvent('placedLayerEditContents');

photoshopDOM.onEvent('placedLayerEditContents', function(eventData) {
  console.log('Editing Photoshop Smart Layer', eventData);
});

photoshopDOM.stopListeningEvent('placedLayerEditContents');
```


#### Changelog
=========

##0.0.0 (Jul 23 2016)
-----
*   Initial development.


## License
MIT © [Antonio Gomez][0]

[0]: http://antoniogomez.me/
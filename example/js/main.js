/*
 *
 *  Photoshop-DOM-Event-Example
 *  Basic usage of photoshop-dom-event node.js module.
 *  Author: Antonio Gomez (https://github.com/antonio-gomez)
 *
 *  @@link https://github.com/antonio-gomez/photoshop-dom-event
 *  @version v1.0.0
 *  @license MIT
 *
 */


;(function() {
    
	'use strict';

    var photoshopDOM = require('photoshop-dom-event');
	
	var removeListenerBtn = document.getElementById('remove-listener-btn');
	
	photoshopDOM.onEvent('slct', function(eventData) {
		console.log('Selected Layer: ', eventData);
	});

	removeListenerBtn.addEventListener('click', function() {
		photoshopDOM.stopListeningEvent('slct');
	});	
	
})();
	

(function() {
	'use strict';

	angular.module('iphoneApp')
		.directive('onClickAndHold', onClickAndHold);

	/*
	* Code copied from http://stackoverflow.com/questions/29234274/angularjs-one-click-on-element-and-clickhold-more-5-seconds
	* modified for my use
	*/
	function onClickAndHold ($parse, $timeout) {
	  return {
	    link: function (scope, element, attrs) {
	      var clickAndHoldFn = $parse(attrs.onClickAndHold);
	      var doNotTriggerClick;
	      var timeoutHandler;
	      element.on('mousedown', function () {
	          $timeout.cancel(timeoutHandler);
	          timeoutHandler = $timeout(function () {
	            clickAndHoldFn(scope, {$event: event})
	          }, 1500)
	      });
	      element.on('mouseup', function (event) {
	          $timeout.cancel(timeoutHandler);
	      });
	    }
	  }
	}

}());
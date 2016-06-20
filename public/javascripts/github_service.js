(function() {
	'use strict';

	angular.module('iphoneApp')
		.service('githubService', githubService);

	function githubService($http) {
		var service = this;

		service.getEmail = function(user) {
			var url = '/email/' + user;
			return $http.get(url);
		} 
	}

}());
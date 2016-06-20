(function() {
	'use strict';

	angular.module('iphoneApp')
		.controller('githubController', githubController);

	function githubController (githubService) {
		//Scope Variables
		var vm = this;
		vm.displayList = [];

		//Local Variables
		var localStorage = [];

		//Scope Functions
		vm.buildList = function() {
			vm.displayList = [];
			var list = vm.searchString.split(/\s*,\s*|\s+/g);
			for (var key in list) {
				if (localStorage[list[key]]) {
					vm.displayList.push(localStorage[list[key]])
				} else {
					search(list[key]);
				}
			}
		}

		//Local Functions
		function search(user) {
			githubService.getEmail(user)
				.then(function(res) {
					vm.displayList.push(res.data);
					localStorage[res.data.user] = res.data;
				}, err);
		}

		function err(err) {
			console.log(err);
		}
	}

}());
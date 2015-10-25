(function(){
	'use strict';

	angular
		.module('app.blog')
		.controller('Blog', Blog);

	Blog.$inject = [];

	function Blog(){
		var vm = this;
		vm.greeting = 'greeting from blog';
	};


})();
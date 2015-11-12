(function(){
	'use strict';

	angular
		.module('app.blog')
		.controller('Blog', Blog);

	Blog.$inject = ['blogs'];

	function Blog(blogs){
		var vm = this;

		vm.blogArr = blogs.data;

		vm.testing = 'testing';

	}


})();
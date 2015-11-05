(function(){
	'use strict';

	angular
		.module('app.blog')
		.controller('Blog', Blog);

	Blog.$inject = ['blogs'];

	function Blog(blogs){
		var vm = this;

		vm.blogStuff = blogs.data;



	};


})();
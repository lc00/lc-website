(function(){
	'use strict';

	angular
		.module('app.core')
		.factory('dataservice', dataservice);

	function dataservice($q){
		var service = {
			getBlogs: getBlogs
		};

		return service;

		function getBlogs(){
			var blogResults = [
				{
					title: 'blog 1',
					content: 'blog 1 content'
				}, 
				{
					title: 'blog 2',
					content: 'blog 2 content'
				}
			];

			return blogResults;
		}

	}


})();
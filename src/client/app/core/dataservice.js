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
					date: '11-1-15',
					content: 'blog 1 content'
				}, 
				{
					title: 'blog 2',
					date: '11-3-15',
					content: 'blog 2 content'
				}
			];

			return blogResults;
		}

	}


})();
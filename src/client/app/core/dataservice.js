(function(){
	'use strict';

	angular
		.module('app.core')
		.factory('dataservice', dataservice);

	function dataservice($q){
		var service = {
			getBlogs: getBlogs,
			getBlog: getBlog,
			add: add,
			edit: edit,
			trash: trash,
			publish: publish
		};

		return service;

		function getBlogs(){
			var blogResults = [
				{
					title: 'blog 1',
					id: 1,
					date: '11-1-15',
					content: 'blog 1 content'
				}, 
				{
					title: 'blog 2',
					id: 2,
					date: '11-3-15',
					content: 'blog 2 content'
				}
			];

			return blogResults;
		}

		function getBlog(id){
			var result = service.getBlogs()[0];
			return result;
		}

		function add(){

		}

		function edit() {

		}

		function trash(){

		}

		function publish(){
			
		}

	}


})();
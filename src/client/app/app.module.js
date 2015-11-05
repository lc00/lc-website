(function(){
	'use strict';

	var app = angular.module('app', [
		// 'app.auth',
		'app.blog',
		'app.core'
		// 'app.dashboard'
	]);

	app.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/blog');
		$stateProvider
			.state('blog', {
				url: '/blog',
				controller: 'Blog',
				controllerAs: 'vm',
				templateUrl: 'app/blog/blog.html',
				resolve: {
					blogs: function(dataservice){
						return { 
							data: dataservice.getBlogs() 
						}
					}
				}
			})
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: 'app/dashboard/dashboard.html'
			});
	});

})();
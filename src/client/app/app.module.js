(function(){
	'use strict';

	var app = angular.module('app', [
		// 'app.auth',
		'app.blog',
		'app.core',
		'app.dashboard'
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
				controller: 'Dashboard',
				controllerAs: 'vm',
				resolve: {
					blogs: function(dataservice){
						return { 
							data: dataservice.getBlogs() 
						}
					}
				},
				templateUrl: 'app/dashboard/dashboard.html'
			})
			.state('dashboard.blog', {
				url: '/blog',
				templateUrl: 'app/dashboard/blog/blog.html'
			})
			.state('dashboard.picture', {
				url: '/picture',
				templateUrl: 'app/dashboard/picture/picture.html'
			})
			.state('dashboard.howto', {
				url: '/howto',
				templateUrl: 'app/dashboard/howto/howto.html'
			});
	});

})();
(function(){
	'use strict';

	var app = angular.module('app', [
		// 'app.auth',
		'app.blog',
		'app.core',
		'app.dashboard',
		'app.dashboard.blog',
		'app.widgets',
		'app.edit'
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
				templateUrl: 'app/dashboard/dashboard.html'
			})
			.state('dashboard.blog', {
				url: '/blog',
				controller: 'DashboardBlog',
				controllerAs: 'vm',
				resolve: {
					blogs: function(dataservice){
						return { 
							data: dataservice.getBlogs() 
						}
					}
				},
				templateUrl: 'app/dashboard/blog/blog.html'
			})
			.state('dashboard.picture', {
				url: '/picture',
				templateUrl: 'app/dashboard/picture/picture.html'
			})
			.state('dashboard.howto', {
				url: '/howto',
				templateUrl: 'app/dashboard/howto/howto.html'
			})
			.state('add', {
				url: '/add',
				// controller: 'Add',
				templateUrl: 'app/dashboard/add.html'
			})
			.state('edit', {
				url: '/edit/:blogId',
				controller: 'Edit',
				controllerAs: 'vm',	
				resolve: {
					blog: ['$stateParams', 'dataservice', function($stateParams, dataservice){
						return dataservice.getBlog($stateParams.blogId);
					}]

				},
				templateUrl: 'app/dashboard/edit.html'
			})
			.state('trash', {
				url: '/trash',
				templateUrl: 'app/dashboard/trash.html'
			})
			.state('publish', {
				url: '/publish',
				templateUrl: 'app/dashboard/publish.html'
			});
	});

})();
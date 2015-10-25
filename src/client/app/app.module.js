(function(){
	'use strict';

	angular.module('app', [
		// 'app.auth',
		'app.blog',
		'app.core'
		// 'app.dashboard'
	]).config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/blog');
		$stateProvider
			.state('blog', {
				url: '/blog',
				controller: 'Blog',
				controllerAs: 'vm',
				templateUrl: 'app/blog/blog.html'
			})
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: 'app/dashboard/dashboard.html'
			});
	});

})();
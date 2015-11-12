(function(){
	angular
		.module('app.dashboard.blog')
		.controller('DashboardBlog', DashboardBlog);

	DashboardBlog.$inject = ['blogs'];

	function DashboardBlog(blogs){
		var vm = this;

		vm.blogArr = blogs.data;

		vm.edit = function(title){
			
		}
	}

})();
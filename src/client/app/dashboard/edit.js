(function(){
	angular
		.module('app.edit')
		.controller('Edit', Edit);

	Edit.$inject = ['blog'];

	function Edit (blog){
		var vm = this;
		vm.title = blog.title;
		vm.content = blog.content;
	}

})();
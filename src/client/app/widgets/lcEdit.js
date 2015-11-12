(function(){
	angular
		.module('app.widgets')
		.directive('lcEdit', lcEdit);

	function lcEdit(){
		return {
			controller: function(){
				console.log('hey')
			},
			templateUrl: 'app/widgets/lcEdit.html'
		};
	}	
})();
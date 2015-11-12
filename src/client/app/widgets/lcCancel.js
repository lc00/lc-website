angular
	.module('app.widgets')
	.directive('lcCancel', lcCancel);

function lcCancel() {
	return {
		scope: {

		},
		controller: function() {
			console.log('hello')
		}
	};
}
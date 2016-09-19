var app = angular.module('chatApp', []);

app.controller("mainController", ['$scope', function($scope) {
	$scope.user = '';

	$('#userModal').modal('show');
	
	$scope.submitName = function() {
		$('#userModal').modal('hide');
	}
}]);


angular.module('generator', [])

.controller('mainController', function($scope){
	$scope.entries = [];
	$scope.currentIndex = 0;

	$scope.addEntry = function(input) {
		$scope.entries[$scope.currentIndex] = input;
		$scope.currentIndex++;
	}
});

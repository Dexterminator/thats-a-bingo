angular.module('generator', [])

.controller('mainController', function($scope){
	$scope.entries = [];
	$scope.currentIndex = 0;

	$scope.nextSquare = function() {
		$scope.bingoInput = "";
		$scope.currentIndex++;
	}

	$scope.$watch('bingoInput', function(newVal) {
		$scope.entries[$scope.currentIndex] = newVal;
	})
});

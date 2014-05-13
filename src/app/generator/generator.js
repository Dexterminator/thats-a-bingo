angular.module('generator', [])

.controller('mainController', function($scope){
	$scope.entries = [];
	$scope.currentIndex = 0;
	$scope.focusInput = true;

	$scope.nextSquare = function() {
		$scope.currentIndex++;
		$scope.bingoInput = $scope.entries[$scope.currentIndex];
	}

	$scope.selectSquare = function(index) {
		$scope.bingoInput = $scope.entries[index];
		$scope.currentIndex = index;
		$scope.focusInput = true;
	}

	$scope.$watch('bingoInput', function(newVal) {
		$scope.entries[$scope.currentIndex] = newVal;
	})
})

.directive('focusThis', function() {
	return {
		link: function(scope, element, attrs) {
			scope.$watch(attrs.focusThis, function(value) {
				if (value === true) {
					element[0].focus();
					scope[attrs.focusThis] = false;
				};
			})
		}
	}
});
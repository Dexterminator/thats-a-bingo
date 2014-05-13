angular.module('generator', [])

.controller('mainController', function($scope){
	$scope.entries = [];
	$scope.currentIndex = 0;
	$scope.focusInput = true;

	$scope.nextSquare = function() {
		$scope.currentIndex++;
	}

	$scope.selectSquare = function(index) {
		$scope.currentIndex = index;
		$scope.focusInput = true;
	}
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

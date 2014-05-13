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

	$scope.shuffle = function() {
		var counter = $scope.entries.length, temp, index;

	    // While there are elements in the array
	    while (counter > 0) {
	        // Pick a random index
	        index = Math.floor(Math.random() * counter);

	        // Decrease counter by 1
	        counter--;

	        // And swap the last element with it
	        temp = $scope.entries[counter];
	        $scope.entries[counter] = $scope.entries[index];
	        $scope.entries[index] = temp;
	    }
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

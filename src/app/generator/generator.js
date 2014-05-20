angular.module('generator', [])

.controller('mainController', function($scope){
	$scope.entries = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11",
	"12", "13", "14", "15", "16", "17", "18", "19", "20"];
	// $scope.entries = [];
	$scope.currentIndex = 0;
	$scope.focusInput = true;
	$scope.isBoardFilled = false;

	$scope.nextSquare = function() {
		$scope.currentIndex++;
	}

	$scope.selectSquare = function(index) {
		$scope.currentIndex = index;
		$scope.focusInput = true;
	}

	// Check if all entries are filled whenever the entries array is changed.
	$scope.$watch('entries', function(newVal) {
		console.log("entries changed");

		if ($scope.entries.length < 25) {
			$scope.isBoardFilled = false;
			return;
		} else {
			$scope.isBoardFilled = true;
			console.log("length >= 25");
			angular.forEach($scope.entries, function(entry, index) {
				console.log("entry: " + entry + ", index: " + index);
				if (entry.length === 0) {
					console.log("length is 0");
					$scope.isBoardFilled = false;
				};
			})
		}
	}, true);

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
		restrict: "A",
		link: function(scope, element, attrs) {
			scope.$watch(attrs.focusThis, function(value) {
				if (value === true) {
					element[0].focus();
					element[0].select();
					scope[attrs.focusThis] = false;
				};
			})
		}
	}
});

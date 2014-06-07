angular.module('generator', [])

.controller('mainController', function($scope){
	$scope.squares = [
		{text: '1', freeSquare: false},  {text: '2', freeSquare: false},  {text: '3', freeSquare: false},
		{text: '4', freeSquare: false},  {text: '5', freeSquare: false},  {text: '6', freeSquare: false},
		{text: '7', freeSquare: false},  {text: '8', freeSquare: false},  {text: '9', freeSquare: false},
		{text: '10', freeSquare: false}, {text: '11', freeSquare: false}, {text: '12', freeSquare: false},
		{text: '13', freeSquare: false}, {text: '14', freeSquare: false}, {text: '15', freeSquare: false},
		{text: '16', freeSquare: false}, {text: '17', freeSquare: false}, {text: '18', freeSquare: false},
		{text: '19', freeSquare: false}, {text: '20', freeSquare: false}, {text: '21', freeSquare: false},
		{text: '22', freeSquare: false}, {text: '23', freeSquare: false}, {text: '24', freeSquare: false},
		{text: '25', freeSquare: false}];

	$scope.currentIndex = 0;
	$scope.focusInput = true;
	$scope.isBoardFilled = false;

	$scope.nextSquare = function() {
		$scope.currentIndex++;
	};

	$scope.prevSquare = function() {
		$scope.currentIndex--;
	};

	$scope.selectSquare = function(index) {
		$scope.currentIndex = index;
		$scope.focusInput = true;
	};

	// Probably not needed in final version, just added for test.
	$scope.cleanboard = function () {
		$scope.squares = [];
	};

	// Check if all entries are filled whenever the entries array is changed.
	$scope.$watch('squares', function(newVal) {
		if ($scope.squares.length < 25) {
			$scope.isBoardFilled = false;
			return;
		} else {
			$scope.isBoardFilled = true;
			angular.forEach($scope.squares, function(square, index) {
				console.log("entry: " + square.text + ", index: " + index);
				if (square.length === 0) {
					console.log("length is 0");
					$scope.isBoardFilled = false;
				}
			})
		}
	}, true);

	$scope.shuffle = function() {
		var counter = $scope.squares.length, temp, index;

		// While there are elements in the array
		while (counter > 0) {
			// Pick a random index
			index = Math.floor(Math.random() * counter);

			// Decrease counter by 1
			counter--;

			// And swap the last element with it
			temp = $scope.squares[counter].text;
			$scope.squares[counter].text = $scope.squares[index].text;
			$scope.squares[index].text = temp;
		}
	};

	$scope.makeFreeSpace = function(freeIndex) {
		if (freeIndex === undefined){
			freeIndex = Math.ceil(($scope.squares.length - 1)/2);
		}
		$scope.squares[freeIndex].freeSquare = !$scope.squares[freeIndex].freeSquare;
	};
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
				}
			})
		}
	}
});

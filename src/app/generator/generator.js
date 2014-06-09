angular.module('generator', [])

.controller('mainController', function($scope){
	$scope.squares = [{text: "Wait for applause that doesn't come",freeSquare: false, gotten: false},{text: "Ubisoft's celebrity host calls gamers nerds",freeSquare: false, gotten: false},{text: "\"We've heard fans loud and clear\"",freeSquare: false, gotten: false},{text: "VR stage demo boring",freeSquare: false, gotten: false},{text: "Netflix logo appears",freeSquare: false, gotten: false},{text: "Awkward innuendo falls flat",freeSquare: false, gotten: false},{text: "Microsoft acts like kinect is still important",freeSquare: false, gotten: false},{text: "\"Revolutionary\" Sequel changes very little",freeSquare: false, gotten: false},{text: "New-gen GTA V Port",freeSquare: false, gotten: false},{text: "Company Loves (That is, Acknowledges) Indies",freeSquare: false, gotten: false},{text: "Whole Family Enjoys Something",freeSquare: false, gotten: false},{text: "The last guardian goes to ps4",freeSquare: false, gotten: false},{text: "Rare is working on...anything",freeSquare: false, gotten: false},{text: "David cage speech is too long",freeSquare: false, gotten: false},{text: "Platform-exclusive call of duty DLC",freeSquare: false, gotten: false},{text: "EA brings disinterested athlete on stage",freeSquare: false, gotten: false},{text: "More cross-gen than next-gen",freeSquare: false, gotten: false},{text: "Metal gear trailer confuses audience",freeSquare: false, gotten: false},{text: "Poorly timed \"Wooo!\"",freeSquare: false, gotten: false},{text: "Xbox One doing great, graph says",freeSquare: false, gotten: false},{text: "Montage includes 3+ shooters",freeSquare: false, gotten: false},{text: "Motion controlled demo fail show motion controls still suck",freeSquare: false, gotten: false},{text: "Kids game demoed akwardly by adults",freeSquare: false, gotten: false},{text: "Classic game remake set up unprecedented hype",freeSquare: false, gotten: false},{text: "3+ already announced games are reannounced for 2015 as if new",freeSquare: false, gotten: false}];
	$scope.squares[12].freeSquare = true;
	//for(var i=0; i < 25; i++){
	//	$scope.squares[i] = {text: '', freeSquare: false, gotten: false}
	//}

	$scope.currentIndex = 0;
	$scope.focusInput = true;
	$scope.isBoardFilled = false;
	$scope.editMode = false;

	$scope.nextSquare = function() {
		$scope.currentIndex++;
	};

	$scope.prevSquare = function() {
		$scope.currentIndex--;
	};

	$scope.selectSquare = function(index) {
		if ($scope.bingo) {
			return;
		}
		$scope.currentIndex = index;
		if ($scope.editMode){
		} else {
			if (!$scope.squares[index].freeSquare){
				$scope.squares[index].gotten = true;
			}

			if ($scope.checkForBingo()){
				console.log("That's a bingo!!!");
			}
		}
		$scope.focusInput = true;
	};

	$scope.checkForBingo = function(){
		var bingoCountVertical = 0;
		var bingoCountHorizontal = 0;
		var bingoCountDiagonal = 0;
		var bingoCountDiagonalALT = 0;

		for(var i=0; i < 5; i++){
			for(var j=0; j < 5; j++){
				if ($scope.squares[(i*5)+j].gotten || $scope.squares[(i*5)+j].freeSquare){
					bingoCountHorizontal++;
				}
				if ($scope.squares[(i)+(j*5)].gotten || $scope.squares[(i)+(j*5)].freeSquare){
					bingoCountVertical++;
				}
			}

			if ($scope.squares[i*6].gotten || $scope.squares[i*6].freeSquare) {
				bingoCountDiagonal++;
			}
			if ($scope.squares[(i*6+(4-(2*i)))].gotten || $scope.squares[(i*6+(4-(2*i)))].freeSquare) {
				bingoCountDiagonalALT++;
			}
			if (bingoCountHorizontal == 5 || bingoCountVertical == 5 || bingoCountDiagonal == 5 || bingoCountDiagonalALT == 5){

				return true;
			}
			bingoCountHorizontal=0;
			bingoCountVertical=0;
		}
		return false;
	};

	// Probably not needed in final version, just added for test.
	$scope.cleanboard = function () {
		$scope.squares = [];
		for(var i=0; i < 25; i++){
			$scope.squares[i] = {text: '', freeSquare: false, gotten: false}
		}
	};

	$scope.cleanGotten = function () {
		$scope.squares.forEach(function(square){
			square.gotten = false;
		})
	};

	// Check if all entries are filled whenever the entries array is changed.
	$scope.$watch('squares', function(newVal) {
		if ($scope.squares.length < 25) {
			$scope.isBoardFilled = false;
			return;
		} else {
			$scope.isBoardFilled = true;
			angular.forEach($scope.squares, function(square, index) {
				//console.log("entry: " + square.text + ", index: " + index);
				if (square.length === 0) {
					//console.log("length is 0");
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
		$scope.cleanGotten();
	};

	$scope.makeFreeSpace = function(freeIndex) {
		if (freeIndex === undefined){
			freeIndex = Math.ceil(($scope.squares.length - 1)/2);
		}
		$scope.squares[freeIndex].freeSquare = !$scope.squares[freeIndex].freeSquare;
	};

	$scope.setEditMode = function(setting) {
		$scope.editMode = setting;
		$scope.cleanGotten();
		$scope.currentIndex = 0;
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
				}
			}, true)
		}
	}
});

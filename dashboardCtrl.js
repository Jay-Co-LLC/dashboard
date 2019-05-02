app.controller("dashboardCtrl", ['$scope', 'FullData',
	function($scope, FullData) {
		
		$scope.init = function() {
			$scope.name = "wulfsuspension";
		};
		
		$scope.get = function() {
			FullData.get($scope.name);
		};
	}
]);

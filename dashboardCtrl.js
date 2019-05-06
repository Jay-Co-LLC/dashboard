app.controller("dashboardCtrl", ['$scope', 'FullData', 'GetAllObjects',
	function($scope, FullData, GetAllObjects) {
		
		$scope.list = []
		
		$scope.init = function() {
			$scope.name = "wulfsuspension";
			$scope.getList();
		};
		
		$scope.runReport = function() {
			FullData.get($scope.name);
		};
		
		$scope.getList = function() {
			GetAllObjects.get($scope.name)
				.then(
					(res) => {
						$scope.list = res.data;
					},
					(res) => {
						console.log(res.statusText);
					}
				);
		};
	}
]);

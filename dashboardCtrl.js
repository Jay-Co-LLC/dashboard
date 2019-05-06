app.controller("dashboardCtrl", ['$scope', 'FullData', 'GetAllObjects',
	function($scope, FullData, GetAllObjects) {
		
		$scope.list = []
		$scope.isRefreshing = false;
		$scope.isRunning = false;
		
		$scope.init = function() {
			$scope.name = "wulfsuspension";
			$scope.getList();
		};
		
		$scope.runReport = function() {
			$scope.isRunning = true;
			FullData.get($scope.name)
				.then(
					(res) => {
						$scope.isRunning = false;
					},
					(res) => {
						$scope.isRunning = false;
					}
			);
		};
		
		$scope.getList = function() {
			$scope.isRefreshing = true;
			GetAllObjects.get($scope.name)
				.then(
					(res) => {
						$scope.isRefreshing = false;
						$scope.list = res.data;
					},
					(res) => {
						$scope.isRefreshing = false;
						console.log(res.statusText);
					}
				);
		};
	}
]);

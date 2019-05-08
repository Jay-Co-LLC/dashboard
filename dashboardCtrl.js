app.controller("dashboardCtrl", ['$scope', 'FullData', 'GetAllObjects',
	function($scope, FullData, GetAllObjects) {
		
		$scope.list = []
		$scope.isRefreshing = false;
		$scope.isRunning = false;
		$scope.alertMessage = '';
		$scope.isError = true;
		
		var _resetAlert = function() {
			$scope.alertMessage = '';
			$scope.isError = false;
		};
		
		$scope.init = function() {
			$scope.name = "wulfsuspension";
			$scope.getList();
		};
		
		$scope.runReport = function() {
			$scope.isRunning = true;
			_resetAlert();
			
			FullData.get($scope.name)
				.then(
					(res) => {
						$scope.isRunning = false;
						$scope.alertMessage = 'Success calling apiProxy, refreshing automatically until report is generated...';
					},
					(res) => {
						$scope.isRunning = false;
						$scope.isError = true;
						$scope.alertMessage = 'Error calling apiProxy, please try again later.';
					}
			);
		};
		
		$scope.getList = function() {
			$scope.isRefreshing = true;
			_resetAlert();
			
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
		
		$scope.$watch('name', (newVal, oldVal, scope) => {
			if (newVal !== oldVal)
				scope.getList();
		});
	}
]);

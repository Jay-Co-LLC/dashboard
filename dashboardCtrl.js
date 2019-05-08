app.controller("dashboardCtrl", ['$scope', 'FullData', 'GetAllObjects',
	function($scope, FullData, GetAllObjects) {
		
		$scope.list = []
		$scope.isRefreshing = false;
		$scope.isRunning = false;
		$scope.alertMessage = '';
		$scope.isError = true;
		$scope.count = 0;
		
		var _resetAlert = function() {
			$scope.alertMessage = '';
			$scope.isError = false;
		};
		
		var _setError = function(msg) {
			$scope.alertMessage = msg;
			$scope.isError = true;
		};
		
		var _setInfo = function(msg) {
			$scope.alertMessage = msg;
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
						_setInfo('Success calling apiProxy, refreshing automatically until report is generated...');
					},
					(res) => {
						$scope.isRunning = false;
						_setError('Error calling apiProxy, please try again later.');
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
						$scope.count = res.data.length;
					},
					(res) => {
						$scope.isRefreshing = false;
						$scope.count = 0;
						
						$scope.isError = true;
						$scope.alertMessage = res.statusText;
					}
				);
		};
		
		$scope.$watch('name', (newVal, oldVal, scope) => {
			if (newVal !== oldVal)
				scope.getList();
		});
	}
]);

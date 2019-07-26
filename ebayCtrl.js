app.controller("ebayCtrl", ['$scope', '$interval', 'FullData', 'GetAllObjects', 'PollQ',
	function($scope, $interval, FullData, GetAllObjects, PollQ) {
		
		$scope.list = []
		$scope.isRefreshing = false;
		$scope.isRunning = false;
		$scope.alertMessage = '';
		$scope.isError = true;
		
		var prom;
		
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
						_setInfo('Success calling apiProxy, waiting for report to be generated...');
												
						// Poll the SQS queue every 60 seconds to check the status of the call to FullData
						prom = $interval(function() {
							PollQ.poll()
								.then(
									(res) => {
										switch(res.status) {
											case 200:
												$scope.getList();
												$scope.stopPolling();
												break;
											case 400:
												_setError('There was an error generating the report. Please ask Sam to check the CloudWatch logs or try again later.');
												$scope.stopPolling();
												break;
											case 404:
												_setError('There was an error generating the report. The SQS queue had an unknown message.');
												$scope.stopPolling();
												break;
											default:
												break;
										}
									},
									(res) => {
										console.log(res);
										switch(res.status) {
											case 200:
												$scope.getList();
												$scope.stopPolling();
												break;
											case 400:
												_setError('There was an error generating the report. Please ask Sam to check the CloudWatch logs or try again later.');
												$scope.stopPolling();
												break;
											case 404:
												_setError('There was an error generating the report. The SQS queue had an unknown message.');
												$scope.stopPolling();
												break;
											default:
												break;
										}
									}
							);
						}, 60000);
					},
					(res) => {
						$scope.isRunning = false;
						_setError('Error calling apiProxy, please try again later.');
					}
			);
		};
		
		$scope.stopPolling = function() {
			console.log("stopPolling called");
			$interval.cancel(prom);
			prom = undefined;
			$scope.isRunning = $scope.isRefreshing = false;
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
						_setError(res.statusText);
					}
				);
		};
		
		// Automatically refresh the list when a different user is selected
		$scope.$watch('name', (newVal, oldVal, scope) => {
			if (newVal !== oldVal)
				scope.getList();
		});
	}
]);

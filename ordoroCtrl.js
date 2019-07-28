app.controller("ordoroCtrl", ['$scope', '$interval', 'updateInventory', 'PollQ', 'PurgeQ',
	function($scope, $interval, updateInventory, PollQ, PurgeQ) {
		$scope.isPurging = false;
		$scope.isPulling = false;
		$scope.isProcessing = false;
		$scope.isComplete = false;
		
		var id = '';
		$scope.numChunks = 0;
		$scope.numChunksFinished = 0;
		$scope.numItems = 0;

		var prom;
		
		$scope.updateInventory = function() {
			// Purge queue of messages to start fresh
			PurgeQ.purge()
				.then(
					(res) => {
						$scope.isPurging = true;
					},
					(res) => {
					}
			);
			
			setTimeout(function() {
				$scope.isPurging = false;
				$scope.isPulling = true;
				updateInventory.get()
					.then(
						(res) => {
							$scope.isPulling = false;
							id = res.data.id;
							$scope.numChunks = res.data.numChunks;
							$scope.numItems = res.data.numItems;
							
							$scope.isProcessing = true;
							
							// Poll the SQS queue every 30 seconds to check the status
							prom = $interval(function() {
								PollQ.poll(id)
									.then(
										(res) => {
											switch(res.status) {
												case 200:
													$scope.numChunksFinished = res.data.numChunksFinished;
													
													if ($scope.numChunksFinished >= $scope.numChunks) {
														$scope.isComplete = true;
														$scope.stopPolling();
													}
													
													break;
												default:
													break;
											}
										},
										(res) => {
											// If error in the response, do nothing and continue polling
										}
								);
							}, 15000);
						},
						(res) => {
							$scope.isPulling = false;
							$scope.isProcessing = false;
						}
				);
			}, 60000)
		};
		
		$scope.stopPolling = function() {
			$interval.cancel(prom);
			prom = undefined;
			$scope.isProcessing = false;
			$scope.isPulling = false;
		};
	}
]);

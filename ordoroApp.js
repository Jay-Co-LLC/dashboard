var app = angular.module('ordoro', []);

app.factory('updateInventory', ['$http', function($http) {
	
	var updateInventory = {};
	var urlBase = "https://vt2sgb0sp0.execute-api.us-east-2.amazonaws.com/default/api-updateInventory-TAW";
	
	updateInventory.get = function() {
		return $http({
				url: urlBase,
				method: "GET",
				timeout: 90000});
	};
	
	return updateInventory;
}]);

app.factory('PollQ', ['$http', function($http) {
	
	var PollQ = {};
	var urlBase = "https://fe152gu0c0.execute-api.us-east-2.amazonaws.com/default/pollQ-updateInventory-TAW";
	
	PollQ.poll = function(id) {
		return $http({
			url: urlBase,
			params: { 'id' : id},
			method: 'GET'});
	};
			
	return PollQ;
}]);

app.factory('PurgeQ', ['$http', function($http) {
	
	var PurgeQ = {};
	var urlBase = "https://t6sgg3kg16.execute-api.us-east-2.amazonaws.com/default/purgeQ-updateInventory-TAW";
	
	PurgeQ.purge = function() {
		return $http({
			url: urlBase,
			method: 'GET'});
	};
			
	return PurgeQ;
}]);
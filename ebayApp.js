var app = angular.module('ebay', []);

app.factory('FullData', ['$http', function($http) {
	
	var FullData = {};
	var urlBase = "https://9ttkswjfp1.execute-api.us-east-2.amazonaws.com/default/apiProxy";
	
	FullData.get = function(name) {
		return $http({
				url: urlBase,
				params: { 'name' : name},
				method: "GET"});
	};
	
	return FullData;
}]);

app.factory('GetAllObjects', ['$http', function($http) {
	
	var GetAllObjects = {};
	var urlBase = "https://yw23eokw3e.execute-api.us-east-2.amazonaws.com/default/getAllObjects"
	
	GetAllObjects.get = function(name) {
		return $http({
				url: urlBase,
				params: { 'name' : name},
				method: "GET"});
	};
	
	return GetAllObjects;
}]);

app.factory('PollQ', ['$http', function($http) {
	
	var PollQ = {};
	var urlBase = "https://t98rjxvbpl.execute-api.us-east-2.amazonaws.com/default/pollQ";
	
	PollQ.poll = function() {
		return $http({
			url: urlBase,
			method: 'GET'});
	};
			
	return PollQ;
}]);

app.filter('removePath', function() {
	return function(input) {
		return input.split('/')[2];
	}
});
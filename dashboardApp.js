var app = angular.module('dashboard', []);

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
	
	var GetAllObjects = {}
	var urlBase = "https://yw23eokw3e.execute-api.us-east-2.amazonaws.com/default/getAllObjects"
	
	GetAllObjects.get = function(name) {
		return $http({
				url: urlBase,
				params: { 'name' : name},
				method: "GET"});
	};
	
	return GetAllObjects;
}]);

app.filter('removePath', function() {
	return function(input) {
		return input.split('/')[2];
	}
});
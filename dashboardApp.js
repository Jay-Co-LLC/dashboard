var app = angular.module('dashboard', []);

app.factory('FullData', ['$http', function($http) {
	
	var FullData = {};
	var urlBase = "https://76jtgztjhi.execute-api.us-east-2.amazonaws.com/default/getFullData";
	
	FullData.get = function(name) {
		return $http({
				url: urlBase,
				headers: { 'Access-Control-Allow-Origin' : '*'},
				params: { 'name' : name},
				method: "GET"});
	};
	
	return FullData;
}]);
define(['angular'],function(angular){
	return function($scope, $http, Log, Car){
		console.log('加载第二页');
		$scope.title="加载第二页";
		Car.test({}).then(function(res){
			console.log('Api post  .. Car post');
		});
	}
})
define(['angular'],function(angular){
	return function($scope, $http, Log, Car){
		console.log('加载首页');
		$scope.title="加载首页";
		Car.test({}).then(function(res){
			console.log('Api post  .. Car post');
		});
	}
})
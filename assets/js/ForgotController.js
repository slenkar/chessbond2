angular.module('HomepageModule').controller('RegisterController', ['$scope', '$http','$window', 'toastr', function($scope, $http,$window, toastr){

	// set-up loginForm loading state
	
	$scope.LevelForm = {
		loading: false
	}
	$scope.ForgotPassword=function()
		{
			
			$http.put("/SendEmail",{address:$scope.vm.address})
			.then(function onSuccess (resData, jwr){
			toastr.info(resData.data.message);
			}
			
			);
			
			};
	
	
	
}]);
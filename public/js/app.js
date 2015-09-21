var app = angular.module('pusherApp', ['ngMaterial']);

app.controller('MessageCtrl', function ($scope) {
  $scope.newMessage = "";
  $scope.messages = ["Message 1", "Message 2", "Message 3"];

  $scope.addMessage = function() {
  	console.log("Add message: " + $scope.newMessage);
  	if ($scope.newMessage) {
  		$scope.messages.push($scope.newMessage);
  	}
  }
});
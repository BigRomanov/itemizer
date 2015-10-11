angular.module('app',['ngResource', 'ngCookies', 'ngSanitize', 'ngMessages','ngMaterial'])
.controller('LandingCtrl', function ($scope, $http, $log) {
  $scope.register = function() {
    $http.post('/beta', {email:$scope.registrationEmail, status:"applied"}, {}).then(function(response) {
      $log.log("Registration saved", response);
      $scope.status = "Thank You, we will notify you when we are live!";
    }, function(response) {
      console.log("Registration failed", response);
      $scope.status = "There was some problem with your registration request. Please try again later";
    });
  }
});
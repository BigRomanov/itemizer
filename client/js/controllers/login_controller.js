'use strict';

app.controller('LoginCtrl', function ($scope, $rootScope, Auth, $location) {
    $scope.user = {};
    $scope.error = false;
    $scope.login = function(form) {
      Auth.login('password', {
          'email': $scope.user.email,
          'password': $scope.user.password
        },
        function(err) {
          if (!err) {
            $location.path('/');
          } else {
            $scope.error = true;
          }
      });
    };
  });
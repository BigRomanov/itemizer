app.controller('ProfileCtrl', function ($scope, $rootScope) {
  $scope.user = $rootScope.currentUser;

  $scope.updateProfile = function() {
    $scope.user.$update();
  }
});
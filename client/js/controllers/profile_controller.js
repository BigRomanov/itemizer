app.controller('ProfileCtrl', function ($scope, $rootScope) {
  $scope.user = $rootScope.currentUser;
  $scope.user.organizations = ['Apple', 'IBM'];
});
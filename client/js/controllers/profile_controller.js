app.controller('ProfileCtrl', function ($scope, $rootScope, Organizations, $http, $log) {
  $scope.user = $rootScope.currentUser;

  $scope.init = function() {
    $scope.adding = false;
    $scope.loading = true;
    Organizations.query(function(organizations) {
      $scope.organizations = organizations;
      $scope.loading = false;
    });
  }

  $scope.init();

  $scope.newOrganization = function() {
    $scope.organization = {}
    $scope.adding = true;
  }

  $scope.addOrganization = function() {
    $scope.adding = false;

    $log.log("Adding organization", $scope.organization);

    $http.post('/api/organizations', $scope.organization, {}).then(function(response) {
      $log.log("Organization added");
      $scope.organizations.unshift($scope.organization);
      
    }, function(response) {
      // TODO: Add proper error reporting
      $log.log("Organization save failed", response);
    });
  }

});